<template>
  <div class="desktop">This is the mobile view. Only available on mobile devices</div>
</template>

<script>
export default {
  name: "Desktop"
};
</script>
<style lang="stylus" scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: black;
  color: white;
}
</style>
