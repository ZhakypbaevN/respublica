<template>
<div class="wrapper-main">
  <div>
  <Header />
  <section class="faq-block landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title center">Карта регионов</h2>

      <div class="map" ref="chartdiv"></div>
    </div>
  </section>
  </div>

  <Footer /> 
</div>
</template>

<script setup lang="ts">
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import am5geodata_kazakhstanMap from "../../assets/map/kazakhstanMap.json";
import deputiesMap from "../../assets/map/deputiesMap.json";

import { useRouter } from 'vue-router';
import { onMounted } from "vue";

const router = useRouter()

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
    { cityId: "KZ-TUR", name: "ТУРКЕСТАНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-KZY", name: "КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-KUS", name: "КОСТАНАЙСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ABY", name: "АБАЙСКАЯ ОБЛАСТЬ" },
    { cityId: "KZ-ULT", name: "УЛЫТАУСКАЯ ОБЛАСТЬ" },
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
      fill: am5.color(0xBDD5E9),
      stroke: am5.color(0xffffff),
      strokeWidth: 5
    })
  );


  // -------- Map ToolTip Settings --------
  const generateToolTip = () => {
    return (
      `<div style="min-height:50px;width:255px;background-color:white;padding:12px;display:flex;grid-gap:12px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
        <div style="height:12px;width:12px;background-color:#4A78EC;border-radius:50%;margin-top:4px;"></div>
        <div>
          <p style="font-family:'SF Pro Display';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
          <p style="font-family:'SF Pro Display';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
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


  polygonSeries.mapPolygons.template.events.on("click", function(e) {
    router.push(`/deputies-of-maslikhat/${e.target.dataItem!.dataContext!.id}`)
  });

  let tooltip = am5.Tooltip.new(root, {
    getFillFromSprite: false
  });
  
  tooltip.get("background")!.setAll({
    fillOpacity: 0,
    strokeOpacity: 0
  });
  
  polygonSeries.set("tooltip", tooltip);
  
  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color('#4A78EC'),
    fillOpacity: .8,
    stroke: am5.color('#4A78EC'),
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
    let nameArray = city.name.split(' ')
    return {
      cityId: city.cityId,
      name: `${nameArray[0]}\n${nameArray.slice(1, 5)}`
    }
  }));

  pointSeries.bullets.push(function() {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        centerX: am5.p50,
        centerY: am5.p50,
        text: "{name}",
        fontSize: 12,
        fontStyle: 'italic',
        populateText: true
      })
    });
  });

  polygonSeries.data.setAll(
    cities.map(city => {
      const polygon = {
        id: '',
        name: '',
        polygonSettings: {}
      };
      polygon.id = city.cityId
      polygon.name = nameToLowerCase({id: city.cityId, name: city.name})
      
      if (city.cityId === 'KZ-ABY' || city.cityId === 'KZ-ZHT' || city.cityId === 'KZ-ULT') polygon.polygonSettings = { fill: am5.color('#A8C9E5') }
      return polygon
    })
  );


  return { root };
})
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}

.map {
  width: 100%;
  height: 900px;
}
</style>