<template>
  <div class="home">
    <h1>Welcome</h1>
    <h1>Connect your device</h1>
    <router-link to="/InGame">Device connected</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style lang="stylus" scoped>
.home {
  height: 200vh;
}
</style>