<template>
  <footer>
    <a
      href="https://github.com/ParkYoungWoong?tab=repositories"
      target="_blank">
      (c){{ new Date().getFullYear() }} {{ name }}
    </a>
  </footer>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.about.name
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px 0;
  text-align: center;
}
</style>