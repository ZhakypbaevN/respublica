<template>
  <div>
    <Modal
      @hide="emits('hide')"
      class="feedbackModal"
      :title="t('party.editing-a-party-member')"
    >
      <Form
        @finish="onCollectData"
        :ignores="disabledLocationSelect ? ['locality'] : null"
      >
        <div class="feedbackModal-inputs">
          <ControlTicketNum
            class="feedbackModal-inputs-ticketNum"
            :num="partyData.ticket_number"
            :ticketNum="formData.newTicketNum"
            :defaultNum="formData.defaultTicketNum"
            @showModalSelect="() => showTicketNumModal = true"
            @toDefault="() => {
              formData.newTicketNum = null;
              partyData.ticket_number = formData.defaultTicketNum;
            }"
          />
          
          <div class="feedbackModal-inputs-joinDate">
            <Input
              type="date"
              name="joinDate"
              :placeholder="$t('formdata.date-of-issue-of-the-ticket')"
              v-model="partyData.join_date"
              required
            />
          </div>

          <div class="feedbackModal-inputs-gender">
            <Input
              type="date"
              name="dateBirthday"
              :placeholder="$t('formdata.date-of-birth')"
              v-model="partyMember.birth_date"
              required
            />

            <Button
              :name="$t('status.female')"
              :type="formData.gender === 'female' ?  'default-blue' : 'outline-grey'"
              @click="() => formData.gender = 'female'"
            />

            <Button
              :name="$t('status.male')"
              :type="formData.gender === 'male' ?  'default-blue' : 'outline-grey'"
              @click="() => formData.gender = 'male'"
            />
          </div>

          <Select
            name="socialStatus"
            :placeholder="$t('formdata.social-status')"
            :options="socialStatusList"
            v-model="partyMember.social_status"
            required
          />

          <Select
            name="education"
            :placeholder="$t('formdata.specify-your-education')"
            :options="[
              {label: $t('status.higher'), value: 'higher_education'},
              {label: $t('status.average'), value: 'secondary_special_education'},
            ]"
            v-model="partyMember.education"
            required
          />

          <Input
            name="specialization"
            :placeholder="$t('formdata.specialization')"
            v-model="partyMember.specialty"
          />

          <Input
            name="workPlace"
            :placeholder="$t('formdata.place-of-work')"
            v-model="partyMember.workplace"
          />

          <Input
            name="post"
            :placeholder="$t('formdata.post')"
            v-model="partyMember.position"
          />

          <Select
            name="region"
            :placeholder="$t('formdata.specify-the-area')"
            :options="regionList"
            v-model="formData.regionID"
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
                v-model="formData.locationID"
                required
              />
            </div>
          </Transition>

          <div class="feedbackModal-inputs-home">
            <Input
              name="streat"
              :placeholder="$t('formdata.street-prospect-mkr')"
              v-model="partyMember.street"
              required
            />

            <Input
              name="home"
              :placeholder="$t('formdata.house')"
              v-model="partyMember.house"
              required
            />

            <Input
              name="apartment"
              :placeholder="$t('formdata.sq')"
              v-model="partyMember.apartment"
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
                  v-model="partyMember.is_pensioner"
                >
                  {{ $t('social-category.user-status-pensioner') }}
                </Checkbox>

                <Checkbox
                  name="disabled"
                  class="feedbackModal-checkboxList-item"
                  v-model="partyMember.is_disabled"
                >
                  {{ $t('social-category.user-status-disabled') }}
                </Checkbox>
              </div>

              <div class="feedbackModal-checkboxList">
                <Checkbox
                  name="unemployed"
                  class="feedbackModal-checkboxList-item"
                  v-model="partyMember.is_unemployed"
                >
                  {{ $t('social-category.user-status-unemployed') }}
                </Checkbox>

                <Checkbox
                  name="onChildcareLeave"
                  class="feedbackModal-checkboxList-item"
                  v-model="partyMember.is_on_childcare_leave"
                >
                  {{ $t('social-category.user-status-on-childcare-leave') }}
                </Checkbox>
              </div>
            </div>
          </div>
        </div>

        <Button
          :name="$t('button.save')"
          :loading="isLoading"
          htmlType="submit"
          :ignoreValidate="disabledLocationSelect ? ['locality'] : null"
        />
      </Form>
    </Modal>
    
    <SelectTicketNumModal
      :show="showTicketNumModal"
      @select="(data) => onNewTicketNum(data)"
      @hide="() => showTicketNumModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  import SelectTicketNumModal from '@/components/uiManager/party-members/create/select-ticket-num/SelectTicketNumModal.vue';
  import ControlTicketNum from '@/components/uiManager/party-members/create/select-ticket-num/ControlTicketNum.vue'

  import moment from 'moment'
  import { useI18n } from 'vue-i18n'
  import { onMounted, ref, watch, reactive } from 'vue'

  import { useToast } from '@/modules/toast'

  import { getLocationsList } from '@/actions/uiAdmin/locations';
  import { putPartyMember } from '@/actions/uiManager/party-members';
  import { deleteTicketNum } from '@/actions/uiManager/ticket-numbers';

  import { IPartyMember } from '@/types/party-member';

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    partyData: IPartyMember,
  }
  
  interface Emits {
    (event: 'hide'): Function,
    (event: 'finish'): Function,
  }
  
  const props = defineProps<IProps>()
  const emits = defineEmits<Emits>()
  
  const partyMember = ref<IPartyMember>(props.partyData);

  const isLoading = ref(false)
  const showTicketNumModal = ref(false)

  const regionList = ref([]);
  const locationList = ref([]);
  const disabledLocationSelect = ref(true);

  const formData = reactive({
    defaultTicketNum: props.partyData.ticket_number,
    gender: props.partyData.gender,
    newTicketNum: null,
    regionID: props.partyData.location.parent ? props.partyData.location.parent.id : props.partyData.location.id,
    locationID: null
  });

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

    if (props.partyData.location.parent) {
      locationList.value = [];
      formData.locationID = props.partyData.location.id;
      disabledLocationSelect.value = false;
      
      regionList.value.forEach(region => {
        if (Number(region.value) === Number(formData.regionID)) {
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
  })

  watch(
    () => formData.regionID,
    () => {
      locationList.value = [];
      formData.locationID = null;
      disabledLocationSelect.value = false;

      regionList.value.forEach(region => {
        if (Number(region.value) === Number(formData.regionID)) {
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
        education, specialization, workPlace, post, streat, home, apartment, dateBirthday, pensioner, disabled, unemployed, onChildcareLeave, socialStatus, joinDate
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
        socialStatus: string,
        joinDate: string
      }
    ) => {

    const data = {
      "birth_date": moment(dateBirthday).format('YYYY-MM-DD'), 
      "gender": formData.gender,

      "education": education,
      "specialty": specialization.length ? specialization : null,
      "workplace": workPlace.length ? workPlace : null,
      "position": post.length ? post : null,
      "social_status": socialStatus,
    
      "location_id": Number(formData.locationID ?? formData.regionID),

      "street": streat,
      "house": home,
      "apartment": apartment === '' ? null : apartment,

      "is_pensioner": pensioner,
      "is_disabled": disabled,
      "is_unemployed": unemployed,
      "is_on_childcare_leave": onChildcareLeave,

      "join_date": moment(joinDate).format('YYYY-MM-DD'),
      "ticket_number": partyMember.value.ticket_number
    };

    postParty(data);
  }

  const postParty = async (data) => {
    isLoading.value = true;
    try {
      const response = await putPartyMember(partyMember.value.id, data);
      if (response) {
        toast({
          message: t('message.you-have-successfully-joined-the-party'),
          type: 'success'
        })

        if (formData.newTicketNum) {
          try {
            await deleteTicketNum(formData.newTicketNum.id);
      
            toast({
              message: t('message.vip-number-has-been-successfully-deleted'),
              type: 'success'
            })
          } finally {
            isLoading.value = false
          }
        }
  
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

  const onNewTicketNum = (newTicket) => {
    formData.newTicketNum = newTicket;
    partyMember.value.ticket_number = newTicket.ticket_number;
  }
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-joinDate {
      margin-bottom: 30px;
    }
    
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
