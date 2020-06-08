<template>
  <div class="title">
    <div class="content">
      <h1>Home sweet home.</h1>
      <div class="scroll-more">
        <span>^</span>
        <p>scroll to see more</p>
      </div>
      <div class="explaining">
        This is a love story between a lonely person
        <br />and the Internet.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .title {
   width: 100vw;
   height: 100vh;
   background: black;
   color: white;

   .scroll-more {
     display: flex;
     align-items: center;
   }
 }
</style>