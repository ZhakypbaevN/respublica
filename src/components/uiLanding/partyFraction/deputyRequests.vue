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
          :class="{active: deputy.active}"
          @click="() => toggleShow(idx)"
        >
          <div class="deputies-deputy-photo withZoomPreview-preview">
            <div class="deputies-deputy-photo-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${deputy.img});`"></div>
          </div>
          <span>{{ deputy.name }}</span>
        </button>
      </div>

      <table class="deputy-requests-table">
          <thead>
            <th>Дата и номер запроса, адресант</th>
            <th>Файл и краткое описание</th>
            <!-- <th>Выступление</th> -->
            <th>Ответ</th>
          </thead>
          <tbody>
            <tr
              v-for="request of tableContentList"
              :key="request.title"
            >
              <td><span>
                {{ request.title }}
              </span></td>
              <td>
                <a class="text-line" :href="request.docAndDescription!" target="_blank">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-red" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>

                  <span>
                    {{ request.docAndDescription }}
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
              <td>
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
                    {{ request.answerDoc }}
                  </span>
                </a>

                <div v-else class="text-line">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-red" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>-</span>
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
import { reactive, ref } from 'vue';

const deputieslist = reactive([
  {
    name: 'Ходжаназаров А.',
    img: '/img/uiLanding/fraction/khodzhanazarov.jpg',
    active: true,
    data: [
      {
        title: 'Ходжаназаров 12.04.23',
        docAndDescription: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 12.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 12.04.23 жауап.pdf'
      },
      {
        title: 'Ходжаназаров 10.05.23',
        docAndDescription: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 10.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 10.05.23 жауап.pdf'
      },
      {
        title: 'Ходжаназаров 24.05.23',
        docAndDescription: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 24.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 24.05.23 жауап.pdf'
      },
      {
        title: 'Ходжаназаров 14.06.23',
        docAndDescription: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 14.06.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/khodzhanazarov/Ходжаназаров 14.06.23 жауап.pdf'
      }
    ]
  },

  {
    name: 'БЕРДЕНОВ Р.',
    img: '/img/uiLanding/fraction/berdenov.jpg',
    active: false,
    data: [
      {
        title: 'Берденов 12.04.23',
        docAndDescription: '/doc/ru/deputies-requests/berdenov/Берденов 12.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/berdenov/Берденов 12.04.23 жауап.pdf'
      },
      {
        title: 'Берденов 21.06.23',
        docAndDescription: '/doc/ru/deputies-requests/berdenov/Берденов 21.06.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/berdenov/Берденов 21.06.23 жауап.pdf'
      }
    ]
  },

  {
    name: 'КУСПЕКОВ О.',
    img: '/img/uiLanding/fraction/kuspekov.jpg',
    active: false,
    data: [
      {
        title: 'Куспеков 12.04.23',
        docAndDescription: '/doc/ru/deputies-requests/kuspekov/Куспеков 12.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/kuspekov/Куспеков 12.04.23 жауап.pdf'
      },
      {
        title: 'Куспеков 20.04.23',
        docAndDescription: '/doc/ru/deputies-requests/kuspekov/Куспеков 20.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/kuspekov/Куспеков 20.04.23 жауап.pdf'
      },
      {
        title: 'Куспеков 3.05.23',
        docAndDescription: '/doc/ru/deputies-requests/kuspekov/Куспеков 3.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/kuspekov/Куспеков 3.05.23 жауап.pdf'
      },
      {
        title: 'Куспеков 14.05.23 - 16.06.23',
        docAndDescription: '/doc/ru/deputies-requests/kuspekov/Куспеков 14.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/kuspekov/Куспеков 16.06.23 жауап.pdf'
      }
    ]
  },

  {
    name: 'НАУМОВА Д.',
    img: '/img/uiLanding/fraction/naumova.jpg',
    active: false,
    data: [
      {
        title: 'Наумова 26.04.23',
        docAndDescription: 'public/doc/ru/deputies-requests/naumova/Наумова 26.04.23.pdf',
        video: null,
        answerDoc: null
      },
      {
        title: 'Наумова 15.05.23',
        docAndDescription: 'public/doc/ru/deputies-requests/naumova/Наумова 15.05.23.pdf',
        video: null,
        answerDoc: null
      }
    ]
  },

  {
    name: 'ТАУ Н.',
    img: '/img/uiLanding/fraction/tau.jpg',
    active: false,
    data: [
      {
        title: 'Тау 20.04.23',
        docAndDescription: '/doc/ru/deputies-requests/tau/Тау 20.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/tau/Тау 20.04.23 жауап.pdf'
      },
      {
        title: 'Тау 3.05.23',
        docAndDescription: '/doc/ru/deputies-requests/tau/Тау 3.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/tau/Тау 3.05.23 жауап.pdf'
      },
      {
        title: 'Тау 10.05.23',
        docAndDescription: '/doc/ru/deputies-requests/tau/Тау 10.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/tau/Тау 10.05.23 жауап.pdf'
      },
      {
        title: 'Тау 27.06.23',
        docAndDescription: '/doc/ru/deputies-requests/tau/Тау 27.06.23.pdf',
        video: null,
        answerDoc: null
      }
    ]
  },
  
  {
    name: 'ШУКИЖАНОВА Д.',
    img: '/img/uiLanding/fraction/shukizhanova.jpg',
    active: false,
    data: [
      {
        title: 'Шукижанова 20.04.23',
        docAndDescription: '/doc/ru/deputies-requests/shukizhanova/Шукижанова 20.04.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/shukizhanova/Шукижанова 20.04.23 жауап.pdf'
      },
      {
        title: 'Шукижанова 24.05.23',
        docAndDescription: '/doc/ru/deputies-requests/shukizhanova/Шукижанова 24.05.23.pdf',
        video: null,
        answerDoc: '/doc/ru/deputies-requests/shukizhanova/Шукижанова 24.05.23 жауап.pdf'
      }
    ]
  }
]);

const tableContentList = ref(deputieslist[0].data)

const toggleShow = (idx: number) => {
  for (let i = 0; i < deputieslist.length; i++) {
    deputieslist[i].active = false;
  }
  deputieslist[idx].active = true;
  tableContentList.value = deputieslist[idx].data;
}
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

    transition: all .3s ease-in-out;

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
      transition: all .3s ease-in-out;
    }
  }
}

.deputy-requests-table {
  max-width: 1490px;
  border:none;
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
      border-bottom: 0.5px solid rgba(129, 143, 167, 0.50);
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
</style>