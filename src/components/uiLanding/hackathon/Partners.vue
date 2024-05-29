<template>
  <section class="hackathonPartners landing-block" id="partners">
    <div class="wrapper landing-wrapper">
      <div class="hackathonPartners-inner">
        <h2 class="landing-title">{{ $t('hackathon.partners') }}</h2>

        <div class="hackathonPartners-items">
          <a
            class="hackathonPartners-item"
            href="https://codetau.com"
            target="_blank"
          >
            <SvgIcon
              class="codetau"
              name="logo-codetau"
              :viewboxWidth="301"
              :viewboxHeight="199"
            />
          </a>

          <RouterLink
            class="hackathonPartners-item"
            to="/"
          >
            <SvgIcon
              class="respublic"
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.hackathonPartners {
  &-items {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-gap: 200px;
  }

  &-item {
    opacity: .7;
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    transition: all .3s ease-in-out;

    &:hover {
      opacity: 1;
      -webkit-filter: grayscale(0%);
      filter: grayscale(0%);
    }

    &:last-child {
      padding-top: 60px;
    }

    & svg.codetau {
      width: 300px;
      height: 200px;
    }

    & svg.respublic {
      width: 512px;
      height: 96px;
    }
  }


  // Adaptation
  @media (max-width: 1400px) {
    &-items {
      grid-gap: 100px;
    }

    &-item {
      &:last-child {
        padding-top: 40px;
      }

      & svg.codetau {
        width: 260px;
        height: 174px;
      }

      & svg.respublic {
        width: 400px;
        height: 75px;
      }
    }
  }

  @media (max-width: 1200px) {
    &-items {
      grid-gap: 80px;
    }

    &-item {
      &:last-child {
        padding-top: 30px;
      }

      & svg.codetau {
        width: 220px;
        height: 147px;
      }

      & svg.respublic {
        width: 300px;
        height: 56px;
      }
    }
  }

  @media (max-width: 992px) {
    &-items {
      grid-gap: 40px;
    }

    &-item {
      &:last-child {
        padding-top: 20px;
      }

      & svg.codetau {
        width: 190px;
        height: 127px;
      }

      & svg.respublic {
        width: 240px;
        height: 45px;
      }
    }
  }

  @media (max-width: 768px) {
    &-items {
      grid-gap: 40px;
    }

    &-item {
      &:last-child {
        padding-top: 20px;
      }

      & svg.codetau {
        width: 150px;
        height: 100px;
      }

      & svg.respublic {
        width: 200px;
        height: 37px;
      }
    }
  }

  @media (max-width: 576px) {
    &-items {
      flex-direction: column;
      grid-gap: 60px;
    }

    &-item {
      &:last-child {
        padding-top: 0px;
      }

      & svg.codetau {
        width: 150px;
        height: 100px;
      }

      & svg.respublic {
        width: 200px;
        height: 37px;
      }
    }
  }
}
</style>