<template>
  <div>
    <div
      v-for="region of regions"
      :key="region.title"
      :id="region.code"
      class="region-deputies"
    >
      <button
        class="landing-link with-line "
        @click="() => region.active = !region.active"
      >
        <span>{{ region.title }}</span>
      </button>

      <Transition>
        <div
          v-if="region.active && region.deputies.length"
          v-collapse
        >
          <div class="landing-items">
            <div
              class="deputy-item"
              v-for="deputy of region.deputies"
              
            >
                <div class="deputy-item-preview withZoomPreview-preview">
                  <div class="deputy-item-preview-img bg-cover withZoomPreview-preview-img" :style="`background-image: url(${deputy.img});`"></div>
                </div>
                
                <h4 class="deputy-item-name">
                  <span>{{ deputy.name }}</span>
                </h4>
                <div class="deputy-item-description">
                  {{ deputy.role }}
                </div>
            </div>
          </div>
        </div>

        <div v-else-if="region.active" v-collapse>
          <p class="deputy-empty">Нет депутатов</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import deputiesMap from "../../../assets/map/deputiesMap.json";

import { reactive } from 'vue';

const regions = reactive(deputiesMap.deputiesList.map((x) => x))
</script>

<style scoped lang="scss">
.region-deputies {
  scroll-margin-top: 1000px;
  scroll-snap-align: start;
}
.deputy {
  &-item {

    max-width: 320px;    

    &-preview-img {
      padding: 48%;
    }

    &-name {
      display: flex;
      align-items: center;
      height: 64px;
      
      padding: 6px 20px 6px;
      background-color: var(--accent-color);

      & span {
        color: white;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.4;
      }
    }

    &-description {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
      line-height: 1.2;

      padding: 10px;
    }
  }

  &-empty {
    margin-bottom: 40px;
  }
}
</style>