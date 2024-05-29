<template>
  <section class="newsEdit">
    <div class="wrapper" v-if="isLoading.page">
      <div class="newsEdit-header">
        <BackButton />
      </div>

      <h2 class="landing-title">
        {{
          route.params.news_id
            ? $t('page.edit-news-for-the-faction')
            : $t('page.create-press-about-us')
        }}
      </h2>

      <div class="newsEdit-loading">
        <Loading
          name="sk"
          :width="80"
          :height="80"
          color="#4A78EC"
        />
      </div>
    </div>

    <div class="wrapper" v-else>
      <div class="newsEdit-header">
        <BackButton />

        <div class="newsEdit-header-right">
          <PublishToggle
            :data="newsData.ru"
            @finish="() => {
              newsData.ru.published = !newsData.ru.published;
              newsData.kz.published = !newsData.kz.published;
            }"
          />
          <Button
            v-if="route.params.news_id"
            class="newsEdit-header-delete"
            type="default-light-red"
            @click.stop="() => showDeleteModal = true"
          >
            <SvgIcon
              name="trash-edit-with-bg"
              :viewboxWidth="50"
              :viewboxHeight="50"
            />
          </Button>
        </div>
      </div>

      <h2 class="landing-title">
        {{
          route.params.news_id
            ? $t('page.edit-news-for-the-faction')
            : $t('page.create-press-about-us')
        }}
      </h2>

      <Form
        @finish="postNews"
        class="newsEdit-form"
      >
        <div class="newsEdit-form-main">
          <div>
            <div class="newsEdit-formItem date">
              <label for="" class="newsEdit-formItem-label">{{ $t('formdata.release-day') }}</label>

              <DatePicker time-picker :value="newsData.ru.created_at" @change="handleSelectDay">
                <Input
                  name="datePublish"
                  v-model="newsData.ru.created_at_forInput"
                  :placeholder="$t('formdata.choose-the-day-of-release')"
                  staticPlaceholder
                  required
                />
              </DatePicker>
            </div>
            
            <div class="newsEdit-formsBlock">
              <div class="newsEdit-formsBlock-bookmarkItems">
                <button
                  v-for="bookmark of langItems"
                  :key="bookmark.value"

                  class="newsEdit-formsBlock-bookmarkItems-btn"
                  :class="{active: showForm === bookmark.value}"
                  @click="() => showForm = bookmark.value"
                  type="button"
                >
                  {{ bookmark.title }}
                </button>
              </div>
              
              <div
                class="newsEdit-formsBlock-item"
                :class="{show: showForm === lang.value}"
                v-for="lang of langItems"
                :key="lang.value"
              >
                <div class="newsEdit-form-inputs">
                  <div class="newsEdit-formItem">
                    <label :for="`${lang.value}-title`" class="newsEdit-formItem-label">{{ lang.form.titleInput.title }}</label>
                    <Input
                      :name="`${lang.value}-title`"
                      type="textarea"
                      :placeholder="lang.form.titleInput.placeholder"
                      :maxSymbol="150"
                      v-model="newsData[lang.value].title"
                      staticPlaceholder
                      required
                    />
                  </div>

                  <div class="newsEdit-formItem">
                    <label :for="`${lang.value}-preview_text`" class="newsEdit-formItem-label">{{ lang.form.subtitleInput.title }}</label>
                    <Input
                      :name="`${lang.value}-preview_text`"
                      type="textarea"
                      :placeholder="lang.form.subtitleInput.placeholder"
                      :maxSymbol="250"
                      v-model="newsData[lang.value].preview_text"
                      staticPlaceholder
                      required
                    />
                  </div>

                  <div class="newsEdit-formItem">
                    <label :for="`${lang.value}-content`" class="newsEdit-formItem-label">{{ lang.form.contentInput.title }}</label>
                    <Input
                      :name="`${lang.value}-content`"
                      v-model="newsData[lang.value].content"
                      staticPlaceholder
                      type="editor"
                      class="newsEdit-formItem-content"
                      :placeholder="lang.form.contentInput.placeholder"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Upload
            class="newsEdit-form-preview"
            name="preview"
            v-model="newPhotoFile"
            :preview="newsData.ru.preview_image"
            :aspectRatio="16 / 9"
            :height="495"
            :width="880"
            :previewBottom="56.36"
            required
          />
        </div>

        <NewsComments
          v-if="route.params.news_id"
          :newsID="route.params.news_id.toString()"
        />

        <Button
          :name="
            route.params.news_id
              ? $t('button.save')
              : $t('button.create')
          "
          :loading="isLoading.btn"
          htmlType="submit"
        />
      </Form>

      <DeleteModal
        v-if="route.params.news_id"
        :show="showDeleteModal"
        :id="newsData.ru?.id"
        @click.stop
        @hide="() => showDeleteModal = false"
        @finish="onDeletedNews"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import PublishToggle from '@/components/uiMassMedia/common-for-edit/PublishToggle.vue'
  import NewsComments from '@/components/uiMassMedia/common-for-edit/NewsComments.vue';
  import DeleteModal from '@/components/uiMassMedia/news/DeleteModal.vue'

  import moment from 'moment';

  import { useI18n } from 'vue-i18n'
  import { ref, reactive, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router';

  import { useToast } from '@/modules/toast'
  import getFileUrl from '@/helpers/getFileUrlByDate.js'

  import { INews } from '@/types/news';
  import { getMediaNewsData, postMediaNewsData, putMediaNewsData } from '@/actions/uiMedia/news';

  type INewsForm = {
    ru: INews,
    kz: INews
  }

  const route = useRoute()
  const router = useRouter()

  const { t } = useI18n()
  const { toast } = useToast()

  const isLoading = reactive({
    page: true,
    btn: false
  })
  const newsData = reactive<INewsForm>({
    ru: null,
    kz: null
  })

  const langItems = [
    {
      title: 'Русский',
      value: 'ru',
      api: 'ru-RU',

      form: {
        titleInput: {
          title: 'Заголовок',
          placeholder: 'Введите заголовок'
        },
        subtitleInput: {
          title: 'Подзаголовок',
          placeholder: 'Введите подзаголовок'
        },
        contentInput: {
          title: 'Контент',
          placeholder: 'Введите контент'
        }
      }
    },
    {
      title: 'Қазақша',
      value: 'kz',
      api: 'kz-KZ',

      form: {
        titleInput: {
          title: 'Атауы',
          placeholder: 'Тақырыпты енгізіңіз'
        },
        subtitleInput: {
          title: 'Қысқа мазмұны',
          placeholder: 'Қысқаша мазмұнын енгізіңіз'
        },
        contentInput: {
          title: 'Мазмұн',
          placeholder: 'Мазмұнын енгізіңіз'
        }
      }
    }
  ];

  const showForm = ref('ru');
  const newPhotoFile = ref(null);
  const showDeleteModal = ref(false);

  const handleSelectDay = (day: Date): void => {
    newsData.ru.created_at = day.toString();
    newsData.ru.created_at_forInput = moment(day.toString()).format('YYYY-MM-DD HH:mm');
  }

  // Get News
  onMounted(async () => {
    if (route.params.news_id) {
      for (const lang of langItems) {
        const response = await getMediaNewsData(route.params.news_id.toString(), lang.api);

        if (response) newsData[lang.value] = response.data;
        newsData[lang.value].preview_image = getFileUrl(response.data.preview_image);
        newsData[lang.value].created_at = response.data.created_at;
        newsData[lang.value].created_at_forInput = moment(response.data.created_at).format('YYYY-MM-DD HH:mm');

        if (lang.value === 'kz') isLoading.page = false;
      }
    } else {
      const defaultValues = {
        title: '',
        preview_text: '',
        content: '',
        published: true,
        created_at: Date.now().toString(),
        created_at_forInput: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        preview_image: null
      }

      newsData.ru = Object.assign({}, defaultValues);
      newsData.kz = Object.assign({}, defaultValues);
      isLoading.page = false;
    }
  })

  // Post
  const postNews = async () => {
    isLoading.btn = true;
    let newsID = route.params.news_id;
    
    try {
      for (const lang of langItems) {
        const formData = new FormData();
  
        for (const key in newsData[lang.value]) {
          if (key === 'created_at') formData.append(key, moment(newsData.ru[key]).format('YYYY-MM-DD[T]HH:mm:ss'));
          else if (key !== 'preview_image' && newsData[lang.value][key]) formData.append(key, newsData[lang.value][key]);
        }
  
        if (newPhotoFile.value) formData.append("preview_image", newPhotoFile.value);
        formData.append("alias_category", 'news-for-fraction');

        if (newsID) await putMediaNewsData(newsID.toString(), formData, lang.api)
        else newsID = (await postMediaNewsData(formData, lang.api)).id.toString();
      }
      
      toast({
        message: route.params.news_id
        ? t('message.the-news-was-successfully-updated')
        : t('message.the-news-was-successfully-created'),
        type: 'success'
      })
      router.replace(`/media/news-for-fraction/${newsID}`);

    } finally {
      isLoading.btn = false
    }
  }

  const onDeletedNews = () => {
    setTimeout(() => router.push('/media/news-for-fraction?offset=0&limit=20&published=true&search='), 300);
  }
</script>

<style scoped lang="scss">
.newsEdit {
  min-height: 100%;

  padding: 40px 0;
  background-color: var(--accent-color-op05);
  
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 30px;

    &-right {
      display: flex;
      grid-gap: 20px;
    }

    &-delete {
      height: 50px;
      width: 50px;

      cursor: pointer;
      padding: 0px !important;
      
      & svg {
        height: 50px;
        width: 50px;
        stroke: var(--red-color);

        transition: all .3s ease-in-out;
      }
    }
  }

  &-formsBlock {
    grid-column: 1/2;
    filter: drop-shadow(5px 5px 10px rgba(black, .02));
    
    & .newsEdit-formItem:last-child {
      margin-bottom: 0px;
    }

    &-bookmarkItems {
      display: flex;
      padding-left: 20px;
      
      &-btn {
        display: inline-block;
        position: relative;

        padding: 14px 30px;
        background-color: #d1d3d71a;
        border-radius: 10px 10px 0 0;

        font-size: 18px;
        font-weight: 600;
        color: var(--light-gray-color);

        transition: all .3s ease-in-out;

        &:hover {
          color: var(--accent-color-op80);
          background-color: var(--primary-color-op10);
        }

        &.active {
          color: var(--accent-color-op80);
          background-color: white;

          &::before,
          &::after {
            opacity: 1;
          }
        }

        &::before,
        &::after {
          content: '';
          pointer-events: none;
          opacity: 0;
          
          position: absolute;
          left: calc(100% - 1px);
          bottom: -1px;
          z-index: 2;

          display: block;
          height: 22px;
          width: 22px;

          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzM0NDBfNDA2NSkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIwLjEzMDkgLTE5LjI1NDlIMC4xMzA4NTlWMC43NDUxMTdWMjAuNzQ1MUgyMC4xMzA5SDQwLjEzMDlWMC43NDUxMTdWLTE5LjI1NDlIMjAuMTMwOVpNMjAuMTMwOSAtMTkuMjU0OUMzMS4xNzY2IC0xOS4yNTQ5IDQwLjEzMDkgLTEwLjMwMDYgNDAuMTMwOSAwLjc0NTExN0M0MC4xMzA5IDExLjc5MDggMzEuMTc2NiAyMC43NDUxIDIwLjEzMDkgMjAuNzQ1MUM5LjA4NTE3IDIwLjc0NTEgMC4xMzA4NTkgMTEuNzkwOCAwLjEzMDg1OSAwLjc0NTExN0MwLjEzMDg1OSAtMTAuMzAwNiA5LjA4NTE3IC0xOS4yNTQ5IDIwLjEzMDkgLTE5LjI1NDlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM0NDBfNDA2NSI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMTMwODU5IDAuNzQ1MTE3KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=');

          transition: all .3s ease-in-out;
        }

        &::before {
          left: -21px;
          transform: rotateZ(270deg);

          transition: all .3s ease-in-out;
        }
      }
    }

    &-item {
      display: none;
      opacity: 0;
      visibility: hidden;

      padding: 40px 24px;

      border-radius: 10px;
      background-color: white;

      &.show {
        display: block;
        opacity: 1;
        visibility: visible;
      }
    }
  }

  &-form {
    &-main {
      display: grid;
      grid-template-columns: 1fr 440px;
      grid-gap: 40px;
      margin-bottom: 40px;
    }

    &-preview {
      position: relative;
      top: 32px;
    }
  }

  &-formItem {
    margin-bottom: 24px;

    &.date {
      margin-bottom: 40px;
    }

    &-label {
      display: inline-block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;

      margin-bottom: 10px;
    }
  }

  &-loading {
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>