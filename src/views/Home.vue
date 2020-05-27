<template>
  <div class="home">
    <h1>Home Sweet Home</h1>
    <h2>Connect your device</h2>
    <form v-on:submit="onSubmit" @submit="$emit('updateAcessKey', accessKey)">
      <input v-model="accessKey" type="text" placeholder="Access key" />
      <button type="submit">Connect</button>
    </form>
    <router-link to="/InGame">Connect Custom Server</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '../router'

export default {
  name: "Home",
  components: {},
  data: ()=>({accessKey:""}),
  methods: {
    onSubmit: (e)=>{
      e.preventDefault();
      router.push('/InGame')
    }
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
    color: white;
  }

  form {
    margin-bottom : 10px;
    button{
      padding: 10px;
      font-size: inherit;
      margin-top: 20px;
      background: none;
      border: solid $lightGrey 1px;
      border-radius: 2px;
      color: white;
      margin-left: 10px;
    }
  }
}
</style>