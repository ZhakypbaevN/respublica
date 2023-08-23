<template>
  <section class="purchases landing-block">
    <div class="wrapper landing-wrapper">
      <h2 class="landing-title">Закупки</h2>

      <div class="purchases-items">
        <div class="purchases-item">
          <h4 class="purchases-item-date">Июль 20, 2023 01:51</h4>

          <h3 class="purchases-item-title">Гейм-аналитик Инженер-программист Системный инженер 3D-Дженералист (3D-Generalist) Системный программист</h3>

          <div class="purchases-item-conditions">Астана  I  Полная  I  Офис</div>

          <h3 class="purchases-item-price">200 000 - 300 000 KZT</h3>

          <div class="purchases-item-bottom">
            <div class="purchases-item-controls">
              <div class="purchases-item-controls-item">
                <SvgIcon
                  name="comment-alt-lines"
                  :style="{width: '24px', height: '24px'}"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
                <span>30</span>
              </div>

              <div class="purchases-item-controls-item">
                <SvgIcon
                  name="heart-outline"
                  :style="{width: '20px', height: '20px'}"
                  :viewboxWidth="20"
                  :viewboxHeight="20"
                />
                <span>30</span>
              </div>

              <a href="#" class="purchases-item-controls-item">
                <SvgIcon
                  name="share"
                  :style="{width: '20px', height: '20px'}"
                  :viewboxWidth="20"
                  :viewboxHeight="20"
                />
              </a>
            </div>

            <button class="purchases-item-btn">Показать контакты</button>
          </div>
        </div>


        <div class="purchases-item">
          <h4 class="purchases-item-date">Июль 20, 2023 01:51</h4>

          <h3 class="purchases-item-title">Гейм-аналитик Инженер-программист Системный инженер 3D-Дженералист (3D-Generalist) Системный программист</h3>

          <div class="purchases-item-conditions">Астана  I  Полная  I  Офис</div>

          <h3 class="purchases-item-price">200 000 - 300 000 KZT</h3>

          <div class="purchases-item-bottom">
            <div class="purchases-item-controls">
              <div class="purchases-item-controls-item">
                <SvgIcon
                  name="comment-alt-lines"
                  :style="{width: '24px', height: '24px'}"
                  :viewboxWidth="24"
                  :viewboxHeight="24"
                />
                <span>30</span>
              </div>

              <div class="purchases-item-controls-item">
                <SvgIcon
                  name="heart-outline"
                  :style="{width: '20px', height: '20px'}"
                  :viewboxWidth="20"
                  :viewboxHeight="20"
                />
                <span>30</span>
              </div>

              <a href="#" class="purchases-item-controls-item">
                <SvgIcon
                  name="share"
                  :style="{width: '20px', height: '20px'}"
                  :viewboxWidth="20"
                  :viewboxHeight="20"
                />
              </a>
            </div>

            <button class="purchases-item-btn">Показать контакты</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
</script>

<style scoped lang="scss">
.purchases {
  &-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
  }
  &-item {
    padding: 25px;

    border-radius: 10px;
    border: 1px solid rgba(74, 120, 236, 0.50);
    background: #F6F9FD;

    &-date {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    &-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &-conditions {
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 20px;
    }

    &-price {
      color: var(--accent-color);
      font-size: 24px;
      font-weight: 700;
      line-height: 2;
      margin-bottom: 26px;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-controls {
      display: inline-flex;
      align-items: center;
      grid-gap: 20px;

      &-item {
        display: flex;
        align-items: center;
        grid-gap: 5px;

        & span {
          color: var(--light-gray-color);
          font-size: 18px;
          font-weight: 500;
        }
      }
    }

    &-btn {
      color: var(--light-gray-color);
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>