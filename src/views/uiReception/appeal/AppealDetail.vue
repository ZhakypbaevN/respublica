<template>
  <section class="appealDetail wrapper-main" v-if="appealData">
    <div class="newsEdit-header wrapper">
      <BackButton />
    </div>

    <div class="appealDetail-inner wrapper">
      <div>
        <div class="appealDetail-block">
          <div class="appealDetail-block-top">
            <AppealCategory
              :title="appealData.category.title"
              :color="appealData.category.color"
            />

            <p class="appealDetail-info-value">{{ appealData.title }}</p>

            <div class="appealDetail-info-item vertical">
              <h4 class="appealDetail-info-title">Описание</h4>
              <p>{{ appealData.description }}</p>
            </div>
          </div>

          <h3 class="appealDetail-block-title">Прикрепленные файлы</h3>

          <div class="appealDetail-block-userInfos">
            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Фото:</h4>
              <div class="appealDetail-info-value-mediaFiles">
                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-7.jpg);`"
                ></div>

                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-6.jpg);`"
                ></div>
              </div>
            </div>

            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Видео:</h4>
              <div class="appealDetail-info-value-mediaFiles">
                <div
                  class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                  :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-7.jpg);`"
                ></div>
              </div>
            </div>

            <div class="appealDetail-info-item mediaFiles">
              <h4 class="appealDetail-info-title">Документ:</h4>
              <div class="appealDetail-info-value-docs">
                <a class="appealDetail-info-value-docs-item" href="#">ТЗ по мобильному приложению (1).docx</a>
              </div>
            </div>
          </div>
        </div>
        
        <div
          v-if="appealData.request_info.statusCode != 'new' && appealData.request_info.statusCode != 'accepted'"
          :class="`appealDetail-answerBlock appealDetail-block ${appealData.request_info.statusCode}`"
        >
          <div class="appealDetail-answerBlock-header">
            <h3 class="appealDetail-answerBlock-header-title">Ответ на обращение</h3>
            <p class="appealDetail-answerBlock-header-type">{{ appealData.request_info.status }}</p>
          </div>

          <div class="appealDetail-answerBlock-content">
            <p>
              Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; <br>
              На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; <br>
              Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.
            </p>
            <br>
            
            <h3 class="appealDetail-block-title">Прикрепленные файлы</h3>

            <div class="appealDetail-block-userInfos">
              <div class="appealDetail-info-item mediaFiles">
                <h4 class="appealDetail-info-title">Фото:</h4>
                <div class="appealDetail-info-value-mediaFiles">
                  <div
                    class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                    :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-7.jpg);`"
                  ></div>

                  <div
                    class="appealDetail-info-value-mediaFiles-item bg-cover withZoomPreview-preview-img"
                    :style="`background-image: url(https://respublica-partiyasy.kz/img/uiLanding/home/about-party/events-6.jpg);`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="appealData.request_info.statusCode == 'new'"
          class="appealDetail-btns"
        >
          <Button
            name="Принять"
            type="default-green"
            @click="() => onToAccept('accepted')"
          />
          <Button
            name="Отправить на доработку"
            type="default-blue"
            @click="() => onShowFormModal('in-revision')"
          />
          <Button
            name="Отклонить"
            type="default-red"
            @click="() => onShowFormModal('rejected')"
          />
        </div>
        <div
          v-if="appealData.request_info.statusCode == 'accepted'"
          class="appealDetail-btns"
        >
          <Button
            name="Завершить"
            type="default-blue"
            @click="() => onShowFormModal('finish')"
          />
        </div>
      </div>

      <div>
        <div class="appealDetail-block">
          <h3 class="appealDetail-block-title">Данные пользователя</h3>

          <div class="appealDetail-userInfos">
            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">ФИО:</h4>
              <p class="appealDetail-info-value">{{ appealData.user_info.name }}</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Телефон:</h4>
              <p class="appealDetail-info-value">{{ appealData.user_info.phone }}</p>
            </div>

            <div class="appealDetail-info-item status">
              <h4 class="appealDetail-info-title">Статус:</h4>
              <p class="appealDetail-info-value blue">{{ appealData.user_info.status }}</p>
            </div>

            <div class="appealDetail-info-item">
              <h4 class="appealDetail-info-title">Локация:</h4>
              <p class="appealDetail-info-value">{{ appealData.user_info.location }}</p>
            </div>
          </div>
        </div>

        <div class="appealDetail-block">
          <div class="appealDetail-info-item">
            <h4 class="appealDetail-info-title">Создано:</h4>
            <p class="appealDetail-info-value">{{ appealData.request_info.created_date }}</p>
          </div>
        </div>

        <div
          v-if="appealData.request_info.statusCode != 'new'"
          class="appealDetail-block"
        >
          <div class="appealDetail-info-item status">
            <h4 class="appealDetail-info-title">Статус обращения:</h4>
            <p class="appealDetail-info-value">{{ appealData.request_info.status_date }}</p>
          </div>

          <AppealStatus
            :title="appealData.request_info.status"
            :code="appealData.request_info.statusCode"
          />
        </div>
      
        <AppealHistory v-if="appealData.request_info.statusCode != 'new'" />
      </div>
    </div>

    <AppealFormModal
      :show="isShowFormModal"
      :type="isTypeForm"
      @hide="onHideFormModal"
      @finish="onToFinish"
    />

    <AppealMessageModal
      :show="isShowMessageModal"
      @hide="onHideMessageModal"
      :title="isTitlesMessage.title"
      :subtitle="isTitlesMessage.subtitle"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRoute } from 'vue-router';

  import { useToast } from '@/modules/toast'

  import AppealCategory from '@/components/uiReception/AppealCategory.vue';
  import AppealHistory from '@/components/uiReception/AppealHistory.vue';
  import AppealStatus from '@/components/uiReception/AppealStatus.vue';
  import AppealFormModal from '@/components/uiReception/AppealFormModal.vue';
  import AppealMessageModal from '@/components/uiReception/AppealMessageModal.vue';

  const { toast } = useToast()
  const route = useRoute();

  const isShowMessageModal = ref<boolean>(false);
  const isShowFormModal = ref<boolean>(false);

  const isTypeForm = ref<string>('in-revision');
  const isTitlesMessage = reactive<any>({
    title: '',
    subtitle: null
  });

  const appealList = [
    {
      id: 1,
      category: {
        title: 'Иммиграция и миграция',
        color: '#28C397',
      },
      title: "Участие в мероприятиях. Вступление в партию",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whopr-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от неё их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Новое",
        statusCode: "new",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 2,
      category: {
        title: 'Агропромышленный комплекс',
        color: '#9BC328',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Новое",
        statusCode: "new",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 3,
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Новое",
        statusCode: "new",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 4,
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Новое",
        statusCode: "new",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 5,
      category: {
        title: 'Судебная и правоохранительная система',
        color: '#C35728',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Принято",
        statusCode: "accepted",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 6,
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Не решенный",
        statusCode: "rejected",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 7,
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Разъяснение",
        statusCode: "in-revision",
        status_date: "25 июля 2023 г."
      },
    },
    {
      id: 8,
      category: {
        title: 'Банки и иные кредитные организации',
        color: '#338DE0',
      },
      title: "Жалоба",
      description: "Вы можете войти в WhatsApp Web с компьютера, ноутбука или макбука, для этого кликните по зеленой кнопке выше. Используйте тот же браузер, через который просматриваете наш сайт whapp-club.com; На странице входа просканируйте QR-код через мобильную версию WhatsApp на телефоне. Компьютерная и веб версия мессенджера работают с ней в паре, отдельно от нее их запустить не получится. Если возникнут трудности с авторизацией, на странице входа есть видеоинструкция; Если вы не снимали галочку с параметра «Оставаться в системе», WhatsApp Web будет оставаться онлайн, пока вы не выйдете из него сами, вручную, либо пока не пропадет связь с телефоном. Поэтому: 1) держите телефон рядом; 2) не выключайте его; 3) не закрывайте на нем приложение; 4) и не отключайте интернет.",
      user_info: {
        name: "Киценко Артем",
        phone: "+7 707 875 58 58",
        status: "Член партии Respublica",
        location: "Алматинская область, г. Алматы"
      },
      request_info: {
        created_date: "15 июля 2023 г.",
        status: "Положительно решенные",
        statusCode: "finish",
        status_date: "25 июля 2023 г."
      },
    }
  ]

  const appealData = ref(appealList.find(appeal => appeal.id.toString() == route.params.appeal_id) ?? appealList[0]);

  const onToAccept = (status: string) => {
    appealData.value.request_info.status = 'Принято';
    appealData.value.request_info.statusCode = status;

    onShowMessageModal(
      'УСПЕШНО ПРИНЯТО',
      'Обращение пользователя'
    )
  }

  const onToFinish = (status: string) => {
    appealData.value.request_info.status = 'Положительно решенные'
    if (status == 'in-revision') appealData.value.request_info.status = 'Разъяснение'
    if (status == 'rejected') appealData.value.request_info.status = 'Не решенный'

    appealData.value.request_info.statusCode = status;

    isShowFormModal.value = false;
    onShowMessageModal(
      'УСПЕШНО ОТПРАВЛЕН'
    )
  }

  const onShowMessageModal = (title: string, subtitle?: string) => {
    isShowMessageModal.value = true;
    isTitlesMessage.title = title;
    isTitlesMessage.subtitle = subtitle;
  }

  const onShowFormModal = (status: string) => {
    isShowFormModal.value = true;
    isTypeForm.value = status;
  }

  const onHideMessageModal = () => isShowMessageModal.value = false;
  const onHideFormModal = () => isShowFormModal.value = false;
</script>

<style scoped lang="scss">
.wrapper-main {
  min-height: 100%;
  grid-gap: 20px;
  
  padding: 40px 0 200px;
  background-color: var(--accent-color-op05);

  justify-content: start !important;
}

.appealDetail {
  &-inner {
    display: grid;
    grid-template-columns: 1fr 425px;
    grid-gap: 20px;
  }

  &-block {
    border-radius: 10px;
    background: var(--white-color);
    
    padding: 25px;
    margin-bottom: 20px;

    &-top {
      display: flex;
      flex-direction: column;
      grid-gap: 24px;
      margin-bottom: 28px;
    }

    &-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    &-userInfos {
      display: flex;
      flex-direction: column;
      grid-gap: 8px;

      margin-bottom: 30px;
    }
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }

  &-userInfos {
    &-mainInfo {
      margin-bottom: 20px;
    }

    & .appealDetail-info-item {
      margin-bottom: 6px;
    }
  }

  &-info {
    &-item {
      display: flex;
      align-items: center;
      grid-gap: 16px;

      &.vertical {
        flex-direction: column;
        align-items: flex-start;

        & .appealDetail-info-title {
          margin-bottom: 4px;
        }
      }

      &.mediaFiles {
        align-items: flex-start;
        margin-bottom: 20px;
      }

      &.status {
        margin-bottom: 20px;
      }

      & .appealDetail-info-title {
        margin-bottom: 0px;
      }
    }

    &-title {
      min-width: 100px;

      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 400;

      margin-bottom: 15px;
    }

    &-value {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0px;

      &.blue {
        color: var(--accent-color);
      }

      &-mediaFiles {
        display: grid;
        grid-template-columns: repeat(3, 170px);
        grid-gap: 15px;

        &-item {
          height: 110px;
        }
      }

      &-docs {
        display: flex;
        flex-direction: column;
        grid-gap: 14px;

        &-item {
          font-size: 18px;
          font-weight: 500;
          color: var(--accent-color);
          text-decoration: underline;
        }
      }
    }
  }

  &-answerBlock {
    padding: 0px;

    border: 1px solid var(--green-color);
    border-radius: 0px 10px 10px 10px;

    &.in-revision {
      border-color: var(--accent-color);

      & .appealDetail-answerBlock-header {
        &-title {
          background-color: var(--accent-color);
        }

        &-type {
          color: var(--accent-color);
        }
      }
    }

    &.rejected {
      border-color: var(--red-color);

      & .appealDetail-answerBlock-header {
        &-title {
          background-color: var(--red-color);
        }

        &-type {
          color: var(--red-color);
        }
      }
    }

    &.finish {
      border-color: var(--green-color);

      & .appealDetail-answerBlock-header {
        &-title {
          background-color: var(--green-color);
        }

        &-type {
          color: var(--green-color);
        }
      }
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-right: 38px;
      margin-bottom: 20px;

      &-title {
        width: fit-content;

        color: var(--white-color);
        font-size: 18px;
        font-weight: 700;
        
        border-radius: 0px 10px 10px 0px;

        padding: 20px 25px;

      }

      &-type {
        font-size: 18px;
        font-weight: 700;
      }
    }

    &-content {
      padding: 0 24px 24px;
    }
  }
}
</style>
