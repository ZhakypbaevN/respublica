<template>
  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <h2 class="landing-title">Депутатские запросы</h2>
      <div class="request-wrapper">
        <div class="deputies">
          <button
            v-for="(deputy, idx) of deputieslist"
            :key="deputy.name"
            class="deputies-deputy withZoomPreview"
            :class="{ active: deputy.active }"
            @click="() => toggleShow(idx)"
          >
            <div class="deputies-deputy-photo withZoomPreview-preview">
              <div
                class="deputies-deputy-photo-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${deputy.img});`"
              ></div>
            </div>
            <span>{{ deputy.name }}</span>
          </button>
        </div>

        <table class="deputy-requests-table">
          <thead>
            <th>Дата</th>
            <th>Файл и краткое описание</th>
            <!-- <th>Выступление</th> -->
            <th>Ответ</th>
          </thead>
          <tbody>
            <tr v-for="request of tableContentList" :key="request.title">
              <td class="nowrap">
                <span>
                  {{ request.title }}
                </span>
              </td>
              <td>
                <a class="text-line" :href="request.docAndDescription!" target="_blank">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-red" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>

                  <span>
                    {{ request.name }}
                  </span>
                </a>
              </td>
              <!-- <td>
                <div class="text-line">
                  <div class="text-line-icon">
                    <SvgIcon name="youtube-dark" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>Смотреть</span>
                </div>
              </td> -->
              <td class="nowrap">
                <a
                  v-if="request.answerDoc"
                  class="text-line"
                  :href="request.answerDoc"
                  target="_blank"
                >
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-red" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>
                    {{ request.answerDate }}
                  </span>
                </a>

                <div v-else class="text-line">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-red" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>{{ request.answerDate }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const deputieslist = reactive([
  {
    name: "Ходжаназаров А.",
    img: "/img/uiLanding/fraction/khodzhanazarov.jpg",
    active: true,
    data: [
      {
        title: "14 Апреля 2023 года",
        docAndDescription:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 12.04.23.pdf",
        name: "Касательно мер по ликвидации засухи",
        video: null,
        answerDate: "17 Мая 2023 года",
        answerDoc:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 12.04.23 жауап.pdf",
      },
      {
        title: "16 Июня 2023 года",
        docAndDescription:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 10.05.23.pdf",
        name: "Касательно водных ресурсов",
        video: null,
        answerDate: "3 Августа 2023 года",
        answerDoc:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 10.05.23 жауап.pdf",
      },
      {
        title: "21 Мая 2023 года",
        docAndDescription:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 24.05.23.pdf",
        name: "Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы",
        video: null,
        answerDate: "21 Июня 2023 года",
        answerDoc:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 24.05.23 жауап.pdf",
      },
      {
        title: "12 Мая 2023 года",
        docAndDescription:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 14.06.23.pdf",
        name: "Касательно развития сельских территорий",
        video: null,
        answerDate: "6 Июня 2023 года",
        answerDoc:
          "/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 14.06.23 жауап.pdf",
      },

      // 2nd session
      {
        title: "14 Апреля 2023 года",
        name:
          "Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қалыптасқан жағдай туралы",
        docAndDescription:
          "public/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 13.09.23.pdf",
        video: null,
        answerDate: "15 мая 2023 года",
        answerDoc: null,
      },
    ],
  },

  {
    name: "БЕРДЕНОВ Р.",
    img: "/img/uiLanding/fraction/berdenov.jpg",
    active: false,
    data: [
      {
        title: "13 Апреля 2023 года",
        name:
          "Букмекерские конторы, азартные игры и все ставки предлагаемые через Интернет",
        docAndDescription: "/doc/ru/deputies-requests/berdenov/Берденов 12.04.23.pdf",
        video: null,
        answerDate: "12 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/berdenov/Берденов 12.04.23 жауап.pdf",
      },
      {
        title: "22 Июня 2023 года",
        name: "По вопросам снижения оборота и обязательной постановки на учет по НДС",
        docAndDescription: "/doc/ru/deputies-requests/berdenov/Берденов 21.06.23.pdf",
        video: null,
        answerDate: "14 Июля 2023 года",
        answerDoc: "/doc/ru/deputies-requests/berdenov/Берденов 21.06.23 жауап.pdf",
      },

      // 2nd session
      {
        title: "6 Сентября 2023 года",
        name: "«Қазақстан темір жолы» ҰК» АҚ қызметіне қатысты",
        docAndDescription: "/doc/ru/deputies-requests/berdenov/Берденов 06.09.23.pdf",
        video: null,
        answerDate: "13 Июня 2023 года",
        answerDoc: null,
      },
    ],
  },

  {
    name: "КУСПЕКОВ О.",
    img: "/img/uiLanding/fraction/kuspekov.jpg",
    active: false,
    data: [
      {
        title: "14 Апреля 2023 года",
        name: "Про обновления сельхозтехники отечественных аграриев.",
        docAndDescription: "/doc/ru/deputies-requests/kuspekov/Куспеков 12.04.23.pdf",
        video: null,
        answerDate: "12 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/kuspekov/Куспеков 12.04.23 жауап.pdf",
      },
      {
        title: "21 Апреля 2023 года",
        name: "Жүргізуші куәліктеріне қатысты ",
        docAndDescription: "/doc/ru/deputies-requests/kuspekov/Куспеков 20.04.23.pdf",
        video: null,
        answerDate: "17 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/kuspekov/Куспеков 20.04.23 жауап.pdf",
      },
      {
        title: "5 Апреля 2023 года",
        name: "О развитии человеческого капитала",
        docAndDescription: "/doc/ru/deputies-requests/kuspekov/Куспеков 3.05.23.pdf",
        video: null,
        answerDate: "26 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/kuspekov/Куспеков 3.05.23 жауап.pdf",
      },
      {
        title: "16 Мая 2023 года",
        name: "Колледждердің дамуы бойынша",
        docAndDescription: "/doc/ru/deputies-requests/kuspekov/Куспеков 14.05.23.pdf",
        video: null,
        answerDate: "17 Июля 2023 года",
        answerDoc: "/doc/ru/deputies-requests/kuspekov/Куспеков 16.06.23 жауап.pdf",
      },

      // 2nd session
      {
        title: "4 Октября 2023 года",
        name: "О проблемах лизинга автомобилей",
        docAndDescription: "/doc/ru/deputies-requests/kuspekov/Куспеков 04.10.23.pdf",
        video: null,
        answerDate: "",
        answerDoc: null,
      },
    ],
  },

  {
    name: "НАУМОВА Д.",
    img: "/img/uiLanding/fraction/naumova.jpg",
    active: false,
    data: [
      {
        title: "17 Мая 2023 года",
        name: "О проблеме трудоустройства молодежи",
        docAndDescription: "public/doc/ru/deputies-requests/naumova/Наумова 26.04.23.pdf",
        video: null,
        answerDate: "15 Июня 2023 года",
        answerDoc: null,
      },
      {
        title: "28 Апреля 2023 года",
        name: "Проблема лиц с онкологическими заболеваниями",
        docAndDescription: "public/doc/ru/deputies-requests/naumova/Наумова 15.05.23.pdf",
        video: null,
        answerDate: "24 Мая 2023",
        answerDoc: null,
      },

      // 2nd session
      {
        title: "4 Октября 2023 года",
        name: "О проблеме обеспечения жильем лиц с инвалидностью",
        docAndDescription: "/doc/ru/deputies-requests/naumova/Наумова Д.Р. 04.10.23.pdf",
        video: null,
        answerDate: "",
        answerDoc: null,
      },
    ],
  },

  {
    name: "ТАУ Н.",
    img: "/img/uiLanding/fraction/tau.jpg",
    active: false,
    data: [
      {
        title: "21 Апреля 2023 года",
        name: "Қосымша білім беру бойынша",
        docAndDescription: "/doc/ru/deputies-requests/tau/Тау 20.04.23.pdf",
        video: null,
        answerDate: "17 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/tau/Тау 20.04.23 жауап.pdf",
      },
      {
        title: "5 Мая 2023 года ",
        name:
          "Білім беру ұйымдарының техникалық персоналының жекелеген санаттарына еңбек демалысына сауықтыру жәрдемақыларын төлеу мәселесі бойынша",
        docAndDescription: "/doc/ru/deputies-requests/tau/Тау 3.05.23.pdf",
        video: null,
        answerDate: "31 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/tau/Тау 3.05.23 жауап.pdf",
      },
      {
        title: "11 Мая 2023 года",
        name:
          "Мектеп оқушылары мен жастар арасында “вейп” атымен танымал тұтынудың электрондық жүйелердің жаппай таралуына тыйым салу туралы ",
        docAndDescription: "/doc/ru/deputies-requests/tau/Тау 10.05.23.pdf",
        video: null,
        answerDate: "6 Июня 2023 года",
        answerDoc: "/doc/ru/deputies-requests/tau/Тау 10.05.23 жауап.pdf",
      },
      {
        title: "29 Июня 2023 года",
        name:
          "Білім беру ұйымдарының техникалық персоналының жекелеген санаттарына еңбек демалысына сауықтыру жәрдемақыларын төлеу мәселесі бойынша",
        docAndDescription: "/doc/ru/deputies-requests/tau/Тау 27.06.23.pdf",
        video: null,
        answerDate: "31 Июля 2023 года",
        answerDoc: null,
      },

      // 2nd session
      {
        title: "22 Сентября 2023 года",
        name: "Паллиативтік көмек туралы",
        docAndDescription: "/doc/ru/deputies-requests/tau/Тау Н. 22.09.23.pdf",
        video: null,
        answerDate: "20 Октября 2023 года",
        answerDoc: null,
      },
    ],
  },

  {
    name: "ШУКИЖАНОВА Д.",
    img: "/img/uiLanding/fraction/shukizhanova.jpg",
    active: false,
    data: [
      {
        title: "20 Апреля 2023 года",
        name: "Касательно противодействия и распространения синтетических наркотиков",
        docAndDescription:
          "/doc/ru/deputies-requests/shukizhanova/Шукижанова 20.04.23.pdf",
        video: null,
        answerDate: "19 Мая 2023 года",
        answerDoc: "/doc/ru/deputies-requests/shukizhanova/Шукижанова 20.04.23 жауап.pdf",
      },
      {
        title: "25 Мая 2023 года",
        name:
          "О необходимости разработки национальной Концепции по развитию использования транспортных средств",
        docAndDescription:
          "/doc/ru/deputies-requests/shukizhanova/Шукижанова 24.05.23.pdf",
        video: null,
        answerDate: "27 Июня 2023 года",
        answerDoc: "/doc/ru/deputies-requests/shukizhanova/Шукижанова 24.05.23 жауап.pdf",
      },
    ],
  },
]);

