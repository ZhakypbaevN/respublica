<template>
  <div class="commentItem withZoomPreview">
    <div class="commentItem-preview withZoomPreview-preview">
      <div class="commentItem-preview-img bg-cover withZoomPreview-preview-img skeleton"></div>
    </div>

    <div class="commentItem-content">
      <div class="commentItem-author">
        <h3 class="commentItem-author-name skeleton middle-text" style="min-width: 120px;"></h3>
        <h3 class="commentItem-author-name skeleton middle-text" style="min-width: 120px;"></h3>
      </div>

      <div class="commentItem-text">
        <p
          class="skeleton small-text"
          style="width: 100%;margin-bottom: 10px;"
          v-for="item in 2"
          :key="item"
        ></p>
        <p class="skeleton small-text" style="min-width: 80%;"></p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.commentItem {
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-gap: 16px;

  padding-bottom: 18px;
  border-bottom: 1.2px solid var(--light-gray-color-op10);

  &:hover .commentItem-title {
    color: var(--accent-color);
  }

  &-author {
    display: flex;
    grid-gap: 10px;
    margin: 4px 0 8px;

    &-name {
      font-size: 18px;
      font-weight: 600;
    }

    &-createDate {
      color: var(--light-gray-color);
      font-size: 16px;
      font-weight: 500;
    }
  }

  &-preview {
    width: 48px;
    height: 48px;
    border-radius: 100px;

    &-img {
      padding-bottom: 100%;
    }
  }

  &-text {
    font-size: 18px;
    font-weight: 400;
  }
}
</style>
