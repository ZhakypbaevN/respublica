<template>
  <button
    class="newsItem withZoomPreview"
  >

    <!-- Preview -->
    <div class="newsItem-preview withZoomPreview-preview">
      <div
        class="newsItem-preview-img bg-cover withZoomPreview-preview-img"
        :style="`background-image:url('https://i.pinimg.com/564x/66/ed/19/66ed190edaf9f2557cbe63978e1b89e2.jpg');`"
      ></div>
    </div>

    <!-- Delete Button -->
    <div class="newsItem-delete">
      <Button
        type="default-light-grey"
      >
        <SvgIcon
          name="trash-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>
    </div>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  data: any,
}

defineProps<IProps>()

</script>

<style scoped lang="scss">
.newsItem {
  text-align: left;

  padding: 10px;

  border-radius: 10px;
  border: 1px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-op05);

    & .newsItem-delete {
      right: 20px;
    }
  }

  &-preview {
    width: 100%;
    border-radius: 10px;

    &-img {
      padding-bottom: 72%;
    }
  }

  &-delete {
    height: 60px;
    
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;

    padding: 5px;
    border-radius: 10px;
    background-color: white;

    transition: all .3s ease-in-out;

    & button {
      height: 50px;
      width: 50px;
      padding: 0px !important;
      margin: 0px !important;

      &:hover {
        background-color: var(--red-color-op10) !important;
  
        & svg {
          stroke: var(--red-color);
        }
      }
    }
    
    & svg {
      height: 50px;
      width: 50px;
      stroke: var(--light-gray-color);

      transition: all .3s ease-in-out;
    }

  }
}
</style>