<template>
  <div class="snList" :class="{light: light}">
    <a
      v-for="sn of snList"
      :href="sn.link"
      target="_blank"
      class="snList-item"
    >
      <SvgIcon
        :name="sn.icon_withOutColor"
        :viewboxHeight="32"
        :viewboxWidth="32"
      />
      <SvgIcon
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
}

withDefaults(defineProps<IProps>(), {
  light: false
})

const snList = [
  {
    link: 'https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr',
    icon_withOutColor: 'facebook-light',
    icon: 'facebook'
  },
  {
    link: 'https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==',
    icon_withOutColor: 'instagram-light',
    icon: 'instagram'
  },
  {
    link: 'https://t.me/respublica_partiyasy',
    icon_withOutColor: 'telegram-light',
    icon: 'telegram'
  },
  {
    link: 'https://www.tiktok.com/@respublica_partiyasy',
    icon_withOutColor: 'tiktok-light',
    icon: 'tiktok'
  },
  {
    link: 'https://youtube.com/@respublica_partiyasy?si=lu_6apPVAJCFtd0z',
    icon_withOutColor: 'youtube-light',
    icon: 'youtube'
  }
]
</script>

<style scoped lang="scss">
.snList {
  display: flex;
  grid-gap: 20px;
  margin-bottom: 51px;

  &.light {
    margin-bottom: 0px !important;

    & .snList-item {
      & svg:last-child {
        fill: var(--accent-color-op05) !important;
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
}
</style>