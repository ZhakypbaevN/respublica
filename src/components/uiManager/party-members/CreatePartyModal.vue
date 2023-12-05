<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    :title="$t('party.creating-a-party-ticket')"
  >
    <Form
      @finish="postJoinParty"
      :ignores="disabledLocationSelect ? ['locality'] : null"
    >
      <div class="feedbackModal-inputs">
        <Select
          name="user-data"
          :placeholder="$t('formdata.select-a-user')"
          :options="usersList"
          v-model="userData"
          required
        />
        
        <Checkbox
          name="confirm-3"
          class="feedbackModal-inputs-customTicketNum"
          v-model="autoGenerateTicketNum"
        >
          {{ $t('party.automatic-number-generation') }}
        </Checkbox>

        <div class="feedbackModal-inputs-ticketNumSelect" :class="{disabled: autoGenerateTicketNum}">
          <Select
            name="ticket-num"
            :placeholder="$t('formdata.specify-the-ticket-number')"
            :options="ticketNumList"
            v-model="ticketNum"
            required
          />
        </div>


        <div class="feedbackModal-inputs-gender">
          <Input
            type="date"
            name="dateBirthday"
            :placeholder="$t('formdata.date-of-birth')"
            required
          />

          <Button
            :name="$t('status.female')"
            :type="gender === 'female' ?  'default-blue' : 'outline-grey'"
            @click="() => gender = 'female'"
          />

          <Button
            :name="$t('status.male')"
            :type="gender === 'male' ?  'default-blue' : 'outline-grey'"
            @click="() => gender = 'male'"
          />
        </div>

        <Select
          name="socialStatus"
          :placeholder="$t('formdata.social-status')"
          :options="socialStatusList"
          required
        />

        <Select
          name="education"
          :placeholder="$t('formdata.specify-the-education')"
          :options="[
            {label: $t('status.higher'), value: 'higher_education'},
            {label: $t('status.average'), value: 'secondary_special_education'},
          ]"
          required
        />

        <Input
          name="specialization"
          :placeholder="$t('formdata.specialization')"
        />

        <Input
          name="workPlace"
          :placeholder="$t('formdata.place-of-work')"
        />

        <Input
          name="post"
          :placeholder="$t('formdata.post')"
        />

        <Select
          name="region"
          :placeholder="$t('formdata.specify-the-area')"
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
              :placeholder="$t('formdata.locality')"
              :options="
                locationList.length
                  ? locationList
                  : [{label: $t('status.first-select-an-area'), value: null}]
              "
              v-model="locationID"
              required
            />
          </div>
        </Transition>

        <div class="feedbackModal-inputs-home">
          <Input
            name="streat"
            :placeholder="$t('formdata.street-prospect-mkr')"
          />

          <Input
            name="home"
            :placeholder="$t('formdata.house')"
          />

          <Input
            name="apartment"
            :placeholder="$t('formdata.sq')"
          />
        </div>


        <div>
          <h4 class="feedbackModal-inputs-subtitle">
            {{ $t('formdata.do-you-belong-to-the-category') }}
          </h4>

          <div class="feedbackModal-checkboxList-block">
            <div class="feedbackModal-checkboxList">
              <Checkbox
                name="pensioner"
                class="feedbackModal-checkboxList-item"
              >
                {{ $t('formdata.pensioners') }}
              </Checkbox>

              <Checkbox
                name="disabled"
                class="feedbackModal-checkboxList-item"
              >
                {{ $t('formdata.disabled') }}
              </Checkbox>
            </div>

            <div class="feedbackModal-checkboxList">
              <Checkbox
                name="unemployed"
                class="feedbackModal-checkboxList-item"
              >
                {{ $t('formdata.unemployed') }}
              </Checkbox>

              <Checkbox
                name="onChildcareLeave"
                class="feedbackModal-checkboxList-item"
              >
                {{ $t('formdata.on-childcare-leave') }}
              </Checkbox>
            </div>
          </div>
        </div>
      </div>

      <Button
        :name="$t('button.send-a-request')"
        :loading="loading"
        htmlType="submit"
        :ignoreValidate="disabledLocationSelect ? ['locality'] : null"
      />

    </Form>
  </Modal>
</template>

<script setup lang="ts">
import axios from 'axios'
import moment from 'moment'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'

import { useToast } from '@/modules/toast'

const { t } = useI18n()
const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish'): Function,
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)
const gender = ref('female');
const token = localStorage.getItem('access_token');

const regionList = ref([]);
const locationList = ref([]);

const regionID = ref(null);
const locationID = ref(null);
const disabledLocationSelect = ref(false);

const usersList = ref([]);
const userData = ref();

const autoGenerateTicketNum = ref(true);
const ticketNum = ref(null);
const ticketNumList = ref([]);

const socialStatusList = [
  {
    label: t('social-status.self-employed-persons-with-disabilities'),
    value: t('social-status.self-employed-persons-with-disabilities')
  },
  {
    label: t('social-status.student'),
    value: t('social-status.student')
  },
  {
    label: t('social-status.persons-on-parental-leave'),
    value: t('social-status.persons-on-parental-leave')
  },
  {
    label: t('social-status.pensioners'),
    value: t('social-status.pensioners')
  },
  {
    label: t('social-status.unemployed'),
    value: t('social-status.unemployed')
  },
  {
    label: t('social-status.working'),
    value: t('social-status.working')
  },
  {
    label: t('social-status.large-families'),
    value: t('social-status.large-families')
  }
]

onMounted(() => {

  const url = `https://api.respublica-partiyasy.kz/api/v1/parties/locations?offset=0&limit=100`;
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
  getUsers()
  getTicketNum()
})

const getUsers = () => {
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/users?offset=0&limit=100`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      response.data.forEach(data => {
        usersList.value.push(
          {
            label: `${data.first_name} ${data.last_name} ${data.middle_name ?? ''}`,
            value: JSON.stringify(data),
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
}

const getTicketNum = () => {
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/reserved-ticket-numbers?offset=0&limit=100`;
  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      response.data.forEach(num => {
        ticketNumList.value.push(
          {
            label: num.ticket_number,
            value: num.id.toString(),
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
}

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
      education, specialization, workPlace, post, streat, home, apartment, dateBirthday, pensioner, disabled, unemployed, onChildcareLeave, socialStatus
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
      socialStatus: string
    }
  ) => {

  const data = {
    "birth_date": moment(dateBirthday).format('YYYY-MM-DD'), 
    "gender": gender.value,

    "education": education,
    "specialty": specialization.length ? specialization : null,
    "workplace": workPlace.length ? workPlace : null,
    "position": post.length ? post : null,
    "social_status": socialStatus,
  
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
  const url = `https://api.respublica-partiyasy.kz/api/v1/parties/memberships`;

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
        message: 'Вы успешно создали партиица',
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

    &-customTicketNum {
      margin-bottom: 10px !important;
    }

    &-ticketNumSelect {
      opacity: 1;
      transition: all .3s ease-in-out;
      &.disabled {
        pointer-events: none;
        opacity: .4;
      }
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

  &-checkboxList-block {
    padding-bottom: 0px;
    border-bottom: 0px;
  }
}

</style>
