<template>
  <div class="not-found">
    <div class="status">
      404
    </div>
    <div class="message">
      Page Not Found!
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  line-height: 1.2;
  text-align: center;
  font-family: "Oswald", sans-serif;
  padding: 80px 20px;
  .status {
    font-size: 160px;
    color: $primary;
  }
  .message {
    font-size: 50px;
  }
}
</style>
