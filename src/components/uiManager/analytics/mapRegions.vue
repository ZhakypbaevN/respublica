<template>
  <AnalyticsBlock
    title="Активность по регионам"
    v-model="period"
    showCategoryFilter
    withPeriod
  >
    <div class="map" ref="chartdiv"></div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from './analyticsBlock.vue'

import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import am5geodata_kazakhstanMap from "../../../assets/map/kazakhstanMap.json";
import deputiesMap from "../../../assets/map/deputiesMap.json";

import { ref, onMounted, reactive } from 'vue';

const period = ref()
const regions = reactive(deputiesMap.deputiesList.map((x) => x))

onMounted(() => {
  const map = document.querySelector('.map');
  let root = am5.Root.new(map);

  const cities = [
    { cityId: "KZ-ZHT", name: "ЖЕТЫСУСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ALM", name: "АЛМАТИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-KAR", name: "КАРАГАНДИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-PAV", name: "ПАВЛОДАРСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ZHA", name: "ЖАМБЫЛСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-AKM", name: "АКМОЛИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ATY", name: "АТЫРАУСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-AKT", name: "АКТЮБИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-MAN", name: "МАНГИСТАУСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-KZY", name: "КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-KUS", name: "КОСТАНАЙСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ABY", name: "АБАЙСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ULT", name: "УЛЫТАУСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-TUR", name: "ЮКО" },
    { cityId: "KZ-ZAP", name: "ЗКО" },
    { cityId: "KZ-VOS", name: "ВКО" },
    { cityId: "KZ-SEV", name: "СКО" }
  ]

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
      fill: am5.color(0xF2F4F6),
      stroke: am5.color(0xffffff),
      strokeWidth: 10
    })
  );


  // -------- Map ToolTip Settings --------
  // const generateToolTip = () => {
  //   return (
  //     `<div style="min-height:70px;width:400px;background-color:white;padding:12px;display:flex;grid-gap:12px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
  //       <div style="height:12px;width:12px;background-color:#4A78EC;border-radius:100%;margin-top:4px;"></div>
  //       <div>
  //         <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
  //         <p style="font-family:'Tilda Sans';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
  //           <span style="color:#9A9EA6">ДЕПУТАТОВ: </span>
  //           {count}
  //         </p>
  //       </div>
  //     </div>`
  //   )
  // }

  const nameToLowerCase = ({id, name}: {id: string, name: string}) => {
    if (id === 'KZ-ZAP' || id === 'KZ-VOS' || id === 'KZ-SEV' || id === 'KZ-TUR') return name
    return name[0].toUpperCase() + name.slice(1).toLowerCase()
  }

  polygonSeries.mapPolygons.template.setAll({
    interactive: true,
    templateField: "polygonSettings",
    showTooltipOn: 'hover'
  });


  polygonSeries.mapPolygons.template.events.on("click", function(e) {
   /* router.push(`/deputies-of-maslikhat/${e.target.dataItem!.dataContext!.id}`)*/
    regions.forEach(region => {
    if (region.code === e.target.dataItem!.dataContext!.id) {
      region.active = true;
      //window.location.hash = `${e.target.dataItem!.dataContext!.id}`;
      const targetElement = document.getElementById(e.target.dataItem!.dataContext!.id);
      window.scrollTo({
      top: targetElement.offsetTop - 120,
      behavior: 'auto', 
    });
      // window.history.replaceState(null, document.title, `/deputies-of-maslikhat/${route.params.region_id}#${route.params.region_id}`);
    } else region.active = false;
  })
  });

  // let tooltip = am5.Tooltip.new(root, {
  //   getFillFromSprite: false
  // });
  
  // tooltip.get("background")!.setAll({
  //   fillOpacity: 0,
  //   strokeOpacity: 0
  // });
  
  // polygonSeries.set("tooltip", tooltip);

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
})
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 400px;
}
</style>