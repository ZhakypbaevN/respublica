<template>
  <div class="wrapper-main">
    <section class="myRequests">
      <div class="wrapper">
        <h2 class="landing-title">{{ $t('party.party-data') }}</h2>

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
                      {{ partyData.user.last_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info">
                      <span>{{ $t(`party.party-card-${lang}.name`) }}:</span>
                      {{ partyData.user.first_name }}
                    </h4>
                    <h4 class="userData-cardInfo-info middleName">
                      <span>{{ $t(`party.party-card-${lang}.middle-name`) }}:</span>
                      {{ partyData.user.middle_name }}
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
                name="Скачать партийный билет"
                type="outline-blue"
                v-slot:left
                @click="downloadPDFCard"
                :loading="isLoadingPDF"
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
            :name="$t('button.remove-from-the-batch')"
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
      :id="route.params.party_id.toString()"
      @hide="() => showModal.delete = false"
    />

    <EditPartyModal
      v-if="showModal.edit"
      :partyData="partyData"
      @hide="() => showModal.edit = false"
      @finish="getPartData"
    />
  </div>
</template>

<script setup lang="ts">
  import UserDataBlock from '@/components/uiClient/user-data/UserDataBlock.vue'
  import PartyDataBlock from '@/components/uiClient/user-data/PartyDataBlock.vue';
  import DeleteModal from '@/components/uiManager/party-members/DeleteModal.vue'
  import EditPartyModal from '@/components/uiManager/party-members/create/EditPartyModal.vue';

  import axios from 'axios';

  import { onMounted, ref, reactive } from 'vue';
  import { useRoute } from 'vue-router'

  import { useToast } from '@/modules/toast'

  const { toast } = useToast()
  const route = useRoute()

  const isLoadingPDF = ref(false);
  const partyData = ref(null);
  const showModal = reactive({
    delete: false,
    edit: false
  });
  const token = localStorage.getItem('access_token');

  onMounted(() => {
    getPartData();
  })


  const getPartData = () => {
    const url = `https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/${route.params.party_id}`;
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

  const downloadPDFCard = () => {
    isLoadingPDF.value = true;
    const url = `https://api.respublica-partiyasy.kz/api/v1/parties/memberships/pdf/${route.params.party_id}`;
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
      isLoadingPDF.value = false;
    })
    .catch((err) => {
      console.log('err', err);
      isLoadingPDF.value = false;
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
