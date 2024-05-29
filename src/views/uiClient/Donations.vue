<template>
  <div class="landing-block">
    <div class="wrapper">
      <div class="donations-intro">

        <h2 class="landing-title donations-intro-title">
          {{ $t('donations.title') }}
        </h2>

        <p class="donations-text donations-intro-description" v-html="$t('donations.rules-for-making-donations')" />

        <div class="donations-form">
          <div class="donations-form-steps-line"></div>

          <div class="donations-form-steps">
            <div
              v-for="step of steps"
              :key="step.num"
              class="donations-form-steps-circles"
              :class="{ 'current-step': step.num === currentStep }"
            >
              <span class="donations-form-steps-circles-text">{{
                step.title
              }}</span>
              <div class="donations-form-steps-circles-number">{{ step.num }}</div>
            </div>
          </div>

          <Form v-if="currentStep === 1" @finish="enterSum">
            <div class="donations-form-title">{{ $t('formdata.enter-the-amount-tenge-with-staples') }}</div>

            <div class="donations-form-inputs">
              <Input
                name="sum"
                type="number"
                :placeholder="$t('formdata.enter-the-amount-tenge')"
                required
              />
            </div>
            <div class="donations-form-pay">
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
            <div class="donations-form-title">
              {{ $t('donations.complete-your-contribution-in-the-amount-of') }} {{ formData.sum }} {{ $t('donations.tenge-kz') }}
            </div>
            <p class="donations-form-description grey">
              {{ $t('donations.all-fields-are-required-unless-otherwise-specified') }}
            </p>
            <div class="donations-form-inputs">
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

            <div class="donations-form-btns">
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

      <p class="donations-text" v-html="$t('donations.information-for-those-who-wish-to-make-donations')">
    </p>
  </div>

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
.donations {
  &-intro {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr 600px;
    grid-gap: 50px;

    border-bottom: 1px solid var(--primary-color);
    padding-bottom: 40px;
    margin-bottom: 40px;

    &-description {
      grid-column: 1/2;
    }
  }

  &-form {
    grid-row: 1/4;
    grid-column: 2/3;
    
    &-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.2;

      margin-bottom: 10px;
    }

    &-description {
      font-size: 18px;
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

      margin-bottom: 20px;
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
          font-size: 18px;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  &-text {
    font-size: 18px;
  }

  // Adaptation
  @media (min-width: 993px) {
    &-intro-title {
      margin-bottom: 0;
    }
  }

  @media (max-width: 1400px) {
    &-intro {
      grid-template-columns: 1fr 480px;
    }
  }

  @media (max-width: 1200px) {
    &-intro {
      grid-template-columns: 1fr 420px;
      grid-gap: 30px;

      padding-bottom: 30px;
      margin-bottom: 30px;

      &-title {
        grid-column: 1/3;
      }
    }

    &-form {
      grid-row: auto;
      &-title {
        font-size: 24px;
        margin-bottom: 10px;
      }

      &-description {
        font-size: 18px;
        margin-bottom: 22px;
      }

      &-inputs {
        grid-gap: 15px;
        margin-bottom: 22px;
      }

      &-confirm {
        margin-bottom: 50px;
      }

      &-pay button {
        grid-gap: 10px;
        padding: 7px 0;
        margin-bottom: 20px;
      }

      &-steps {
        margin-bottom: 30px;

        &::after {
          height: 1.2px;
          right: 25px;
          bottom: 25px;
        }

        &-circles {
          grid-gap: 10px;

          &-text {
            font-size: 18px;
          }

          &-number {
            width: 50px;
            height: 50px;
            font-size: 18px;
          }
        }
      }
    }

    &-text {
      font-size: 18px;
    }
  }

  @media (max-width: 992px) {
    &-intro {
      display: block;
      
      padding-bottom: 40px;
      margin-bottom: 30px;

      &-description {
        margin-bottom: 50px;
      }
    }

    &-form {
      max-width: 700px;
    }
  }

  @media (max-width: 768px) {
    &-intro {
      padding-bottom: 30px;
      margin-bottom: 24px;

      &-description {
        margin-bottom: 38px;
      }
    }

    &-form {
      &-title {
        font-size: 22px;
        margin-bottom: 10px;
      }

      &-description {
        font-size: 18px;
        margin-bottom: 20px;
      }

      &-inputs {
        grid-gap: 15px;
        margin-bottom: 20px;
      }

      &-confirm {
        margin-bottom: 40px;
      }

      &-pay button {
        grid-gap: 8px;
        padding: 6px 0;
        margin-bottom: 18px;
      }

      &-steps {
        margin-bottom: 28px;

        &::after {
          height: 1.1px;
          right: 24px;
          bottom: 24px;
        }

        &-circles {
          grid-gap: 8px;

          &-text {
            font-size: 18px;
          }

          &-number {
            width: 48px;
            height: 48px;
            font-size: 18px;
          }
        }
      }
    }

    &-text {
      font-size: 18px;
    }
  }

  @media (max-width: 576px) {
    &-intro {
      padding-bottom: 28px;
      margin-bottom: 22px;

      &-description {
        margin-bottom: 32px;
      }
    }

    &-form {
      &-title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      &-description {
        font-size: 16px;
        margin-bottom: 18px;
      }

      &-inputs {
        grid-gap: 15px;
        margin-bottom: 18px;
      }

      &-confirm {
        margin-bottom: 36px;
      }

      &-pay button {
        grid-gap: 8px;
        padding: 6px 0;
        margin-bottom: 16px;
      }

      &-steps {
        margin-bottom: 26px;

        &::after {
          height: 1.1px;
          right: 24px;
          bottom: 24px;
        }

        &-circles {
          grid-gap: 8px;

          &-text {
            font-size: 16px;
          }

          &-number {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }
        }
      }
    }

    &-text {
      font-size: 16px;
    }
  }

  @media (max-width: 380px) {
    &-intro-description {
      margin-bottom: 28px;
    }

    &-form {
      &-title {
        font-size: 18px;
        margin-bottom: 8px;
      }

      &-inputs {
        grid-gap: 14px;
        margin-bottom: 16px;
      }

      &-confirm {
        margin-bottom: 32px;
      }

      &-pay button {
        grid-gap: 6px;
        padding: 6px 0;
        margin-bottom: 16px;
      }

      &-steps {
        margin-bottom: 22px;

        &::after {
          right: 22px;
          bottom: 22px;
        }

        &-circles {
          grid-gap: 8px;

          &-text {
            font-size: 16px;
          }

          &-number {
            width: 44px;
            height: 44px;
            font-size: 16px;
          }
        }
      }
    }

    &-text {
      font-size: 16px;
    }
  }
}
</style>
