<template>
  <div class="introContent">
    <div class="wrapper landing-wrapper">
      <div class="introContent-inner">
        <div class="introContent-images">
          
          <div
            data-aos="zoom-out-up"
            data-aos-delay="1400"
            data-aos-duration="1200"
          >
            <div
              data-aos="flip-left"
              data-aos-delay="1400"
              data-aos-duration="1400"
            >
              <SvgIcon
                class="introContent-logo"
                name="logo-re-circle"
                :viewboxWidth="219"
                :viewboxHeight="219"
              />
            </div>
          </div>

          <div class="introContent-map">
            <div
              data-aos="fade-right"
              data-aos-delay="1200"
              data-aos-duration="2000"
            >
              <SvgIcon
                name="map-with-dots"
                :viewboxWidth="523"
                :viewboxHeight="251"
              />
            </div>
          </div>
        </div>
        
        <h2 class="introContent-title">
          <span
            class="blue"
            data-aos="fade-up-left"
            data-aos-delay="1900"
            data-aos-duration="1400"
          >
            {{ $t("home.intro.new-people") }}
          </span><br>
          
          <span
            data-aos="fade-up-left"
            data-aos-delay="2100"
            data-aos-duration="1400"
          >
            {{ $t("home.intro.new-opportunities") }}
          </span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.introContent {
  width: 100%;

  position: absolute;
  bottom: 90px;
  z-index: 14;

  &-inner {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    grid-gap: 18px;

    position: relative;
  }

  &-images {
    position: relative;
  }

  &-logo {
    width: 219px;
    height: 219px;
    animation: spinAndZoom 12s infinite;
    animation-delay: 2000;
    
    transform: rotate(0deg);
  }

  &-map {
    width: 523px;
    height: 250px;
    
    opacity: .6;
    position: absolute;
    left: -25px;
    top: 50%;
    z-index: -1;
    transform: translateY(-50%);

    & div {
      display: flex;
      position: absolute;
      
      overflow: hidden;
      animation: widthAnimation 6s infinite;
      animation-delay: 2000;
    }

    & svg {
      width: 523px;
      min-width: 523px;
      height: 250px;
      min-height: 250px;
    }
  }

  &-title {
    display: inline-block;

    & span {
      color: white;
      font-family: "Montserrat";
      text-transform: uppercase;
      font-size: 78px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: .19rem;
    }

    & span.blue {
      color: var(--accent-color);
    }
  }

  // Adaptation
  @media (max-width: 1900px) {
    bottom: 60px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 180px;
      height: 180px;
    }

    &-map {
      width: 460px;
      height: 220px;

      left: -25px;

      & svg {
        width: 460px;
        min-width: 460px;
        height: 220px;
        min-height: 220px;
      }
    }

    &-title span {
      font-size: 72px;
    }
  }

  @media (max-width: 1800px) {
    bottom: 50px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 160px;
      height: 160px;
    }

    &-map {
      width: 418px;
      height: 200px;

      left: -25px;

      & svg {
        width: 418px;
        min-width: 418px;
        height: 200px;
        min-height: 200px;
      }
    }

    &-title span {
      font-size: 68px;
    }
  }

  @media (max-width: 1600px) {
    bottom: 50px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 140px;
      height: 140px;
    }

    &-map {
      width: 376px;
      height: 180px;

      left: -25px;

      & svg {
        width: 376px;
        min-width: 376px;
        height: 180px;
        min-height: 180px;
      }
    }

    &-title span {
      font-size: 62px;
    }
  }

  @media (max-width: 1400px) {
    bottom: 50px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 120px;
      height: 120px;
    }

    &-map {
      width: 335px;
      height: 160px;

      left: -25px;

      & svg {
        width: 335px;
        min-width: 335px;
        height: 160px;
        min-height: 160px;
      }
    }

    &-title span {
      font-size: 52px;
    }
  }

  @media (max-width: 1200px) {
    bottom: 35px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 100px;
      height: 100px;
    }

    &-map {
      width: 272px;
      height: 130px;

      left: -25px;

      & svg {
        width: 272px;
        min-width: 272px;
        height: 130px;
        min-height: 130px;
      }
    }

    &-title span {
      font-size: 42px;
    }
  }

  @media (max-width: 992px) {
    bottom: 28px;

    &-inner {
      grid-gap: 18px;
    }

    &-logo {
      width: 80px;
      height: 80px;
    }

    &-map {
      width: 210px;
      height: 100px;

      left: -25px;

      & svg {
        width: 210px;
        min-width: 210px;
        height: 100px;
        min-height: 100px;
      }
    }

    &-title span {
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    bottom: 28px;

    &-inner {
      grid-gap: 12px;
    }

    &-logo {
      width: 70px;
      height: 70px;
    }

    &-map {
      width: 180px;
      height: 90px;

      left: -25px;

      & svg {
        width: 180px;
        min-width: 180px;
        height: 90px;
        min-height: 90px;
      }
    }

    &-title span {
      font-size: 28px;
    }
  }

  @media (max-width: 576px) {
    display: none;
  }

  @media (max-width: 380px) {
  }
}

@keyframes spinAndZoom {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(360deg);
  }
  40% {
  }
  45% {
  }
}

@keyframes widthAnimation {
  0% {
    width: 0%;
    left: 0;
    justify-content: start;
  }
  40% {
    width: 100%;
    left: 0;
    justify-content: start;
  }
  60% {
    width: 100%;
    right: 0;
    justify-content: end;
  }
  100% {
    width: 0%;
    right: 0;
    justify-content: end;
  }
}
</style>
