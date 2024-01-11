<template>
  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('parliamentary-inquiries') }}</h2>

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
            <th>{{ $t('formdata.date') }}</th>
            <th>{{ $t('formdata.file-and-brief-description') }}</th>
            <th>{{ $t('formdata.answer') }}</th>
          </thead>
          <tbody>
            <tr v-for="request of tableContentList" :key="request.title">
            
              <td>
                <span>
                  {{ request.title }}
                </span>
              </td>

              <td :data-title="$t('formdata.file-and-brief-description')">
                <a class="text-line" :href="request.docAndDescription!" target="_blank">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>

                  <span>
                    {{ request.name }}
                  </span>
                </a>
              </td>

              <td :data-title="$t('formdata.answer')">
                <a
                  v-if="request.answerDoc"
                  class="text-line"
                  :href="request.answerDoc"
                  target="_blank"
                >
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>
                    {{ request.answerDate }}
                  </span>
                </a>

                <div v-else-if="request.answerDate" class="text-line">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
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
    name: "А. Ходжаназаров",
    img: "/img/uiLanding/fraction/khodzhanazarov.jpg",
    active: true,
    data: [
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
        answerDate: "15 Мая 2023 года",
        answerDoc: null,
      },
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
    ],
  },

  {
    name: "Д. ШУКИЖАНОВА",
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

  {
    name: "Р. БЕРДЕНОВ",
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
    name: "Н. ТАУ",
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
    name: "О. КУСПЕКОВ",
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
    name: "Д. НАУМОВА",
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
]);

const tableContentList = ref(deputieslist[0].data);

const toggleShow = (idx: number) => {
  for (let i = 0; i < deputieslist.length; i++) {
    deputieslist[i].active = false;
  }
  deputieslist[idx].active = true;
  tableContentList.value = deputieslist[idx].data.map(item => item).reverse();
};
</script>

<style scoped lang="scss">

.deputies {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 15px;
  margin-bottom: 50px;

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

  // Adaptation
  @media (max-width: 1400px) {
    grid-gap: 15px;
    margin-bottom: 50px;

    &-deputy {
      grid-template-columns: 42px 1fr;
      grid-gap: 10px;

      padding: 8px 15px 8px 8px;

      & span {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 1200px) {
    grid-gap: 12px;
    margin-bottom: 40px;

    &-deputy {
      grid-template-columns: 38px 1fr;
      grid-gap: 8px;

      padding: 4px 10px 4px 4px;

      & span {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 992px) {
    grid-gap: 10px;
    margin-bottom: 30px;

    &-deputy {
      grid-template-columns: 36px 1fr;
      grid-gap: 8px;

      padding: 4px 10px 4px 4px;

      & span {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-gap: 10px 12px;
    margin-bottom: 26px;

    &-deputy {
      grid-template-columns: 30px 1fr;
      grid-gap: 8px;

      padding: 2px 10px 2px 2px;

      & span {
        font-size: 16px;
      }
    }
  }
}

.deputy-requests-table {
  width: 100%;
  max-width: 1490px;
  border: none;
  border-spacing: 0 8px;

  table-layout: fixed;

  & thead {
    & th {
      text-align: left;
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
      line-height: 1.2;
      
      padding-right: 13px;
      padding-right: 0px;
    }

    th:first-child {
      width: 250px;
      padding-left: 42px;
    }

    th:last-child {
      width: 270px;
    }

    td:last-child {
      padding-right: 42px;
    }
  }
  
  & tbody {
    tr {
      border-bottom: 0.5px solid rgba(129, 143, 167, 0.5);

      td {
        padding: 25px;
        padding-left: 0px;

        border: 2px solid transparent;
        background-color: var(--white-color);

        border-color: var(--accent-color-op50);
        background-color: var(--accent-color-op10);

        & span {
          font-size: 20px;
          font-weight: 400;
          line-height: 1.2;
        }
      }

      td:first-child {
        padding-left: 42px;
        
        border-right: none;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }

      td:nth-child(2) {
        border-left: none;
        border-right: none;
      }

      td:last-child {
        padding-right: 42px;
        
        border-left: none;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
      }
    }
  }

  & .text-line {
    cursor: pointer;

    display: grid;
    align-items: center;
    grid-template-columns: 32px 1fr;
    grid-gap: 4px;
    
    & span {
      font-size: 18px;
      text-decoration-line: underline;
      transition: all .3s ease-in-out;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
              line-clamp: 2; 
      -webkit-box-orient: vertical;
    }

    &-icon {
      margin-right: 10px;

      & svg {
        width: 32px;
        height: 32px;
      }
    }

    &:hover span {
      color: var(--accent-color);
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    border-spacing: 0 8px;

    & thead {
      & th {
        font-size: 20px;
        padding-right: 10px;
      }

      th:first-child {
        width: 250px;
        padding-left: 32px;
      }

      th:last-child {
        width: 270px;
      }

      td:last-child {
        padding-right: 32px;
      }
    }
    
    & tbody {
      tr {
        td {
          padding: 18px 20px;
          padding-left: 0px;

          & span {
            font-size: 20px;
          }
        }

        td:first-child {
          padding-left: 32px;
        }

        td:last-child {
          padding-right: 32px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 30px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 18px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    border-spacing: 0 6px;

    & thead {
      & th {
        font-size: 18px;
        padding-right: 10px;
      }

      th:first-child {
        width: 180px;
        padding-left: 28px;
      }

      th:last-child {
        width: 180px;
      }

      td:last-child {
        padding-right: 28px;
      }
    }
    
    & tbody {
      tr {
        td {
          padding: 14px 16px;
          padding-left: 0px;

          & span {
            font-size: 18px;
          }
        }

        td:first-child {
          padding-left: 28px;
        }

        td:last-child {
          padding-right: 28px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 26px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 18px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    border-spacing: 0 4px;

    & thead {
      display: none;
    }
    
    & tbody {
      display: flex;
      flex-direction: column;
      grid-gap: 14px;

      tr {
        display: flex;
        flex-direction: column;

        padding: 14px;
        background-color: var(--accent-color-op10);
        border: 1.4px solid var(--accent-color-op50);
        border-radius: 10px;

        td {
          padding: 0px !important;
          border: none;
          background-color: transparent;
          margin-bottom: 16px;
        }

        td:last-child {
          margin-bottom: 0px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 26px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 16px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    border-spacing: 0 4px;

    & thead {
      & th {
        padding-right: 10px;
      }

      th:first-child {
        width: 120px;
        padding-left: 20px;
      }

      th:last-child {
        width: 120px;
      }

      td:last-child {
        padding-right: 20px;
      }
    }
    
    & tbody {
      tr {
        td {
          border-width: 1.2px;
          padding: 10px 12px;
          padding-left: 0px;

          &::before {
            content: attr(data-title)':';

            display: inline-block;
            margin-bottom: 10px;

            color: var(--primary-color);
            font-size: 18px;
            font-weight: 400;
            line-height: 1.2;
          }
        }

        td:first-child {
          padding-left: 20px;

          &::before {
            display: none;
          }

          & span {
            color: var(--accent-color);
            font-weight: 600;
          }
        }

        td:last-child {
          padding-right: 20px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 24px 1fr;
      grid-gap: 4px;
      
      &-icon {
        margin-right: 10px;

        & svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
