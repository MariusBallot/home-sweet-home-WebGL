<template>
  <div class="inGame">
    <div ref="threeCanvas" class="threeCanvas"></div>
    <div class="domContent">
      <h1>Welcome</h1>
      <button ref="prevScene">pervious scene</button>
      <button v-on:click="onClick" ref="nextScene">next scene</button>
    </div>
  </div>
</template>

<script>
import SceneLoader from "../classes/SceneLoader";
import MainScene from "../classes/MainScene";
import LoadingController from "../controllers/LoadingController";

export default {
  name: "Ingame",
  mounted() {
    SceneLoader.start();
    LoadingController.addOnLoad("allScenesLoaded", this.onScenesLoaded);
  },
  methods: {
    onScenesLoaded() {
      MainScene.start(this.$refs.threeCanvas);
    },
    onClick() {
      MainScene.switchScene();
    }
  },
  destroyed() {
    LoadingController.removeCallback("allScenesLoaded");
  }
};
</script>
 <style lang="stylus" scoped>
 .inGame {
   .threeCanvas {
     width: 100vw;
     height: 100vh;
     overflow: hidden;
     position: absolute;
     top: 0;
     left: 0;
   }

   .domContent {
     width: 100vw;
     height: 100vw;
     position: absolute;
     z-index: 1;
     overflow: hidden;
     pointer-events: none;

     button {
       pointer-events: all;
     }
   }
 }
</style>