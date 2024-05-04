<template>
  <div>
    <div class="map" ref="chartdiv"></div>

    <div class="mapSidebar" :class="{show: showSideBar}" v-click-outside="onHideSidebar">
      <div class="mapSidebar-topBlock" ref="mapSidebarTopBlock"></div>
      <div class="mapSidebar-header">
        <SvgIcon
          class="mapSidebar-header-icon"
          name="pin-with-circle-yellow-bg"
          :viewboxWidth="52"
          :viewboxHeight="52"
        />
        <div class="mapSidebar-header-title">
          <h3 class="mapSidebar-header-name">{{ sideBarData.title }}</h3>
          <p class="mapSidebar-header-info">
            {{ $t('formdata.address') }}:
            {{ sideBarData.address }}
          </p>

          <p class="mapSidebar-header-info">
            {{ $t('formdata.email-address') }}:
            <a :href="`mailto:${sideBarData.email}`">{{ sideBarData.email }}</a>
          </p>

          <div class="mapSidebar-header-deputies">
            {{ $t('deputies-count') }}:
            <span>{{ sideBarData.deputies ? sideBarData.deputies.length : 0 }}</span>
          </div>
        </div>

        <button
          class="mapSidebar-header-exitBtn"
          @click="onHideSidebar"
        >
          <SvgIcon
            name="x"
            class="mapSidebar-header-exitBtn-icon"
            :viewboxHeight="14"
            :viewboxWidth="14"
          />
        </button>
      </div>

      <div
        v-if="sideBarData.deputies"
        class="mapSidebar-content"
      >
        <div
          class="mapSidebar-content-item"
          v-for="deputy of sideBarData.deputies"
          :key="deputy.name"
        >
          <div class="mapSidebar-content-item-preview withZoomPreview-preview">
            <div class="mapSidebar-content-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${deputy.img ?? '/img/avatar-default.jpg'});`"></div>
          </div>
          
          <div class="mapSidebar-content-item-info">
            <h4 class="mapSidebar-content-item-name">{{ deputy.name }}</h4>
            <p class="mapSidebar-content-item-description">{{ deputy.role }}</p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="mapSidebar-content"
      >
        <p>{{ $t('status.there-are-no-deputies') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as am5 from "@amcharts/amcharts5";
  import * as am5map from "@amcharts/amcharts5/map";
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
  
  import am5geodata_kazakhstanMap from "@/assets/map/kazakhstanMap.json";
  import deputiesMapRU from "@/assets/map/deputiesMap-ru.json";
  import deputiesMapKZ from "@/assets/map/deputiesMap-kz.json";
  
  import { onMounted, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  
  const deputiesMapList = (t('localy') === 'ru' ? deputiesMapRU : deputiesMapKZ).deputiesList;
  const regions = reactive(deputiesMapList.map((x) => x))
  
  const showSideBar = ref(false)
  const onGoHome = ref<Function>(() => {})
  const activeRegionID = ref()
  const mapSidebarTopBlock = ref(null)
  const sideBarData = reactive({
    title: '',
    address: '',
    email: '',
    deputies: null
  })

  const onHideSidebar = () => {
    showSideBar.value = false;
    onGoHome.value();
  }
  
  onMounted(() => {
    const map = document.querySelector('.map');

    let root = am5.Root.new(map);
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    const headerMain = document.querySelector('#header-main');
    mapSidebarTopBlock.value.style.paddingTop = headerMain!.offsetHeight + 'px';
  
    root._logo!.dispose();
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = window.innerWidth <= 992 || true
      ? root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "rotateX",
            wheelY: "none",
            minZoomLevel: 0.5,
            maxZoomLevel: 16,
            projection: am5map.geoMercator()
          })
        )
      : root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "none",
            panY: "none",
            projection: am5map.geoMercator(),
            wheelY: "none",
            minZoomLevel: 1,
            maxZoomLevel: 1
          })
        );
    
    onGoHome.value = () => {
      polygonSeries.data.setAll(deputiesMapList.map(obl => {
        const polygon = {}
        polygon.id = obl.code
        polygon.address = obl.address;
        polygon.email = obl.email;
        
        polygon.name = nameToLowerCase({ id: obl.code, name: obl.title })
        
        return polygon
      }));

      activeRegionID.value = null;
      chart.goHome();
    }
  
    // -------- Create polygon series --------
    const getCount = polygonId => {
      const region = deputiesMapList.find(region => region.code === polygonId)
      if (region) return region.deputies.length
    }
  
  
    const customMap = am5geodata_kazakhstanMap.features.map(polygon => {
      let customPolygon = polygon
      customPolygon.properties.count = getCount(polygon.id);
      return customPolygon
    })
  
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: { type: am5geodata_kazakhstanMap.type, features: customMap },
        include: deputiesMapList.map(obl => {
          return obl.code
        }),
        fill: am5.color(0x5882ED),
        stroke: am5.color(0xffffff),
        strokeWidth: 5
      })
    );
  
  
    // -------- Map ToolTip Settings --------
    const generateToolTip = () => {
      return (
        `<div style="min-height:70px;width:440px;background-color:white;padding:10px;display:flex;grid-gap:10px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
          <div style="height:12px;width:12px;background-color:#FCC952;border-radius:100%;margin-top:4px;"></div>
          <div>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:4px;">
              <span style="color:#9A9EA6">${ t('formdata.address') }: </span>
              {address}
            </p>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:8px;">
              <span style="color:#9A9EA6">${ t('formdata.email-address') }: </span>
              <a :href="mailto:{email}" style="color:#4A78EC;font-weight:700;:hover{text-decoration: underline;}" >{email}</a>
            </p>

            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
              <span style="color:#9A9EA6">${ t('deputies-count').toUpperCase() }: </span>
              <span style="font-weight:600;">{count}</span>
            </p>
          </div>
        </div>`
      )
    }
  
    const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
      if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV') return name.split(' ').map(word => word.substring(0, 1)).join('').toUpperCase()
      return name
    }

    if (window.innerWidth > 992) {
      polygonSeries.mapPolygons.template.setAll({
        interactive: true,
        tooltipHTML: generateToolTip(),
        templateField: "polygonSettings",
        showTooltipOn: 'hover'
      });
    }

    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
      if (activeRegionID.value === ev.target.dataItem!.dataContext!.id) {
        onGoHome();
        return;
      }
      
      setTimeout(() => {
        regions.forEach(region => {
          if (region.code === ev.target.dataItem!.dataContext!.id) {
            deputiesMapList.forEach(obl => {
              if (obl.code === ev.target.dataItem!.dataContext!.id) {
                sideBarData.title = region.title;
                sideBarData.deputies = region.deputies;
                sideBarData.address = Object.assign({}, obl).address;
                sideBarData.email = Object.assign({}, obl).email;
              }
            })
            region.active = true;
          } else region.active = false;
        })
  
        polygonSeries.data.setAll(deputiesMapList.map(obl => {
          const polygon = {}
          polygon.id = obl.code
          polygon.address = obl.address;
          polygon.email = obl.email;
          
          polygon.name = nameToLowerCase({ id: obl.code, name: obl.title })
          
          if (obl.code === ev.target.dataItem.dataContext.id) {
            polygon.polygonSettings = {
              fill: am5.color('#FCC952'),
              stroke: am5.color('#FCC952'),
              strokeWidth: 16,
              strokeOpacity: 0.4
            }
          }
          return polygon
        }));

        activeRegionID.value = ev.target.dataItem!.dataContext!.id;

        polygonSeries.zoomToDataItem(ev.target.dataItem);

        showSideBar.value = true;
      }, 300)

    });
  
    let tooltip = am5.Tooltip.new(root, {
      getFillFromSprite: false
    });
    
    tooltip.get("background")!.setAll({
      fillOpacity: 0,
      strokeOpacity: 0
    });
    
    polygonSeries.set("tooltip", tooltip);
  
    polygonSeries.mapPolygons.template.setAll({
      stroke: am5.color('#ffffff'),
      strokeWidth: 2,
    });
    
    // polygonSeries.mapPolygons.template.states.create("hover", {
    //   fill: am5.color('#FCC952'),
    //   fillOpacity: .8,
    //   stroke: am5.color('#FCC952'),
    //   strokeWidth: 10,
    //   strokeOpacity: 0.2
    // });
  
    // -------- Map Point Settings --------
  
    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: "cityId",
      })
    );
    
    pointSeries.data.setAll([
      ...deputiesMapList.map(obl => {
        const name = nameToLowerCase({id: obl.code, name: obl.title});
        let nameArray = name.split(' ')
        
        return {
          cityId: obl.code,
          name: `${nameArray[0]}\n${nameArray.slice(1, 5)}`,
          address: obl.address
        }
      }),
      {
        geometry: {
          type: "Point",
          coordinates: [71.45325759764486, 51.14250514464325]
        }
      },
      {
        geometry: {
          type: "Point",
          coordinates: [76.9411148348155, 43.238551759658264]
        }
      },
      {
        geometry: {
          type: "Point",
          coordinates: [69.62599369771937, 42.39713863399908]
        }
      },
    ]);
  
    pointSeries.bullets.push(function(root, series, dataItem) {
      return am5.Bullet.new(root,
        {
            sprite: am5.Label.new(root, {
              centerX: am5.p50,
              centerY: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(300) : am5.p50,
              text: "{name}",
              fontSize: 14,
              fontStyle: 'Tilda Sans',
              fill: am5.color(0xFFFFFF),
              populateText: true
            })
          }
      );
    });
  
    polygonSeries.data.setAll(
      deputiesMapList.map(obl => {
        const polygon = {
          id: '',
          name: '',
          address: '',
          email: '',
          polygonSettings: {}
        };
        polygon.id = obl.code
        polygon.name = nameToLowerCase({id: obl.code, name: obl.title})
        polygon.address = obl.address;
        polygon.email = obl.email;
        
        return polygon
      })
    );

    // Add button to go back to continents view
  var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
    x: 10,
    centerX: am5.p0,
    y: 10,
    centerY: am5.p0,
  }));

  var homeButton = zoomControl.children.moveValue(am5.Button.new(root, {
    paddingTop: 10,
    paddingBottom: 10,
    x: am5.p0,
    centerX: am5.p0,
    y: am5.p0,
    centerY: am5.p0,
    icon:
      am5.Graphics.new(root, {
        svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
        fill: am5.color(0xffffff)
      })
  }), 0)
  homeButton.events.on("click", function() {
    chart.goHome();
    // if (currentDataItem) {
    //   polygonSeries.zoomToDataItem(currentDataItem);
    // }
    // else {
    //   chart.goHome();
    // }
  })

    return { root };
  })
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 900px;

  // Adaptation
  @media (max-width: 1750px) {
    height: 800px;
  }

  @media (max-width: 1600px) {
    height: 700px;
  }

  @media (max-width: 1400px) {
    height: 600px;
  }

  @media (max-width: 1200px) {
    height: 500px;
  }

  @media (max-width: 992px) {
    height: 380px;

    border: 2px dashed var(--accent-color-op50);
    background-color: var(--accent-color-op05);
  }
}

