<template>
  <Dropdown
    :btnText="data.published ? $t('status.published') : $t('status.unpublished')"
    :loading="loading"
    @click.stop
  >
    <DropdownItem v-if="!data.published" @click="togglePublishNews">{{ $t('button.publish') }}</DropdownItem>
    <DropdownItem v-else @click="togglePublishNews">{{ $t('button.unpublish') }}</DropdownItem>
  </Dropdown>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';
import { useToast } from '../../modules/toast'
import { useI18n } from 'vue-i18n'


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

const loading = ref(false);

const togglePublishNews = () => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles/${props.data.id}`
  const token = localStorage.getItem('TOKEN');

  const data = new FormData();

  data.append("title", props.data.title);
  data.append("preview_text", props.data.preview_text);
  data.append("content", props.data.content);
  data.append("category_id", props.data.category_id);
  data.append("published", String(!props.data.published));

  axios({
    method: "put",
    url: url,
    data: data,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: !props.data.published ? t('message.news-published') : t('message.news-unpublished'),
        type: 'success'
      })
      loading.value = false
      emit('finish')
    })
    .catch((err) => {
      console.log('err', err);
      
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
}
</script>