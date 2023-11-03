<template>
  <div class="albom">
    <div class="albom-preview skeleton">
      <div class="albom-preview-img"></div>
    </div>

    <div class="albom-info">
      <span class="albom-info-name skeleton long-text"></span>
      <span class="albom-info-date skeleton middle-text"></span>
      <span class="albom-info-city skeleton small-text"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.albom {
  width: 100%;
  
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 14px;
  align-items: center;

  padding: 16px 20px;
  border-radius: 10px;
  border: 2px solid var(--light-gray-color-op10);

  transition: 0.3s ease-in-out;

  &-preview {
    border-radius: 80px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    text-align: left;

    &-name {
      margin-bottom: 12px;
    }

    &-date {
      margin-bottom: 3px;
    }
  }
}
</style>