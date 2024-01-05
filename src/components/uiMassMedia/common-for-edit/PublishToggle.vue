<template>
  <Dropdown
    :btnText="data.published ? $t('status.published') : $t('status.unpublished')"
    :loading="isloading"
    @click.stop
  >
    <DropdownItem v-if="!data.published" @click="togglePublishNews">{{ $t('button.publish') }}</DropdownItem>
    <DropdownItem v-else @click="togglePublishNews">{{ $t('button.unpublish') }}</DropdownItem>
  </Dropdown>
</template>

<script setup lang="ts">
  import moment from 'moment';

  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'
  import { putMediaNewsData } from '@/actions/uiMedia/news';

  interface IProps {
    data: any
  }
  interface Emits {
    (event: 'finish'): Function
  }

  const props = defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const { t } = useI18n()
  const { toast } = useToast()

  const isloading = ref(false);

  const togglePublishNews = async () => {
    isloading.value = true;
    try {
      const formData = new FormData();

      for (const key in props.data) {
        if (key === 'created_at') formData.append(key, moment(props.data[key]).format('YYYY-MM-DD[T]HH:mm:ss'));
        else if (key === 'published') formData.append("published", String(!props.data.published));
        else if (key !== 'preview_image' && props.data[key]) formData.append(key, props.data[key]);
      }

      await putMediaNewsData(props.data.id.toString(), formData)

      toast({
        message: !props.data.published ? t('message.news-published') : t('message.news-unpublished'),
        type: 'success'
      })
      emit('finish')

    } finally {
      isloading.value = false
    }
  }
</script>