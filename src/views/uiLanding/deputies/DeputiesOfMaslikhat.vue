<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Представленность членов партии в маслихатах и на должностях акимов всех уровней.</h2>

          <div
            v-for="region of regions"
            :key="region.title"
          >
            <button
              class="landing-link with-line"
              @click="() => region.active = !region.active"
            >
              <span>{{ region.title }}</span>
            </button>

            <Transition>
              <div
                v-if="region.active && region.deputies.length"
                v-collapse
              >
                <div class="landing-items">
                  <div
                    class="deputy-item"
                    v-for="deputy of region.deputies"
                  >
                      <div class="deputy-item-preview withZoomPreview-preview">
                        <div class="deputy-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${deputy.img});`"></div>
                      </div>
                      
                      <h4 class="deputy-item-name">
                        <span>{{ deputy.name }}</span>
                      </h4>
                      <div class="deputy-item-description">
                        {{ deputy.role }}
                      </div>
                  </div>
                </div>
              </div>

              <div v-else-if="region.active" v-collapse>
                <p class="deputy-empty">Нет депутатов</p>
              </div>
            </Transition>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import { reactive } from 'vue';

const regions = reactive([
  {
    title: 'область АБАЙ',
    active: false,
    deputies: [
      {
        name: 'Ахметканов Арман Шамаевич',
        role: 'Депутат маслихата области Абай'
      },
      {
        name: 'Абдуллин Асқар Талгатович',
        role: 'Депутат маслихата города Семей'
      },
      {
        name: 'Жуматов Кайыржан Серикович',
        role: 'Депутат Аксуатского районного маслихата'
      }
    ]
  },
  {
    title: 'АКМОЛИНСКАЯ област',
    active: false,
    deputies: [
      {
        name: 'Жакупов Жанат Еркенович',
        role: 'Депутат Кокшетауского городского маслихата',
        img: '/img/uiLanding/maslikhat/akmol/Zhakupov.jpg'
      },
    ]
  },
  {
    title: 'АКТЮБИНСКАЯ область',
    active: false,
    deputies: []
  },
  {
    title: 'АЛМАТИНСКАЯ область ',
    active: false,
    deputies: [
      {
        name: 'Акберген Кияс Жапарбекович',
        role: 'Депутат Алматинского областного маслихата'
      },
      {
        name: 'Тусибиянова Гульжан Нурбековна',
        role: 'Депутат Алматинского областного маслихата'
      }
    ]
  },
  {
    title: 'АТЫРАУСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Серік Касенов',
        role: 'Депутат Атырауского областного маслихата'
      },
    ]
  },
  {
    title: 'ЗАПАДНО-КАЗАХСТАНСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Аминов Асланбек Талапкалиевич',
        role: 'Депутат Западно-Казахстанского областного маслихата',
        img: '/img/uiLanding/maslikhat/zko/Aminov.jpg'
      },
      {
        name: 'Габдуалиев Мереке Тлекович',
        role: 'Депутат Уральского городского маслихата',
        img: '/img/uiLanding/maslikhat/zko/Gabdualiev.jpg'
      },
      {
        name: 'Бисенов Армат Гимранович',
        role: 'Депутат маслихата района Байтерек',
        img: '/img/uiLanding/maslikhat/zko/Bisenov.jpg'
      }
    ]
  },
  {
    title: 'ЖАМБЫЛСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Темірхан Нұрсултан Талгатұлы',
        role: 'Депутат Жамбылского областного маслихата',
        img: '/img/uiLanding/maslikhat/jambyl/Temirkhan.jpg'
      },
      {
        name: 'Серик Данияр',
        role: 'Депутат Жамбылского областного маслихата'
      }
    ]
  },
  {
    title: 'область ЖЕТІСУ',
    active: false,
    deputies: [
      {
        name: 'Мустапова Гульназия Садыбековна',
        role: 'Депутат маслихата области Жетісу',
        img: '/img/uiLanding/maslikhat/zhetisu/Mustapova.jpg'
      },
      {
        name: 'Қылышбеков Темірлан Бақытбекұлы',
        role: 'Депутат маслихата области Жетісу',
        img: '/img/uiLanding/maslikhat/zhetisu/Kylyshbekov.jpg'
      },
      {
        name: 'Садиев Алмат Тезекбаевич',
        role: 'Депутат маслихата области Жетісу',
        img: '/img/uiLanding/maslikhat/zhetisu/Sadiev.jpg'
      },
      {
        name: 'Машеков Батыр Оралбаевич',
        role: 'Депутат Талдыкорганского городского маслихата',
        img: '/img/uiLanding/maslikhat/zhetisu/Mashekov.jpg'
      },
      {
        name: 'Есмаханов Азиз Аблаевич',
        role: 'Депутат Талдыкорганского городского маслихата',
        img: '/img/uiLanding/maslikhat/zhetisu/Zhumageldieva.jpg'
      },
      {
        name: 'Габдракипова Алсу Фаритовна',
        role: 'Депутат Талдыкорганского городского маслихата',
        img: '/img/uiLanding/maslikhat/zhetisu/Gabdrakipova.jpg'
      },
      {
        name: 'Махкамова Нуржамал Асанбайкызы',
        role: 'Депутат Алакольского районного маслихата',
        img: '/img/uiLanding/maslikhat/zhetisu/Mahkamova.jpg'
      },
      {
        name: 'Жуанышев Талгат Жумашевич',
        role: 'Депутат Аксуского районного маслихата',
        img: '/img/uiLanding/maslikhat/zhetisu/Zhumageldieva.jpg'
      }
    ]
  },
  {
    title: 'КАРАГАНДИНСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Алимжанов Арман Жаканович',
        role: 'Депутат Карагандинского областного маслихата',
        img: '/img/uiLanding/maslikhat/karaganda/Alimzhanov.jpg'
      },
      {
        name: 'Ахмадин Дидар Айдарович',
        role: 'Депутат Карагандинского городского маслихата',
        img: '/img/uiLanding/maslikhat/karaganda/Ahmadin.jpg'
      }
    ]
  },
  {
    title: 'КОСТАНАЙСКАЯ область ',
    active: false,
    deputies: [
      {
        name: 'Маишев Кайрат Алембаевич',
        role: 'Депутат Костанайского областного маслихата',
        img: '/img/uiLanding/maslikhat/kostanay/Maishev.jpg'
      },
      {
        name: 'Юсупова  Асия Жумаковна',
        role: 'Депутат Костанайского городского маслихата',
        img: '/img/uiLanding/maslikhat/kostanay/Yusupova.jpg'
      },
      {
        name: 'Латыпов Кауныш Женисович',
        role: 'Депутат Аркалыкского городского маслихата'
      },
      {
        name: 'Молдамуратова Динара Амангельдыевна',
        role: 'Депутат Лисаковского городского маслихата'
      },
      {
        name: 'Шишов Игорь Игоревич',
        role: 'Депутат Рудненского городского маслихата'
      },
      {
        name: 'Фицнер Дмитрий Сергеевич',
        role: 'Депутат Атынсаринского районного маслихата'
      },
      {
        name: 'Ахметжанов Асылбек Косылбекович',
        role: 'Депутат Жангельдинского районного маслихата'
      },
      {
        name: 'Жамансарин Айдар Актаевич',
        role: 'Депутат Амангельдинского районного маслихата'
      },
      {
        name: 'Мустафин Ермек Абдугалиевич',
        role: 'Депутат Аулиекольского районного маслихата'
      },
      {
        name: 'Жумабаева Акерке Тулендиевна',
        role: 'Депутат Денисовского районного маслихата'
      },
      {
        name: 'Агдавлетов Ауез Абильдинович',
        role: 'Депутат Костанайского районного маслихата',
        img: '/img/uiLanding/maslikhat/kostanay/Agdavletov.jpg'
      },
      {
        name: 'Нурмагамбетов Дидар Батырбаевич',
        role: 'Депутат Мендикаринского районного маслихата'
      },
      {
        name: 'Тасанов Данияр Маратович',
        role: 'Депутат Наурзумского районного маслихата'
      },
      {
        name: 'Колесникова Наталья Аатольевна',
        role: 'Депутат Сарыкольского районного маслихата'
      },
      {
        name: 'Руднева Наталья Дмитриевна',
        role: 'Депутат маслихата района Беимбета Майлина',
        img: '/img/uiLanding/maslikhat/kostanay/Rudneva.jpg'
      },
      {
        name: 'Омаров Жанбулат Сартаевич',
        role: 'Депутат Узункольского районного маслихата'
      },
      {
        name: 'Байназаров Алексей Мерекеевич',
        role: 'Депутат Федоровского районного маслихата'
      },
      {
        name: 'Ищанова Венера Ибрагимовна',
        role: 'Депутат Житикаринского районного маслихата'
      },
      {
        name: 'Усов Михаил Александрович',
        role: 'Депутат Карабалыкского районного маслихата'
      }
    ]
  },
  {
    title: 'КЫЗЫЛОРДИНСКАЯ область',
    active: false,
    deputies: []
  },
  {
    title: 'МАНГИСТАУСКАЯ область',
    active: false,
    deputies: []
  },
  {
    title: 'ПАВЛОДАРСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Маханбет Амангелді',
        role: 'Депутат Павлодарского областного маслихата'
      },
      {
        name: 'Мантыков Сабиден Сагитханович',
        role: 'Депутат Павлодарского областного маслихата'
      }
    ]
  },
  {
    title: 'СЕВЕРО-КАЗАХСТАНСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Домаев Сергей Александрович',
        role: 'Депутат Северо-Казахстанского областного маслихата',
        img: '/img/uiLanding/maslikhat/sko/Domaev.jpg'
      },
      {
        name: 'Дмитрий Крель',
        role: 'Депутат Аккаинского районного маслихата',
        img: '/img/uiLanding/maslikhat/sko/Krel.jpg'
      }
    ]
  },
  {
    title: 'ТУРКЕСТАНСКАЯ область ',
    active: false,
    deputies: [
      {
        name: 'Айткулов Бекжан Бахтыбекович',
        role: 'Депутат Туркестанского областного маслихата'
      },
      {
        name: 'Куракбаев  Жаксыбай Булатович',
        role: 'Депутат Мактаральского районного маслихата',
        img: '/img/uiLanding/maslikhat/turkestan/Kurakbaev.jpg'
      },
      {
        name: 'Жумагельдиева Гульдариха',
        role: 'Депутат Кентауского городского маслихата',
        img: '/img/uiLanding/maslikhat/turkestan/Zhumageldieva.jpg'
      },
      {
        name: 'Абдуллаев Нурсултан Пархадович',
        role: 'Депутат Сауранского районного маслихата',
        img: '/img/uiLanding/maslikhat/turkestan/Abdullaev.jpg'
      }
    ]
  },
  {
    title: 'область ҰЛЫТАУ',
    active: false,
    deputies: []
  },
  {
    title: 'ВОСТОЧНО-КАЗАХСТАНСКАЯ область',
    active: false,
    deputies: [
      {
        name: 'Бейсов Тилек Муратович',
        role: 'Депутат Усть-Каменогорского городского маслихата',
        img: '/img/uiLanding/maslikhat/vko/Beysov.jpg'
      },
    ]
  },
  {
    title: 'г. АСТАНА',
    active: false,
    deputies: []
  },
  {
    title: 'г. АЛМАТЫ',
    active: false,
    deputies: [
      {
        name: 'Жайнарбай Жалынбек',
        role: 'Депутат Алматинского городского маслихата'
      },
      {
        name: 'Идрисов Руслан Рашитович',
        role: 'Депутат Алматинского городского маслихата'
      },
      {
        name: 'Серикова Салтанат Бахтияровна',
        role: 'Депутат Алматинского городского маслихата'
      },
      {
        name: 'Турсунов Аким Хазреталиевич',
        role: 'Депутат Алматинского городского маслихата',
        img: '/img/uiLanding/maslikhat/almaty/Tursunov.jpg'
      },
      {
        name: 'Бегалин Кайрат Талапович',
        role: 'Депутат Алматинского городского маслихата'
      }
    ]
  },
  {
    title: 'г. ШЫМКЕНТ',
    active: false,
    deputies: [
      {
        name: 'Нурлыбаев Асхат Мелдебекович',
        role: 'Депутат Шымкентского городского маслихата'
      },
    ]
  }
])
</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}

.landing-items {
  display: flex;
  flex-wrap: wrap;

  padding-bottom: 40px;
}

.deputy {
  &-item {
    max-width: 320px;
    &-preview-img {
      padding: 48%;
    }

    &-name {
      display: flex;
      align-items: center;
      height: 64px;
      
      padding: 6px 20px 6px;
      background-color: var(--accent-color);

      & span {
        color: white;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.4;
      }
    }

    &-description {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
      line-height: 1.2;

      padding: 10px;
    }
  }

  &-empty {
    margin-bottom: 40px;
  }
}
</style>
  