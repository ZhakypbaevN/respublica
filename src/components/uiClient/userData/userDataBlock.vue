<template>
  <div v-if="!userData" class="userData disabled">
    <h2 class="userData-title skeleton long-text" style="width:80%;"></h2>

    <h4
      class="userData-item"
      v-for="item in 3"
      :key="item"
    >
      <span class="skeleton small-text"></span>
      <span class="skeleton small-text" :style="`width:${item === 3 ? '40' : '60'}%`"></span>
    </h4>
  </div>

  <div v-else class="userData">
    <h2 class="userData-title">
      {{ `${userData.last_name} ${userData.first_name} ${userData.middle_name ?? ''}` }}
    </h2>

    <h4 class="userData-item checked">
      <span>ИИН:</span>
      {{ userData.iin ?? '-' }}
    </h4>

    <h4 class="userData-item checked">
      <span>Телефон:</span>
      {{ userData.phone ? formatPhoneNumber(userData.phone) : '-' }}
    </h4>

    <h4 class="userData-item">
      <span>E-mail:</span>
      {{ userData?.email ?? '-' }}
    </h4>
  </div>
</template>

<script setup lang="ts">
import formatPhoneNumber from '@/helpers/formatPhoneNumber.js'

import { IUser } from '@/types/user'

interface IProps {
  userData?: IUser,
}

defineProps<IProps>()
</script>

