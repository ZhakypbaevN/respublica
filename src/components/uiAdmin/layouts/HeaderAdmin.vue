<template>
  <header class="header">
    <div class="header-main" id="header-main">
      <div class="wrapper">
        <div class="header-main-inner">
          <Router-link to="/" class="header-main-logo">
            <SvgIcon
              class="logo-big"
              name="logo"
              :viewboxWidth="260"
              :viewboxHeight="49"
            />
          </Router-link>

          <div class="header-main-right">
            <Button
              :name="$t('button.create-a-party-member')"
              type="default-blue"
              @click="() => showJoinPartyModal = true"
            />

            <LangToggle />

            <ProfileControl />
          </div>
        </div>
      </div>
    </div>

    <CreatePartyModal
      v-if="showJoinPartyModal"
      @hide="() => showJoinPartyModal = false"
    />
  </header>
</template>

<script setup lang="ts">
  import ProfileControl from '@/components/common/ProfileControl.vue';
  import CreatePartyModal from '@/components/uiManager/party-members/create/CreatePartyModal.vue';

  import { ref } from 'vue';

  const showJoinPartyModal = ref(false);
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}
.header {
  background-color: var(--accent-color-op05);

  &.sticky {
    & .header-main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
    }
  }
  
  &-main {
    background: white;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transition: box-shadow .2s ease-in-out;

    &-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 55px;

      &-right {
        display: flex;
        align-items: center;
        grid-gap: 55px;
      }
    }

    &-logo {
      & svg {
        height: 95px;
        width: 260px;
      }
    }

    &-right {
      display: flex;
      align-items: center;
      grid-gap: 60px;
    }
  }
}
</style>