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
          display: flex;
          align-items: center;
          justify-content: center;
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

  // Adaptation
  @media (max-width: 1400px) {
    &-headers {
      grid-gap: 28px;
      margin-bottom: 28px;

      &-item {
        padding: 32px 52px 46px 52px;

        &-subtitle {
          font-size: 22px;
          margin-bottom: 2px;
        }

        &-title {
          font-size: 46px;
        }
      }
    }

    &-tables {
      grid-gap: 28px;
    }

    &-table {
      grid-template-columns: 244px 1fr;
      grid-gap: 7px;

      &-titles {
        padding: 28px;

        &-title {
          font-size: 46px;

          margin-bottom: 2px;
        }

        &-subtitle {
          font-size: 28px;
        }
      }

      &-times {
        grid-gap: 5px;

        &-item {
          grid-template-columns: 204px 1fr;
          grid-gap: 5px 7px;
        }

        &-block {
          padding: 16px 26px;

          &-text {
            font-size: 18px;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    &-headers {
      grid-gap: 26px;
      margin-bottom: 26px;

      &-item {
        padding: 30px 50px 36px 50px;

        &-subtitle {
          font-size: 20px;
          margin-bottom: 2px;
        }

        &-title {
          font-size: 38px;
        }
      }
    }

    &-tables {
      grid-gap: 26px;
    }

    &-table {
      grid-template-columns: 210px 1fr;
      grid-gap: 7px;

      &-titles {
        padding: 26px;

        &-title {
          font-size: 32px;
          margin-bottom: 2px;
        }

        &-subtitle {
          font-size: 26px;
        }
      }

      &-times {
        grid-gap: 5px;

        &-item {
          grid-template-columns: 180px 1fr;
          grid-gap: 5px 7px;
        }

        &-block {
          padding: 14px 24px;

          &-text {
            font-size: 16px;
          }
        }
      }
    }
  }

  @media (max-width: 992px) {
    &-headers {
      grid-gap: 24px;
      margin-bottom: 24px;

      &-item {
        padding: 24px 32px 32px 32px;

        &-subtitle {
          font-size: 18px;
          margin-bottom: 2px;
        }

        &-title {
          font-size: 32px;
        }
      }
    }

    &-tables {
      grid-gap: 24px;
    }

    &-table {
      grid-template-columns: 1fr;
      grid-gap: 7px;

      &-titles {
        padding: 24px;

        &-title {
          font-size: 30px;
          margin-bottom: 2px;
        }

        &-subtitle {
          font-size: 24px;
        }
      }

      &-times {
        grid-gap: 5px;

        &-item {
          grid-template-columns: 160px 1fr;
          grid-gap: 4px 6px;
        }

        &-block {
          padding: 12px 22px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    &-headers {
      grid-template-columns: 1fr;
      grid-gap: 22px;
      margin-bottom: 22px;

      &-item {
        padding: 22px 30px 30px 30px;

        &-title {
          font-size: 30px;
        }
      }
    }

    &-tables {
      grid-gap: 22px;
    }

    &-table {
      grid-gap: 4px;

      &-titles {
        padding: 22px;

        &-title {
          font-size: 28px;
          margin-bottom: 0px;
        }

        &-subtitle {
          font-size: 22px;
        }
      }

      &-times {
        grid-gap: 5px;

        &-item {
          grid-template-columns: 140px 1fr;
          grid-gap: 2px 4px;
        }

        &-block {
          padding: 11px 20px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    &-headers {
      grid-gap: 20px;
      margin-bottom: 20px;

      &-item {
        padding: 20px 26px 26px 26px;

        &-subtitle {
          font-size: 16px;
        }

        &-title {
          font-size: 22px;
        }
      }
    }

    &-tables {
      grid-gap: 20px;
    }

    &-table {
      grid-gap: 4px;

      &-titles {
        padding: 20px;

        &-title {
          font-size: 24px;
        }

        &-subtitle {
          font-size: 18px;
        }
      }

      &-times {
        grid-gap: 5px;

        &-item {
          grid-template-columns: 120px 1fr;
          grid-gap: 2px 4px;
        }

        &-block {
          padding: 11px 10px;
        }
      }
    }
  }
}
</style>