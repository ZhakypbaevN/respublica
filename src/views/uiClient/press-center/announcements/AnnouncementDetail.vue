<template>
  <section class="landing-block">

    <div class="wrapper landing-wrapper litle" v-if="newsData">
      <div class="newsDetail">
        
        <div class="newsDetail-header">
          <BackButton
            class="newsDetail-header-backBtn"
            outlined
          />

          <div class="landing-title">{{ newsData.title }}</div>
        </div>

        <div class="newsDetail-preview withZoomPreview-preview">
          <div class="newsDetail-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${getFileUrl(newsData.preview_image)});`"></div>
        </div>

        <div class="newsDetail-subtitle">{{ newsData.preview_text }}</div>

        <div class="newsDetail-text ck-content" v-html="newsData.content"></div>

        <div class="newsDetail-bottom">
          <div class="newsDetail-bottom-views">
            <SvgIcon
              name="view"
              :viewboxWidth="24"
              :viewboxHeight="24"
            />
            <span>{{ newsData.views_count }}</span>
          </div>

          <div class="newsDetail-bottom-date">
            <SvgIcon
              name="calendar"
              :viewboxWidth="24"
              :viewboxHeight="24"
            />
            <span>{{ convertDateTime(newsData.created_at) }}</span>
          </div>
        </div>

        <div class="newsDetail-comments"></div>
      </div>

      <NewsComments
        :newsID="route.params.news_id.toString()"
      />

      <NewsOther
        :newsID="route.params.news_id.toString()"
        :category="'announcements'"
      />
    </div>

    <NewsDetailSkeleton v-else />
  </section>
</template>

<script setup lang="ts">
  import NewsOther from '@/components/uiLanding/press-center/common-for-detail/NewsOther.vue';
  import NewsComments from '@/components/uiLanding/press-center/common-for-detail/NewsComments.vue';
  import NewsDetailSkeleton from '@/components/uiLanding/press-center/news/NewsDetailSkeleton.vue';

  import { onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router'

  import { INews } from '@/types/news';
  
  import { getNewsData } from '@/actions/uiLanding/news';
  import convertDateTime from '@/helpers/convertDateTime.js';
  import getFileUrl from '@/helpers/getFileUrlByDate';
  
  const route = useRoute();
  
  watch(
    () => route.params,
    () => getData()
  )
  onMounted(() => getData());

  const newsData = ref<INews>(null)

  const getData = () => {
    onGetNewsDetail();
  }

  const onGetNewsDetail = async () => {
    const { data } = await getNewsData(route.params.news_id.toString());
    newsData.value = data;
  }
</script>

<style scoped lang="scss">
.landing-block {
  position: relative;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsDetail {
  width: 100%;
  margin-bottom: 60px;

  &-header {
    &-backBtn {
      position: absolute;
      top: 60px;
      left: 60px;
    }
  }

  &-preview {
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;

    &-img {
      padding-bottom: 56.36%;
    }
  }

  &-subtitle {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 40px;
  }

  &-text {
    width: 100%;
    overflow-x: hidden;

    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 40px;
  }

  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-date {
      display: flex;
      align-items: center;
      grid-gap: 8px;
  
      padding: 5px 10px;
      border-radius: 3px;
      border: 1px solid var(--light-gray-color-op50);
  
      & svg {
        width: 20px;
        height: 20px;
      }
  
      & span {
        color: var(--light-gray-color);
        font-size: 16px;
        font-weight: 500;
      }
    }
  
    &-views {
      display: flex;
      align-items: center;
      grid-gap: 4px;
  
      & span {
        color: var(--light-gray-color);
        font-size: 16px;
        font-weight: 500;
      }
  
      & svg {
        width: 22px;
        height: 22px;
  
        fill: var(--accent-color);
      }
    }
  }

  // Adaptation
  @media (max-width: 1555px) {
    &-header {
      display: flex;
      flex-direction: column;
      grid-gap: 20px;

      &-backBtn {
        position: static;
      }
    }
  }

  @media (max-width: 992px) {
    margin-bottom: 60px;

    &-subtitle {
      font-size: 22px;
      margin-bottom: 40px;
    }

    &-text {
      font-size: 22px;
      margin-bottom: 30px;
    }

    &-preview {
      margin-bottom: 40px;
      border-radius: 10px;
    }

    &-bottom {
      &-date {
        grid-gap: 8px;
        padding: 5px 10px;

        & svg {
          width: 20px;
          height: 20px;
        }
    
        & span {
          font-size: 16px;
        }
      }
    
      &-views {
        grid-gap: 4px;
    
        & span {
          font-size: 16px;
        }
    
        & svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 60px;

    &-preview {
      border-radius: 10px;
      margin-bottom: 24px;
    }

    &-subtitle {
      font-size: 22px;
      margin-bottom: 34px;
    }

    &-text {
      font-size: 22px;
      margin-bottom: 30px;
    }

    &-bottom {
      &-date {
        grid-gap: 8px;
        padding: 5px 10px;

        & svg {
          width: 20px;
          height: 20px;
        }
    
        & span {
          font-size: 16px;
        }
      }
    
      &-views {
        grid-gap: 4px;
    
        & span {
          font-size: 16px;
        }
    
        & svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    margin-bottom: 50px;

    &-preview {
      border-radius: 10px;
      margin-bottom: 24px;
    }

    &-subtitle {
      font-size: 22px;
      margin-bottom: 34px;
    }

    &-text {
      font-size: 22px;
      margin-bottom: 30px;
    }

    &-bottom {
      &-date {
        grid-gap: 8px;
        padding: 5px 10px;

        & svg {
          width: 20px;
          height: 20px;
        }
    
        & span {
          font-size: 16px;
        }
      }
    
      &-views {
        grid-gap: 4px;
    
        & span {
          font-size: 16px;
        }
    
        & svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>