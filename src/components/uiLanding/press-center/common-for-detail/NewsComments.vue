<template>
  <div class="comments">
    <h3 class="comments-header">
      {{ $t('comments') }}
      ({{ !commentsValues.tableValues ? '...' : commentsValues.total }})
    </h3>

    <Form
      @finish="onPostNewComment"
      class="comments-newComment"
    >
      <div class="comments-newComment-header">
        <Avatar />
        
        <Input
          type="textarea"
          v-model="comment"
          :placeholder="$t('formdata.enter-your-comments')"
          required
        />
      </div>

      <Button
        :name="$t('button.sand')"
        :loading="isNewCommentLoading"
        htmlType="submit"
      />
    </Form>
    
    <div class="comments-items" v-if="commentsValues.isEmpty">
    </div>
    <div class="comments-items disabled" v-else-if="!commentsValues.tableValues">
      <NewsCommentItemSkeleton
        v-for="comment in 3"
        :key="comment"
      />
    </div>
    <div class="comments-items" v-else>
      <NewsCommentItem
        v-for="comment of commentsValues.tableValues"
        :key="comment.id"
        :data="comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import NewsCommentItem from '@/components/uiLanding/press-center/common-for-detail/NewsCommentItem.vue';
  import NewsCommentItemSkeleton from '@/components/uiLanding/press-center/common-for-detail/NewsCommentItemSkeleton.vue';
  import Avatar from '@/components/common/Avatar.vue';

  import { onMounted, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast';
  import { CommentsValues } from '@/types/comments';
  import { getCommentsList, postComment } from '@/actions/uiLanding/news';
  
  interface IProps {
    newsID: string
  }
  
  const props = defineProps<IProps>()
  onMounted(() => getData());

  const { t } = useI18n()
  const { toast } = useToast()

  const comment = ref();
  const isNewCommentLoading = ref(false)
  const commentsValues = reactive<CommentsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = () => {
    onGetNewsList();
  }

  const onPostNewComment = async () => {
    isNewCommentLoading.value = true;
    try {
      const response = await postComment(props.newsID, comment.value);
      if (commentsValues.tableValues === null) commentsValues.tableValues = [];
      commentsValues.tableValues.unshift(response.data);
      commentsValues.total++;
      comment.value = '';

      toast({
        message: t('message.сomments-have-been-sent-successfully'),
        type: 'success'
      })
    } finally {
      isNewCommentLoading.value = false;
    }
  }

  const onGetNewsList = async () => {
    commentsValues.isEmpty = false
    commentsValues.tableValues = [];

    const { data, total } = await getCommentsList(props.newsID, {offset: 0,limit: 20})
    data.forEach(item => {
      commentsValues.tableValues.push(item);
    })
    
    commentsValues.total = total;
    if (!total) {
      commentsValues.isEmpty = true
    }
  }

  watch(
    () => props.newsID,
    () => {
      comment.value = '';
      onGetNewsList();
    }
  )
</script>

<style scoped lang="scss">
.comments {
  width: 100%;
  margin-bottom: 120px;

  &-header {
    display: block;
    font-size: 24px;
    font-weight: 700;
    border-bottom: 3px solid var(--light-gray-color-op10);

    padding-bottom: 8px;
    margin-bottom: 20px;
  }

  &-newComment {
    display: flex;
    flex-direction: column;
    align-items: end;

    margin-bottom: 20px;
    
    &-header {
      width: 100%;

      display: grid;
      grid-template-columns: 60px 1fr;
      grid-gap: 20px;

      margin-bottom: 10px;
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 28px;
  }

  // Adaptation
  /* @media (max-width: 1200px) {
    margin-bottom: 120px;

    &-header {
      font-size: 24px;
      border-width: 3px;

      padding-bottom: 8px;
      margin-bottom: 20px;
    }

    &-newComment {
      margin-bottom: 20px;
      
      &-header {
        grid-template-columns: 40px 1fr;
        grid-gap: 20px;
        margin-bottom: 10px;
      }
    }

    &-items {
      grid-gap: 28px;
    }
  }

  @media (max-width: 992px) {
    margin-bottom: 100px;

    &-header {
      font-size: 22px;
      border-width: 3px;

      padding-bottom: 8px;
      margin-bottom: 20px;
    }

    &-newComment {
      margin-bottom: 20px;
      
      &-header {
        grid-template-columns: 40px 1fr;
        grid-gap: 20px;
        margin-bottom: 10px;
      }
    }

    &-items {
      grid-gap: 28px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 80px;

    &-header {
      font-size: 22px;
      border-width: 3px;

      padding-bottom: 8px;
      margin-bottom: 20px;
    }

    &-newComment {
      margin-bottom: 20px;
      
      &-header {
        grid-template-columns: 40px 1fr;
        grid-gap: 20px;
        margin-bottom: 10px;
      }
    }

    &-items {
      grid-gap: 28px;
    }
  }

  @media (max-width: 576px) {
    margin-bottom: 80px;

    &-header {
      font-size: 20px;
      border-width: 2px;

      padding-bottom: 6px;
      margin-bottom: 16px;
    }

    &-newComment {
      margin-bottom: 20px;
      
      &-header {
        grid-template-columns: 40px 1fr;
        grid-gap: 18px;
        margin-bottom: 8px;
      }
    }

    &-items {
      grid-gap: 24px;
    }
  } */
}
</style>
<style>
.comments-items .commentItem:last-child {
  padding-bottom: 0px !important;
  border-bottom: none !important;
}
</style>