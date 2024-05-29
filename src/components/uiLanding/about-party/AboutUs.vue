<template>
  <section class="landing-block" id="who-are-we">
    <div class="wrapper">
      <h2 class="landing-title" id="aboutUs">{{ $t("about-us-page.who-are-we-block.title") }}</h2>

      <div class="info-block">
        <div
          class="info-item"
          v-for="info of infoList"
          :key="info.title"
          :id="info.id"
        >
          <SvgIcon
            :name="info.icon"
            :viewboxWidth="60"
            :viewboxHeight="60"
          />
          <div class="info-item-content">
            <h3 class="info-item-title">
              {{ info.title.toUpperCase() }}
            </h3>

            <span v-if="info.text" class="info-item-text">
              {{ info.text }}
            </span>
            <ul v-else>
              <li
                v-for="item of info.list"
              >
                <span class="info-item-text">
                  · {{ item }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const infoList = [
  {
    title: t("about-us-page.who-are-we-block.respublica"),
    id: "respublica",
    icon: 'respublica-logo',
    text: t("about-us-page.who-are-we-block.resbublica-description")
  },
  {
    title: t("about-us-page.who-are-we-block.our-priorities"),
    id: "our-priorities",
    icon: 'equal-representatives',
    list: [
      t("about-us-page.who-are-we-block.our-priorities-educated-nation"),
      t("about-us-page.who-are-we-block.happiness-to-be-healthy"),
      t("about-us-page.who-are-we-block.kazakh-culture"),
      t("about-us-page.who-are-we-block.prosperous-kazakhstans"),
      t("about-us-page.who-are-we-block.refusal-of-outdated-templates")
    ]
  },
  {
    title: t("about-us-page.who-are-we-block.metaparty"),
    id: "metaparty",
    icon: 'metaparty',
    text: t("about-us-page.who-are-we-block.metaparty-description"),
  },
  {
    title: t("about-us-page.who-are-we-block.our-leaders"),
    id: "our-leaders",
    icon: 'businessman',
    text: t("about-us-page.who-are-we-block.our-leaders-description"),
  },
  {
    title: t("about-us-page.who-are-we-block.our-tasks"),
    id: "our-tasks",
    icon: 'businessman',
    text: t("about-us-page.who-are-we-block.our-tasks-description"),
  },
  {
    title: t('about-us-page.who-are-we-block.all-regions-and-districs'),
    id: "all-regions-and-districs",
    icon: 'marker',
    text: t('about-us-page.who-are-we-block.all-regions-and-districs-description')
  }
]
</script>

<style scoped lang="scss">
.info {
  &-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 35px 140px;
  }

  &-item {
    display: grid;
    grid-template-columns: 60px 1fr;
    grid-gap: 18px;
  
    svg {
      width: 60px;
    }
  
    &-title {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 700;
    }
  
    &-text {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
    }
  }

  // Adaptation
  @media (max-width: 1800px) {
    &-block {
      grid-gap: 35px 60px;
    }

    &-item {
      grid-template-columns: 60px 1fr;
    }
  }

  @media (max-width: 1600px) {
    &-block {
      align-items: start;
      grid-gap: 35px 40px;
    }

    &-item {
      grid-template-columns: 1fr;
      grid-gap: 10px;

      & svg {
        height: 60px;
        width: 60px;
      }
    }
  }

  @media (max-width: 768px) {
    &-block {
      grid-template-columns: 1fr;
      grid-gap: 40px;
    }

    &-item {
      grid-template-columns: 50px 1fr;
      grid-gap: 14px;

      & svg {
        height: 50px;
        width: 50px;
      }

      &-title {
        font-size: 18px;
      }
    
      &-text {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 576px) {
    &-block {
      grid-gap: 30px;
    }

    &-item {
      grid-template-columns: 40px 1fr;

      & svg {
        height: 40px;
        width: 40px;
      }
    }
  }
}
</style>