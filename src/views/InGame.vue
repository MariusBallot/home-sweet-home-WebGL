<template>
  <div class="inGame">
    <Loading v-if="!loaded" />
    <ThreeCanvas />
    <div class="domContent">
      <button v-on:click="onClick" ref="nextScene">Next Scene</button>
    </div>
  </div>
</template>

<script>
import Loading from "../components/InGame/Loading";
import ThreeCanvas from "../components/InGame/ThreeCanvas";
import SocketServer from "../SocketServer";

import MainScene from "@/classes/MainScene";
import LoadingController from "@/controllers/LoadingController";

export default {
  name: "Ingame",
  data() {
    return {
      loaded: false
    };
  },
  components: {
    Loading,
    ThreeCanvas
  },
  created() {
    LoadingController.addOnLoad("loadingFinished", this.onLoad);
  },
  methods: {
    onClick() {
      MainScene.switchScene();
      SocketServer.sendToServer("notif", "sardoche");
    },
    onLoad() {
      this.loaded = true;
    }
  }
};
</script>
 <style lang="stylus" scoped>
 .inGame {
   width: 100vw;
   height: 100vh;
   overflow: hidden;

   .domContent {
     position: absolute;
     overflow: hidden;
     top: 10px;
     left: 10px;
     color: white;

     button {
       pointer-events: all;
       font-size: 1em;
       background: white;
       color: white;
       border: none;
       font-weight: 900;
       background: none;
       padding: 20px;
       border: solid white 1px;
     }
   }
 }
</style>