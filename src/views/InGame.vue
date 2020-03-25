<template>
  <div class="inGame">
    <Loading v-if="!loaded" />
    <ThreeCanvas />
    <div class="domContent">
      <h1>Welcome</h1>
      <button ref="prevScene">pervious scene</button>
      <button v-on:click="onClick" ref="nextScene">next scene</button>
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
   .domContent {
     width: 100vw;
     height: 100vh;
     position: absolute;
     z-index: -1;
     overflow: hidden;
     pointer-events: none;
     top: 0;
     left: 0;
     color: white;

     button {
       pointer-events: all;
       font-size: 1em;
       background: white;
       border: none;
     }
   }
 }
</style>