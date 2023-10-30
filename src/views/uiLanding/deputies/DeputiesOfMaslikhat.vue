<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      
      <section class="landing-block">
        <div class="wrapper landing-wrapper">
          <h2 class="landing-title">Представленность членов партии в маслихатах и на должностях акимов всех уровней.</h2>

          <div
            v-for="region of regions"
            :key="region.title"
          >
            <button
              class="landing-link with-line"
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
                    :id="region.code"
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
      </section>
    </div>

    <Footer />
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import deputiesMap from "../../../assets/map/deputiesMap.json";

const route = useRoute()

const regions = reactive(deputiesMap.deputiesList.map((x) => x))

onMounted(() => {
  regions.forEach(region => {
    if (region.code === route.params.region_id) {
      region.active = true;
      window.location.href = `/deputies-of-maslikhat/${route.params.region_id}#${route.params.region_id}`;
      // window.history.replaceState(null, document.title, `/deputies-of-maslikhat/${route.params.region_id}#${route.params.region_id}`);
    } else region.active = false;
  })
})

</script>
  
<style scoped lang="scss">
.wrapper-main {
  background-color: var(--accent-color-op05);
}

.landing-items {
  display: flex;
  flex-wrap: wrap;

  padding-bottom: 40px;
}

.deputy {
  &-item {
    scroll-margin-top: 9.4rem;
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
  