.mapSidebar {
  height: 100vh;
  width: 420px;
  
  position: fixed;
  right: -500px;
  bottom: 0;
  z-index: 2;
  overflow-y: auto;

  background-color: white;
  box-shadow: 0 4px 20px rgba(160,174,192,.25);

  transition: all .24s linear;

  &.show {
    right: 0;
  }

  &-header {
    display: grid;
    grid-template-columns: 40px 1fr 18px;
    grid-gap: 20px;
    
    padding: 27px 20px;
    background-color: #fff1cb;

    &-icon {
      width: 40px;
      height: 40px;
    }

    &-name {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 5px;
    }

    &-info {
      font-weight: 500;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 12px;

      & a {
        color: var(--accent-color);
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &-deputies {
      display: inline;
      font-size: 11px;
      font-weight: 500;
      line-height: 1.2;
      color: #051a2d;
      padding: 8px 15px;
      background: #ffd050;
      border-radius: 10px;

      & span {
        font-weight: 700;
      }
    }

    &-exitBtn {
      height: 18px;
      
      &-icon {
        height: 18px;
        width: 18px;
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;

    padding: 20px;

    &-item {
      display: grid;
      grid-template-columns: 80px 1fr;
      grid-gap: 20px;

      padding: 14px;
      border: 2px solid #e9ebed;
      border-radius: 10px;

      transition: all .3s linear;

      &-preview-img {
        padding-bottom: 92%;
      }

      &-name {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.1;
        color: #051a2d;
        margin-bottom: 10px;
      }

      &-description {
        font-size: 14px;
      }
    }
  }

  // Adaptation
  @media (max-width: 576px) {
    width: 320px;

    &-header {
      padding-top: 30px;
      align-items: center;
      &-title {
        grid-column: 1/4;
      }

      &-exitBtn {
        grid-row: 1/2;
        grid-column: 3/4;
      }
    }

    &-content {
      padding: 10px;

      &-item {
        grid-template-columns: 60px 1fr;
        grid-gap: 14px;

        padding: 12px;
        border: 1.4px solid #e9ebed;
        border-radius: 6px;

        &-name {
          margin-bottom: 6px;
        }
      }
    }
  }
}

</style>