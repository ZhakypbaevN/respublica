<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Вступить в партию"
  >
    <Form
      @finish="postJoinParty"
      :ignores="disabledLocationSelect ? ['locality'] : null"
    >
      <div class="feedbackModal-inputs">
        <Input
          name="iin"
          placeholder="ИИН"
          mask="############"
          v-model="data.user.iin"
          disabled
          required
        />

        <Input
          name="lastname"
          placeholder="Фамилия"
          v-model="data.user.last_name"
          disabled
          required
        />

        <Input
          name="name"
          placeholder="Имя"
          v-model="data.user.first_name"
          disabled
          required
        /> 

        <Input
          name="middleName"
          placeholder="Отчество"
          v-model="data.user.middle_name"
        />

        <Input
          type="tel"
          name="phone"
          placeholder="Ваш номер телефона"
          validation="phone"
          v-model="data.user.phone"
          :min="17"
          disabled
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          v-model="data.user.email"
        />

        <div class="feedbackModal-inputs-gender">
          <Input
            type="date"
            name="dateBirthday"
            placeholder="Дата рождения*"
            v-model="data.birth_date"
            required
          />

          <Button
            name="Женщина"
            :type="data.gender === 'female' ?  'default-blue' : 'outline-grey'"
            @click="() => data.gender = 'female'"
          />

          <Button
            name="Мужчина"
            :type="data.gender === 'male' ?  'default-blue' : 'outline-grey'"
            @click="() => data.gender = 'male'"
          />
        </div>

        <Select
          name="education"
          placeholder="Укажите ваше образование*"
          v-model="data.education"
          :options="[
            {label: 'Высшее', value: 'higher_education'},
            {label: 'Среднее', value: 'secondary_special_education'},
          ]"
          required
        />

        <Input
          name="specialization"
          placeholder="Специальность"
          v-model="data.specialization"
        />

        <Input
          name="workPlace"
          placeholder="Место работы"
          v-model="data.workPlace"
        />

        <Input
          name="post"
          placeholder="Должность"
          v-model="data.specialty"
        />

        <Select
          name="region"
          placeholder="Укажите область*"
          :options="regionList"
          v-model="regionID"
          required
        />

        <Transition>
          <div
            v-if="!disabledLocationSelect"
            v-collapse
          >
            <Select
              name="locality"
              placeholder="Населенный пункт*"
              :options="
                locationList.length
                  ? locationList
                  : [{label: 'Сначало выберите область', value: null}]
              "
              v-model="locationID"
              required
            />
          </div>
        </Transition>

        <div class="feedbackModal-inputs-home">
          <Input
            name="street"
            placeholder="Улица/Проспект/Мкр*"
            v-model="data.street"
            required
          />

          <Input
            name="home"
            placeholder="Дом*"
            v-model="data.house"
            required
          />

          <Input
            name="apartment"
            placeholder="Кв."
            v-model="data.apartment"
          />
        </div>


        <div>
          <h4 class="feedbackModal-inputs-subtitle">
            Относитесь ли вы к категории:
          </h4>

          <div class="feedbackModal-checkboxList-block">
            <div class="feedbackModal-checkboxList">
              <Checkbox
                name="pensioner"
                class="feedbackModal-checkboxList-item"
                v-model="data.is_pensioner"
              >
                Пенсионеры
              </Checkbox>

              <Checkbox
                name="disabled"
                class="feedbackModal-checkboxList-item"
                v-model="data.is_disabled"
              >
                Инвалиды
              </Checkbox>
            </div>

            <div class="feedbackModal-checkboxList">
              <Checkbox
                name="unemployed"
                class="feedbackModal-checkboxList-item"
                v-model="data.is_unemployed"
              >
                Безработные
              </Checkbox>

              <Checkbox
                name="onChildcareLeave"
                class="feedbackModal-checkboxList-item"
                v-model="data.is_on_childcare_leave"
              >
                Находящиеся в отпуске по уходу за детьми
              </Checkbox>
            </div>
          </div>
        </div>
      </div>

      <Button
        name="Отправить заявку"
        :loading="loading"
        htmlType="submit"
        :ignoreValidate="disabledLocationSelect ? ['locality'] : null"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'
import axios from 'axios'

// Modules
import { useToast } from '../../../modules/toast'

const { toast } = useToast()

interface IProps {
  show: boolean,
  data: any
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish'): Function,
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)
const gender = ref('female');
const token = localStorage.getItem('TOKEN');

const regionList = ref([]);
const locationList = ref([]);

const regionID = ref(null);
const locationID = ref(null);
const disabledLocationSelect = ref(false);

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
            value: location.id.toString(),
            childrens: location.childrens
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
    
  regionID.value = props.data?.location?.parent?.id;
  locationID.value = props.data?.location?.id;
})

watch(
  () => regionID.value,
  () => {
    locationList.value = [];
    locationID.value = null;
    disabledLocationSelect.value = false;

    regionList.value.forEach(region => {
      if (Number(region.value) === Number(regionID.value)) {
        if (!region.childrens.length) disabledLocationSelect.value = true;
        region.childrens.forEach(location => {
          locationList.value.push(
            {
              label: location.name,
              value: location.id.toString()
            }
          );
        })
      }
    });
  }
)

const postJoinParty = (
    {
      education, specialization, workPlace, post, streat, home, apartment, dateBirthday, pensioner, disabled, unemployed, onChildcareLeave
    }:
    {
      education: string,
      specialization: string,
      workPlace: string,
      dateBirthday: string,
      post: string,
      streat: string,
      home: string,
      apartment: string|null,
      pensioner: boolean,
      disabled: boolean,
      unemployed: boolean,
      onChildcareLeave: boolean,
    }
  ) => {

  const data = {
    "birth_date": moment(dateBirthday).format('YYYY-MM-DD'), 
    "gender": gender.value,

    "education": education,
    "specialty": specialization.length ? specialization : null,
    "workplace": workPlace.length ? workPlace : null,
    "position": post.length ? post : null,
  
    "location_id": Number(locationID.value ?? regionID.value),

    "street": streat,
    "house": home,
    "apartment": apartment === '' ? null : apartment,

    "is_pensioner": pensioner,
    "is_disabled": disabled,
    "is_unemployed": unemployed,
    "is_on_childcare_leave": onChildcareLeave,
  };

  postParty(data);
}

const postParty = (data) => {
  loading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/parties/memberships/${props.data.id}`;

  axios({
    method: "post",
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
        message: 'Вы успешно вступили в партию',
        type: 'success'
      })
      
      emits('finish')
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
    grid-gap: 20px;
  }
}

</style>