<style scoped lang="scss">
.userData {
  padding: 25px;

  border-radius: 10px;
  background: white;

  &.disabled .userData-item {
    display: flex;
    grid-gap: 20px;
    margin-bottom: 20px;
  }

  &-title {
    font-size: 30px;
    font-weight: 600;
    color: var(--accent-color);

    margin-bottom: 30px;
  }

  &-item {
    font-size: 20px;
    font-weight: 500;

    margin-bottom: 14px;

    & span {
      color: var(--light-gray-color);
    }
    
    &.checked::after {
      content: '';

      display: inline-block;
      height: 24px;
      width: 24px;

      position: relative;
      top: 4.4px;
      left: 10px;


      background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjE3ODQgMS4xODM4M0MxMS41NzYyIDAuNjEwNjgxIDEyLjQyMzggMC42MTA2ODEgMTIuODIxNiAxLjE4MzgzTDEzLjY4IDIuNDIwODdDMTMuOTY3MiAyLjgzNDcyIDE0LjUxNzQgMi45NzAzMyAxNC45NjQxIDIuNzM3MzVMMTYuMjk5MSAyLjA0MDk3QzE2LjkxNzYgMS43MTgzMSAxNy42NjgxIDIuMTEyMjEgMTcuNzU0IDIuODA0NTVMMTcuOTM5MiA0LjI5ODg0QzE4LjAwMTIgNC43OTg3NiAxOC40MjU0IDUuMTc0NTMgMTguOTI5MSA1LjE3NThMMjAuNDM0OCA1LjE3OTU5QzIxLjEzMjUgNS4xODEzNSAyMS42MTQgNS44Nzg5MSAyMS4zNjgyIDYuNTMxODRMMjAuODM3OCA3Ljk0MTA2QzIwLjY2MDQgOC40MTI1MiAyMC44NjEzIDguOTQyMzcgMjEuMzA2OCA5LjE3NzU5TDIyLjYzODMgOS44ODA3QzIzLjI1NTIgMTAuMjA2NSAyMy4zNTc0IDExLjA0NzkgMjIuODM2MyAxMS41MTE4TDIxLjcxMTggMTIuNTEzMUMyMS4zMzU2IDEyLjg0ODEgMjEuMjY3MyAxMy40MTA3IDIxLjU1MjQgMTMuODI2TDIyLjQwNDYgMTUuMDY3M0MyMi43OTk1IDE1LjY0MjUgMjIuNDk4OSAxNi40MzUgMjEuODIyIDE2LjYwMzZMMjAuMzYwOSAxNi45Njc3QzE5Ljg3MjEgMTcuMDg5NCAxOS41NTAyIDE3LjU1NTggMTkuNjA5NyAxOC4wNTZMMTkuNzg3NCAxOS41NTEyQzE5Ljg2OTcgMjAuMjQ0IDE5LjIzNTMgMjAuODA2MSAxOC41NTc1IDIwLjY0MDhMMTcuMDk0NiAyMC4yODQxQzE2LjYwNTIgMjAuMTY0OCAxNi4xMDM1IDIwLjQyODIgMTUuOTIzNiAyMC44OTg3TDE1LjM4NjIgMjIuMzA1M0MxNS4xMzcxIDIyLjk1NjkgMTQuMzE0MiAyMy4xNTk4IDEzLjc5MDggMjIuNjk4NUwxMi42NjEyIDIxLjcwMjhDMTIuMjgzMyAyMS4zNjk3IDExLjcxNjcgMjEuMzY5NyAxMS4zMzg4IDIxLjcwMjhMMTAuMjA5MiAyMi42OTg1QzkuNjg1ODQgMjMuMTU5OCA4Ljg2Mjg3IDIyLjk1NjkgOC42MTM4NCAyMi4zMDUzTDguMDc2MzYgMjAuODk4N0M3Ljg5NjU0IDIwLjQyODIgNy4zOTQ3OCAyMC4xNjQ4IDYuOTA1MzcgMjAuMjg0MUw1LjQ0MjQ5IDIwLjY0MDhDNC43NjQ3IDIwLjgwNjEgNC4xMzAyNyAyMC4yNDQgNC4yMTI2MiAxOS41NTEyTDQuMzkwMzUgMTguMDU2QzQuNDQ5ODEgMTcuNTU1OCA0LjEyNzkgMTcuMDg5NCAzLjYzOTEgMTYuOTY3N0wyLjE3ODAzIDE2LjYwMzZDMS41MDEwOCAxNi40MzUgMS4yMDA1MiAxNS42NDI1IDEuNTk1MzggMTUuMDY3M0wyLjQ0NzYxIDEzLjgyNkMyLjczMjczIDEzLjQxMDcgMi42NjQ0MiAxMi44NDgxIDIuMjg4MiAxMi41MTMxTDEuMTYzNjcgMTEuNTExOEMwLjY0MjYzOSAxMS4wNDc5IDAuNzQ0ODA1IDEwLjIwNjUgMS4zNjE3MiA5Ljg4MDdMMi42OTMyMSA5LjE3NzU5QzMuMTM4NjcgOC45NDIzNyAzLjMzOTYxIDguNDEyNTIgMy4xNjIxNyA3Ljk0MTA2TDIuNjMxNzggNi41MzE4NEMyLjM4NjAzIDUuODc4OTEgMi44Njc1MiA1LjE4MTM1IDMuNTY1MTYgNS4xNzk1OUw1LjA3MDg5IDUuMTc1OEM1LjU3NDYzIDUuMTc0NTMgNS45OTg3OSA0Ljc5ODc2IDYuMDYwNzcgNC4yOTg4NEw2LjI0NjAzIDIuODA0NTVDNi4zMzE4NyAyLjExMjIxIDcuMDgyMzcgMS43MTgzMSA3LjcwMDkyIDIuMDQwOTdMOS4wMzU5NCAyLjczNzM1QzkuNDgyNTcgMi45NzAzMyAxMC4wMzI4IDIuODM0NzIgMTAuMzIgMi40MjA4N0wxMS4xNzg0IDEuMTgzODNaIiBmaWxsPSIjNEE3OEVDIi8+CjxwYXRoIGQ9Ik03LjMzMzI1IDEyLjMzMkwxMC40NDQ2IDE1LjMzMkwxNi42NjY2IDkuMzMyMDMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==') center no-repeat;
    }
  }

  &-item:last-of-type {
    margin-bottom: 0px;
  }
}
</style>
