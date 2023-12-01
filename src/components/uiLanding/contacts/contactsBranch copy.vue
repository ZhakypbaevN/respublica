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
        Адрес:
        <span>{{ branchData.address }}</span>
      </p>

      <p class="branch-content-info">
        Email:
        <a :href="`mailto:${branchData.email}`">{{ branchData.email }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as am5 from "@amcharts/amcharts5";
  import * as am5map from "@amcharts/amcharts5/map";
  import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
  
  import am5geodata_kazakhstanMap from "@/assets/map/kazakhstanMap.json";
  import deputiesMap from "@/assets/map/deputiesMap.json";
  
  import { onMounted, reactive } from 'vue';
  
  const regions = reactive(deputiesMap.deputiesList.map((x) => x))

  const cities = [
    {
      cityId: "KZ-ZHT",
      name: "ЖЕТЫСУСКАЯ ОБЛАСТЬ",
      email: "N.Kambayeva@respublica-partiyasy.kz",
      address: "г. Талдыкорган, ул. Абылай хана, 186"
    },
    {
      cityId: "KZ-ALM",
      name: "АЛМАТИНСКАЯ ОБЛАСТЬ",
      email: "B.Kabasov@respublica-partiyasy.kz",
      address: "г. Конаев, мкр-н 1, уч. 35/10"
    },
    {
      cityId: "KZ-KAR",
      name: "КАРАГАНДИНСКАЯ ОБЛАСТЬ",
      email: "a.amandykov@respublica-partiyasy.kz",
      address: "г. Караганда, р-н им. Казыбек Би, пр. Н.Назарбаева, 46"
    },
    {
      cityId: "KZ-PAV",
      name: "ПАВЛОДАРСКАЯ ОБЛАСТЬ",
      email: "Zh.Arganbai@respublica-partiyasy.kz",
      address: "г. Павлодар, ул. Луговая 16, 9 этаж, каб. 908"
    },
    {
      cityId: "KZ-ZHA",
      name: "ЖАМБЫЛСКАЯ ОБЛАСТЬ",
      email: "n.iuldasheva@respublica-partiyasy.kz",
      address: "г.Тараз, ул. Каныша Сатбаева, 19-а, 1 этаж"
    },
    {
      cityId: "KZ-AKM",
      name: "АКМОЛИНСКАЯ ОБЛАСТЬ",
      email: "M.Baktibayev@respublica-partiyasy.kz",
      address: "г.Кокшетау, Е.Н.АУЕЛЬБЕКОВА, 117"
    },
    {
      cityId: "KZ-ATY",
      name: "АТЫРАУСКАЯ ОБЛАСТЬ",
      email: "G.Utebayev@respublica-partiyasy.kz",
      address: "г. Атырау, пр. Султан Бейбарыс, 450"
    },
    {
      cityId: "KZ-AKT",
      name: "АКТЮБИНСКАЯ ОБЛАСТЬ",
      email: "G.Kaiyrbayeva@respublica-partiyasy.kz",
      address: "г. Актобе, ул. Тилеу Батыр 10, БЦ AQTAS, 5 этаж"
    },
    {
      cityId: "KZ-MAN",
      name: "МАНГИСТАУСКАЯ ОБЛАСТЬ",
      email: "S.Beisembayeva@respublica-partiyasy.kz",
      address: "г. Актау, 16 мкрн, д. 25, БЦ Prime"
    },
    {
      cityId: "KZ-TUR",
      name: "ТУРКЕСТАНСКАЯ ОБЛАСТЬ",
      email: "B.Rysbekov@respublica-partiyasy.kz",
      address: "г. Туркестан, ул. Б.Батырбекова, дом 33, кв. 13"
    },
    {
      cityId: "KZ-KZY",
      name: "КЫЗЫЛОРДИНСКАЯ ОБЛАСТЬ",
      email: "N.Talgatova@respublica-partiyasy.kz",
      address: "г. Кызылорда, ул. Конаева, 19-а, 1 этаж"
    },
    {
      cityId: "KZ-KUS",
      name: "КОСТАНАЙСКАЯ ОБЛАСТЬ",
      email: "M.Madinina@respublica-partiyasy.kz",
      address: "г. Костанай, пр. Аль-Фараби, 114, БЦ TURAN"
    },
    {
      cityId: "KZ-ABY",
      name: "АБАЙСКАЯ ОБЛАСТЬ",
      email: "A.Oraz@respublica-partiyasy.kz",
      address: "г. Семей, ул. К.Бозтаева, д. 17-е, кв. 199"
    },
    {
      cityId: "KZ-ULT",
      name: "УЛЫТАУСКАЯ ОБЛАСТЬ",
      email: "Zh.Iztuleuov@respublica-partiyasy.kz",
      address: "г. Жезказган, ул. Мира 1"
    },
    {
      cityId: "KZ-ZAP",
      name: "ЗКО",
      email: "d.makatov@respublica-partiyasy.kz",
      address: "г. Уральск, с. Желаево, ул.Трудовая, 6/3"
    },
    {
      cityId: "KZ-VOS",
      name: "ВКО",
      email: "Zh.Hogzhilbek@respublica-partiyasy.kz",
      address: "г. Усть-Каменогорск, ул. Чехова, 69, кв.1"
    },
    {
      cityId: "KZ-SEV",
      name: "СКО",
      email: "a.beliyalov@respublica-partiyasy.kz",
      address: "г. Петропавловск, ул. Алтынсарина, 168-б"
    }
  ]

  // Almaty: S.Raiymbek@respublica-partiyasy.kz, г.Алматы, ул. Жарокова, 41, 1 этаж
  // Astana: info@respublica-partiyasy.kz, Мангилик ел, 33/1, Бизнес-центр IPLAZA, 9 этаж
  // Shymkent: T.Yeszhan@respublica-partiyasy.kz, г.Шымкент, Аль-Фарабийский р-н, ул. Жандосова, зд. 21-а

  
  const branchData = reactive({
    title: cities[2].name,
    address: cities[2].address,
    deputies: null,
    email: cities[2].email
  })
  
  onMounted(() => {
    const map = document.querySelector('.branch-map');
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
        `<div style="min-height:40px;width:200px;background-color:white;padding:8px;display:flex;grid-gap:8px;border: 1px solid #E9EBED;border-radius:10px;pointer-events:none;">
          <div style="height:8px;width:8px;background-color:#FCC952;border-radius:100%;margin-top:4px;"></div>
          <p style="font-family:'Tilda Sans';font-weight:400;font-size:14px;line-height:19px;letter-spacing:0.15px;color:#051A2D;">{name}</p>
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
      regions.forEach(region => {
        if (region.code === ev.target.dataItem!.dataContext!.id) {
          cities.forEach(city => {
            if (city.cityId === ev.target.dataItem!.dataContext!.id) {
              branchData.title = region.title;
              branchData.address = Object.assign({}, city).address;
              branchData.email = Object.assign({}, city).email;
            }
          })
          region.active = true;
        } else region.active = false;
      })

      polygonSeries.data.setAll(cities.map(city => {
        const polygon = {}
        polygon.id = city.cityId
        polygon.name = nameToLowerCase({ id: city.cityId, name: city.name })
        if (city.cityId === 'KZ-ABY' || city.cityId === 'KZ-ZHT' || city.cityId === 'KZ-ULT') polygon.polygonSettings = { fill: am5.color('#235BE8') }
        if (city.cityId === ev.target.dataItem.dataContext.id) {
          polygon.polygonSettings = {
            fill: am5.color('#FCC952'),
            stroke: am5.color('#FCC952'),
            strokeWidth: 7,
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
      strokeWidth: 1,
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
        name: '',
        address: city.address
      }
    }));
  
    pointSeries.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xFFFFFF)
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
        
        if (city.cityId === 'KZ-ABY' || city.cityId === 'KZ-ZHT' || city.cityId === 'KZ-ULT') polygon.polygonSettings = { fill: am5.color('#235BE8') }
        if (city.cityId === cities[2].cityId) {
          polygon.polygonSettings = {
            fill: am5.color('#FCC952'),
            stroke: am5.color('#FCC952'),
            strokeWidth: 7,
            strokeOpacity: 0.4
          }
        }
        return polygon
      })
    );

  
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

  // Adaptation
  /* @media (max-width: 1900px) {
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
      width: 875px;
      height: 500px;
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
    grid-gap: 40px;
    
    &-map {
      width: 875px;
      height: 500px;
    }

    &-content {
      max-width: 400px;
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

  @media (max-width: 1200px) {
  }

  @media (max-width: 992px) {
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  } */
}
</style>