<template>
  <section class="hackathonProgram landing-block" id="program">
    <div class="wrapper landing-wrapper">
      <div class="hackathonProgram-inner">
        <h2 class="landing-title">{{ $t(`hackathon.program.title`) }}</h2>

        <div class="hackathonProgram-headers">
          <div
            v-for="header of headers"
            :key="header.title"
            class="hackathonProgram-headers-item"
          >
            <p class="hackathonProgram-headers-item-subtitle">{{ header.subtitle }}</p>
            <h2 class="hackathonProgram-headers-item-title">{{ header.title }}</h2>
          </div>
        </div>

        <div class="hackathonProgram-tables">
          <div class="hackathonProgram-table">
            <div class="hackathonProgram-table-titles">
              <h3 class="hackathonProgram-table-titles-title">{{ $t('hackathon.program.firstTable.title') }}</h3>
              <h4 class="hackathonProgram-table-titles-subtitle">{{ $t('hackathon.program.firstTable.subtitle') }}</h4>
            </div>

            <div class="hackathonProgram-table-times">
              <div
                class="hackathonProgram-table-times-item"
                v-for="times of firstTable.items"
                :key="times.time"
              >
                <div class="hackathonProgram-table-times-block">
                  <p class="hackathonProgram-table-times-block-text">{{ times.time }}</p>
                </div>

                <div class="hackathonProgram-table-times-block">
                  <p class="hackathonProgram-table-times-block-text">{{ times.title }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="hackathonProgram-table">
            <div class="hackathonProgram-table-titles">
              <h3 class="hackathonProgram-table-titles-title">{{ $t('hackathon.program.secondTable.title') }}</h3>
              <h4 class="hackathonProgram-table-titles-subtitle">{{ $t('hackathon.program.secondTable.subtitle') }}</h4>
            </div>

            <div class="hackathonProgram-table-times">
              <div
                class="hackathonProgram-table-times-item"
                v-for="times of secondTable.items"
                :key="times.time"
              >
                <div class="hackathonProgram-table-times-block">
                  <p class="hackathonProgram-table-times-block-text">{{ times.time }}</p>
                </div>

                <div class="hackathonProgram-table-times-block">
                  <p class="hackathonProgram-table-times-block-text">{{ times.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const headers = [
    {
      subtitle: t('hackathon.program.header.place.subtitle'),
      title: t('hackathon.program.header.place.title')
    },
    {
      subtitle: t('hackathon.program.header.deadline.subtitle'),
      title: t('hackathon.program.header.deadline.title')
    }
  ];

  const firstTable = {
    title: t('hackathon.program.firstTable.'),
    day: t('hackathon.program.firstTable.'),
    items: [
      {
        time: '8:00 - 9:00',
        title: t(`hackathon.program.firstTable.times.8:00`)
      },
      {
        time: '9:00 - 9:30',
        title: t(`hackathon.program.firstTable.times.9:00`)
      },
      {
        time: '9:30 - 11:30',
        title: t(`hackathon.program.firstTable.times.9:30`)
      },
      {
        time: '11:30 - 19:30',
        title: t(`hackathon.program.firstTable.times.11:30`)
      }
    ]
  }

  const secondTable = {
    title: t('hackathon.program.secondTable.title'),
    day: t('hackathon.program.secondTable.subtitle'),
    items: [
      {
        time: '8:00',
        title: t(`hackathon.program.secondTable.times.8:00`)
      },
      {
        time: '8:00 - 10:00',
        title: t(`hackathon.program.secondTable.times.8:00-2`)
      },
      {
        time: '10:00 - 11:00',
        title: t(`hackathon.program.secondTable.times.10:00`)
      },
      {
        time: '11:00 - 12:00',
        title: t(`hackathon.program.secondTable.times.11:00`)
      },
      {
        time: '12:00 - 13:00',
        title: t(`hackathon.program.secondTable.times.12:00`)
      },
      {
        time: '14:00 - 15:00',
        title: t(`hackathon.program.secondTable.times.14:00`)
      },
      {
        time: '15:00 - 17:00',
        title: t(`hackathon.program.secondTable.times.15:00`)
      },
      {
        time: '17:00 - 18:00',
        title: t(`hackathon.program.secondTable.times.17:00`)
      }
    ]
  }
</script>

<style scoped lang="scss">
.landing-title {
  color: var(--white-color);
}

.hackathonProgram {
  background-color: var(--primary-color);

  &-headers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;

    margin-bottom: 30px;

    &-item {
      padding: 35px 55px 40px 55px;
      background-color: var(--accent-color-op10);

      &-subtitle {
        color: var(--white-color);
        font-size: 24px;
        font-weight: 500;

        margin-bottom: 2px;
      }

      &-title {
        color: var(--white-color);
        font-size: 48px;
        font-weight: 600;
      }
    }
  }

  &-tables {
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }

  &-table {
    display: grid;
    align-items: stretch;
    grid-template-columns: 248px 1fr;
    grid-gap: 7px;

    &:last-child .hackathonProgram-table-titles {
      background-color: var(--accent-color);
    }

    &-titles {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 30px;
      background-color: var(--light-orange-color);

      &-title {
        color: var(--white-color);
        font-size: 48px;
        font-weight: 700;

        margin-bottom: 2px;
      }

      &-subtitle {
        color: var(--white-color);
        font-size: 30px;
        font-weight: 500;
      }
    }

    &-times {
      display: flex;
      flex-direction: column;
      grid-gap: 5px;

      &-item {
        width: 100%;

        display: grid;
        grid-template-columns: 210px 1fr;
        grid-gap: 5px 7px;

        & .hackathonProgram-table-times-block:first-child {
          text-align: center;
        }
      }

      &-block {
        padding: 18px 28px;
        background-color: var(--white-color);

        &-text {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>