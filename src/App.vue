<template>
  <div id="app">
    <Desktop v-if="!isMobile" />
    <Landscape v-if="!isLandscape" />
    <router-view />
  </div>
</template>


<script>
import Desktop from "./components/Desktop";
import Landscape from "./components/Landscape";
import SocketServer from "./SocketServer";

export default {
  name: "App",
  data() {
    return {
      isMobile: false,
      isLandscape: null
    };
  },
  components: {
    Desktop,
    Landscape
  },
  created() {
    this.isMobile = window.browser.mobile;
    console.log(
      window.innerWidth,
      window.innerHeight,
      window.innerWidth > window.innerHeight
    );
    this.isLandscape = window.innerWidth > window.innerHeight;
    window.addEventListener("resize", this.resize);

    SocketServer.start();
  },
  mounted() {
    window.addEventListener("load", function() {
      setTimeout(function() {
        window.scrollTo(0, 1);
      }, 0);
    });
  },
  methods: {
    resize() {
      this.isLandscape = window.innerWidth > window.innerHeight;
    }
  }
};
</script>


<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