const tableContentList = ref(deputieslist[0].data);

const toggleShow = (idx: number) => {
  for (let i = 0; i < deputieslist.length; i++) {
    deputieslist[i].active = false;
  }
  deputieslist[idx].active = true;
  tableContentList.value = deputieslist[idx].data;
};
</script>

<style scoped lang="scss">
.title {
  color: var(--primary-color);
  font-family: Tilda Sans;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.deputies {
  display: flex;
  grid-gap: 15px;
  margin: 50px 0;

  &-deputy {
    display: grid;
    grid-template-columns: 44px 1fr;
    grid-gap: 10px;
    align-items: center;

    padding: 10px 15px 10px 10px;

    border-radius: 200px;
    border: 2px transparent solid;
    background-color: var(--white-color);

    transition: all 0.3s ease-in-out;

    &:hover {
      border-color: var(--accent-color-op50);
      background-color: var(--accent-color-op10);
    }

    &.active {
      background-color: var(--accent-color);

      & span {
        color: var(--white-color);
      }
    }

    &-photo {
      border-radius: 50%;

      &-img {
        padding-bottom: 100%;
      }
    }

    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;
    }
  }
}

.deputy-requests-table {
  max-width: 1490px;
  border: none;
  border-collapse: collapse;
  & thead {
    & th {
      text-align: left;
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
      line-height: 27px;
      padding: 13px 13px 13px 0;
    }

    th:first-child {
      padding: 13px;
    }
  }

  & tbody {
    border-radius: 10px;
    background-color: var(--white-color);

    tr {
      border-bottom: 0.5px solid rgba(129, 143, 167, 0.5);
      td {
        padding: 20px 20px 20px 0;

        & span {
          color: var(--primary-color);
          font-size: 20px;
          font-weight: 400;
          line-height: 27px;
        }
      }

      td:first-child {
        padding: 20px 20px 20px 20px;
      }
    }
  }
}

.text-line {
  text-decoration-line: underline;
  cursor: pointer;
  display: flex;
  align-items: flex-start;

  &-icon {
    margin-right: 10px;

    & svg {
      width: 32px;
      height: 32px;
    }
  }
}

.nowrap {
  white-space: nowrap;
}
</style>
