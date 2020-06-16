<template>
  <div class="connection">
    <img class="connection-bg" src="ui/connection-bg.png" alt />
    <div class="head">
      <img class="logo" src="ui/logo.svg" alt />
      <h1>Home Sweet Home.</h1>
    </div>
    <div class="connection">
      <form v-on:submit="onSubmit" @submit="$emit('updateAcessKey', accessKey)">
        <input v-model="accessKey" type="text" placeholder="Access key" />
        <p class="instr">Type the access code visible on your desktop</p>
        <router-link to="/InGame">Connect Custom Server</router-link>

        <button class="btn-connect" type="submit">Connect</button>
      </form>
      <button class="fs" v-on:click="toggleFS">Toggle FS</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "../router";

export default {
  name: "Connection",
  components: {},
  data: () => ({ accessKey: "" }),
  methods: {
    onSubmit: e => {
      e.preventDefault();
      router.push("/InGame");
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
  },
  mounted() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", () => {});
          }
        })
        .catch(console.error);
    } else {
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../utils/mixins.styl';

.connection {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
  color: $lightGrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .connection-bg {
    opacity: 10%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .head {
    position: absolute;
    top: 63px;
    left: 32px;
  }

  .connection {
    width: 100%;
    padding: 32px;
    position: absolute;
    bottom: 0;
    left: 0;

    input {
      width: 100%;
      padding: 10px;
      font-size: inherit;
      margin-top: 20px;
      background: none;
      border: 0;
      border-bottom: solid $lightGrey 1px;
      border-radius: 2px;
      color: white;

      &:focus {
        outline: none;
      }
    }

    p.instr {
      margin-bottom: 50px;
      font-size: 1.4em;
      font-weight: bold;
    }

    .btn-connect {
      width: 100%;
      font-size: 2em;
      font-weight: bold;
      padding-bottom: 10px;
      border-radius: 2px;
      border: 0;
    }

    .fs {
          font-size: 1em;
    background: white;
    color: white;
    border: none;
    font-weight: 900;
    background: none;
    padding: 20px;
    border: solid white 1px;
    margin-top: 40px;
    }
  }

  h1 {
    color: white;
  }
}
</style>