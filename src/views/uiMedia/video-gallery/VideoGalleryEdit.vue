<template>
  <section class="newsEdit">
    <div class="wrapper" v-if="isLoading.page">
      <div class="newsEdit-header">
        <BackButton />
      </div>

      <h2 class="landing-title">
        {{
          route.params.news_id
            ? $t('page.edit-video')
            : $t('page.create-video')
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
            :data="newsData"
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
            ? $t('page.edit-video')
            : $t('page.create-video')
        }}
      </h2>

      <Form
        @finish="postNews"
        class="newsEdit-form"
      >
        <div class="newsEdit-form-block">
          <div class="newsEdit-form-inputs">

            <div
              class="newsEdit-formItem"
              v-for="lang of langItems"
              :key="lang.value"
            >
              <label :for="`${lang.value}-title`" class="newsEdit-formItem-label">{{ `${lang.title} - ${lang.form.titleInput.title}` }}</label>
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
              <label for="content" class="newsEdit-formItem-label">{{ $t('formdata.youTube-video-code-iframe') }}</label>
              <Input
                name="content"
                type="textarea"
                v-model="newsData.ru.content"
                :placeholder="$t('formdata.enter-the-youTube-video-code')"
                staticPlaceholder
              />
            </div>
            
          </div>
          <div class="newsEdit-videoPreview" v-html="newsData.ru.content" />
        </div>


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
  import DeleteModal from '@/components/uiMassMedia/news/DeleteModal.vue'

  import moment from 'moment';

  import { useI18n } from 'vue-i18n'
  import { onMounted, ref, reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router';

  import { useToast } from '@/modules/toast'

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
        }
      }
    }
  ];
  const showDeleteModal = ref(false);

  // Get News
  onMounted(async () => {
    if (route.params.news_id) {
      for (const lang of langItems) {
        const response = await getMediaNewsData(route.params.news_id.toString(), lang.api);

        if (response) newsData[lang.value] = response.data;
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
        created_at_forInput: moment(Date.now().toString()).format('YYYY-MM-DD HH:mm'),
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
          else if (key !== 'content' && newsData[lang.value][key]) formData.append(key, newsData[lang.value][key]);
        }

        formData.append("alias_category", 'video-gallery');
        formData.append("content", newsData.ru.content);

        if (newsID) await putMediaNewsData(newsID.toString(), formData, lang.api)
        else newsID = (await postMediaNewsData(formData, lang.api)).id.toString();
      }
      
      toast({
        message: route.params.news_id
          ? t('message.the-video-has-been-successfully-edited')
          : t('message.the-video-has-been-successfully-created'),
        type: 'success'
      })
      router.replace(`/media/video-gallery/${newsID}`);

    } finally {
      isLoading.btn = false
    }
  }

  const onDeletedNews = () => {
    setTimeout(() => router.push('/media/video-gallery?offset=0&limit=20&published=true&search='), 300);
  }
</script>

<style scoped lang="scss">
.newsEdit {
  padding: 40px 0;
  
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

  &-form {
    &-block {
      display: grid;
      grid-template-columns: 1fr 40%;
      grid-gap: 40px;
    }
    &-inputs {
      margin-bottom: 40px;
    }
  }

  &-formItem {
    margin-bottom: 24px;

    &-label {
      display: inline-block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;

      margin-bottom: 10px;
    }

    &-content {
      margin-bottom: 40px !important;
    }
  }
}
</style>
<style lang="scss">
.newsEdit-videoPreview {
  height: 0;
  
  position: relative;
  padding-bottom: 56.25%;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>