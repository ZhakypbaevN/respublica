<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <h2 class="landing-title">Партийные данные</h2>

        <div class="partyData" v-if="userData">
          <div class="partyData-inner">
            <div class="partyData-content">
              <h2 class="partyData-content-title">
                {{ `${userData.last_name} ${userData.first_name} ${userData.middle_name}` }}
              </h2>

              <div class="partyData-content-infoBlock">
                <h4 class="partyData-content-infoBlock-item checked">
                  <span>ИИН:</span>
                  {{ userData.iin }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Дата рождения:</span>
                  {{ partyData?.birthday ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item checked">
                  <span>Телефон:</span>
                  {{ userData.phone }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>E-mail:</span>
                  {{ partyData?.email ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Пол:</span>
                  {{ partyData?.gender ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Образование:</span>
                  {{ partyData?.educationlevel ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Специальность:</span>
                  {{ partyData?.specialization ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Место работы:</span>
                  {{ partyData?.workPlace ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Должность:</span>
                  {{ partyData?.role ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Укажите область:</span>
                  {{ partyData?.region ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Населенный пункт:</span>
                  {{ partyData?.city ?? '-' }}
                </h4>

                <h4 class="partyData-content-infoBlock-item">
                  <span>Улица/Проспект/Мкр:</span>
                  {{ partyData?.streat ?? '-' }}
                </h4>

                <div class="partyData-content-infoBlock-bottom">
                  <h4 class="partyData-content-infoBlock-item">
                    <span>Дом:</span>
                    {{ partyData?.home ?? '-' }}
                  </h4>

                  <h4 class="partyData-content-infoBlock-item">
                    <span>Кв.:</span>
                    {{ partyData?.apartment ?? '-' }}
                  </h4>
                </div>

                <div class="partyData-content-infoBlock-statusBlock">
                  <div
                    class="partyData-content-infoBlock-status"
                    v-for="status of partyData?.status"
                  >
                    {{ status }}
                  </div>
                </div>
              </div>

              <p class="description">
                С Уставом и Программой партии «Respublica» ознакомлен(а)<br>
                Согласие на сбор и обработку своих персональных данных есть<br>
                Не являюсь членом другой политической партии
              </p>
            </div>

            <div class="partyData-card" v-if="partyData">
              <h5 class="partyData-card-subtitle">
                На сайте с {{ partyData?.dayOfRegistration }}
                <br>
                Член партии с {{ partyData?.dayOfAcceptance }}
                <br>
                <span v-if="partyData?.dayOfRequestToExitParty">
                  Подано заявление на выход из партий {{ partyData?.dayOfRequestToExitParty }}
                </span>
              </h5>

              <h5 class="partyData-card-title">Партийный билет</h5>

              <div class="partyData-card-items">
                <div class="partyData-cardInfo">
                  <div class="partyData-cardInfo-content">
                  
                    <h4 class="partyData-cardInfo-info number">
                      <span>Партийный билет</span>
                      №{{ partyData?.id }}
                    </h4>


                    <h4 class="partyData-cardInfo-info">
                      <span>Фамилия:</span>
                      {{ partyData?.lastName }}
                    </h4>
                    <h4 class="partyData-cardInfo-info">
                      <span>Имя:</span>
                      {{ partyData?.name }}
                    </h4>
                    <h4 class="partyData-cardInfo-info middleName">
                      <span>Отчество:</span>
                      {{ partyData?.middleName }}
                    </h4>


                    <h4 class="partyData-cardInfo-info dayOfAcceptance">
                      <span>Дата выдачи:</span>
                      {{ partyData?.dayOfAcceptance }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>


                <div class="partyData-cardInfo">
                  <div class="partyData-cardInfo-content">
                  
                    <h4 class="partyData-cardInfo-info number">
                      <span>Партиялық билет</span>
                      №{{ partyData?.id }}
                    </h4>


                    <h4 class="partyData-cardInfo-info">
                      <span>Тегі:</span>
                      {{ partyData?.lastName }}
                    </h4>
                    <h4 class="partyData-cardInfo-info">
                      <span>Аты:</span>
                      {{ partyData?.name }}
                    </h4>
                    <h4 class="partyData-cardInfo-info middleName">
                      <span>Әкесінің аты:</span>
                      {{ partyData?.middleName }}
                    </h4>


                    <h4 class="partyData-cardInfo-info dayOfAcceptance">
                      <span>Берілген күні:</span>
                      {{ partyData?.dayOfAcceptance }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>
              </div>

              <Button
                class="partyData-btn"
                name="Скачать партийный билет"
                type="outline-blue"
                v-slot:left
              >
                <SvgIcon
                  name="download"
                  :viewboxWidth="32"
                  :viewboxHeight="32"
                />
              </Button>
            </div>

            <div v-else>
              <Button
                @click="() => showJoinPartyModal = true"
                name="Вступить в партию"
                type="default-blue"
              />
            </div>
          </div>

          <RouterLink v-if="partyData" to="/client/party-data/exit-party">
            <Button
              class="partyData-btn exit"
              name="Выйти из партии"
              type="outline-red"
              v-slot:left
            >
              <SvgIcon
                name="logout"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>
          </RouterLink>
        </div>
      </div>
    </section>

    <JoinPartyModal
      :show="showJoinPartyModal"
      @hide="() => showJoinPartyModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import JoinPartyModal from '../../../components/uiLanding/feedback/joinPartyModal.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

const partyData = ref(null);
const userData = ref(null);
const showJoinPartyModal = ref(false);
const userID = localStorage.getItem('USER_ID');
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getUserData();
  getPartData();
})

const getUserData = () => {
  const url = `https://api.respublica.codetau.com/api/v1/users/me`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);

      userData.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}

const getPartData = () => {
  const url = `https://tri.codetau.com/partyCards?userID=${userID}`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      partyData.value = null;

      response.data.forEach(user => {
        partyData.value = user;
      });
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
    });
}
</script>

<style scoped lang="scss">
.wrapper-main {
  padding-top: 40px;
  background-color: var(--accent-color-op05);
}

.partyData {
  &-inner {
    display: grid;
    grid-template-columns: 780px 1fr;
    grid-gap: 30px;

    margin-bottom: 25px;
  }

  &-content {
    padding: 25px;

    border-radius: 10px;
    background: white;

    &-title {
      color: var(--accent-color);
      font-size: 30px;
      font-weight: 600;

      margin-bottom: 30px;
    }

    &-infoBlock {
      padding-bottom: 20px;
      margin-bottom: 20px;

      border-bottom: 1px solid var(--light-gray-color-op50);

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

      &-item:last-child {
        margin-bottom: 20px;
      }

      &-bottom {
        display: flex;
        grid-gap: 40px;
      }

      &-statusBlock {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        grid-gap: 12px;
      }

      &-status {
        color: var(--accent-color);
        font-size: 20px;
        font-weight: 500;

        display: inline-flex;
        padding: 10px 15px;

        border-radius: 60px;
        background: var(--accent-color-op10);
      }
    }
  }

  &-card {
    &-subtitle {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.4;
      margin-bottom: 30px;
    }

    &-title {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 25px;
    }

    &-items {
      display: flex;
      flex-direction: column;
      grid-gap: 15px;

      margin-bottom: 25px;
    }
  }

  &-cardInfo {
    display: block;
    height: 250px;
    width: 400px;

    position: relative;

    & img {
      height: 100%;
      width: 100%;
    }

    &-content {
      position: absolute;
      top: 80px;
      left: 32px;
    }

    &-info {
      color: white;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;

      &.number,
      &.middleName {
        margin-bottom: 12px;
      }

      &.dayOfAcceptance {
        font-size: 13px;
      }

      & span {
        color: rgba(white, .6);
        font-size: inherit;
        font-weight: 400;
      }
    }
  }

  &-btn {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 38px;

    &.exit {
      svg {
        fill: var(--red-color);
      }
    }

    & svg {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
