<template>
  <div class="loading">
    <h1>Your world is loading</h1>
    <div class="loadbarContainer">
      <div ref="progressBar" class="progressBar"></div>
    </div>
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
      this.$refs.progressBar.style.width = `${this.pourcentage}%`;
    }
  },
  destroyed() {
    LoadingController.removeOnProgress("LoadingFlag");
  }
};
</script>
<style lang="stylus" scoped>
@import '../../utils/mixins.styl';

.loading {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: $darkGrey;
  color: white;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loadbarContainer {
    width: 200px;
    height: 3px;
    margin-top: 20px;
    background: black;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .progressBar {
      transition: all 0.3s;
      height: 100%;
      background: white;
    }
  }
}
</style>