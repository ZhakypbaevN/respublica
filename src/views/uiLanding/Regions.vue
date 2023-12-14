<template>
<div class="wrapper-main">
  <div>
    <Header />

    <section class="landing-block">
      <div class="wrapper">
        <div class="landing-header regions-header">
          <h2 class="landing-title">
            <span v-if="controlBtns[0].active">{{ $t('regions.regions-and-deputies-of-maslikhats') }}</span>
            <span v-else>{{ $t('regions.representation-of-party-members-in-maslikhats-and-in-positions-of-akims-at-all-levels') }}</span>
          </h2>
          
          <div class="regions-controlBtns">
            <Button
              type="default-light-blue"
              v-for="(btn, idx) of controlBtns"
              :key="btn.icon"
              :class="`regions-controlBtns-btn ${btn.name} ${btn.active ? 'active' : ''}`"
              @click="() => toggleShow(idx)"
            >
              <SvgIcon
                :name="btn.icon"
                :viewboxHeight="32"
                :viewboxWidth="32"
              />
            </Button>
          </div>
        </div>
      </div>

      <div class="faq-block">
        <div class="wrapper">
          <Transition>
            <MapWithSideBar v-if="controlBtns[0].active" />

            <ListDeputies v-else />
          </Transition>
        </div>
      </div>
    </section>
  </div>

  <Footer withoutLandingWrapper /> 
</div>
</template>

<script setup lang="ts">
  import MapWithSideBar from "@/components/uiLanding/regions-page/MapWithSideBar.vue";
  import ListDeputies from "@/components/uiLanding/regions-page/ListDeputiesOfMaslikhat.vue";
  
  import { reactive } from "vue";

  const controlBtns = reactive([
    {
      name: 'pin',
      icon: 'map-control-pin',
      active: true
    },
    {
      name: 'list',
      icon: 'map-control-list',
      active: false
    }
  ])

  const toggleShow = (idx: number) => {
    for (let i = 0; i < controlBtns.length; i++) {
      controlBtns[i].active = false;
    }
    controlBtns[idx].active = true;
  }
</script>

<style scoped lang="scss">
  .wrapper-main {
    background-color: var(--accent-color-op05);
  }
  .regions {
    &-header {
      align-items: flex-start;
    }
    &-controlBtns {
      display: flex;
      align-items: center;
      grid-gap: 10px;

      &-btn {
        height: 60px;
        width: 60px;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0px !important;

        & svg {
          height: 32px;
          width: 32px;

          transition: all .3s ease-in-out;
        }

        &.active {
          background-color: var(--accent-color-op30);
        }

        &.pin {
          & svg {
            stroke: var(--light-gray-color-op30) !important;
          }
          &.active svg {
            stroke: white !important;
          }
        }

        &.list {
          & svg {
            fill: var(--light-gray-color-op30) !important;
          }
          &.active svg {
            fill: white !important;
          }
        }
      }
    }
  }

  // Animations
  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>