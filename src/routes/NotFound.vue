<template>
  <div class="error-page">
    <div class="status">
      404
    </div>
    <div class="status-text">
      Page Not Found!
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error-page {
    line-height: 1.2;
    text-align: center;
    font-family: 'Oswald', sans-serif;
    padding: 80px 20px;
    .status {
      font-size: 160px;
      color: $primary;
    }
    .status-text {
      font-size: 50px;
    }
  }
</style>