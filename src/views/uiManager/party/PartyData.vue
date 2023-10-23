<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <h2 class="landing-title">Партийные данные</h2>

        <div class="userData">
          <div class="userData-inner">
            <div class="userData-mainInfo">
              <UserDataBlock
                :userData="partyData?.user"
              />

              <PartyDataBlock
                :partyData="partyData"
                :loading="!partyData"
                @edit="() => showModal.edit = true"
              />
            </div>

            <div class="userData-card" v-if="partyData">
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

          <Button
            v-if="partyData && partyData?.status !== 'revoked'"
            class="userData-btn exit"
            name="Удалить из партии"
            type="outline-red"
            v-slot:left
            @click="() => showModal.delete = true"
          >
            <SvgIcon
              name="trash"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Button>
        </div>
      </div>
    </section>

    <DeleteModal
      :show="showModal.delete"
      :id="route.params.party_id"
      @hide="() => showModal.delete = false"
    />

    <JoinPartyModal
      :show="showModal.edit"
      :data="partyData"
      @hide="() => showModal.edit = false"
      @finish="getPartData"
    />
  </div>
</template>

<script setup lang="ts">
import UserDataBlock from '../../../components/uiClient/userData/userDataBlock.vue'
import PartyDataBlock from '../../../components/uiClient/userData/partyDataBlock.vue';
import DeleteModal from '../../../components/uiManager/party/deleteModal.vue'
import JoinPartyModal from '../../../components/uiManager/party/editModal.vue';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useToast } from '../../../modules/toast'
import { reactive } from 'vue';

const { toast } = useToast()
const route = useRoute()

const partyData = ref(null);
const showModal = reactive({
  delete: false,
  edit: false
});
const token = localStorage.getItem('TOKEN');

onMounted(() => {
  getPartData();
})

const getPartData = () => {
  const url = `https://api.respublica.codetau.com/api/v1/admin/parties/memberships/${route.params.party_id}`;
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
  padding-top: 40px;
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
