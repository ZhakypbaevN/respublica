<template>
  <Modal
    v-if="show"
    @hide="emits('hide')"
    class="feedbackModal"
    :title="$t('feedback.order-a-call')"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <Input
          name="position"
          :placeholder="$t('feedback.enter-the-subject-of-the-call')"
          staticPlaceholder
          required
        />
        
        <Input
          type="text"
          name="name"
          :placeholder="$t('formdata.your-name')"
          required
          autofocus
        />

        <Select
          name="region"
          :placeholder="$t('formdata.select-a-region')"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        />

        <Input
          type="tel"
          name="phone"
          :placeholder="$t('formdata.your-phone-number')"
          validation="phone"
          required
        />
      </div>
      
      <p class="feedbackModal-description">
        {{ $t('agreement.data-collection-and-processing') }}
      </p>

      <div>
        <Button
          :name="$t('button.order-a-callback')"
          :loading="loading"
          htmlType="submit"
        />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)

const postFeedback = ({ name, phone, comment }: { name: string, phone: string, comment: string }) => {
  console.log('name', name);
  console.log('name', phone);
  console.log('name', comment);
}
</script>

<style scoped lang="scss">
.feedbackModal {
  &-description {
    color: var(--light-gray-color);
    margin-bottom: 50px;
  }
}

</style>
