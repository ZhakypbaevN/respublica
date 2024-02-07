<template>
  <div class="branch">
    <div class="branch-map" ref="chartdiv"></div>

    <div class="branch-content">
      <div class="branch-content-header">
        <SvgIcon
          class="branch-content-header-icon"
          name="pin-with-circle-yellow-bg"
          :viewboxWidth="52"
          :viewboxHeight="52"
        />
        
        <h3 class="branch-content-header-title">{{ branchData.title }}</h3>
      </div>

      <p class="branch-content-info">
        {{ $t('formdata.address') }}:
        <span>{{ branchData.address }}</span>
      </p>

      <p class="branch-content-info">
        {{ $t('formdata.email-address') }}:
        <a :href="`mailto:${branchData.email}`">{{ branchData.email }}</a>
      </p>
    </div>
    <ListDeputies class="branch-deputies" />
  </div>
</template>

<script setup lang="ts">
  import ListDeputies from "@/components/uiLanding/regions-page/ListDeputiesOfMaslikhat.vue";

  import * as am5 from "@amcharts/amcharts5";
  import * as am5map from "@amcharts/amcharts5/map";
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
  
  import am5geodata_kazakhstanMap from "@/assets/map/kazakhstanMap.json";
  import deputiesMapRU from "@/assets/map/deputiesMap-ru.json";
  import deputiesMapKZ from "@/assets/map/deputiesMap-kz.json";
  
  import { onMounted, reactive } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n();
  
  const deputiesMapList = (t('localy') === 'ru' ? deputiesMapRU : deputiesMapKZ).deputiesList;
  const regions = reactive(deputiesMapList.map((x) => x))
  const karagandyData = deputiesMapList.find(region => region.code === 'KZ-KAR')
  
  const branchData = reactive({
    title: karagandyData.title,
    address: karagandyData.address,
    deputies: null,
    email: karagandyData.email
  })

  onMounted(() => {
    const map = document.querySelector('.branch-map');
    let root = am5.Root.new(map);

    root._logo!.dispose();
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    let chart = window.innerWidth <= 992
      ? root.container.children.push(
          am5map.MapChart.new(root, {
            panX: "rotateX",
            wheelY: "zoom",
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
        `<div style="min-height:40px;width:200px;background-color:white;padding:8px;display:flex;grid-gap:8px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
          <div style="height:8px;width:8px;background-color:#FCC952;border-radius:100%;margin-top:4px;"></div>
          <p style="font-family:'Tilda Sans';font-weight:400;font-size:14px;line-height:19px;letter-spacing:0.15px;color:#051A2D;">{name}</p>
        </div>`
      )
    }
  
    const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
      if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV' || id === 'KZ-TUR') return name
      else if (t('localy') === 'ru' && (id === 'KZ-TUR-SHUMKENT' || id === 'KZ-AKM-ASTANA' || id === 'KZ-ALM-CITY')) return name.slice(0, 2) + name[2].toUpperCase() + name.slice(3).toLowerCase();
      return name[0].toUpperCase() + name.slice(1).toLowerCase()
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
      regions.forEach(region => {
        if (region.code === ev.target.dataItem!.dataContext!.id) {
          deputiesMapList.forEach(obl => {
            if (obl.code === ev.target.dataItem!.dataContext!.id) {
              branchData.title = region.title;
              branchData.deputies = region.deputies;
              branchData.address = Object.assign({}, obl).address;
              branchData.email = Object.assign({}, obl).email;
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
      if (window.innerWidth > 992) {
        return am5.Bullet.new(root,
          !dataItem.dataContext?.name
            ? {
                sprite: am5.Circle.new(root, {
                  radius: 3,
                  fill: am5.color(0x000000)
                })
              }
            : {
              sprite: am5.Circle.new(root, {
                centerX: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(100) : am5.p50,
                centerY: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(720) : am5.p50,
                radius: 5,
                fill: am5.color(0xFFFFFF)
              })
            }
        );
      } else {
        return am5.Bullet.new(root,
          !dataItem.dataContext?.name
            ? {
                sprite: am5.Circle.new(root, {
                  centerX: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(100) : am5.p50,
                  centerY: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(720) : am5.p50,
                  radius: 2,
                  fill: am5.color(0xFFFFFF)
                })
              }
            : {
              sprite: am5.Label.new(root, {
                centerX: am5.p50,
                centerY: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(720) : am5.p50,
                text: "{name}",
                fontSize: 14,
                fontStyle: 'Tilda Sans',
                fill: am5.color(0xFFFFFF),
                populateText: true
              })
            }
        );
      }
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

    // Load routes in GeoJSON format
    var routes = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                71.45325759764486,
                51.14250514464325
              ],
              [
                80.2292212723155,
                52.649003915028686
              ],
              [
                83.13527630391866,
                52.631206731742935
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                76.9411148348155,
                43.238551759658264
              ],
              [
                83.19416384672371,
                41.612421738292994
              ],
              [
                85.90684196486126,
                41.58765682564248
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                69.62599369771937,
                42.39713863399908
              ],
              [
                72.47072934005126,
                39.615669198941504
              ],
              [
                75.17887965163419,
                39.61371617624161
              ]
            ]
          }
        }
      ]
    };

    // Create line series
    var lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, {
        geoJSON: routes
      })
    );
      
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0x16355B),
      strokeDasharray: [6, 3, 6],
      strokeWidth: 1.2,
      strokeOpacity: 1
    });
  
    return { root };
  })
