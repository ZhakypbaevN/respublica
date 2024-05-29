<template>
  <div class="commentItem" :class="{disabled: deleted}">
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


    <Button
      class="commentItem-delete"
      type="default-light-red"
      :loading="isloading"
      @click.stop="onDeleteComment"
      loadingName="sk"
    >
      <SvgIcon
        name="trash-edit-with-bg"
        :viewboxWidth="50"
        :viewboxHeight="50"
      />
    </Button>
  </div>

</template>

<script setup lang="ts">
  import Avatar from '@/components/common/Avatar.vue';
  
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { IComment } from '@/types/comments';
  import timePeriod from '@/helpers/timePeriod';

  import { useToast } from '@/modules/toast'
  import { deleteMediaComment } from '@/actions/uiMedia/news';

  interface IProps {
    data: IComment,
  }

  const props = defineProps<IProps>()

  const { t } = useI18n()
  const { toast } = useToast()

  const isloading = ref(false);
  const deleted = ref(false);

  const onDeleteComment = async () => {
    isloading.value = true;
    try {
      await deleteMediaComment(props.data.id.toString())

      toast({
        message: t('message.the-comment-was-successfully-deleted'),
        type: 'success'
      })
      deleted.value = true;

    } finally {
      isloading.value = false
    }
  }
</script>

<style scoped lang="scss">
.commentItem {
  display: grid;
  grid-template-columns: 54px 1fr 50px;
  grid-gap: 20px;

  padding-bottom: 18px;
  border-bottom: 1.2px solid var(--light-gray-color-op10);

  &:hover .commentItem-title {
    color: var(--accent-color);
  }

  &-author {
    display: flex;
    align-items: flex-end;
    grid-gap: 10px;
    margin: 4px 0 8px;

    &-name {
      font-size: 22px;
      font-weight: 600;
    }

    &-createDate {
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;
    }
  }

  &-text {
    font-size: 20px;
    font-weight: 400;
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
</style>
