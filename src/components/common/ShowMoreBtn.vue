<template>
  <div class="landing-showMore" v-if="offset + 20 < total">
    <Button
      class="landing-showMore-btn"
      :name="$t('button.view-more')"
      type="outline-grey"
      :loading="loading"
      @click="showMore"
    >
      <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
    </Button>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    loading: boolean,
    offset: number,
    total: number
  }
  interface Emits {
    (event: 'update:offset', value: number): void
  }

  const emit = defineEmits<Emits>()
  const props = defineProps<IProps>()

  const showMore = () => {
    emit('update:offset', props.offset + 20);
  }
</script>

<style scoped lang="scss">
</style>