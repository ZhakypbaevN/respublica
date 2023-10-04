<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper landing-wrapper">
        <h2 class="landing-title">Пользователи с доступом на портал (Авторизованные)</h2>

        <table class="myRequests-table">
          <thead>
            <tr class="myRequests-head">
              <th>Категория</th>
              <th>Название</th>
              <th>Дата</th>
              <th>Файлы</th>
              <th>Локация</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr > -->
            <tr
              class="myRequests-item"
              v-for="request in requestsList"
              :key="request.id"
            >
              <td>
                <div class="myRequests-item-category">{{ request.category }}</div>
              </td>
              <td>
                <RouterLink class="myRequests-item-title" :to="`/my-requests/${request.id}`">
                  {{ request.title }}
                </RouterLink>
              </td>
              <td class="myRequests-item-date">{{ request.date }}</td>
              <td class="myRequests-item-fileCount">{{ request.fileCount }}</td>
              <td class="myRequests-item-city">{{ request.city }}</td>
              <td :class="`myRequests-item-status ${request.status.state}`">{{ request.status.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const requestsList = [
  {
    id: 1,
    category: 'Экология',
    title: 'Участие в мероприятиях. Вступление в партию',
    date: '07.10.2020',
    fileCount: 4,
    city: 'Алматы',
    status: {
      state: 'accepted',
      text: 'Принято'
    }
  },
  {
    id: 2,
    category: 'Экология',
    title: 'Участие в мероприятиях. Вступление в партию',
    date: '07.10.2020',
    fileCount: 4,
    city: 'Алматы',
    status: {
      state: 'in-the-competent-authority',
      text: 'В компетентном органе'
    },
  },
  {
    id: 3,
    category: 'Экология',
    title: 'Участие в мероприятиях. Вступление в партию',
    date: '07.10.2020',
    fileCount: 4,
    city: 'Алматы',
    status: {
      state: 'rejected',
      text: 'Отклонено'
    }
  }
]
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}

.myRequests {
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

    & .myRequests-item:first-child td {
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
      border-bottom: .5px solid var(--light-gray-color-op5);
    }

    & th:first-child {
      border-top-left-radius: 10px;
    }

    & th:last-child {
      border-top-right-radius: 10px;
    }
  }

  &-item {
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

    &-category {
      display: inline-block;
      padding: 9px 19px;

      color: #28C397;
      font-size: 18px;
      font-weight: 500;

      border-radius: 8px;
      background: hsl(165, 57%, 95%);
    }

    &-title {
      transition: color .3s ease-in-out;

      &:hover,
      &:focus {
        color: var(--accent-color);
      }
    }

    &-status {
      &.accepted {
        color: var(--green-color);
      }

      &.in-the-competent-authority {
        color: var(--light-gray-color);
      }

      &.rejected {
        color: var(--red-color);
      }
    }
  }
}
</style>
