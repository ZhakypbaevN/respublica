<template>
  <section class="landing-block" id="who-are-we">
    <div class="wrapper">
      <h2 class="landing-title" id="aboutUs">{{ $t("about-us-page-who-are-we") }}</h2>

      <div class="icon-block">
        <div class="icon-items">
          <div class="icon-item">
            <SvgIcon name="respublica-logo" :viewboxWidth="60" :viewboxHeight="60" />
            <div class="icon-item-description">
              <span class="icon-item-title">{{ $t("about-us-page-respublica") }}</span>
              <span class="icon-item-text">
                {{ $t("about-us-page-resbublica-description") }}
              </span>
            </div>
          </div>

          <div class="icon-item">
            <SvgIcon name="metaparty" :viewboxWidth="60" :viewboxHeight="60" />
            <div class="icon-item-description">
              <span class="icon-item-title">{{ $t("about-us-page-metaparty") }}</span>
              <span class="icon-item-text">
                {{ $t("about-us-page-metaparty-description") }}
              </span>
            </div>
          </div>

          <div class="icon-item">
            <SvgIcon name="businessman" :viewboxWidth="60" :viewboxHeight="60" />
            <div class="icon-item-description">
              <span class="icon-item-title">{{ $t("about-us-page-our-tasks") }}</span>
              <span class="icon-item-text">
                {{ $t("about-us-page-our-tasks-description") }}
              </span>
            </div>
          </div>
        </div>

        <div class="icon-items">
          <div class="icon-item">
            <SvgIcon
              name="equal-representatives"
              :viewboxWidth="60"
              :viewboxHeight="60"
            />
            <div class="icon-item-description">
              <span class="icon-item-title">{{
                $t("about-us-page-our-priorities")
              }}</span>
              <ul>
                <li>
                  <span class="icon-item-text"
                    >· {{ $t("about-us-page-our-priorities-educated-nation") }}</span
                  >
                </li>
                <li>
                  <span class="icon-item-text"
                    >· {{ $t("about-us-page-happiness-to-be-healthy") }}</span
                  >
                </li>
                <li>
                  <span class="icon-item-text"
                    >· {{ $t("about-us-page-kazakh-culture") }}</span
                  >
                </li>
                <li>
                  <span class="icon-item-text"
                    >· {{ $t("about-us-page-prosperous-kazakhstans") }}</span
                  >
                </li>
                <li>
                  <span class="icon-item-text"
                    >· {{ $t("about-us-page-refusal-of-outdated-templates") }}</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="icon-item">
            <SvgIcon name="businessman" :viewboxWidth="60" :viewboxHeight="60" />
            <div class="icon-item-description">
              <span class="icon-item-title">{{ $t("about-us-page-our-leaders") }}</span>
              <span class="icon-item-text"> {{ $t("about-us-page-our-leaders-description") }} </span>
            </div>
          </div>

          <div class="icon-item">
            <SvgIcon name="marker" :viewboxWidth="60" :viewboxHeight="60" />
            <div class="icon-item-description">
              <span class="icon-item-title">{{ $t('about-us-page-all-regions-and-districs')}}</span>
              <span class="icon-item-text">
                {{ $t('about-us-page-all-regions-and-districs-description')}}              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.icon-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 140px;
}
.icon-items {
  display: flex;
  flex-direction: column;
  grid-gap: 35px;
}

.icon-item {
  display: flex;
  align-items: flex-start;

  svg {
    width: 60px;
  }

  &-description {
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    width: 550px;
  }

  &-title {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 700;
  }

  &-text {
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 400;
  }
}
</style>
