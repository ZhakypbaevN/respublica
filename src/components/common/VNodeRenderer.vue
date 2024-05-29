<template>
  <vNodes :vnodes="vnodes" />
</template>

<script>
export default {
  props: ['vnodes'],
  components: {
    vNodes: {
      props: ['vnodes'],
      render: (h) => h.vnodes
    }
  }
}
</script>
