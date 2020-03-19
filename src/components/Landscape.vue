<template>
  <div class="landscape">Only in landscape mode</div>
</template>

<script>
export default {
  name: "Landscape"
};
</script>
<style lang="stylus" scoped>
.landscape {
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
