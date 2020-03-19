<template>
  <div ref="threeCanvas" class="threeCanvas"></div>
</template>

<script>
import SceneLoader from "@/classes/SceneLoader";
import MainScene from "@/classes/MainScene";
import LoadingController from "@/controllers/LoadingController";

export default {
  name: "ThreeCanvas",

  mounted() {
    SceneLoader.start();
    LoadingController.addOnLoad("allScenesLoaded", this.onScenesLoaded);
  },
  methods: {
    onScenesLoaded() {
      MainScene.start(this.$refs.threeCanvas);
    }
  },
  destroyed() {
    LoadingController.removeCallback("allScenesLoaded");
  }
};
</script>
<style lang="stylus" scoped>
.threeCanvas {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: white;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
</style>