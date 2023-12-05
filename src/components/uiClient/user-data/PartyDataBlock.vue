<template>
  <div v-if="loading" class="partyData disabled">
    <h2 class="partyData-title skeleton long-text" style="width:80%;"></h2>

    <h4
      class="partyData-item"
      v-for="item in 6"
      :key="item"
    >
      <span class="skeleton small-text"></span>
      <span class="skeleton small-text" :style="`width:${item === 6 ? '40' : '60'}%`"></span>
    </h4>
  </div>

  <div v-if="partyData" class="partyData">
    <div class="partyData-header">
      <h2 class="partyData-title">
        {{ $t('party.additional-data-of-the-party-ticket') }}
      </h2>

      <Button
        v-if="onEdit"
        class="partyData-editBtn"
        type="outline-grey-light"
        @click="onEdit"
      >
        <SvgIcon
          name="pencil-edit-with-line"
          :viewboxWidth="32"
          :viewboxHeight="32"
        />
      </Button>
    </div>

    <div class="partyData-infoBlock">
      <h4 class="partyData-item">
        <span>{{ $t('formdata.date-of-birth') }}:</span>
        {{ partyData?.birth_date ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.gender') }}:</span>
        {{ checkGender(partyData?.gender) }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.education') }}:</span>
        {{ partyData?.education === 'higher_education' ? 'Высшее образование' : partyData?.education === 'secondary_special_education' ? 'Среднее образование' : '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.social-status') }}:</span>
        {{ partyData?.social_status ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.specialization') }}:</span>
        {{ partyData?.specialty ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.place-of-work') }}:</span>
        {{ partyData?.workplace ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.post') }}:</span>
        {{ partyData?.position ?? '-' }}
      </h4>
      
      <h4 class="partyData-item">
        <span>{{ $t('formdata.area') }}:</span>
        {{ partyData?.location.parent?.name ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.locality') }}:</span>
        {{ partyData?.location.name ?? '-' }}
      </h4>

      <h4 class="partyData-item">
        <span>{{ $t('formdata.street-prospect-mkr') }}:</span>
        {{ partyData?.street ?? '-' }}
      </h4>

      <div class="partyData-bottom">
        <h4 class="partyData-item">
          <span>{{ $t('formdata.house') }}:</span>
          {{ partyData?.house ?? '-' }}
        </h4>

        <h4 class="partyData-item">
          <span>{{ $t('formdata.sq') }}:</span>
          {{ partyData?.apartment ?? '-' }}
        </h4>
      </div>

      <div class="partyData-statusBlock">
        <div v-if="partyData?.is_pensioner" class="partyData-status">
          {{ $t('social-category.user-status-pensioner') }}
        </div>

        <div v-if="partyData?.is_disabled" class="partyData-status">
          {{ $t('social-category.user-status-disabled') }}
        </div>

        <div v-if="partyData?.is_unemployed" class="partyData-status">
          {{ $t('social-category.user-status-unemployed') }}
        </div>

        <div v-if="partyData?.is_on_childcare_leave" class="partyData-status">
          {{ $t('social-category.user-status-on-childcare-leave') }}
        </div>
      </div>
    </div>
    <p class="partyData-description">
      {{ $t('formdata.agreement.the-charter-and-program-of-the-political-party') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import checkGender from '@/helpers/checkGender.js'

interface IProps {
  partyData: any,
  onEdit?: Function,
  loading: boolean
}

defineProps<IProps>()
</script>

<style scoped lang="scss">
.partyData {
  padding: 25px;

  border-radius: 10px;
  background: white;

  &.disabled .partyData-item {
    display: flex;
    grid-gap: 20px;
    margin-bottom: 20px;
  }

  &-header {
    display: grid;
    grid-template-columns: 1fr 60px;
  }

  &-title {
    font-size: 30px;
    font-weight: 600;

    margin-bottom: 30px;
  }

  &-infoBlock {
    padding-bottom: 20px;
    margin-bottom: 20px;

    border-bottom: 1px solid var(--light-gray-color-op50);
  }

  &-item {
    font-size: 20px;
    font-weight: 500;

    margin-bottom: 14px;

    & span {
      color: var(--light-gray-color);
    }
  }

  &-item:last-child {
    margin-bottom: 20px;
  }

  &-bottom {
    display: flex;
    grid-gap: 40px;
  }

  &-statusBlock {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 12px;
  }

  &-status {
    color: var(--accent-color);
    font-size: 20px;
    font-weight: 500;

    display: inline-flex;
    padding: 10px 15px;

    border-radius: 60px;
    background: var(--accent-color-op10);
  }

  &-description {
    color: var(--light-gray-color);

    & a {
      color: inherit;
      text-decoration: underline;
    }
  }

  &-editBtn {
    height: 64px;
    width: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0px !important;

    & svg {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
