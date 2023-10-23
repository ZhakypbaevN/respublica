<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Вступить в партию"
  >
    <Form
      @finish="postJoinParty"
    >
      <div class="feedbackModal-inputs">
        <Select
          name="region"
          placeholder="Укажите область*"
          :options="regionList"
          v-model="region"
          required
        />

        <div class="feedbackModal-inputs-numBlock">
          <div class="feedbackModal-inputs-symbol">
            <span>{{ region }}</span>
          </div>

          <Input
            name="ticketNum"
            placeholder="Введите номер"
            mask="#######"
            staticPlaceholder
            required
          />
        </div>
      </div>
      

      <Button
        name="Отправить заявку"
        :loading="loading"
        htmlType="submit"
      />

    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

// Modules
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish', value: any): void
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const token = localStorage.getItem('TOKEN');

const loading = ref(false);
const regionList = ref([]);
const region = ref(null);

onMounted(() => {

const url = `https://api.respublica.codetau.com/api/v1/parties/locations?offset=0&limit=100`;
axios({
  method: "get",
  url: url,
})
  .then((response) => {
    response.data.forEach(location => {
      regionList.value.push(
        {
          label: location.name,
          value: location.ticket_prefix,
        }
      );
    });
  })
  .catch((err) => {
    console.log('err', err);

    toast({
      message: 'Возникли ошибки при запросе'
    })
    
  });
})

const postJoinParty = (
    { ticketNum }: { ticketNum: string }
  ) => {

  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/parties/memberships/reserved-ticket-numbers`;

  axios({
    method: "post",
    url: url,
    data: {
      ticket_number: region.value + ticketNum
    },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Вы успешно вступили в партию',
        type: 'success'
      })
      
      emits('finish', response.data)
      setTimeout(() => {
        emits('hide')
      }, 300);

      loading.value = false
    })
    .catch((err) => {

      if (err.response.data.detail === 'Duplicate membership is not allowed.') {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      } else if (err.response.data.detail === 'Age under 18 is not allowed.') {
        toast({
          message: 'Проживание в возрасте до 18 лет не допускается'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }

      console.log('err', err);
      loading.value = false
    });
}
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-numBlock {
      display: grid;
      align-items: flex-start;
      grid-template-columns: 50px 1fr;
      grid-gap: 20px;
    }

    &-symbol {
      min-height: 60px;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 19px 30px;

      border: 1px solid var(--light-gray-color);
      border-radius: 10px;

      & span {
        font-size: 18px;
      }
    }
  }
}

</style>
