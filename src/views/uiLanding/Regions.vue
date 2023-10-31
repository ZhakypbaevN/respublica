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
    { cityId: "KZ-ZHT", name: "ЖЕТЫСУСКАЯ ОБЛАСТЬ", address: "Талдыкорган, ул. Абылай хана, 186" },
    { cityId: "KZ-ALM", name: "АЛМАТИНСКАЯ ОБЛАСТЬ", address: "г. Конаев, мкр-н 1, уч. 35/10" },
    { cityId: "KZ-KAR", name: "КАРАГАНДИНСКАЯ ОБЛАСТЬ", address: "г. Караганда, р-н им. Казыбек Би, пр. Н.Назарбаева, 46" },
    { cityId: "KZ-PAV", name: "ПАВЛОДАРСКАЯ ОБЛАСТЬ", address: "г. Павлодар, ул. Луговая 16, 9 этаж, каб. 908" },
    { cityId: "KZ-ZHA", name: "ЖАМБЫЛСКАЯ ОБЛАСТЬ", address: "г.Тараз, ул. Каныша Сатбаева, 19-а, 1 этаж" },
    { cityId: "KZ-AKM", name: "АКМОЛИНСКАЯ ОБЛАСТЬ", address: "" },
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
      `<div style="min-height:70px;width:400px;background-color:white;padding:12px;display:flex;grid-gap:12px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
        <div style="height:12px;width:12px;background-color:#4A78EC;border-radius:100%;margin-top:4px;"></div>
        <div>
          <p style="font-family:'SF Pro Display';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:10px;">{name}</p>
          <p style="font-family:'SF Pro Display';font-weight:400;font-size:16px;line-height:19px;letter-spacing:0.15px;color:#051A2D;margin-bottom:2px;">
            <span style="color:#9A9EA6">Адрес: </span>
            {address}
          </p>
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
        address: '',
        polygonSettings: {}
      };
      polygon.id = city.cityId
      polygon.name = nameToLowerCase({id: city.cityId, name: city.name})
      polygon.address = city.address
      
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