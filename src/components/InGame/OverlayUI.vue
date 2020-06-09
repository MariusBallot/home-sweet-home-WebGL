<template>
  <div class="overlay-ui">
    <div class="head">
      <img src="ui/grey/grey-logo.svg" class="grey-logo" alt />
      <img src="ui/grey/grey-empty-screen.svg" class="grey-empty-screen" alt />
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

    .grey-logo, .grey-empty-screen {
      height: 30px;
    }
  }
}
</style>