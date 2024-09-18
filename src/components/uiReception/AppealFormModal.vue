<template>
  <Modal
    v-if="show"
    @hide="$emit('hide')"
    class="appealFormModal"
    :title="type == 'in-revision' ? 'Обращение' : ''"
  >
    <h2 :class="`appealFormModal-title ${type}`">{{ isTitleModal }}</h2>
    <Form @finish="onSubmit">
      <div class="appealFormModal-inputs">
        <Select
          v-if="type == 'finish'"
          name="role"
          class="appealFormModal-inputs-select"
          placeholder="Статус ответа"
          :options="statusList"
          v-model="isStatus"
          required
        />
        
        <Input
          type="textarea"
          placeholder="Оставить комментарий"
          :maxSymbol="1000"
        />

        <div>
          <p class="appealFormModal-label">Фото / Видео</p>

          <Button
            class="appealFormModal-addFileBtn"
            :name="$t('button.attach-a-file')"
            type="outline-blue"
            v-slot:left
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>
        </div>

        <p class="appealFormModal-description" v-html="$t('formdata.the-maximum-size-of-a-single-file-is-19-mb')"></p>
      </div>

      <Button
        :name="$t('button.sand')"
        :loading="isLoading"
        htmlType="submit"
      />
    </Form>
  </Modal>
  
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  interface IProps {
    show: boolean,
    type: string
  }
  interface Emits {
    (event: 'hide'): Function,
    (event: 'finish', value: string): void
  }

  const props = defineProps<IProps>()
  const emit = defineEmits<Emits>()

  const { t } = useI18n()

  const isStatus = ref<string>()
  const isLoading = ref<boolean>(false);

  const isTitleModal = computed({
    get: () => {
      if (props.type == 'in-revision') return 'ОТПРАВИТЬ НА ДОРАБОТКУ'
      if (props.type == 'rejected') return 'Не подлежит рассмотрению'
      if (props.type == 'finish') return 'Написать ответ'
    },
    set: (val) => null
  })

  const statusList = [
    {
      label: 'Положительно',
      value: 'finish'
    },
    {
      label: 'Дать разъяснение',
      value: 'in-revision'
    },
    {
      label: 'Не решен',
      value:'rejected'
    }
  ]

  const onSubmit = () => {
    console.log('isStatus.value', isStatus.value);
    emit('finish', isStatus.value ?? props.type);
  }
</script>

<style scoped lang="scss">
.appealFormModal {
  &-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;

    grid-gap: 20px;
    margin-bottom: 50px;

    &-select {
      margin-bottom: 22px;
    }
  }
  
  &-title {
    color: var(--green-color);
    font-size: 36px;
    font-weight: 700;
    text-align: center;

    margin-bottom: 60px;

    &.in-revision,
    &.finish {
      color: var(--accent-color);
    }

    &.rejected {
      color: var(--red-color);
    }
  }
  
  &-label {
    color: var(--light-gray-color);
    font-size: 18px;
    font-weight: 400;

    margin-bottom: 10px;
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
  
  &-btns {
    display: flex;
    justify-content: center;

    & button {
      width: 100%;
      max-width: 200px;
    }
  }
}
</style>
<style>
  .appealFormModal .modal-header {
    margin-bottom: 20px !important;
  }
</style>
