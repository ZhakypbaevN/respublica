<template>
  <div class="wrapper-main">
    <section class="appeal">
      <div class="wrapper">
        <div class="appeal-header">
          <h3 class="appeal-appeal-header-title">Новые</h3>
          <p class="appeal-header-count">Всего {{ appealDataList ? appealDataList.length : '...' }}</p>
        </div>
        <table class="appeal-table" v-if="appealDataList">
          <thead>
            <tr class="appeal-head">
              <th>Рег. №</th>
              <th>Дата рег.</th>
              <th>Вид обращения</th>
              <th>Категория вопроса</th>
              <th>Файлы</th>
              <th>Локация</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr > -->
            <tr
              class="appeal-item"
              v-for="appeal in appealDataList"
              :key="appeal.id"
              @click="() => router.push(`/reception/appeal-data/${appeal.id}`)"
            >
              <td class="appeal-item">{{ appeal.id }}</td>
              <td class="appeal-item">{{ appeal.createAt }}</td>
              <td>
                {{ appeal.type }}
              </td>
              <td class="appeal-item category">
                <div class="appeal-item-category">
                  {{ appeal.category.title }}
                </div>
              </td>
              <td class="appeal-item">4</td>
              <td class="appeal-item">{{ appeal.region ?? '-' }}</td>
              <td class="appeal-item">
                {{ appeal.status.title }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

import router from '@/router/index.js'
import { useToast } from '@/modules/toast'

const { toast } = useToast()

const appealDataList = ref([
  {
    id: 1,
    createAt: '07.10.2020',
    type: 'Запрос на конультацию',
    category: {
      title: 'Иммиграция и миграция',
      color: '#28C397',
    },
    file: 4,
    region: 'Алматы',
    status: {
      title: 'В компетентный орган'
    }
  },
  {
    id: 1,
    createAt: '07.10.2020',
    type: 'Запрос на конультацию',
    category: {
      title: 'Агропромышленный комплекс',
      color: '#28C397',
    },
    file: 4,
    region: 'Алматы',
    status: {
      title: 'В компетентный орган'
    }
  },
  {
    id: 1,
    createAt: '07.10.2020',
    type: 'Запрос на конультацию',
    category: {
      title: 'Судебная и правоохранительная система',
      color: '#28C397',
    },
    file: 4,
    region: 'Алматы',
    status: {
      title: 'В компетентный орган'
    }
  },
  {
    id: 1,
    createAt: '07.10.2020',
    type: 'Запрос на конультацию',
    category: {
      title: 'Банки и иные кредитные организации',
      color: '#28C397',
    },
    file: 4,
    region: 'Алматы',
    status: {
      title: 'В компетентный орган'
    }
  },
  {
    id: 1,
    createAt: '07.10.2020',
    type: 'Запрос на конультацию',
    category: {
      title: 'Иммиграция и миграция',
      color: '#28C397',
    },
    file: 4,
    region: 'Алматы',
    status: {
      title: 'В компетентный орган'
    }
  }
]);

// onMounted(() => {
//   // https://tri.codetau.com/appealCards
//   const url = `https://tri.codetau.com/appealList`;
//   axios({
//     method: "get",
//     url: url,
//   })
//     .then((response) => {
//       appealDataList.value = [];

//       response.data.forEach(appeal => {
//         appealDataList.value.push(appeal);
//       });
//     })
//     .catch((err) => {
//       console.log('err', err);
//       toast({
//         message: 'Возникли ошибки при запросе'
//       })
//     });
// })
</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
    padding-top: 40px;
  }

  .appeal {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 26px;

      &-title {
        font-size: 18px;
        font-weight: 700;
      }

      &-count {
        color: var(--light-gray-color);
      }
    }
    &-table {
      width: 100%;
      border-spacing: 0 10px;

      & tbody {
        transform: translateY(-15px);
      }

      & th {
        color: var(--light-gray-color);
        font-size: 16px;
        font-weight: 400;
        text-align: left;

        padding: 14px 20px 15px;
      }

      & td {
        padding: 20px;      
      }

      & .appeal-item:first-child td {
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
      }
    }
    &-head,
    &-item {
      background: #FFF;
    }

    &-head {
      position: relative;
      z-index: 2;

      & th {
        border-bottom: .5px solid var(--light-gray-color-op50);
      }

      & th:first-child {
        border-top-left-radius: 10px;
      }

      & th:last-child {
        border-top-right-radius: 10px;
      }
    }

    &-item {
      &-category {
        display: inline-block;
        border-radius: 8px !important;
        background: #EAF5FF;
        
        padding: 9px 19px;

        color: #338DE0;
        font-size: 18px;
        font-weight: 500;
      }

      & td,
      &-title {
        font-size: 18px;
        font-weight: 500;
      }
      
      & td:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      & td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      &-title {
        transition: color .3s ease-in-out;

        &:hover,
        &:focus {
          color: var(--accent-color);
        }
      }

      &-btn {
        width: 40px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 8px;
        background-color: var(--red-color-op05);

        &:hover {
          background-color: var(--red-color-op07);
        }

        & svg {
          width: 32px;
          height: 32px;

          fill: var(--red-color);
        }
      }
    }
  }
</style>