<template>
  <div class="wrapper-main">
    <section class="appeal">
      <div class="wrapper">
        <div class="appeal-header">
          <h3 class="appeal-appeal-header-title">НОВЫЕ ОБРАЩЕНИЯ</h3>
          <p class="appeal-header-count">Всего {{ filterList ? filterList.length : '...' }}</p>
        </div>
        <table class="appeal-table" v-if="filterList">
          <thead>
            <tr class="appeal-table-head">
              <th>Вид обращения</th>
              <th>Категория вопроса</th>
              <th>Дата</th>
              <th>Файлы</th>
              <th>Локация</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr > -->
            <tr
              class="appeal-table-row"
              v-for="appeal in filterList"
              :key="appeal.id"
              @click="() => router.push(`/reception/appeal-data/${appeal.id}`)"
            >
              <td class="appeal-table-item">
                {{ appeal.type }}
              </td>
              <td class="appeal-table-item">
                <AppealCategory
                  :title="appeal.category.title"
                  :color="appeal.category.color"
                />
              </td>
              <td class="appeal-table-item">{{ appeal.createAt }}</td>
              <td class="appeal-table-item">4</td>
              <td class="appeal-table-item">{{ appeal.region ?? '-' }}</td>
              <td class="appeal-table-item appeal-table-item-status">
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
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import router from '@/router/index.js'

  import AppealCategory from '@/components/uiReception/AppealCategory.vue';

  const route = useRoute();

  const appealDataList = [
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
        title: 'Новое',
        code: 'new'
      }
    },
    {
      id: 2,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Агропромышленный комплекс',
        color: '#9BC328',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Новое',
        code: 'new'
      }
    },
    {
      id: 3,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Новое',
        code: 'new'
      }
    },
    {
      id: 4,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Новое',
        code: 'new'
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
        title: 'Новое',
        code: 'new'
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
        title: 'Новое',
        code: 'new'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 5,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: 'Принято',
        code: 'accepted'
      }
    },
    {
      id: 6,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Не решенный",
        code: "rejected",
      }
    },
    {
      id: 7,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Разъяснение",
        code: "in-revision",
      }
    },
    {
      id: 8,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Положительно решенные",
        code: "finish",
      }
    },
    {
      id: 7,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Разъяснение",
        code: "in-revision",
      }
    },
    {
      id: 8,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Положительно решенные",
        code: "finish",
      }
    },
    {
      id: 6,
      createAt: '07.10.2020',
      type: 'Запрос на конультацию',
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      file: 4,
      region: 'Алматы',
      status: {
        title: "Не решенный",
        code: "rejected",
      }
    },
  ];

  const filterList = computed({
    get: () => {
      console.log('route.params.filter', appealDataList.filter(appeal => appeal.status.code === 'accepted'));
      if (route.params.filter == 'accepted') return appealDataList.filter(appeal => appeal.status.code === 'accepted')
      if (route.params.filter == 'completed') return appealDataList.filter(appeal => appeal.status.code === 'finish' || appeal.status.code === 'in-revision' || appeal.status.code === 'rejected')
      return appealDataList.filter(appeal => appeal.status.code === 'new')
    },
    set: (val) => null
  })
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

      &-head,
      &-item {
        background-color: var(--white-color);
      }
  
      &-head {
        position: relative;
        z-index: 2;
  
        & th {
          color: var(--light-gray-color);
          font-size: 16px;
          font-weight: 400;
          text-align: left;
  
          padding: 14px 20px 15px;
          border-bottom: .5px solid var(--light-gray-color-op50);
        }
  
        & th:first-child {
          border-top-left-radius: 10px;
        }
  
        & th:last-child {
          border-top-right-radius: 10px;
        }
      }
  
      &-row {
        cursor: pointer;
      }

      &-item {
        font-size: 18px;
        font-weight: 500;
        padding: 20px;
  
        &-status {
          color: var(--light-gray-color);
        }
      }

      &-item:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &-item:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      &-item:first-child td {
        border-top-left-radius: 0px !important;
        border-top-right-radius: 0px !important;
      }
    }
  }
</style>