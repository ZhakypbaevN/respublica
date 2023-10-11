<template>
  <LogInFirstModal
    title="Чтобы вступить в партию Вам необходимо авторизоваться на портале или пройти регистрацию"
    @hide="emits('hide')"
    :show="props.show && !userType"
  />
  
  <Modal
    v-if="props.show && userType"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Вступить в партию"
  >
    <Form @finish="postJoinParty">
      <div class="feedbackModal-inputs">
        <Input
          name="iin"
          placeholder="ИИН"
          mask="############"
          required
        />

        <Input
          name="lastname"
          placeholder="Фамилия"
          required
        />

        <Input
          name="name"
          placeholder="Имя"
          required
        /> 

        <Input
          name="middleName"
          placeholder="Отчество"
          required
        />

        <div class="feedbackModal-inputs-gender">
          <Input
            type="date"
            name="dateBirthday"
            placeholder="Дата рождения"
            required
          />

          <Button
            name="Женщина"
            :type="gender === 'Женщина' ?  'default-blue' : 'outline-grey'"
            @click="() => gender = 'Женщина'"
          />

          <Button
            name="Мужчина"
            :type="gender === 'Мужчина' ?  'default-blue' : 'outline-grey'"
            @click="() => gender = 'Мужчина'"
          />
        </div>

        <Select
          name="education"
          placeholder="Укажите ваше образование"
          :options="[
            {label: 'Высшее', value: 'Высшее'},
            {label: 'Среднее', value: 'Среднее'},
          ]"
          required
        />

        <Input
          name="specialization"
          placeholder="Специальность"
          required
        />

        <Input
          name="workPlace"
          placeholder="Место работы"
          required
        />

        <Input
          name="post"
          placeholder="Должность"
          required
        />

        <Input
          type="tel"
          name="phone"
          placeholder="Ваш номер телефона"
          validation="phone"
          :min="17"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        <Input
          name="region"
          placeholder="Укажите область"
          required
        />

        <!-- <Select
          name="region"
          placeholder="Укажите область"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        /> -->

        <Input
          name="locality"
          placeholder="Населенный пункт"
          required
        />
        <!-- <Select
          name="locality"
          placeholder="Населенный пункт"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        /> -->

        <div class="feedbackModal-inputs-home">
          <Input
            name="streat"
            placeholder="Улица/Проспект/Мкр"
            required
          />

          <Input
            name="home"
            placeholder="Дом"
            required
          />

          <Input
            name="apartment"
            placeholder="Кв."
            required
          />
        </div>


        <div>
          <label>
            Относитесь ли вы к категории:
          </label>

          <div class="feedbackModal-checkboxList-block">
            <div class="feedbackModal-checkboxList">
              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox" @change="changeStatus('Пенсионеры')">
                <span>
                  Пенсионеры
                </span>
              </label>

              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox" @change="changeStatus('Инвалиды')">
                <span>
                  Инвалиды
                </span>
              </label>
            </div>

            <div class="feedbackModal-checkboxList">
              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox" @change="changeStatus('Безработные')">
                <span>
                  Безработные
                </span>
              </label>

              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox" @change="changeStatus('Находящиеся в отпуске по уходу за детьми')">
                <span>
                  Находящиеся в отпуске по уходу за детьми
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="feedbackModal-checkboxList">
        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            С Уставом и Программой политической партии «Respublica» ознакомлен(а), поддерживаю их и обязуюсь выполнять.
          </span>
        </label>

        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            Продолжая, Вы выражаете согласие на сбор и обработку своих персональных данных не противоречащими законодательству Республики Казахстан способами, как на бумажных носителях, так и в электронном формате, в той мере, насколько это необходимо.
          </span>
        </label>

        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            Подтверждаю, что не являюсь членом другой политической партии
          </span>
        </label>
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
// Components
import LogInFirstModal from './logInFirstModal.vue';

import { reactive, ref } from 'vue'
import moment from 'moment'
import axios from 'axios'

// Modules
import { useToast } from '../../../modules/toast'

// Helpers
import formatPhone from '../../../helpers/formatPhone';

const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)
const gender = ref('Женщина');
const userID = localStorage.getItem('USER_ID');
const userType = localStorage.getItem('USER_TYPE');
const data = reactive({
  status: []
});

const changeStatus = (val: string) => {
  if (data.status.indexOf(val) !== -1) data.status.push(val);
  else data.status.splice(data.status.indexOf(val), 1);
}

const postJoinParty = (
    {
      iin, lastname, name, middleName, education, specialization, workPlace, post, phone, email, region, locality, streat, home, apartment, dateBirthday
    }:
    {
      iin: string,
      lastname: string,
      name: string,
      middleName: string,
      education: string,
      specialization: string,
      workPlace: string,
      dateBirthday: string,
      post: string,
      phone: string,
      email: string,
      region: string,
      locality: string,
      streat: string,
      home: string,
      apartment: string
    }
  ) => {
  const dateNow = moment().format('DD.M.YYYY');

  const data = {
    "userID": userID,
    "dayOfAcceptance": dateNow,
    "dayOfRegistration": dateNow,
  
    "dayOfRequestToExitParty": null,
    "deleted": false,
  
    "name": name,
    "lastName": lastname,
    "middleName": middleName,
  
    "iin": iin,
    "birthday": moment(dateBirthday).format('DD.M.YYYY'), 
    "phone": formatPhone(phone),
    "email": email,

    "gender": gender.value,
    "educationlevel": education,
    "specialization": specialization,
    "workPlace": workPlace,
    "role": post,
  
    "region": region,
    "city": locality,
    "streat": streat,
    "home": home,
    "apartment": apartment,
  
    status: [
    ]
  };

  console.log('data', data);
  postParty(data);
}

const postParty = (data) => {
  loading.value = true;
  const url = `https://tri.codetau.com/partyCards`;

  axios({
    method: "post",
    url: url,
    data: data
  })
    .then((response) => {
      console.log('response', response);
      toast({
        message: 'Вы успешно вступили в партию'
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
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-home {
      display: grid;
      grid-template-columns: 1fr 135px 135px;
      grid-gap: 16px;
    }
    & label {
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
    grid-gap: 20px;
  }
}

</style>
