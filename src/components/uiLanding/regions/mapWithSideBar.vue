<template>
  <div>
    <div class="map" ref="chartdiv"></div>

    <div class="mapSidebar" :class="{show: showSideBar}">
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
          <p class="mapSidebar-header-address">
            {{ $t('formdata.address') }}:
            {{ sideBarData.address }}
          </p>
          <div class="mapSidebar-header-deputies">
            {{ $t('deputies') }}:
            <span>{{ sideBarData.deputies ? sideBarData.deputies.length : 0 }}</span>
          </div>
        </div>

        <button
          class="mapSidebar-header-exitBtn"
          @click="() => showSideBar = false"
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
  import deputiesMap from "@/assets/map/deputiesMap.json";
  
  import { onMounted, reactive, ref } from 'vue';
  
  const regions = reactive(deputiesMap.deputiesList.map((x) => x))
  
  const showSideBar = ref(false)
  const mapSidebarTopBlock = ref(null)
  const sideBarData = reactive({
    title: '',
    address: '',
    deputies: null
  })
  
  onMounted(() => {
    const map = document.querySelector('.map');
    let root = am5.Root.new(map);

    const headerMain = document.querySelector('#header-main');
    mapSidebarTopBlock.value.style.paddingTop = headerMain!.offsetHeight + 'px';
  
    const cities = [
      { cityId: "KZ-ZHT", name: "ЖЕТЫСУСКАЯ ОБЛАСТЬ", address: "г. Талдыкорган, ул. Абылай хана, 186" },
      { cityId: "KZ-ALM", name: "АЛМАТИНСКАЯ ОБЛАСТЬ", address: "г. Конаев, мкр-н 1, уч. 35/10" },
      { cityId: "KZ-KAR", name: "КАРАГАНДИНСКАЯ ОБЛАСТЬ", address: "г. Караганда, р-н им. Казыбек Би, пр. Н.Назарбаева, 46" },
      { cityId: "KZ-PAV", name: "ПАВЛОДАРСКАЯ ОБЛАСТЬ", address: "г. Павлодар, ул. Луговая 16, 9 этаж, каб. 908" },
      { cityId: "KZ-ZHA", name: "ЖАМБЫЛСКАЯ ОБЛАСТЬ", address: "г.Тараз, ул. Каныша Сатбаева, 19-а, 1 этаж" },
      { cityId: "KZ-AKM", name: "АКМОЛИНСКАЯ ОБЛАСТЬ", address: "г.Кокшетау, Е.Н.АУЕЛЬБЕКОВА, 117" },
      { cityId: "KZ-ATY", name: "АТЫРАУСКАЯ ОБЛАСТЬ", address: "г. Атырау, пр. Султан Бейбарыс, 450" },
      { cityId: "KZ-AKT", name: "АКТЮБИНСКАЯ ОБЛАСТЬ", address: "г. Актобе, ул. Тилеу Батыр 10, БЦ AQTAS, 5 этаж" },
      { cityId: "KZ-MAN", name: "МАНГИСТАУСКАЯ ОБЛАСТЬ", address: "г. Актау, 16 мкрн, д. 25, БЦ Prime" },
      { cityId: "KZ-TUR", name: "ТУРКЕСТАНСКАЯ ОБЛАСТЬ", address: "г. Туркестан, ул. Б.Батырбекова, дом 33, кв. 13" },
      { cityId: "KZ-KZY", name: "КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ", address: "г. Кызылорда, ул. Конаева, 19-а, 1 этаж" },
      { cityId: "KZ-KUS", name: "КОСТАНАЙСКАЯ ОБЛАСТЬ", address: "г. Костанай, пр. Аль-Фараби, 114, БЦ TURAN" },
      { cityId: "KZ-ABY", name: "АБАЙСКАЯ ОБЛАСТЬ", address: "г. Семей, ул. К.Бозтаева, д. 17-е, кв. 199" },
      { cityId: "KZ-ULT", name: "УЛЫТАУСКАЯ ОБЛАСТЬ", address: "г. Жезказган, ул. Мира 1" },
      { cityId: "KZ-ZAP", name: "ЗКО", address: "г. Уральск, с. Желаево, ул.Трудовая, 6/3" },
      { cityId: "KZ-VOS", name: "ВКО", address: "г. Усть-Каменогорск, ул. Чехова, 69, кв.1" },
      { cityId: "KZ-SEV", name: "СКО", address: "г. Петропавловск, ул. Алтынсарина, 168-б" }
    ];
  
    root._logo!.dispose();
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        wheelY: "none",
        minZoomLevel: 1,
        maxZoomLevel: 1
      })
    );
  
    // -------- Create polygon series --------
    const getCount = polygonId => {
      const regions = deputiesMap.deputiesList.filter(region => region.code === polygonId)
      let sum = 0;
      regions.forEach((region) => {
        sum += region.deputies.length
      })
      return sum
    }
  
  
    const customMap = am5geodata_kazakhstanMap.features.map(polygon => {
      let customPolygon = polygon
      customPolygon.properties.count = getCount(polygon.id)
      return customPolygon
    })
  
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: { type: am5geodata_kazakhstanMap.type, features: customMap },
        include: cities.map(city => {
          return city.cityId
        }),
        fill: am5.color(0x5882ED),
        stroke: am5.color(0xffffff),
        strokeWidth: 5
      })
    );
  
  
    // -------- Map ToolTip Settings --------
    const generateToolTip = () => {
      return (
        `<div style="min-height:70px;width:400px;background-color:white;padding:12px;display:flex;grid-gap:12px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
          <div style="height:12px;width:12px;background-color:#FCC952;border-radius:100%;margin-top:4px;"></div>
          <div>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
              <span style="color:#9A9EA6">Адрес: </span>
              {address}
            </p>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
              <span style="color:#9A9EA6">ДЕПУТАТОВ: </span>
              {count}
            </p>
          </div>
        </div>`
      )
    }
  
    const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
      if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV') return name
      return name[0].toUpperCase() + name.slice(1).toLowerCase()
    }
  
    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      tooltipHTML: generateToolTip(),
      templateField: "polygonSettings",
      showTooltipOn: 'hover'
    });

    polygonSeries.mapPolygons.template.events.on("click", function(ev) {
      showSideBar.value = true;
      regions.forEach(region => {
        if (region.code === ev.target.dataItem!.dataContext!.id) {
          cities.forEach(city => {
            if (city.cityId === ev.target.dataItem!.dataContext!.id) {
              sideBarData.title = region.title;
              sideBarData.deputies = region.deputies;
              sideBarData.address = Object.assign({}, city).address;
            }
          })
          region.active = true;
        } else region.active = false;
      })

      polygonSeries.data.setAll(cities.map(city => {
        const polygon = {}
        polygon.id = city.cityId
        polygon.address = city.address;
        
        polygon.name = nameToLowerCase({ id: city.cityId, name: city.name })
        if (city.cityId === 'KZ-ABY' || city.cityId === 'KZ-ZHT' || city.cityId === 'KZ-ULT') polygon.polygonSettings = { fill: am5.color('#235BE8')}
        
        if (city.cityId === ev.target.dataItem.dataContext.id) {
          polygon.polygonSettings = {
            fill: am5.color('#FCC952'),
            stroke: am5.color('#FCC952'),
            strokeWidth: 16,
            strokeOpacity: 0.4
          }
        }
        return polygon
      }));

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
    
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color('#FCC952'),
      fillOpacity: .8,
      stroke: am5.color('#FCC952'),
      strokeWidth: 10,
      strokeOpacity: 0.2
    });
  
    // -------- Map Point Settings --------
  
    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: "cityId",
      })
    );
    
    pointSeries.data.setAll(cities.map(city => {
      const name = nameToLowerCase({id: city.cityId, name: city.name});
      let nameArray = name.split(' ')
      
      return {
        cityId: city.cityId,
        name: `${nameArray[0]}\n${nameArray.slice(1, 5)}`,
        address: city.address
      }
    }));
  
    pointSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
          text: "{name}",
          fontSize: 14,
          fontStyle: 'Tilda Sans',
          fill: am5.color(0xFFFFFF),
          populateText: true
        })
      });
    });
  
    polygonSeries.data.setAll(
      cities.map(city => {
        const polygon = {
          id: '',
          name: '',
          address: '',
          polygonSettings: {}
        };
        polygon.id = city.cityId
        polygon.name = nameToLowerCase({id: city.cityId, name: city.name})
        polygon.address = city.address;
        
        if (city.cityId === 'KZ-ABY' || city.cityId === 'KZ-ZHT' || city.cityId === 'KZ-ULT') polygon.polygonSettings = { fill: am5.color('#235BE8') }
        return polygon
      })
    );
  
    return { root };
  })
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 900px;
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

  transition: all .3s ease-in-out;

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

    &-address {
      font-weight: 500;
      font-size: 14px;
      line-height: 1.2;
      margin-bottom: 12px;
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
}

</style>