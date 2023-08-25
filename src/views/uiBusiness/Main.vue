<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="mainDb-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Пользователи с доступом на портал (Авторизованные)</h2>

          <table>
            <thead>
              <tr>
                <th style="width: 80px;">ID</th>
                <th style="width: 200px;">Телефон</th>
                <th style="width: 200px;">Пароль</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersList" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.password }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


      <section class="mainDb-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Пользователи в Egov</h2>

          <table>
            <thead>
              <tr>
                <th style="width: 5%">ID</th>
                <th style="width: 20%">Имя</th>
                <th style="width: 20%">Фамилия</th>
                <th style="width: 20%">Отчество</th>
                <th style="width: 15%">Телефон</th>
                <th style="width: 10%">ИИН</th>
                <th style="width: 10%">В партии</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in usersListEgov" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.surname }}</td>
                <td>{{ item.patronymic }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.iin }}</td>
                <td>{{ item.inParty }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <Footer /> 
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios'

import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';

const usersList = ref()
const usersListEgov = ref()

onMounted(() => {
  const url = `http://localhost:3000/users`;
  const urlEgov = `http://localhost:3000/usersInEgov`;

  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      console.log('url', url);
      console.log('response', response);

      usersList.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
    });

  axios({
    method: "get",
    url: urlEgov,
  })
    .then((response) => {
      console.log('url', url);
      console.log('response', response);

      usersListEgov.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
    });
})
</script>

<style scoped lang="scss">
.mainDb {
  &-block {
    padding: 100px 0;
  }
}
</style>
