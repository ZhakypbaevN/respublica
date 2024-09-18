<template>
  <AnalyticsBlock :title="$t('analytics.activity-by-region')">
    <template v-slot:actions>
      <div class="regions-controlBtns">
        <Button
          v-for="(btn, idx) of controlBtns"
          :key="btn.icon"
          :type="btn.active ? 'default' : 'default-grey'"
          :class="`regions-controlBtns-btn ${btn.name}`"
          @click="() => toggleShow(idx)"
        >
          <SvgIcon
            :name="btn.icon"
            :viewboxHeight="32"
            :viewboxWidth="32"
          />
        </Button>
      </div>
    </template>


    <div class="regions">
      <Transition>
        <div v-if="controlBtns[0].active">
          <div class="regions-map" ref="chartdiv"></div>
        </div>

        <div v-else>
          <div class="regions-list">
            <div
              v-for="region of regionData"
              :key="region.location_id"
              class="regions-list-item"
            >
              <h4 class="regions-list-item-name">{{ region.location_name }}</h4>
              <p class="regions-list-item-count">{{ region.memberships_count }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
  import AnalyticsBlock from '@/components/uiManager/analytic/AnalyticsBlock.vue'

  import { ref, onMounted, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n'

  import * as am5 from "@amcharts/amcharts5";
  import * as am5map from "@amcharts/amcharts5/map";
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

  import am5geodata_kazakhstanMap from "@/assets/map/kazakhstanMap-withCities.json";
  import deputiesMapRU from "@/assets/map/deputiesMap-ru.json";
  import deputiesMapKZ from "@/assets/map/deputiesMap-kz.json";

  import { IAnalyticsRegionalMemberships } from '@/types/analytics';
  import { getRegionalMembershipsList } from '@/actions/uiManager/analytics';

  const { t } = useI18n();

  const regionData = ref<IAnalyticsRegionalMemberships[]>();
  const deputiesMapList = (t('localy') === 'ru' ? deputiesMapRU : deputiesMapKZ).deputiesList;
  
  const controlBtns = reactive([
    {
      name: 'pin',
      icon: 'map-control-pin',
      active: true
    },
    {
      name: 'list',
      icon: 'map-control-list',
      active: false
    }
  ])

  const toggleShow = (idx: number) => {
    for (let i = 0; i < controlBtns.length; i++) {
      controlBtns[i].active = false;
    }
    controlBtns[idx].active = true;
  }

  const onGenerateMap = async () => {
    const map: any = document.querySelector('.regions-map');
    let root = am5.Root.new(map);

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
        maxZoomLevel: 1,
      })
    );
  
    // -------- Create polygon series --------
    const getCount = polygonId => {
      const polygon = deputiesMapList.find(region => region.code === polygonId)

      const region = regionData.value.find((region) => polygon.locationID === region.location_id)
      return String(region.memberships_count)
    }
  
  
    const customMap = am5geodata_kazakhstanMap.features.map(polygon => {
      let customPolygon: any = polygon
      customPolygon.properties.count = getCount(polygon.id)
      return customPolygon
    })
  
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: { type: am5geodata_kazakhstanMap.type as any, features: customMap },
        include: deputiesMapList.map(obl => {
          return obl.code
        }),
        fill: am5.color(0xF2F4F6),
        stroke: am5.color(0xffffff),
      })
    );
  
  
    // -------- Map ToolTip Settings --------
    const generateToolTip = () => {
      return (
        `<div style="min-height:30px;width:240px;background-color:white;padding:12px;display:flex;grid-gap:12px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
          <div style="height:12px;width:12px;background-color:#4A78EC;border-radius:100%;margin-top:4px;"></div>
          <div>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
            <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
              <span style="color:#9A9EA6">${t('analytics.party-members')}: </span>
              {count}
            </p>
          </div>
        </div>`
      )
    }
  
    const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
      if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV') return name.split(' ').map(word => word.substring(0, 1)).join('').toUpperCase()
      return name
    }
    
  
    polygonSeries.mapPolygons.template.setAll({
      interactive: true,
      tooltipHTML: generateToolTip(),
      templateField: "polygonSettings",
      showTooltipOn: 'hover'
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
      fill: am5.color('#B9CDFF'),
      fillOpacity: .8,
      stroke: am5.color('#fff'),
      strokeWidth: 4,
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
  
    pointSeries.bullets.push(function(root, series, dataItem: any) {
      return am5.Bullet.new(root,
        !dataItem.dataContext?.name
          ? {
              sprite: am5.Circle.new(root, {
                radius: 5,
                fill: am5.color(0x16355B)
              })
            }
          : {
            sprite: am5.Label.new(root, {
              centerX: am5.p50,
              centerY: dataItem.dataContext?.cityId === 'KZ-TUR' ? am5.percent(100) : am5.p50,
              text: "{name}",
              fontSize: 11,
              fontFamily: 'Tilda Sans',
              fill: am5.color(0x16355B),
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
          polygonSettings: {}
        };
        polygon.id = obl.code;
        polygon.name = nameToLowerCase({id: obl.code, name: obl.title})
        polygon.address = obl.address;
        
        if (
          obl.code === 'KZ-ABY'
          || obl.code === 'KZ-ZHT'
          || obl.code === 'KZ-ULT'
          || obl.code === 'KZ-SEV'
          || obl.code === 'KZ-AKM'
          || obl.code === 'KZ-KAR'
          || obl.code === 'KZ-TUR'
          || obl.code === 'KZ-AKT'
          || obl.code === 'KZ-ATY'
        ) polygon.polygonSettings = { fill: am5.color(0xECEEF2) }
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
        geoJSON: routes as any
      })
    );
      
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0x16355B),
      strokeDasharray: [6, 3, 6],
      strokeWidth: 1.2,
      strokeOpacity: 1
    });
  
  
    return { root };
  }

  onMounted(async () => {
    const response = await getRegionalMembershipsList();
    if (response) {
      regionData.value = response.data;
      onGenerateMap();
    }
  });
  watch(
    () => controlBtns[0].active,
    () => setTimeout(() => controlBtns[0].active ? onGenerateMap() : null, 100),
  )
</script>

<style scoped lang="scss">
.regions {
  position: relative;
  
  &-controlBtns {
    display: flex;
    grid-gap: 14px;

    &-btn {
      height: 40px;
      width: 40px;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0px !important;
      border-radius: 3px;

      & svg {
        height: 22px;
        width: 22px;

        transition: all .3s ease-in-out;
      }

      &.pin {
        & svg {
          stroke: var(--white-color) !important;
        }
      }

      &.list {
        & svg {
          fill: var(--white-color) !important;
        }
      }
    }
  }

  &-map {
    width: 100%;
    height: 400px;
  }

  &-list {
    height: 400px;
    overflow-y: scroll;

    &-item {
      display: grid;
      align-items: center;
      grid-template-columns: 70% 1fr;

      padding: 16px 8px;
      border-bottom: 1px solid var(--light-gray-color-op10);

      &-name {
        font-size: 18px;
        font-weight: 600;
      }

      &-count {
        font-size: 16px;
        font-weight: 500;
        color: var(--light-gray-color);
      }
    }

    &-item:last-child {
      border-bottom: none;
    }
  }
}

// Animations
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  width: 100%;
  position: absolute;
}
</style>