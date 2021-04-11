<template>
  <RouterLink
    to="/"
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  color: #000;
  text-decoration: none;
  margin-right: 40px;
  &:hover {
    color: #000;
  }
  span {
    color: var(--bs-primary);
  }
}
</style>