<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <h2 class="landing-title">Выход из партий</h2>

        <div class="userData" v-if="partyData">
          <div class="userData-inner">

            <div>
              <div class="userData-content">
                <div class="userData-motive">
                  <h4 class="userData-motive-title">Причина:</h4>
                  <p class="userData-motive-text">{{ partyData.reason_for_resignation }}</p>
                </div>

                <div class="userData-doc">
                  <h4 class="userData-doc-title">Документ:</h4>
                  <div class="userData-doc-namEwithAction">
                    <a class="userData-doc-name" :href="'https://api.respublica.codetau.com/' + partyData.document">{{ partyData.document }}</a>
                  </div>
                </div>
              </div>

              <!-- <div class="userData-content">
                <div class="userData-motive">
                  <h4 class="userData-motive-title">Причина отказа:</h4>
                  <p class="userData-motive-text">{{ partyData.reason_for_resignation }}</p>
                </div>

                <div class="userData-doc">
                  <h4 class="userData-doc-title">Документ:</h4>
                  <div class="userData-doc-namEwithAction">
                    <a class="userData-doc-name" :href="'https://api.respublica.codetau.com/' + partyData.document">{{ partyData.document }}</a>
                  </div>
                </div>
              </div> -->

              <div class="userData-content">
                <h2 class="userData-content-title">
                  {{ `${partyData.user.last_name} ${partyData.user.first_name} ${partyData.user.middle_name ?? ''}` }}
                </h2>

                <div class="userData-content-infoBlock">
                  <h4 class="userData-content-infoBlock-item checked">
                    <span>ИИН:</span>
                    {{ partyData.user.iin }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Дата рождения:</span>
                    {{ partyData.membership.birth_date ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item checked">
                    <span>Телефон:</span>
                    {{ partyData.user.phone }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>E-mail:</span>
                    {{ partyData.user.email ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Пол:</span>
                    {{ partyData.membership.gender === 'male' ? 'Мужчина' : partyData.membership.gender === 'female' ? 'Женщина' : '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Образование:</span>
                    {{ partyData.membership.education === 'higher_education' ? 'Высшее образование' : partyData.membership.education === 'secondary_special_education' ? 'Среднее образование' : '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Специальность:</span>
                    {{ partyData.membership.specialty ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Место работы:</span>
                    {{ partyData.membership.workplace ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Должность:</span>
                    {{ partyData.membership.position ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Область:</span>
                    {{ partyData.membership.location?.parent?.name ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Населенный пункт:</span>
                    {{ partyData.membership.location?.name ?? '-' }}
                  </h4>

                  <h4 class="userData-content-infoBlock-item">
                    <span>Улица/Проспект/Мкр:</span>
                    {{ partyData.membership.street ?? '-' }}
                  </h4>

                  <div class="userData-content-infoBlock-bottom">
                    <h4 class="userData-content-infoBlock-item">
                      <span>Дом:</span>
                      {{ partyData.membership.house ?? '-' }}
                    </h4>

                    <h4 class="userData-content-infoBlock-item">
                      <span>Кв.:</span>
                      {{ partyData.membership.apartment ?? '-' }}
                    </h4>
                  </div>

                  <div class="userData-content-infoBlock-statusBlock">
                    <div v-if="partyData.membership.is_pensioner" class="userData-content-infoBlock-status">
                      Пенсионер
                    </div>

                    <div v-if="partyData.membership.is_disabled" class="userData-content-infoBlock-status">
                      Инвалид
                    </div>

                    <div v-if="partyData.membership.is_unemployed" class="userData-content-infoBlock-status">
                      Безработный
                    </div>

                    <div v-if="partyData.membership.is_on_childcare_leave" class="userData-content-infoBlock-status">
                      Находящиеся в отпуске по уходу за детьми
                    </div>
                  </div>
                </div>

                <p class="description">
                  С <a href="/doc/ru/Устав_проект_новой_редакции_устав_в_новой_редакции_29_07_2023.pdf" target="_blank">Уставом</a> и <a href="/doc/ru/Программа партии_.pdf" target="_blank">Программой партии</a> «Respublica» ознакомлен(а)<br>
                  Согласие на сбор и обработку своих персональных данных есть<br>
                  Не являюсь членом другой политической партии
                </p>
              </div>
            </div>

            <div class="userData-card" v-if="partyData">
              <h5 class="userData-card-title">Партийный билет</h5>

              <div class="userData-card-items">
                <div class="userData-cardInfo">
                  <div class="userData-cardInfo-content">
                  
                    <h4 class="userData-cardInfo-info number">
                      <span>Партийный билет</span>
                      №{{ partyData.membership.ticket_number }}
                    </h4>


                    <h4 class="userData-cardInfo-info">
                      <span>Фамилия:</span>
                      {{ partyData.user.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>Имя:</span>
                      {{ partyData.user.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>Отчество:</span>
                      {{ partyData.user.middle_name }}
                    </h4>


                    <h4 class="userData-cardInfo-info dayOfAcceptance">
                      <span>Дата выдачи:</span>
                      {{ partyData.membership.join_date }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>


                <div class="userData-cardInfo">
                  <div class="userData-cardInfo-content">
                  
                    <h4 class="userData-cardInfo-info number">
                      <span>Партиялық билет</span>
                      №{{ partyData.membership.ticket_number }}
                    </h4>


                    <h4 class="userData-cardInfo-info">
                      <span>Тегі:</span>
                      {{ partyData.user.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>Аты:</span>
                      {{ partyData.user.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>Әкесінің аты:</span>
                      {{ partyData.user.middle_name }}
                    </h4>


                    <h4 class="userData-cardInfo-info dayOfAcceptance">
                      <span>Берілген күні:</span>
                      {{ partyData.membership.join_date }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>
              </div>

              <Button
                class="userData-btn"
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
          </div>

          <div class="userData-bottom" v-if="partyData.status === 'pending'">
            <Button
              class="userData-btn exit"
              name="Подтвердить выход"
              type="default-red"
              v-slot:left
              @click="() => showModal.confirm = true"
            >
              <SvgIcon
                name="logout"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>

            <Button
              type="default-grey"
              name="Отказать"
              @click="() => showModal.cancel = true"
            />
          </div>



          <ConfirmModal
            :show="showModal.confirm"
            :id="partyData.id"
            @hide="() => showModal.confirm = false"
          />

          <CancelModal
            :show="showModal.cancel"
            :id="partyData.id"
            @hide="() => showModal.cancel = false"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ConfirmModal from '../../../components/uiManager/party/confirmModal.vue'
import CancelModal from '../../../components/uiManager/party/cancelModal.vue'

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'
import { reactive } from 'vue';

const { toast } = useToast()
const route = useRoute()

const partyData = ref(null);
const showModal = reactive({
  confirm: false,
  cancel: false,
})
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getPartData();
})

const getPartData = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/parties/memberships/resignations/${route.params.party_id}`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      partyData.value = response.data;
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
  padding: 40px 0 80px;
  background-color: var(--accent-color-op05);
}

.userData {
  & .userData-content:last-of-type {
    margin-bottom: 0px;
  }

  &-inner {
    display: grid;
    grid-template-columns: 780px 1fr;
    grid-gap: 30px;

    margin-bottom: 25px;
  }

  &-motive {
    display: flex;
    grid-gap: 9px;
    margin-bottom: 20px;

    &-title {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
    }

    &-text {
      color: var(--gray-color);
      font-size: 20px;
    }
  }

  &-doc {
    &-title {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
    }

    &-name {
      color: var(--accent-color);
      font-size: 20px;
      text-decoration-line: underline;
      margin-bottom: 0px !important;
    }
  }


  &-content {
    padding: 25px;
    margin-bottom: 25px;

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

      &.join_date {
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

    &.exit {
      padding: 12px 20px;
      
      svg {
        width: 30px;
        height: 30px;

        fill: white;
      }
    }

    & svg {
      width: 32px;
      height: 32px;
    }
  }

  &-bottom {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
