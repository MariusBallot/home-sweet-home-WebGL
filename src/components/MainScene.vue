<template>
  <div class="mainScene">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import MainScene from "@/classes/MainScene";

export default {
  name: "MainScene",
  mounted() {
    MainScene.start(this.$refs.container);
  },
  destroyed() {
    MainScene.destroyed();
  }
};
</script>

<style scoped lang="stylus">
@import '../utils/mixins.styl';

.mainScene {
  .container {
    full-screen();
  }
}
</style>
