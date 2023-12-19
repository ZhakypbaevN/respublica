<template>
  <section class="newsEdit">
    <div class="wrapper" v-if="newsData">
      <div class="newsEdit-header">
        <BackButton />

        <LangToggle dropdown />
      </div>

      <h2 class="landing-title">
        {{
          newsData.title
            ? newsData.title
            : route.params.news_id
              ? $t('page.editing-the-news')
              : $t('page.new-news')
        }}
      </h2>

      <Form
        @finish="postNews"
        class="newsEdit-form"
      >
        <div class="newsEdit-form-block">
          <div class="newsEdit-form-inputs">
            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">
                {{ $t('formdata.heading') }}
              </label>
              <Input
                name="title"
                type="textarea"
                :placeholder="$t('formdata.enter-the-name-of-the-video')"
                :maxSymbol="150"
                v-model="newsData.title"
                staticPlaceholder
              />
            </div>
            
            <div class="newsEdit-formItem">
              <label for="content" class="newsEdit-formItem-label">{{ $t('formdata.youTube-video-code-iframe') }}</label>
              <Input
                name="content"
                type="textarea"
                v-model="newsData.content"
                :placeholder="$t('formdata.enter-the-youTube-video-code')"
                staticPlaceholder
              />
            </div>
          </div>
          <div class="newsEdit-videoPreview" v-html="newsData.content"></div>
        </div>


        <Button
          :name="
            route.params.news_id
              ? $t('button.save')
              : $t('button.create')
          "
          :loading="isloading"
          htmlType="submit"
        />
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
  import moment from 'moment';

  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router';

  import { useToast } from '@/modules/toast'
  import getFileUrl from '@/helpers/getFileUrlByDate.js'

  import { INews } from '@/types/news';
  import { getMediaNewsData, postMediaNewsData, putMediaNewsData } from '@/actions/uiMedia/news';

  const route = useRoute()
  const router = useRouter()

  const { t } = useI18n()
  const { toast } = useToast()

  const isloading = ref(false)
  const newsData = ref<INews>()

  // Get News
  onMounted(async () => {
    if (route.params.news_id) {
      const response = await getNewsData(route.params.news_id.toString())

      if (response) newsData.value = response.data;
      newsData.value.preview_image = getFileUrl(response.data.preview_image);
      newsData.value.created_at = moment(response.data.created_at).format('YYYY-MM-DD');

    } else {
      newsData.value = {
        title: '',
        preview_text: '',
        source_title: '',
        source_url: '',
        published: true,
        created_at: moment().format('YYYY-MM-DD'),
        content: ''
      }
    }
  })

  // Post
  const postNews = async () => {
    isloading.value = true;
    try {
      const formData = new FormData();

      for (const key in newsData.value) {
        if (key === 'created_at') formData.append(key, moment(newsData.value[key]).format('YYYY-MM-DD[T]HH:mm:ss'));
        else formData.append(key, newsData.value[key]);
      }

      formData.append("alias_category", 'video-gallery');
      
      if (route.params.news_id) await putNewsData(route.params.news_id.toString(), formData)
      else await postNewsData(formData)

      toast({
        message: route.params.news_id
          ? t('message.the-video-has-been-successfully-edited')
          : t('message.the-video-has-been-successfully-created'),
        type: 'success'
      })

      // if (!route.params.news_id) setTimeout(() => router.push('/media/video-gallery?offset=0&limit=20&published=true&search='), 300);

    } finally {
      isloading.value = false
    }
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
  }

  &-form {
    &-block {
      max-width: 1200px;

      display: grid;
      grid-template-columns: 1fr 300px;
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