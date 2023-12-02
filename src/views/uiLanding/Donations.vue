<template>
  <div class="wrapper-main">
    <Header />

    <div class="content">
      <div class="donations">
        <div class="donations-left-text">
          <div class="donations-left-text-title">
            {{ $t('donations.title') }}
          </div>

          <div class="donations-left-text-description" v-html="$t('donations.rules-for-making-donations')" />
        </div>
        <div class="donations-right-block">
          <div class="donations-right-block-steps-line"></div>

          <div class="donations-right-block-steps">
            <div
              v-for="step of steps"
              :key="step.num"
              class="donations-right-block-steps-circles"
              :class="{ 'current-step': step.num === currentStep }"
            >
              <span class="donations-right-block-steps-circles-text">{{
                step.title
              }}</span>
              <div class="donations-right-block-steps-circles-number">{{ step.num }}</div>
            </div>
          </div>

          <Form v-if="currentStep === 1" @finish="enterSum">
            <div class="donations-right-block-title">{{ $t('formdata.enter-the-amount-tenge-with-staples') }}</div>
            <div class="donations-right-block-description">
              {{ $t('donations.your-donation-will-benefit-the-party') }}
            </div>

            <div class="donations-right-block-inputs">
              <Input
                name="sum"
                type="number"
                :placeholder="$t('formdata.enter-the-amount-tenge')"
                required
              />
            </div>
            <div class="donations-right-block-pay">
              <Button
                :name="$t('button.pay-by-card')"
                htmlType="submit"
                v-slot:left
              >
                <img src="/public/img/visa-mastercard.png" alt="visa-mastercard" />
              </Button>
            </div>
  

            <Checkbox
              name="confirm"
              class="feedbackModal-checkboxList-item"
            >
            {{ $t('donations.i-confirm-that-i-am-familiar-with-the-donation-rules') }}
            </Checkbox>
          </Form>

          <Form v-else-if="currentStep === 2" @finish="enterFullName">
            <div class="donations-right-block-title">
              {{ $t('donations.complete-your-contribution-in-the-amount-of') }} {{ formData.sum }} {{ $t('donations.tenge-kz') }}
            </div>
            <div class="donations-right-block-description grey">
              {{ $t('donations.all-fields-are-required-unless-otherwise-specified') }}
            </div>
            <div class="donations-right-block-inputs">
              <Input
                :placeholder="$t('formdata.surname')"
                name="lastName"
                required
              />

              <Input
                :placeholder="$t('formdata.name')"
                name="name"
                required
              />
            </div>

            <Checkbox
              name="confirm"
              class="feedbackModal-checkboxList-item"
            >
              {{ $t('donations.i-confirm-that-i-am-a-citizen-or-permanent-resident-of-kazakhstan') }}
            </Checkbox>

            <div class="donations-right-block-btns">
              <Button
                type="outline-default"
                :name="$t('button.back')"
                @click="backStep"
              />

              <Button
                :name="$t('button.next')"
                type="default-blue"
                htmlType="submit"
              />
            </div>
          </Form>

          <img v-else src="/img/pay-test.jpg" />
        </div>
      </div>

      <div class="donations-rules" v-html="$t('donations.information-for-those-who-wish-to-make-donations')">
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from "vue";
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const formData = reactive({
    sum: 0,
    name: "",
    lastName: "",
    confirm: false,
  });
  const currentStep = ref(1);
  const steps = [
    {
      title: t('formdata.the-amount'),
      num: 1,
    },
    {
      title: t('formdata.details'),
      num: 2,
    },
    {
      title: t('formdata.payment'),
      num: 3,
    },
  ];

  const enterSum = (data: any) => {
    formData.sum = data.sum;
    currentStep.value = 2;
  };

  const enterFullName = (data: any) => {
    formData.name = data.name;
    formData.lastName = data.lastName;
    currentStep.value = 3;
  };

  const backStep = () => {
    currentStep.value--;
  };
</script>

<style scoped lang="scss">
  .content {
    max-width: 1920px;
    margin: 0 auto;
  }
  .donations {
    margin-top: 50px;
    display: flex;
    grid-gap: 50px;

    border-bottom: 1px solid var(--primary-color);
    padding-bottom: 40px;
    margin-bottom: 40px;

    &-left-text {
      width: 590px;
      &-title {
        color: var(--primary-color);
        font-size: 36px;
        font-style: normal;
        font-weight: 700;
        line-height: 35px;
      }
      &-description {
        color: rgba(4, 32, 81, 0.8);
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 30px;
      }
    }
    &-right-block {
      width: 600px;

      &-title {
        color: var(--primary-color);
        font-size: 24px;
        font-weight: 700;
        line-height: 35px;
      }

      &-description {
        color: var(--primary-color);
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 25px;
      }

      &-inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        grid-gap: 15px;
        margin-bottom: 25px;
      }

      &-confirm {
        margin-bottom: 50px;
      }

      &-pay button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        grid-gap: 10px;
        padding: 7px 0;
      }

      &-btns {
        display: flex;
        justify-content: space-between;
      }

      &-steps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        overflow: hidden;

        position: relative;

        &::after {
          content: "";

          display: block;
          height: 1.2px;
          width: 1000px;

          position: absolute;
          right: 25px;
          bottom: 25px;
          z-index: -1;

          background-color: var(--light-gray-color-op50);
          transition: all 0.3s ease-in-out;
        }

        &-circles {
          display: flex;
          flex-direction: column;
          align-items: center;
          grid-gap: 10px;
          position: relative;

          &.current-step {
            & span {
              color: var(--accent-color);
            }
            & div {
              background-color: var(--accent-color);
              color: var(--white-color);
            }
          }

          &-text {
            color: var(--light-gray-color);
            font-size: 18px;
            font-weight: 400;
          }

          &-number {
            width: 50px;
            height: 50px;
            border-radius: 100px;
            background-color: #dadee5;
            color: var(--light-gray-color);
            font-size: 20px;
            font-weight: 500;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    &-rules {
      max-width: 1240px;
      color: rgba(4, 32, 81, 0.8);
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 100px;
    }
  }
</style>
