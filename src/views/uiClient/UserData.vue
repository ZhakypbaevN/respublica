<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <div class="userData">
          <div class="userData-inner">
          
            <div class="userData-mainInfo">
              <UserDataBlock
                :userData="userData"
              />
              

              <PartyDataBlock
                :partyData="partyData"
                :loading="isLoading.party"
              />
            </div>

            <div class="userData-card" v-if="partyData && userData">
              <h5 class="userData-card-title">Партийный билет</h5>

              <div class="userData-card-items">
                <div class="userData-cardInfo">
                  <div class="userData-cardInfo-content">
                  
                    <h4 class="userData-cardInfo-info number">
                      <span>Партийный билет</span>
                      №{{ partyData?.ticket_number }}
                    </h4>


                    <h4 class="userData-cardInfo-info">
                      <span>Фамилия:</span>
                      {{ userData.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>Имя:</span>
                      {{ userData.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>Отчество:</span>
                      {{ userData.middle_name }}
                    </h4>


                    <h4 class="userData-cardInfo-info dayOfAcceptance">
                      <span>Дата выдачи:</span>
                      {{ partyData?.join_date }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>


                <div class="userData-cardInfo">
                  <div class="userData-cardInfo-content">
                  
                    <h4 class="userData-cardInfo-info number">
                      <span>Партиялық билет</span>
                      №{{ partyData?.ticket_number }}
                    </h4>


                    <h4 class="userData-cardInfo-info">
                      <span>Тегі:</span>
                      {{ userData.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>Аты:</span>
                      {{ userData.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>Әкесінің аты:</span>
                      {{ userData.middle_name }}
                    </h4>


                    <h4 class="userData-cardInfo-info dayOfAcceptance">
                      <span>Берілген күні:</span>
                      {{ partyData?.join_date }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>
              </div>

              <Button
                class="userData-btn"
                name="Скачать партийный билет"
                type="outline-blue"
                :loading="isLoading.downloadPDF"
                @click="() => downloadPDFCard()"
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
              class="userData-btn exit"
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
      @finish="getPartData"
    />
  </div>
</template>

<script setup lang="ts">
import UserDataBlock from '@/components/uiClient/userData/UserDataBlock.vue'
import PartyDataBlock from '@/components/uiClient/userData/PartyDataBlock.vue';
import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '@/modules/toast'
import { reactive } from 'vue';

const { toast } = useToast()

const partyData = ref(null);
const userData = ref(null);
const showJoinPartyModal = ref(false);
const token = localStorage.getItem('TOKEN');

const isLoading = reactive({
  party: true,
  downloadPDF: false
})

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
  const url = `https://api.respublica.codetau.com/api/v1/parties/memberships`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      if (response.data.status !== 'revoked') partyData.value = response.data;
      isLoading.party = false;
    })
    .catch((err) => {
      console.log('err', err);
      isLoading.party = false;
      // toast({
      //   message: 'Возникли ошибки при запросе'
      // })
    });
}

const downloadPDFCard = () => {
  isLoading.downloadPDF = true;
  console.log('userData', userData.value);
  const url = `https://api.respublica.codetau.com/api/v1/parties/memberships/pdf/${partyData.value.id}`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/pdf', // изменено значение заголовка accept
      Authorization: 'Bearer ' + token
    },
    responseType: 'arraybuffer' // добавлен responseType
  })
  .then((response) => {
    const blob = new Blob([response.data], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    isLoading.downloadPDF = false;
  })
  .catch((err) => {
    console.log('err', err);
    isLoading.downloadPDF = false;
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
  &-inner {
    display: grid;
    grid-template-columns: 780px 1fr;
    grid-gap: 30px;

    margin-bottom: 25px;
  }

  &-mainInfo {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
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
    margin-bottom: 38px;

    &.exit {
      padding: 12px 20px;
      
      svg {
        width: 30px;
        height: 30px;

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
