<template>
  <div class="home">
    <h1>Home Sweet Home</h1>
    <h2>Connect your device</h2>
    <input type="text" placeholder="Access key" />
    <router-link to="/InGame">Connect Custom Server</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
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
      console.log("other device");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../utils/mixins.styl';

.home {
  width: 100vw;
  height: 100vh;
  background: $darkGrey;
  color: $lightGrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

  input {
    padding: 10px;
    font-size: inherit;
    margin-top: 20px;
    background: none;
    border: solid $lightGrey 1px;
    border-radius: 2px;
  }
}
</style>