</script>

<style scoped lang="scss">

.branch {
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-gap: 90px;

  &-map {
    width: 875px;
    height: 500px;
  }

  &-content {
    width: 100%;
    max-width: 700px;
    min-height: 340px;
    background-color: white;
    box-shadow: 0 4px 20px rgba(160,174,192,.25);
  
    padding: 27px 20px;

    &-header {
      display: flex;
      align-items: center;
      grid-gap: 20px;
      margin-bottom: 30px;

      &-icon {
        width: 50px;
        height: 50px;
      }
    
      &-title {
        font-size: 28px;
        font-weight: 600;
        line-height: 1.2;
      }
    }
  
    &-info {
      color: var(--light-gray-color);
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;

      margin-bottom: 12px;

      & span {
        color: var(--primary-color);
        font-weight: 700;
      }

      & a {
        color: var(--accent-color);
        font-weight: 700;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  &-deputies {
    display: none;
  }

  // Adaptation
  @media (max-width: 1900px) {
    grid-gap: 70px;
    
    &-map {
      width: 875px;
      height: 500px;
    }

    &-content {
      max-width: 600px;
      min-height: 340px;
    }
  }

  @media (max-width: 1600px) {
    grid-gap: 60px;
    
    &-map {
      width: 760px;
      height: 434px;
    }

    &-content {
      max-width: 480px;
      min-height: 280px;

      padding: 27px 20px;

      &-header {
        grid-gap: 20px;
        margin-bottom: 30px;

        &-icon {
          width: 40px;
          height: 40px;
        }
      
        &-title {
          font-size: 22px;
        }
      }
    
      &-info {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 1400px) {
    grid-gap: 20px;
    
    &-map {
      width: 660px;
      height: 378px;
    }

    &-content {
      max-width: 400px;
      min-height: 280px;

      padding: 20px 18px;

      &-header {
        grid-gap: 20px;
        margin-bottom: 14px;

        &-icon {
          width: 36px;
          height: 36px;
        }
      
        &-title {
          font-size: 22px;
        }
      }
    
      &-info {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 1200px) {
    grid-gap: 20px;
    
    &-map {
      width: 580px;
      height: 332px;
    }

    &-content {
      max-width: 300px;
      min-height: auto;

      padding: 14px 14px 26px;

      &-header {
        flex-direction: column;
        align-items: flex-start;

        grid-gap: 10px;
        margin-bottom: 12px;

        &-icon {
          width: 30px;
          height: 30px;
        }
      
        &-title {
          font-size: 18px;
        }
      }
    
      &-info {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 40px;
    
    &-map {
      width: 100%;
      height: 380px;

      border: 2px dashed var(--accent-color-op50);
      background-color: var(--accent-color-op05);
    }

    &-content {
      max-width: 100%;
      min-height: auto;

      padding: 14px 14px 26px;

      &-header {
        flex-direction: row;
        align-items: center;

        grid-gap: 10px;
        margin-bottom: 12px;

        &-icon {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    grid-gap: 32px;
    
    &-map {
      height: 328px;
    }
  }

  @media (max-width: 576px) {
    grid-gap: 30px;
    
    &-map,
    &-content {
      display: none;
    }
    &-deputies {
      display: block;
    }
  }
}
</style>