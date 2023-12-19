<template>
  <div class="snList" :class="{light: light, lightBlue: lightBlue}">
    <a
      v-for="(sn, idx) of snList"
      :href="sn.link"
      target="_blank"
      class="snList-item"
      data-aos="fade-right"
      :data-aos-delay="`${idx}00`"
    >
      <SvgIcon
        :name="sn.icon_withOutColor"
        :viewboxHeight="32"
        :viewboxWidth="32"
      />

      <SvgIcon
        v-if="lightBlue"
        :name="sn.icon_withOutColorLightBlue"
        :viewboxHeight="32"
        :viewboxWidth="32"
      />
      <SvgIcon
        v-else
        :name="sn.icon"
        :viewboxHeight="32"
        :viewboxWidth="32"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  light?: boolean,
  lightBlue?: boolean
}

withDefaults(defineProps<IProps>(), {
  light: false
})
const snList = [
  {
    link: 'https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr',
    icon_withOutColorLightBlue: 'facebook-light',
    icon_withOutColor: 'facebook-light',
    icon: 'facebook'
  },
  {
    link: 'https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==',
    icon_withOutColorLightBlue: 'instagram-light-blue',
    icon_withOutColor: 'instagram-light',
    icon: 'instagram'
  },
  {
    link: 'https://t.me/respublica_partiyasy',
    icon_withOutColorLightBlue: 'telegram-light-blue',
    icon_withOutColor: 'telegram-light',
    icon: 'telegram'
  },
  {
    link: 'https://www.tiktok.com/@respublica_partiyasy',
    icon_withOutColorLightBlue: 'tiktok-light-blue',
    icon_withOutColor: 'tiktok-light',
    icon: 'tiktok'
  },
  {
    link: 'https://youtube.com/@respublica_partiyasy?si=lu_6apPVAJCFtd0z',
    icon_withOutColorLightBlue: 'youtube-light-blue',
    icon_withOutColor: 'youtube-light',
    icon: 'youtube'
  }
]
</script>

<style scoped lang="scss">
.snList {
  display: flex;
  grid-gap: 20px;

  &.light, &.lightBlue {
    & .snList-item {
      & svg:last-child {
        fill: white !important;
        opacity: .5 !important;
      }
  
      & svg:first-of-type {
        opacity: 0 !important;
      }

      &:hover svg:last-child {
        opacity: 1 !important;
      }
    }
  }

  &.lightBlue .snList-item {
    & svg:last-child {
      opacity: 1 !important;
    }

    &:hover svg {
      transform: scale(1.1);
    }
  }

  &-item {
    display: block;
    height: 32px;
    width: 32px;
    
    position: relative;

    & svg {
      width: 100%;
      height: 100%;
      fill: var(--primary-color);
      transition: all .3s ease-in-out;
    }

    & svg:first-of-type {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      
      opacity: 1;
    }

    &:hover svg:first-of-type {
      opacity: 0;
    }
  }

  // Adaptation
  @media (max-width: 992px) {
    grid-gap: 18px;

    &-item {
      height: 30px;
      width: 30px;
    }
  }

  @media (max-width: 768px) {
    grid-gap: 16px;

    &-item {
      height: 28px;
      width: 28px;
    }
  }

  @media (max-width: 576px) {
  }

  @media (max-width: 380px) {
  }
}
</style>