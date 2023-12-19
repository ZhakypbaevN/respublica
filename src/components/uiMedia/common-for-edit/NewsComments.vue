<template>
  <div class="comments">
    <h3 class="comments-header">
      {{ $t('comments') }}
      ({{ !commentsValues.tableValues ? '...' : commentsValues.total }})
    </h3>

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

      <ShowMoreBtn
        v-model:offset="showMore.offset"
        :loading="showMore.loading"
        :total="commentsValues.total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import NewsCommentItem from '@/components/uiMedia/common-for-edit/NewsCommentItem.vue';
  import NewsCommentItemSkeleton from '@/components/uiMedia/common-for-edit/NewsCommentItemSkeleton.vue';

  import { onMounted, reactive, watch } from 'vue';

  import { useToast } from '@/modules/toast';
  import { CommentsValues } from '@/types/comments';
  import { getMediaCommentsList } from '@/actions/uiMedia/news';
  
  interface IProps {
    newsID: string
  }
  
  const props = defineProps<IProps>()
  onMounted(() => getData());
  
  const showMore = reactive({
    offset: 0,
    loading: false
  })
  const commentsValues = reactive<CommentsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  const getData = () => {
    onGetNewsList();
  }


  const onGetNewsList = async () => {
    showMore.loading = true;
    commentsValues.isEmpty = false;

    const { data, total } = await getMediaCommentsList(props.newsID, {offset: showMore.offset, limit: 20})
    showMore.loading = false
    commentsValues.total = total;
    if (!commentsValues.tableValues) commentsValues.tableValues = [];
    data.forEach(item => commentsValues.tableValues.push(item));

    if (!total) {
      commentsValues.isEmpty = true
    }
  }

  watch(
    () => props.newsID,
    () => onGetNewsList()
  )
  
  watch(
    () => showMore.offset,
    () => getData()
  );
</script>

<style scoped lang="scss">
.comments {
  width: 100%;
  max-width: 900px;

  margin: 80px 0 120px;

  &-header {
    display: block;
    font-size: 24px;
    font-weight: 700;
    border-bottom: 3px solid var(--light-gray-color-op10);

    padding-bottom: 8px;
    margin-bottom: 20px;
  }


  &-items {
    display: flex;
    flex-direction: column;
    grid-gap: 28px;
  }
}
</style>

<style>
.comments-items .commentItem:last-child {
  padding-bottom: 0px !important;
  border-bottom: none !important;
}
</style>