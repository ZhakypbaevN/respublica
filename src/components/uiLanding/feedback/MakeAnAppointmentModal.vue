<template>
  <LogInFirstModal
    :title="$t('feedback.to-make-an-appointment,-you-need-to-log-in-to-the-portal-or-register')"
    @hide="$emit('hide')"
    :show="show && !userType"
  />

  <Modal
    v-if="show && userType"
    @hide="$emit('hide')"
    class="feedbackModal"
    :title="$t('feedback.make-an-appointment')"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <div>
          <label for="position">{{ $t('formdata.subject-of-the-call') }}</label>
          <Input
            name="position"
            :placeholder="$t('formdata.enter-the-subject-of-the-call')"
            staticPlaceholder
            required
          />
        </div>

        <div>
          <label for="position">{{ $t('formdata.receiving-official') }}</label>
          <Select
            name="position"
            :placeholder="$t('formdata.select-the-receiving-official-from-the-list')"
            staticPlaceholder
            :options="[
              {label: 'Алматы', value: 'Алматы'},
              {label: 'Астана', value: 'Астана'},
              {label: 'Караганда', value: 'Караганда'},
            ]"
            required
          />
        </div>

        <div>
          <label for="category">{{ $t('formdata.question-request-category') }}</label>
          <Select
            name="category"
            :placeholder="$t('formdata.select-the-category-of-the-question-appeal')"
            staticPlaceholder
            :options="[
              {label: 'Алматы', value: 'Алматы'},
              {label: 'Астана', value: 'Астана'},
              {label: 'Караганда', value: 'Караганда'},
            ]"
            required
          />
        </div>
      </div>
      
      <p class="feedbackModal-description">
        {{ $t('feedback.we-will-send-the-exact-date-and-time-3-working-days-before-the-date-of-the-reception') }}
      </p>

      <div>
        <Button
          :name="$t('button.make-an-appointment')"
          :loading="loading"
          htmlType="submit"
        />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import LogInFirstModal from '@/components/uiLanding/feedback/FirstLoginModal.vue';

import { ref } from 'vue'

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

defineProps<IProps>()
defineEmits<Emits>()


const loading = ref(false);
const userType = localStorage.getItem('USER_TYPE');

const postFeedback = ({ name, phone, comment }: { name: string, phone: string, comment: string }) => {
  console.log('name', name);
  console.log('name', phone);
  console.log('name', comment);
}
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    & label {
      display: block;
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }

  &-description {
    font-size: 20px;
    font-weight: 500;
    color: var(--accent-color);
    margin-bottom: 44px;
  }
}

</style>
