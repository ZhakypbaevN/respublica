<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="modal"
    :title="$t('are-you-sure')"
  >
    <div class="modal-btns">
      <Button
        :name="$t('button.confirm')"
        :loading="loading"
        @click="postDelete"
        type="default-red"
      />

      <Button
        :name="$t('button.cancel')"
        type="default-grey"
        @click="emits('hide')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import axios from 'axios'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useToast } from '@/modules/toast'

const { t } = useI18n()
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
const token = localStorage.getItem('access_token');

const postDelete = () => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/reserved-ticket-numbers/${props.id}`

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
        message: t('message.vip-number-has-been-successfully-deleted'),
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
