<template>
  <div class="commentItem withZoomPreview">
    <Avatar mini />

    <div class="commentItem-content">
      <div class="commentItem-author">
        <h4 class="commentItem-author-name">Test Name</h4>
        <h5 class="commentItem-author-createDate">{{ timePeriod(data.created_at) }}</h5>
      </div>

      <div class="commentItem-text">
        {{ data.text }}
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import Avatar from '@/components/common/Avatar.vue';

  import { IComment } from '@/types/comments';
  import timePeriod from '@/helpers/timePeriod';

  interface IProps {
    data: IComment,
  }

  defineProps<IProps>()
</script>

<style scoped lang="scss">
.commentItem {
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-gap: 16px;

  padding-bottom: 18px;
  border-bottom: 1.2px solid var(--light-gray-color-op10);

  &:hover .commentItem-title {
    color: var(--accent-color);
  }

  &-author {
    display: flex;
    grid-gap: 10px;
    margin: 4px 0 8px;

    &-name {
      font-size: 18px;
      font-weight: 600;
    }

    &-createDate {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-preview {
    height: 60px;
    width: 60px;
    border-radius: 100px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-text {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
