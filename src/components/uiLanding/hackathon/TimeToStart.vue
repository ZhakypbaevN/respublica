<template>
  <section class="hackathonTime landing-block">
    <div class="wrapper landing-wrapper">
      <div class="hackathonTime-inner">
        <h2 class="landing-title">{{ $t('hackathon.time.title') }}</h2>
        
        <div class="hackathonTime-items">
          <div
            class="hackathonTime-items-item"
            v-for="item of items"
            :key="item.name"
          >
            <h1 class="hackathonTime-items-item-title">{{ item.title }}</h1>
            <h4 class="hackathonTime-items-item-subtitle">{{ getSubtitle(item.name, item.title) }}</h4>
          </div>
        </div>

        <a href="https://forms.office.com/r/C2vGaALmV1" target="_blank">
          <Button :name="$t('hackathon.time.btn')" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const items = ref([
    { name: 'day', title: '0' },
    { name: 'hour', title: '0' },
    { name: 'minute', title: '0' },
    { name: 'second', title: '0' },
  ]);

  const countDown = () => {
    const endTime = new Date('2024-04-13T00:00:00').getTime();

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const timeLeft = endTime - currentTime;

      if (timeLeft > 0) {
        items.value[0].title = Math.floor(timeLeft / (24 * 60 * 60 * 1000)).toString();
        items.value[1].title = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)).toString();
        items.value[2].title = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)).toString();
        items.value[3].title = Math.floor((timeLeft % (60 * 1000)) / 1000).toString();
      } else {
        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    onMounted(() => {
      updateCountdown();
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  };

  countDown();

  const getSubtitle = (type, val) => {
    const num = Number(val);

    if (type === 'day') {
      if (num == 1) return t('day')
      if (num < 5 && num != 0) return t('days_v1')
      if (num > 4 || num == 0) return t('days_v2')
    }

    if (type === 'hour') {
      if (num == 1) return t('hour')
      if (num < 5 && num != 0) return t('hour_s')
      if (num > 4 || num == 0) return t('hours')
    }

    if (type === 'minute') {
      if (num == 1) return t('one_minute')
      if (num < 5 && num != 0) return t('minutes_v2')
      if (num > 4 || num == 0) return t('minutes')
    }

    if (type === 'second') {
      if (num == 1) return t('one_second')
      if (num < 5 && num != 0) return t('seconds_v2')
      if (num > 4 || num == 0) return t('seconds')
    }
  }
</script>

<style scoped lang="scss">
.hackathonTime {
  background-color: var(--orange-color);

  &-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .landing-title {
    width: 100%;
    color: var(--white-color);
  }

  &-items {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;

    margin-bottom: 60px;

    &-item {
      text-align: center;

      padding: 35px;
      background-color: var(--white-color);

      &-title {
        font-size: 70px;
        font-weight: 700;
      }

      &-subtitle {
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  }


  // Adaptation
  @media (max-width: 1400px) {
    &-items {
      grid-gap: 30px;

      margin-bottom: 50px;

      &-item {
        padding: 32px;

        &-title {
          font-size: 68px;
        }

        &-subtitle {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    &-items {
      grid-gap: 28px;

      margin-bottom: 45px;

      &-item {
        padding: 30px;

        &-title {
          font-size: 66px;
        }

        &-subtitle {
          font-size: 24px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-items {
      grid-gap: 22px;

      margin-bottom: 40px;

      &-item {
        padding: 28px;

        &-title {
          font-size: 50px;
        }

        &-subtitle {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    &-items {
      grid-gap: 18px;
      margin-bottom: 36px;

      &-item {
        padding: 20px;

        &-title {
          font-size: 38px;
        }

        &-subtitle {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-items {
      grid-gap: 10px;
      margin-bottom: 30px;

      &-item {
        padding: 10px;

        &-title {
          font-size: 30px;
        }

        &-subtitle {
          font-size: 14px;
        }
      }
    }
  }

  @media (max-width: 380px) {
    &-items {
      grid-gap: 8px;
      margin-bottom: 30px;

      &-item {
        padding: 5px;

        &-title {
          font-size: 22px;
        }

        &-subtitle {
          font-size: 12px;
        }
      }
    }
  }
}
</style>