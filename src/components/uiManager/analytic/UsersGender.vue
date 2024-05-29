<template>
  <AnalyticsBlock
    :title="$t('analytics.user-шs-gender')"
  >
    <div v-if="genderData" class="usersGender-block">
      <div class="usersGender-item">
        <div class="usersGender-item-preview man">
          <h4 class="usersGender-item-preview-title">
            {{ $t('status.male') }}
          </h4>
          <SvgIcon
            name="people-body-man"
            :viewboxWidth="30"
            :viewboxHeight="83"
          />
          <h3 class="usersGender-item-preview-procent">
            {{ calculatorProcents(genderData.male) }}%
          </h3>
        </div>
        <div class="usersGender-item-list man">
          <SvgIcon
            v-for="item in 10"
            :key="item"
            name="people-body-man"
            :viewboxWidth="30"
            :viewboxHeight="83"
            :class="{ active: item < calculatorCount(genderData.male) }"
          />
        </div>
      </div>

      <div class="usersGender-item girl">
        <div class="usersGender-item-preview girl">
          <h3 class="usersGender-item-preview-procent">
            {{ calculatorProcents(genderData.female) }}%
          </h3>
          <SvgIcon
            name="people-body-girl"
            :viewboxWidth="42"
            :viewboxHeight="83"
          />
          <h4 class="usersGender-item-preview-title">
            {{ $t('status.female') }}
          </h4>
        </div>
        <div class="usersGender-item-list girl">
          <SvgIcon
            v-for="item in 10"
            :key="item"
            name="people-body-girl"
            :viewboxWidth="42"
            :viewboxHeight="83"
            :class="{ active: item < calculatorCount(genderData.female) }"
          />
        </div>
      </div>
    </div>
  </AnalyticsBlock>
</template>

<script setup lang="ts">
import AnalyticsBlock from '@/components/uiManager/analytic/AnalyticsBlock.vue'

import { ref, onMounted } from 'vue';

import { IAnalyticsGenderDemographics } from '@/types/analytics';
import { getGenderDemographics } from '@/actions/uiManager/analytics';

const total = ref(0);
const genderData = ref<IAnalyticsGenderDemographics>()

onMounted(async () => {
  const response = await getGenderDemographics();
  if (response) {
    genderData.value = response.data;
    total.value = genderData.value.male + genderData.value.female;
  }
})

const calculatorProcents = (count) => {
  return Math.round(count / total.value * 100) / 1;
}

const calculatorCount = (count) => {
  return Math.round(count / total.value * 100) / 10;
}
</script>

<style scoped lang="scss">
.usersGender {
  &-block {
    display: flex;
    flex-direction: column;
    grid-gap: 32px;
  }
  &-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    grid-gap: 25px;

    &-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      grid-gap: 10px;

      &-title {
        font-size: 20px;
        font-weight: 400;
        color: var(--light-gray-color);
      }

      &-procent {
        font-size: 20px;
        font-weight: 600;
      }

      &.man svg {
        width: 20px;
        height: 56px;

        fill: #00EAD0;
      }

      &.girl svg {
        width: 28px;
        height: 56px;

        fill: #FF2947;
      }
    }

    &-list {
      display: flex;
      justify-content: space-between;

      &.man {
        grid-gap: 22px;

        & svg {
          fill: var(--light-gray-color-op10);

          &.active {
            fill: #00EAD0;
          }
        }
      }

      &.girl {
        grid-gap: 14px;

        & svg {
          fill: var(--light-gray-color-op10);

          &.active {
            fill: #FF2947;
          }
        }
      }
    }
  }
}
</style>