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
        <div class="newsEdit-form-main">
          <div class="newsEdit-form-inputs">
            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">{{ $t('formdata.heading') }}</label>
              <Input
                name="title"
                type="textarea"
                :placeholder="$t('formdata.enter-the-name-of-the')"
                :maxSymbol="150"
                v-model="newsData.title"
                staticPlaceholder
                required
              />
            </div>

            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">{{ $t('formdata.subtitle') }}</label>
              <Input
                name="preview_text"
                type="textarea"
                :placeholder="$t('formdata.enter-the-subtitle-of-the')"
                :maxSymbol="250"
                v-model="newsData.preview_text"
                staticPlaceholder
                required
              />
            </div>

            <div class="newsEdit-formItem">
              <label for="" class="newsEdit-formItem-label">{{ $t('formdata.release-day') }}</label>
              <Input
                type="date"
                name="dateBirthday"
                v-model="newsData.created_at"
                :placeholder="$t('formdata.choose-the-day-of-release')"
                staticPlaceholder
                required
              />
            </div>
          </div>

          <Upload
            class="newsEdit-preview"
            v-model="newPhotoFile"
            :preview="newsData.preview_image"
            :aspectRatio="16 / 9"
            :height="495"
            :width="880"
            :previewBottom="56.36"
            required
          />
        </div>

        <div class="newsEdit-formItem">
          <label for="" class="newsEdit-formItem-label">{{ $t('formdata.content') }}</label>
          <Input
            name="content"
            type="editor"
            v-model="newsData.content"
            staticPlaceholder
            class="newsEdit-formItem-content"
            :placeholder="$t('formdata.enter-the-content')"
            required
          />
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
import { getNewsData, postNewsData, putNewsData } from '@/actions/uiMedia/news';

const route = useRoute()
const router = useRouter()

const { t } = useI18n()
const { toast } = useToast()

const isloading = ref(false)
const newsData = ref<INews>()

const newPhotoFile = ref(null)

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
      content: '',
      published: true,
      created_at: moment().format('YYYY-MM-DD'),
      preview_image: null
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
      else if (key !== 'preview_image' && newsData.value[key]) formData.append(key, newsData.value[key]);
    }

    if (newPhotoFile.value) formData.append("preview_image", newPhotoFile.value);
    formData.append("alias_category", 'announcements');
    
    if (route.params.news_id) await putNewsData(route.params.news_id.toString(), formData)
    else await postNewsData(formData)

    toast({
      message: route.params.news_id
        ? t('message.the-news-was-successfully-updated')
        : t('message.the-news-was-successfully-created'),
      type: 'success'
    })

    // if (!route.params.news_id) setTimeout(() => router.push('/media/news-list?offset=0&limit=20&published=true&search='), 300);

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
    &-main {
      display: grid;
      grid-template-columns: 1fr 440px;
      grid-gap: 40px;
      margin-bottom: 40px;
    }

    &-inputs .newsEdit-formItem:last-child {
      margin-bottom: 0px;
    }

    &-preview {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;
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