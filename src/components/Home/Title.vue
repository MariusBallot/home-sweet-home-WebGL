<template>
  <div class="title">
    <div class="content">
      <img src="ui/logo.svg" alt />
      <h1>Home sweet home.</h1>
      <div class="bottom-title">
        <div class="scroll-more">
          <img src="ui/arrowUp.svg" alt />
          <p>Scroll to see more</p>
        </div>
        <div class="explaining">
          This is a love story between a lonely person
          <br />and the Internet.
        </div>
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
   color: white;
   display: flex;
   flex-direction: columns;
   align-items: center;
   justify-content: center;
   position: relative;

   h1 {
     font-size: 7em;
   }

   .bottom-title {
     width: 100%;
     display: flex;
     justify-content: space-between;
     font-weight: bold;
     font-size: 1.4em;
   }

   .scroll-more {
     display: flex;
     align-items: center;

     img {
       margin-right: 10px;
     }
   }
 }
</style>