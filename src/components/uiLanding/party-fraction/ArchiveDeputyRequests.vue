<template>
  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('parliamentary-inquiries-in-archive') }}</h2>

      <div class="request-wrapper">
        <div class="deputies">
          <button
            v-for="(deputy, idx) of archiveDeputiesRequests"
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

        <table class="deputy-requests-table" v-if="tableContentList.length">
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
                  :href="answer['doc']"
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
        <Empty v-else />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import convertDateTime from "@/helpers/convertDateTime";

  import { reactive, ref, onMounted } from "vue";
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  function convertDateFormat(inputDate) {
    // Разбиваем строку на составляющие (день, месяц, год)
    const [day, month, year] = inputDate.split('.');

    // Добавляем "20" перед двухзначным годом
    const fullYear = `20${year}`;

    // Формируем новую дату в формате ГГГГ-ММ-ДДT00:00:00Z
    const isoDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;

    return isoDate;
  }
  
  const archiveDeputiesRequests = [
    {
      name: "ШҮКІЖАНОВА Динара",
      img: "/img/uiLanding/fraction/shukizhanova.jpg",
      active: false,
      data: [
        {
          date: "22.09.23",
          name: "Касательно детской наркомании",
          doc: "/doc/ru/deputies-requests/shukizhanova/request/Касательно детской наркомании 22.09.23 запрос.pdf",
          
          answer: [
            {
              date: "20.10.23",
              doc: "/doc/ru/deputies-requests/shukizhanova/answer/Regarding child drug addiction 20.10.23 response.pdf",
            }
          ]
        },

        {
          date: "22.12.23",
          name: "О льготной ипотеке для работников обрабатывающей отрасли",
          doc: "/doc/ru/deputies-requests/shukizhanova/request/22.12.2023 ДЗ Шукижанова О льготной ипотеке для работников обрабатывающей отрасли.pdf",
          
          answer: [
            {
              date: "22.12.23",
              doc: "/doc/ru/deputies-requests/shukizhanova/answer/22.12.2023 response to Shukizhanov is DZ On preferential mortgages for workers in the manufacturing industry.pdf",
            }
          ]
        },

        {
          date: "20.04.23",
          name: "Касательно противодействия и распространения синтетических наркотиков",
          doc: "/doc/ru/deputies-requests/shukizhanova/request/Касательно противодействия и распространения синтетических наркотиков.pdf",
          
          answer: [
            {
              date: "20.04.23",
              doc: "/doc/ru/deputies-requests/shukizhanova/answer/Regarding_the_counteraction_and_distribution_of_synthetic_drugs.pdf",
            }
          ]
        },

        {
          date: "24.05.23",
          name: "Про развитию транспортных средств",
          doc: "/doc/ru/deputies-requests/shukizhanova/request/Про развитию транспортных средств.pdf",
          
          answer: [
            {
              date: "20.04.23",
              doc: "/doc/ru/deputies-requests/shukizhanova/answer/On the need to develop a national concept for the development of the use of vehicles with an electric motor.pdf",
            }
          ]
        },
      ],
    },
  ]

  const tableContentList = ref(archiveDeputiesRequests[0].data);

  const toggleShow = (idx: number) => {
    for (let i = 0; i < archiveDeputiesRequests.length; i++) {
      archiveDeputiesRequests[i].active = false;
    }
    archiveDeputiesRequests[idx].active = true;
    tableContentList.value = archiveDeputiesRequests[idx].data.map(item => item).reverse();
  };

  onMounted(() => toggleShow(0))
</script>

<style scoped lang="scss">

.landing-title {
  color: var(--light-gray-color);
}

.deputyRequests {
  -webkit-filter: grayscale(80%);
  filter: grayscale(80%);
}

.deputies {
  max-width: 900px;
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
    box-shadow: 0 4px 8px rgba(160,174,192,.08);

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
