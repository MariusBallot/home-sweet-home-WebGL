<template>
  <div class="loading">
    <h1>the world is loading</h1>
    <p>{{pourcentage}}%</p>
  </div>
</template>

<script>
import SceneLoader from "@/classes/SceneLoader";
import MainScene from "@/classes/MainScene";
import LoadingController from "@/controllers/LoadingController";

export default {
  name: "Loading",
  data() {
    return {
      pourcentage: 0
    };
  },

  mounted() {
    LoadingController.addOnProgress("LoadingFlag", this.onProgress);
  },
  methods: {
    onProgress(progress) {
      this.pourcentage = Math.round(progress);
    }
  },
  destroyed() {
    LoadingController.removeOnProgress("LoadingFlag");
  }
};
</script>
<style lang="stylus" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
  color: white;
  z-index: 1;
  top: 0;
  left: 0;
}
</style>