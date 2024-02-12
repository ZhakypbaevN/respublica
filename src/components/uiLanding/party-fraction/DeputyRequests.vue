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
            <tr v-for="request of tableContentList" :key="request.date">
            
              <td>
                <span>
                  {{ convertDateTime(convertDateFormat(request.date)) }}
                </span>
              </td>

              <td :data-title="$t('formdata.file-and-brief-description')">
                <a class="text-line" :href="request.doc!" target="_blank">
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
                  class="text-line"
                  target="_blank"
                  v-for="answer of request.answer"
                  :href="answer.doc"
                >
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>
                    {{ convertDateTime(convertDateFormat(request.date)) }}
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import convertDateTime from "@/helpers/convertDateTime";
import { reactive, ref, onMounted } from "vue";

function convertDateFormat(inputDate) {
  // Разбиваем строку на составляющие (день, месяц, год)
  const [day, month, year] = inputDate.split('.');

  // Добавляем "20" перед двухзначным годом
  const fullYear = `20${year}`;

  // Формируем новую дату в формате ГГГГ-ММ-ДДT00:00:00Z
  const isoDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;

  return isoDate;
}

const deputieslist = reactive([
  {
    name: "А. Ходжаназаров",
    img: "/img/uiLanding/fraction/khodzhanazarov.jpg",
    active: true,
    data: [
      {
        date: "12.04.23",
        name: "Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қал",
        doc: "/doc/ru/deputies-requests/khodzhanazarov/request/1 Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қал.pdf",
        
        answer: [
          {
            date: "12.04.23",
            doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/1.1. Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қа.PDF",
          },
          {
            date: "12.04.23",
            doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/1.2. Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қа.PDF",
          }
        ]
      },
      {
        date: "25.05.23",
        name: "Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы",
        doc: "/doc/ru/deputies-requests/khodzhanazarov/request/2 Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы 25.05.23 ДЗ.pdf",
        
        answer: [
          {
            date: "21.06.23",
            doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/2 Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы 21.06.23 ответ.pdf",
          }
        ]
      },
      {
        date: "14.09.23",
        name: "Касательно мер по ликвидации засухи",
        doc: "/doc/ru/deputies-requests/khodzhanazarov/request/3 Касательно мер по ликвидации засухи 14.09.23 ДЗ.pdf",
        
        answer: [
          {
            date: "14.12.23",
            doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/3 Жылыжай мәселесі туралы 14.12.23 ответ.pdf",
          }
        ]
      },
      {
        date: "17.11.23",
        name: "Жылыжай мәселесі туралы",
        doc: "public/doc/ru/deputies-requests/khodzhanazarov/request/4 Жылыжай мәселесі туралы 17.11.23 ДЗ.pdf",
        
        answer: [
          {
            date: "16.10.23",
            doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/4 Касательно мер по ликвидации засухи 16.10.23 ответ.pdf",
          }
        ]
      }
    ],
  },

  // {
  //   name: "Д. ШУКИЖАНОВА",
  //   img: "/img/uiLanding/fraction/shukizhanova.jpg",
  //   active: false,
  //   data: [
  //     {
  //       date: "",
  //       name: "",
  //       doc: "",
        
  //       answer: [
  //         {
  //           date: "",
  //           name: "",
  //           doc: "",
  //         }
  //       ]
  //     },
  //   ],
  // },

  {
    name: "Р. БЕРДЕНОВ",
    img: "/img/uiLanding/fraction/berdenov.jpg",
    active: false,
    data: [
      {
        date: "07.09.23",
        name: "ҚТЖ және оған бағынышты мекемелер туралы",
        doc: "/doc/ru/deputies-requests/berdenov/request/ҚТЖ және оған бағынышты мекемелер туралы 07.09.23 ДЗ.pdf",
        
        answer: [
          {
            date: "13.10.23",
            doc: "/doc/ru/deputies-requests/berdenov/answer/«Қазақстан темір жолы» ҰК» АҚ қызметіне қатысты 13.10.23 ответ.pdf",
          }
        ]
      }
    ],
  },

  {
    name: "Н. ТАУ",
    img: "/img/uiLanding/fraction/tau.jpg",
    active: false,
    data: [
      {
        date: "29.06.23",
        name: "Қазақстандағы отбасы, әйелдер және балалар мен жастардың проблемалық мәселелері",
        doc: "/doc/ru/deputies-requests/tau/request/1 Қазақстандағы отбасы, әйелдер және балалар мен жастардың проблемалық мәселелері 29.06.23 ДЗ.pdf",
        
        answer: [
          {
            date: "31.07.23",
            doc: "/doc/ru/deputies-requests/tau/answer/1 Қазақстандағы отбасыларды, әйелдерді, балалар мен жастарды қолдау жөніндегі 31.07.23 ответ.pdf",
          }
        ]
      },
      {
        date: "22.09.23",
        name: "Паллиативтік көмек туралы",
        doc: "/doc/ru/deputies-requests/tau/request/2 Паллиативтік көмек туралы 22.09.23 ДЗ.pdf",
        
        answer: [
          {
            date: "20.10.23",
            doc: "/doc/ru/deputies-requests/tau/answer/2 Паллиативтік көмек көрсету мәселелеріне қатысты 20.10.23 ответ.pdf",
          }
        ]
      },
      {
        date: "10.11.23",
        name: "Отандық киноиндустрия төңірегіндегі өзекті мәселелер бойынша",
        doc: "/doc/ru/deputies-requests/tau/request/3 Отандық киноиндустрия төңірегіндегі өзекті мәселелер бойынша 10.11.23 ДЗ.pdf",
        
        answer: [
          {
            date: "12.12.23",
            doc: "/doc/ru/deputies-requests/tau/answer/3 Отандық кинематография мәселелері бойынша 12.12.23 ответ.pdf",
          }
        ]
      }
    ],
  },

  {
    name: "О. КУСПЕКОВ",
    img: "/img/uiLanding/fraction/kuspekov.jpg",
    active: false,
    data: [
      {
        date: "05.05.23",
        name: "Адами капиталды дамыту бойынша",
        doc: "/doc/ru/deputies-requests/kuspekov/request/1 Адами капиталды дамыту бойынша 05.05.23 ДЗ.pdf",
        
        answer: [
          {
            date: "26.05.23",
            doc: "/doc/ru/deputies-requests/kuspekov/answer/Адами капиталды дамыту жөніндегі ұлттық бағдарлама түріндегі стратегиялық құжатты әзірлеу жөніндегі 26.05.23 ответ.pdf",
          }
        ]
      },
      {
        date: "16.06.23",
        name: "Колледждердің дамуы бойынша",
        doc: "/doc/ru/deputies-requests/kuspekov/request/2 Колледждердің дамуы бойынша 16.06.23 ДЗ.pdf",
        
        answer: [
          {
            date: "17.07.23",
            doc: "/doc/ru/deputies-requests/kuspekov/answer/Колледждердің дамуы бойынша 17.07.23 ответ.pdf",
          }
        ]
      },
      {
        date: "05.10.23",
        name: "Автокөлік лизингі мәселелері бойынша",
        doc: "/doc/ru/deputies-requests/kuspekov/request/3 Автокөлік лизингі мәселелері бойынша 05.10.23 ДЗ.pdf",
        
        answer: [
          {
            date: "30.10.23",
            doc: "/doc/ru/deputies-requests/kuspekov/answer/Автокөлік лизингі мәселелері бойынша 30.10.23 ответ.pdf",
          }
        ]
      }
    ],
  },

  {
    name: "Д. НАУМОВА",
    img: "/img/uiLanding/fraction/naumova.jpg",
    active: false,
    data: [
      {
        date: "04.10.23",
        name: "Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов",
        doc: "/doc/ru/deputies-requests/naumova/request/Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов 04.10.23 ДЗ.pdf",
        
        answer: [
          {
            date: "03.11.23",
            name: "Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов",
            doc: "/doc/ru/deputies-requests/naumova/answer/Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов 03.11.23 ответ.pdf",
          }
        ]
      }
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

onMounted(() => toggleShow(0))
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

        & a {
          margin-bottom: 10px;
        }
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
