<template>
  <AnalyticsBlock
    title="Активность по регионам"
    v-model="period"
  >
    <!-- withPeriod -->
    <div class="map" ref="chartdiv"></div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from '@/components/uiManager/analytics/AnalyticsBlock.vue'

import { ref, onMounted, reactive } from 'vue';

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import am5geodata_kazakhstanMap from "@/assets/map/kazakhstanMap.json";
import deputiesMap from "@/assets/map/deputiesMap.json";

import { IAnalyticsRegionalMemberships } from '@/types/analytics';
import { getRegionalMembershipsList } from '@/actions/uiManager/analytics';

const mapData = ref<IAnalyticsRegionalMemberships[]>();

const period = ref()
const regions = reactive(deputiesMap.deputiesList.map((x) => x))

onMounted(async () => {
  const response = await getRegionalMembershipsList();
  
  if (response) {
    mapData.value = response.data;
    
    const map = document.querySelector('.map');
    let root = am5.Root.new(map);
  
    const cities = [
      { cityId: "KZ-ZHT", locationID: 205, name: "ЖЕТЫСУСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-ALM", locationID: 39, name: "АЛМАТИНСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-KAR", locationID: 86, name: "КАРАГАНДИНСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-PAV", locationID: 138, name: "ПАВЛОДАРСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-ZHA", locationID: 74, name: "ЖАМБЫЛСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-AKM", locationID: 4, name: "АКМОЛИНСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-ATY", locationID: 51, name: "АТЫРАУСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-AKT", locationID: 25, name: "АКТЮБИНСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-MAN", locationID: 130, name: "МАНГИСТАУСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-KZY", locationID: 121, name: "КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-KUS", locationID: 100, name: "КОСТАНАЙСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-ABY", locationID: 194, name: "АБАЙСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-ULT", locationID: 215, name: "УЛЫТАУСКАЯ ОБЛАСТЬ" },
      { cityId: "KZ-TUR", locationID: 177, name: "ЮКО" },
      { cityId: "KZ-ZAP", locationID: 59, name: "ЗКО" },
      { cityId: "KZ-VOS", locationID: 167, name: "ВКО" },
      { cityId: "KZ-SEV", locationID: 152, name: "СКО" }
    ]

    const cityDotsList = [
      { name: 'г. Алматы', locationID: 2, location: [43.2380, 76.8829] },
      { name: 'г. Астана', locationID: 1, location: [51.1655, 71.4272] },
      { name: 'г. Шымкент', locationID: 3, location: [42.3205, 69.5876] }
    ];

    // DOTS GeoJSON data
    var cityDotsData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "г. Алматы"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [76.8829, 43.2380]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "г. Астана"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [71.4272, 51.1655]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "г. Шымкент"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [69.5876, 42.3205]
          }
        }
      ]
    };
  
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
      const polygon = cities.find(region => region.cityId === polygonId)

      let sum = 0;
      const region = mapData.value.find((region) => polygon.locationID === region.location_id)
      return String(region.memberships_count)
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
        fill: am5.color(0xF2F4F6),
        stroke: am5.color(0xffffff),
        strokeWidth: 10
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
              <span style="color:#9A9EA6">Партийцев: </span>
              {count}
            </p>
          </div>
        </div>`
      )
    }
  
    const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
      if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV' || id === 'KZ-TUR') return name
      return name[0].toUpperCase() + name.slice(1).toLowerCase()
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

    // pointSeries.bullets.push(function() {
    //   return am5.Bullet.new(root, {
    //     sprite: am5.Circle.new(root, {
    //       radius: 5,
    //       fill: am5.color(0xffba00)
    //     })
    //   });
    // });
  
    let pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        polygonIdField: "cityId",
        // geoJSON: cityDotsData
      })
    );
    
    pointSeries.data.setAll(cities.map(city => { 
      const name = nameToLowerCase({id: city.cityId, name: city.name});
      let nameArray = name.split(' ')
  
      return {
        cityId: city.cityId,
        name: `${nameArray[0]}\n${nameArray.slice(1, 5)}`,
        count: 231
      }
    }));
  
    pointSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          centerY: am5.p50,
          text: "{name}",
          fontSize: 9,
          fontStyle: 'Tilda Sans',
          fill: am5.color(0x16355B),
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
        
        if (
          city.cityId === 'KZ-ABY'
          || city.cityId === 'KZ-ZHT'
          || city.cityId === 'KZ-ULT'
          || city.cityId === 'KZ-SEV'
          || city.cityId === 'KZ-AKM'
          || city.cityId === 'KZ-KAR'
          || city.cityId === 'KZ-TUR'
          || city.cityId === 'KZ-AKT'
          || city.cityId === 'KZ-ATY'
        ) polygon.polygonSettings = { fill: am5.color(0xECEEF2) }
        return polygon
      })
    );
  
  
    return { root };
  }
})
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 400px;
}
</style>