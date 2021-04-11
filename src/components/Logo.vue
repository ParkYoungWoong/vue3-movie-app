<template>
  <RouterLink
    to="/"
    :style="{ opacity }"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<script>
export default {
  props: {
    opacity: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span {
    color: $primary;
  }
}
</style>
