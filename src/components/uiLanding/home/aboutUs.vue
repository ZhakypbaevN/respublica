<template>
  <section class="aboutUs landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="aboutUs-title">
        <span class="blue" data-aos="zoom-in">{{ $t("about-us-new-people") }}</span>
        <span data-aos="zoom-in">{{ $t("about-us-new-opportunities") }}</span>
      </h2>
      <p class="aboutUs-description" data-aos="zoom-in">
        {{ $t("about-us-description") }}
        <br />
        <br />
        {{ $t("about-us-forward") }}
      </p>

      <div class="aboutUs-inner">
        <div class="aboutUs-items">
          <div class="aboutUs-item" v-for="item of aboutUsList" :key="item.title">
            <h4 class="aboutUs-item-title">{{ item.title }}</h4>
            <p class="aboutUs-item-description" v-html="item.text"></p>
            <RouterLink :to="item.link" class="aboutUs-item-link">
              <span>{{ item.btn }}</span>
            </RouterLink>
          </div>
        </div>

        <div class="aboutUs-links">
          <Router-link to="/news-all" class="aboutUs-links-item">
            <span> {{ $t("about-us-news") }}</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </Router-link>

          <button
            v-for="item of btnList"
            :key="item.title"
            @click="item.func"
            class="aboutUs-links-item"
          >
            <span>{{ item.title }}</span>
            <SvgIcon
              name="arrow-with-line-right-top"
              :viewboxWidth="32"
              :viewboxHeight="32"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Emits {
  (event: "showJoinPartyModal", value: Function): void;
  (event: "showSubmitAnAppeal", value: Function): void;
  (event: "showMakeAnAppointment", value: Function): void;
}

const emits = defineEmits<Emits>();

const btnList = [
  {
    title: t('about-us-join-the-party'),
    func: () => emits("showJoinPartyModal"),
  },
  {
    title: t('about-us-send-a-request'),
    func: () => emits("showSubmitAnAppeal"),
  },
  {
    title: t('about-us-make-an-appointment'),
    func: () => emits("showMakeAnAppointment"),
  },
];

const aboutUsList = [
  {
    title: t('about-us-what-are-we-doing'),
    text: t('about-us-what-are-we-doing-text'),
    btn: t('about-us-what-are-we-doing-btn'),
    link: "/about-party",
  },
  {
    title: t('about-us-who-are-we'),
    text: t('about-us-who-are-we-text'),
    btn: t('about-us-who-are-we-btn'),
    link: "/about-party",
  },
  {
    title: t('about-us-contribute'),
    text: t('about-us-contribute-text'),
    btn: t('about-us-contribute-btn'),
    link: "/donations",
  },
];
</script>

<style scoped lang="scss">
.aboutUs {
  margin-top: 70px;

  &-title {
    text-align: center;
    font-family: "Montserrat";
    text-transform: uppercase;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 30px;

    & span.blue {
      color: var(--accent-color);
      font-family: "Montserrat";
    }
  }
  &-description {
    text-align: center;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 60px;
  }

  &-inner {
    display: flex;
    grid-gap: 42px;
  }

  &-items {
    display: flex;
    grid-gap: 42px;
  }

  &-item {
    max-width: 318px;
    &-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &-description {
      font-size: 20px;
      line-height: 1.4;
      margin-bottom: 10px;
    }

    &-link {
      display: inline-flex;
      align-items: center;
      grid-gap: 10px;

      &:hover {
        & span::after {
          left: 10px;
        }
      }

      & span {
        color: var(--accent-color);
        font-size: 24px;
        font-weight: 600;
        line-height: 1;

        &::after {
          content: " \2192";

          position: relative;
          top: 3px;
          left: 0;

          transition: all 0.3s ease-in-out;
        }
      }

      & svg {
        width: 24px;
        height: 24px;
        fill: var(--accent-color);
      }
    }
  }

  &-links {
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 25px;

    padding: 10px 0 20px 40px;
    border-left: 2px solid var(--accent-color);

    &-item {
      display: inline-flex;
      align-items: center;
      grid-gap: 7px;

      position: relative;

      &::after {
        content: "";

        display: block;
        width: 0;
        height: 0;

        position: absolute;
        top: 100%;
        left: 0;
        z-index: 2;

        border-bottom: 3.6px solid var(--accent-color);
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        &::after {
          width: 100%;
        }

        & svg {
          right: -8px;
          bottom: 3px;
        }
      }

      & span {
        color: var(--accent-color);
        font-size: 28px;
        font-weight: 600;
        line-height: 1.8;
        text-wrap: nowrap;
      }

      & svg {
        height: 32px;
        width: 32px;
        fill: var(--accent-color);

        position: relative;
        right: 0;
        bottom: 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }
}
</style>
