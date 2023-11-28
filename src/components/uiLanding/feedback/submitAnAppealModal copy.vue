<template>
  <LogInFirstModal
    :title="$t('feedback.to-submit-an-application-you-need-to-log-in-to-your-personal-account-or-register')"
    @hide="emits('hide')"
    :show="show && !userType"
  />

  <Modal
    v-if="show && userType"
    @hide="emits('hide')"
    class="feedbackModal"
    :title="$t('feedback.submit-an-appeal')"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">

        <Input
          name="lastname"
          :placeholder="$t('formdata.surname')"
          required
        />

        <Input
          name="name"
          :placeholder="$t('formdata.name')"
          required
        />

        <Input
          name="middleName"
          :placeholder="$t('formdata.middle-name')"
          required
        />

        <div>
          <label>
            {{ $t('formdata.type-of-treatment') }}<span>*</span>
          </label>

          <Select
            name="appleanType"
            :placeholder="$t('formdata.select-the-type-of-appeal')"
            :options="appleanTypeList"
            staticPlaceholder
            required
          />
        </div>


        <div>
          <label>
            {{ $t('formdata.category-of-appeal') }}<span>*</span>
          </label>

          <Select
            name="appleanCategory"
            :placeholder="$t('formdata.select-the-category-of-the-question-appeal')"
            :options="appleanCategoryList"
            staticPlaceholder
            required
          />
        </div>

        <div>
          <label>
            {{ $t('formdata.the-text-of-the-appeal') }}<span>*</span>
          </label>
          <Input
            name="messege"
            type="textarea"
            :placeholder="$t('formdata.enter-the-message-text')"
            staticPlaceholder
            :maxSymbol="200"
            required
          />
        </div>

        <!-- File -->
        <div>
          <label>{{ $t('formdata.files') }}</label>

          <p class="feedbackModal-description">
            {{ $t('formdata.attach-photos-and-documents-that-can-help-or-act-as-proof') }}
          </p>

          <Button
            class="feedbackModal-addFileBtn"
            :name="$t('button.attach-a-file')"
            type="outline-blue"
            v-slot:left
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>

          <p class="feedbackModal-description" v-html="$t('formdata.the-maximum-size-of-a-single-file-is-19-mb')"></p>
        </div>

        <div>
          <label>
            {{ $t('formdata.actual-address') }}<span>*</span>
          </label>

          <p class="feedbackModal-description">{{ $t('formdata.enter-the-address-of-the-actual-residence') }}</p>

          <Select
            name="region"
            :placeholder="$t('formdata.specify-the-area')"
            :options="[
              { label: 'Алматы', value: 'Алматы' },
              { label: 'Астана', value: 'Астана' },
              { label: 'Караганда', value: 'Караганда' },
            ]"
            staticPlaceholder
            required
          />

          <Select
            name="locality"
            :placeholder="$t('formdata.locality')"
            :options="[
              {label: 'Есик', value: 'Есик'},
              {label: 'Жаркент', value: 'Жаркент'},
              {label: 'Талгар', value: 'Талгар'},
              {label: 'Каскелен', value: 'Каскелен'},
              {label: 'Сарканд', value: 'Сарканд'},
              {label: 'Ушарал', value: 'Ушарал'},
              {label: 'Уштобе', value: 'Уштобе'},
            ]"
            staticPlaceholder
            required
          />

          <div class="feedbackModal-inputs-home">
            <Input
              name="streat"
              :placeholder="$t('formdata.street-prospect-mkr')"
              staticPlaceholder
              required
            />

            <Input
              name="house"
              :placeholder="$t('formdata.house')"
              staticPlaceholder
              required
            />

            <Input
              name="appartment"
              :placeholder="$t('formdata.sq')"
              staticPlaceholder
              required
            />
          </div>
        </div>
      </div>

      <div class="feedbackModal-checkboxList">
        <Checkbox
          name="confirm-1"
          class="feedbackModal-checkboxList-item"
          required
        >
          Я, как пользователь Сервиса, даю <a href="https://eotinish.kz/ru/agreement" target="_blank">согласие на сбор и обработку моих персональных данных</a>
        </Checkbox>

        <Checkbox
          name="confirm-2"
          class="feedbackModal-checkboxList-item"
          required
        >
          Я, согласен(на) с <a href="https://eotinish.kz/ru/privacy" target="_blank">политикой конфиденциальности</a>
        </Checkbox>
      </div>

      <div class="feedbackModal-btns">
        <Button
          name="Отправить"
          :loading="loading"
          htmlType="submit"
        />

        <Button
          type="default-grey"
          name="Отмена"
          @click="emits('hide')"
        />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import LogInFirstModal from '@/components/uiLanding/feedback/LogInFirstModal.vue';

