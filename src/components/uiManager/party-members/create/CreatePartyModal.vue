<template>
  <div>
    <Modal
      @hide="emits('hide')"
      class="feedbackModal"
      :title="t('party.creating-a-party-member')"
    >
      <div class="feedbackModal-selectPeopleBlock">
        <Button
          class="feedbackModal-selectPeopleBlock-btn"
          :class="{ active: userData }"
          :name="
            userData
              ? `${userData.last_name} ${userData.first_name} ${userData.middle_name ?? ''}`
              : $t('button.select-a-user')
          "
          type="outline-grey"
          v-slot:left
          @click="() => showModal.selectUser = true"
ы        >
          <div class="feedbackModal-selectPeopleBlock-btn-avatar">
            <SvgIcon
              name="avatar"
              :viewboxWidth="44"
              :viewboxHeight="44"
            />
          </div>
        </Button>

        <Button
          type="default-light-blue"
          class="feedbackModal-selectPeopleBlock-tip"
          @click="() => showModal.selectUser = true"
        >
          <SvgIcon
            :name="userData  ? 'loop' : 'touch'"
            :viewboxWidth="24"
            :viewboxHeight="24"
          />
        </Button>
        <button
          class="feedbackModal-selectPeopleBlock-createBtn"
          @click="() => showModal.createUser = true"
        >
          {{ $t('button.create-a-user') }}
        </button>
      </div>

      <Form
        @finish="onCollectData"
        :ignores="disabledLocationSelect ? ['locality'] : null"
      >
        <div class="feedbackModal-inputs">
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
            :placeholder="$t('formdata.specify-your-education')"
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
              required
            />

            <Input
              name="home"
              :placeholder="$t('formdata.house')"
              required
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
                  {{ $t('social-category.user-status-pensioner') }}
                </Checkbox>

                <Checkbox
                  name="disabled"
                  class="feedbackModal-checkboxList-item"
                >
                  {{ $t('social-category.user-status-disabled') }}
                </Checkbox>
              </div>

              <div class="feedbackModal-checkboxList">
                <Checkbox
                  name="unemployed"
                  class="feedbackModal-checkboxList-item"
                >
                  {{ $t('social-category.user-status-unemployed') }}
                </Checkbox>

                <Checkbox
                  name="onChildcareLeave"
                  class="feedbackModal-checkboxList-item"
                >
                  {{ $t('social-category.user-status-on-childcare-leave') }}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>

        <Button
          :name="$t('button.create')"
          :loading="isLoading"
          htmlType="submit"
          :ignoreValidate="disabledLocationSelect ? ['locality'] : null"
        />
      </Form>
    </Modal>

    <SelectUserModal
      :show="showModal.selectUser"
      v-model:select="userData"
      @hide="() => showModal.selectUser = false"
    />

    <EditUserModal
      v-if="showModal.createUser"
      @hide="() => showModal.createUser = false"
      v-model:data="userData"
    />
  </div>
</template>

<script setup lang="ts">
  import SelectUserModal from '@/components/uiManager/party-members/create/select-user/SelectUserModal.vue'
  import EditUserModal from '@/components/uiAdmin/users/EditUserModal.vue';
  
  import moment from 'moment'
  import { useI18n } from 'vue-i18n'
  import { onMounted, ref, watch, reactive } from 'vue'

  import { useToast } from '@/modules/toast'

  import { getLocationsList } from '@/actions/uiAdmin/locations';
  import { postNewPartyMember } from '@/actions/uiManager/party-members';

  import { IUser } from '@/types/users';

  const { t } = useI18n()
  const { toast } = useToast()

  interface Emits {
    (event: 'hide'): Function,
    (event: 'finish'): Function,
  }

  const emits = defineEmits<Emits>()

  const showModal = reactive({
    selectUser: false,
    createUser: false
  });

  const isLoading = ref(false)
  const gender = ref('female');
  const userData = ref<IUser>();

  const regionList = ref([]);
  const locationList = ref([]);

  const regionID = ref(null);
  const locationID = ref(null);
  const disabledLocationSelect = ref(false);

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

  onMounted(async () => {
    const response = await getLocationsList()
    response.data.data.forEach(location => {
      regionList.value.push(
        {
          label: location.name,
          value: location.id.toString(),
          childrens: location.childrens
        }
      );
    });
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

  const onCollectData = (
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

      "user_id": userData.value.id,
      "status": "active",

      "join_date": null,
      "ticket_number": null
    };

    postParty(data);
  }

  const postParty = async (data) => {
    isLoading.value = true;
    try {
      const response = await postNewPartyMember(data);

      if (response) {
        toast({
          message: t('message.you-have-successfully-joined-the-party'),
          type: 'success'
        })
  
        emits('finish')
        setTimeout(() => {
          emits('hide')
        }, 300);
      }
    } catch (err) {
      if (err.response.data.detail === 'Duplicate membership is not allowed.') {
        toast({
          message: t('errors.you-have-already-joined-the-parties'),
          type: 'warning'
        })
      } else if (err.response.data.detail === 'Age under 18 is not allowed.') {
        toast({
          message: t('errors.accommodation-under-the-age-of-18-is-not-allowed'),
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
  &-selectPeopleBlock {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-bottom: 40px;
    position: relative;
    
    &-btn {
      width: 100%;

      display: flex;
      grid-gap: 18px;
      align-items: center;

      padding: 14px 24px;
      margin-bottom: 4px;

      &-avatar {
        height: 45px;
        width: 45px;
  
        display: flex;
        align-items: center;
        justify-content: center;
  
        border-radius: 50%;
        background-color: var(--accent-color-op15);
  
        & svg {
          width: 30px;
          height: 30px;
  
          stroke: var(--accent-color);
        }
      }
    }

    &-tip {
      padding: 14px;

      position: absolute;
      top: 10px;
      right: 10px;

      & svg {
        height: 24px;
        width: 24px;
      }
    }

    &-createBtn {
      font-size: 18px;
      font-weight: 500;
      color: var(--accent-color);
    }
  }
  
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

  &-checkboxList {
    margin-bottom: 0px !important;

    &-block {
      border-bottom: none;
    }
  }
}

</style>
<style>
.feedbackModal-selectPeopleBlock-btn.active span {
  color: var(--primary-color);
}
</style>
