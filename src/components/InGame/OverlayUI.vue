<template>
  <div class="overlay-ui">
    <div class="head">
      <img src="ui/logo.svg" class="logo" alt />
      <img src="ui/empty-screen.svg" class="desk-ind" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "OverlayUI",

  mounted() {},
  methods: {},
  destroyed() {}
};
</script>
<style lang="stylus" scoped>
.overlay-ui {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;

  .head {
    padding: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .logo {
      width: 20px;
      height: auto;
    }
  }
}
</style>