import axios from 'axios'
import moment from 'moment'
import { ref } from 'vue'

import { useToast } from '@/modules/toast'

const { toast } = useToast()

interface IProps {
  show: boolean;
}
interface Emits {
  (event: "hide"): Function;
}

defineProps<IProps>();
const emits = defineEmits<Emits>();

const loading = ref(false)
const userID = localStorage.getItem('USER_ID');
const userType = localStorage.getItem('USER_TYPE');

const postFeedback = (
    { lastname, name, middleName, appleanType, appleanCategory, messege, region, locality, streat, house, appartment }:
    {
      lastname: string,
      name: string,
      middleName: string,
      appleanType: string,
      appleanCategory: string,
      messege: string,
      region: string,
      locality: string,
      streat: string,
      house: string,
      appartment: string,
    }
  ) => {
  const dateNow = moment().format('DD.M.YYYY');

  const fromData = {
    "status": 'new',

    "userID": userID,
    "dayOfAcceptance": dateNow,

    "appleanType": appleanType,
    "appleanCategory": appleanCategory,
  
    "name": name,
    "lastName": lastname,
    "middleName": middleName,

    "messege": messege,

    "region": region,
    "locality": locality,

    "streat": streat,
    "house": house,
    "appartment": appartment
  }

  loading.value = true;
  // const url = `https://tri.codetau.com/appealList`;
  const url = 'https://tri.codetau.com/appealList';

  axios({
    method: "post",
    url: url,
    data: fromData
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Вы успешно подали обращение'
      })
      loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
}


const appleanTypeList = [
  {label: 'Заявление', value: 'Заявление'},
  {label: 'Жалоба', value: 'Жалоба'},
  {label: 'Предложения и инициативы', value: 'Предложения и инициативы'},
  {label: 'Запрос на информацию', value: 'Запрос на информацию'},
  {label: 'Отклик', value: 'Отклик'},
  {label: 'Благодарности и отзывы', value: 'Благодарности и отзывы'},
  {label: 'Запрос на конультацию', value: 'Запрос на конультацию'},
  {label: 'Разные', value: 'Разные'},
];


const appleanCategoryList = [
  {label: 'Социальные вопросы', value: 'Социальные вопросы'},
  {label: 'Здравоохранение', value: 'Здравоохранение'},
  {label: 'Образование', value: 'Образование'},
  {label: 'Жилищные и коммунальные вопросы', value: 'Жилищные и коммунальные вопросы'},
  {label: 'Экология, природопользование и окружающая среда', value: 'Экология, природопользование и окружающая среда'},
  {label: 'Экономика и трудоустройство', value: 'Экономика и трудоустройство'},
  {label: 'Закон и правопорядок', value: 'Закон и правопорядок'},
  {label: 'Иммиграция и миграция', value: 'Иммиграция и миграция'},
  {label: 'Инфраструктура и городская среда', value: 'Инфраструктура и городская среда'},
  {label: 'Культура и искусство', value: 'Культура и искусство'},
  {label: 'Спорт и развлечения', value: 'Спорт и развлечения'},
  {label: 'Государственный язык', value: 'Государственный язык'},
  {label: 'Предпринимательство', value: 'Предпринимательство'},
  {label: 'Агропромышленный комплекс', value: 'Агропромышленный комплекс'},
  {label: 'Судебная и правоохранительная система', value: 'Судебная и правоохранительная система'},
  {label: 'Банки и иные кредитные организации', value: 'Банки и иные кредитные организации'},
  {label: 'Религия', value: 'Религия'},
  {label: 'Земельные вопросы', value: 'Земельные вопросы'},
  {label: 'Партия', value: 'Партия'},
  {label: 'Другие вопросы', value: 'Другие вопросы'},
];
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-home {
      display: flex;
      grid-gap: 16px;
    }
    & label {
      display: block;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;

      & span {
        color: var(--red-color);
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
    grid-gap: 20px;
  }
}
</style>
