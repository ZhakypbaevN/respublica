<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="modal"
    title="Вы уверены?"
  >
    <div class="modal-btns">
      <Button
        name="Подтвердить"
        :loading="loading"
        @click="postDelete"
        type="default-red"
      />

      <Button type="default-grey" name="Отмена" @click="emits('hide')" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
// Components
import { ref } from 'vue'
import axios from 'axios'

// Modules
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

interface IProps {
  show: boolean,
  id: number
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish'): Function,
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)
const token = localStorage.getItem('TOKEN');

const postDelete = () => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles/${props.id}`

  axios({
    method: "delete",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Видео успешно удалена',
        type: 'success'
      })
      
      emits('finish')
      setTimeout(() => {
        emits('hide')
      }, 300);

      loading.value = false
    })
    .catch((err) => {

      toast({
        message: 'Возникли ошибки при запросе'
      })

      console.log('err', err);
      loading.value = false
    });
}
</script>

<style scoped lang="scss">
.modal {
  &-inputs {
    &-home {
      display: grid;
      grid-template-columns: 1fr 135px 135px;
      grid-gap: 16px;
    }
    &-subtitle {
      display: block;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    &-gender {
      display: grid;
      grid-template-columns: 1fr 140px 140px;
      grid-gap: 20px;

      & button {
        height: 60px;
      }
    }
  }

  &-addFileBtn {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 38px;
    margin-bottom: 8px;

    & svg {
      width: 24px;
      height: 24px;
      fill: var(--accent-color);
    }
  }

  &-description {
    color: var(--light-gray-color);
    margin-bottom: 10px;
  }

  &-btns {
    display: flex;
    justify-content: center;
    grid-gap: 20px;
  }
}

</style>
