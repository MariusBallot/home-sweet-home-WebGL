<template>
  <div id="app">
    <!-- <div class="GUI">
      <button class="fs" v-on:click="toggleFS">Toggle FS</button>
      <button class="cam" v-on:click="toggleCam">Toggle Cam</button>
    </div>-->
    <!-- <Desktop v-if="!isMobile" />
    <Landscape v-if="isLandscape" />
    <OrRequest v-if="isSafari" />-->
    <router-view @updateAcessKey="setAccessKey" />
  </div>
</template>


<script>
import Desktop from "./components/Desktop";
import Landscape from "./components/Landscape";
import SocketServer from "./SocketServer";
import config from "./config";

export default {
  name: "App",
  data() {
    return {
      isMobile: false,
      isLandscape: null,
      isSafari: false
    };
  },
  components: {
    Desktop,
    Landscape
  },
  created() {
    this.isMobile = window.browser.mobile;
    if (config.allowDesktop) this.isMobile = true;

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
    window.addEventListener("touchend", e => {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            console.log("permission state: ", permissionState);
          })
          .catch(console.error);
      }
    });
  },
  methods: {
    resize() {
      this.isLandscape = window.innerWidth > window.innerHeight;
    },
    toggleFS: function() {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          /* Firefox */
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          /* IE/Edge */
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    },
    toggleCam: function() {
      if (config.orCam) config.orCam = false;
      else config.orCam = true;
      localStorage.setItem("camType", config.orCam);
      console.log(localStorage.getItem("camType"));
    },
    setAccessKey: accessKey => {
      console.log(accessKey);
      sessionStorage.setItem("accessKey", accessKey);
    }
  }
};
</script>


<style lang="stylus">
@font-face {
  font-family: 'Grotesk';
  src: url('/fonts/DarkerGrotesque-Black.ttf');
  font-weight: 900;
}

@font-face {
  font-family: 'Grotesk';
  src: url('/fonts/DarkerGrotesque-Regular.ttf');
  font-weight: 400;
}

* {
  font-family: 'Grotesk';
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
}

.GUI {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;

  button {
    font-size: 1em;
    background: white;
    color: white;
    border: none;
    font-weight: 900;
    background: none;
    padding: 20px;
    border: solid white 1px;
    margin-top: 10px;
  }
}
</style>
