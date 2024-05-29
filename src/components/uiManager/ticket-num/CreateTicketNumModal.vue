<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    :title="$t('party.creating-a-vip-room')"
  >
    <Form
      @finish="postNewVipNumber"
    >
      <div class="feedbackModal-inputs">
        <Select
          name="region"
          :placeholder="$t('formdata.specify-the-area')"
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
            :placeholder="$t('formdata.enter-the-number')"
            mask="#######"
            staticPlaceholder
            required
          />
        </div>
      </div>
      

      <Button
        :name="$t('button.create')"
        :loading="isLoading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import { useToast } from '@/modules/toast'
  import { getLocationsList } from '@/actions/uiAdmin/locations';
  import { postTicketNum } from '@/actions/uiManager/ticket-numbers';

  const { t } = useI18n()
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

  const isLoading = ref(false);
  const regionList = ref([]);
  const region = ref(null);

  onMounted(async () => {
    const response = await getLocationsList()
    response.data.data.forEach(location => {
      regionList.value.push(
        {
          label: location.name,
          value: location.ticket_prefix
        }
      );
    });
  })

  const postNewVipNumber = async ({ ticketNum }: { ticketNum: string }) => {
    isLoading.value = true;

    try {
      const response = await postTicketNum({ticket_number: region.value + ticketNum});

      toast({
        message: t('message.vip-number-has-been-successfully-created'),
        type: 'success'
      })
      
      emits('finish', response)
      setTimeout(() => {
        emits('hide')
      }, 300);
    } catch (err) {
      if (err.response.data.detail === 'Ticket number already reserved.') {
        toast({
          message: t('message.vip-number-has-been-successfully-created'),
          type: 'warning'
        })
      }
    } finally {
      isLoading.value = false
    }
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
