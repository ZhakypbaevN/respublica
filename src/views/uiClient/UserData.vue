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
              <h5 class="userData-card-title">{{ $t('party.party-card') }}</h5>

              <div class="userData-card-items">
                <div
                  class="userData-cardInfo"
                  v-for="lang of ['kaz', 'rus']"
                  :key="lang"
                >
                  <div class="userData-cardInfo-content">
                  
                    <h4 class="userData-cardInfo-info number">
                      <span>{{ $t(`party.party-card-${lang}.title`) }}</span>
                      №{{ partyData?.ticket_number }}
                    </h4>


                    <h4 class="userData-cardInfo-info">
                      <span>{{ $t(`party.party-card-${lang}.surname`) }}:</span>
                      {{ userData.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>{{ $t(`party.party-card-${lang}.name`) }}:</span>
                      {{ userData.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>{{ $t(`party.party-card-${lang}.middle-name`) }}:</span>
                      {{ userData.middle_name }}
                    </h4>


                    <h4 class="userData-cardInfo-info dayOfAcceptance">
                      <span>{{ $t(`party.party-card-${lang}.date-of-issue`) }}:</span>
                      {{ partyData?.join_date }}
                    </h4>

                  </div>
                  <img src="/img/icons/party-card.svg" alt="">
                </div>

              </div>

              <Button
                class="userData-btn"
                :name="$t('button.download-a-party-ticket')"
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
                :name="$t('feedback.join-the-party')"
                type="default-blue"
              />
            </div>
          </div>

          <RouterLink v-if="partyData" to="/client/party-data/exit-party">
            <Button
              class="userData-btn exit"
              :name="$t('button.quit-the-party')"
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
import UserDataBlock from '@/components/uiClient/user-data/UserDataBlock.vue'
import PartyDataBlock from '@/components/uiClient/user-data/PartyDataBlock.vue';
import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from '@/modules/toast'
import { reactive } from 'vue';

const { toast } = useToast()

const partyData = ref(null);
const userData = ref(null);
const showJoinPartyModal = ref(false);
const token = localStorage.getItem('access_token');

const isLoading = reactive({
  party: true,
  downloadPDF: false
})

onMounted(() => {
  getUserData();
  getPartData();
})

const getUserData = () => {
  const url = `https://api.respublica-partiyasy.kz/api/v1/users/me`;
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
  const url = `https://api.respublica-partiyasy.kz/api/v1/parties/memberships`;
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
  const url = `https://api.respublica-partiyasy.kz/api/v1/parties/memberships/pdf/${partyData.value.id}`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/pdf',
      Authorization: 'Bearer ' + token
    },
    responseType: 'arraybuffer'
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

  // Adaptation
  @media (max-width: 992px) {
    padding: 30px 0 60px;
  }

  @media (max-width: 768px) {
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}

.userData {
  &-inner {
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr auto;
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

  // Adaptation
  @media (max-width: 1200px) {
    &-inner {
      display: block;
    }

    &-mainInfo {
      margin-bottom: 30px;
    }

    &-card {
      &-title {
        font-size: 24px;
        margin-bottom: 22px;
      }

      &-items {
        grid-gap: 12px;
        margin-bottom: 22px;
      }
    }

    &-cardInfo {
      height: 200px;
      width: 320px;

      &-content {
        top: 62px;
        left: 24px;
      }

      &-info {
        font-size: 12px;

        &.number,
        &.middleName {
          margin-bottom: 10px;
        }

        &.join_date {
          font-size: 10px;
        }
      }
    }

    &-btn {
      grid-gap: 8px;
      margin-bottom: 38px;

      &.exit {
        padding: 10px 18px;
        
        svg {
          width: 26px;
          height: 26px;
        }
      }

      & svg {
        width: 28px;
        height: 28px;
      }
    }
  }

  @media (max-width: 992px) {
    &-mainInfo {
      margin-bottom: 30px;
    }

    &-card {
      &-title {
        font-size: 24px;
        margin-bottom: 22px;
      }

      &-items {
        grid-gap: 12px;
        margin-bottom: 22px;
      }
    }

    &-cardInfo {
      height: 200px;
      width: 320px;

      &-content {
        top: 62px;
        left: 24px;
      }

      &-info {
        font-size: 12px;

        &.number,
        &.middleName {
          margin-bottom: 10px;
        }

        &.join_date {
          font-size: 10px;
        }
      }
    }

    &-btn {
      grid-gap: 8px;
      margin-bottom: 38px;

      &.exit {
        padding: 10px 18px;
        
        svg {
          width: 26px;
          height: 26px;
        }
      }

      & svg {
        width: 28px;
        height: 28px;
      }
    }
  }

  @media (max-width: 576px) {
    &-mainInfo {
      margin-bottom: 20px;
    }

    &-card {
      &-title {
        font-size: 22px;
        margin-bottom: 20px;
      }

      &-items {
        grid-gap: 10px;
        margin-bottom: 20px;
      }
    }

    &-cardInfo {
      height: 175px;
      width: 280px;

      &-content {
        top: 54px;
        left: 22px;
      }

      &-info {
        font-size: 10px;

        &.number,
        &.middleName {
          margin-bottom: 8px;
        }

        &.join_date {
          font-size: 9px;
        }
      }
    }

    &-btn {
      grid-gap: 6px;
      margin-bottom: 36px;

      &.exit {
        padding: 8px 16px;
        
        svg {
          width: 24px;
          height: 24px;
        }
      }

      & svg {
        width: 26px;
        height: 26px;
      }
    }
  }
}
</style>
