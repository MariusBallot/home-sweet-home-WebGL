<template>
  <div ref="container" class="header animate">
    <div class="top">
      <img src="ui/logo.svg" alt />
      <h1>Home sweet home.</h1>
    </div>
    <div class="bot">
      <button>Credits</button>
      <button>Start the experience</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  mounted() {
    let animates = document.querySelectorAll(".header.animate");

    window.EM.on("tScroll", ind => {
      animates.forEach(el => {
        if (ind == 0) el.classList.remove("on-up");
        if (ind == 1) el.classList.add("on-up");
      });
    });
  },
  components: {},
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .header {
   width: 100vw;
   position: absolute;
   top: 0;
   left: 0;
   color: white;
   padding: 30px;
   z-index: 2;
   off(0s);

   &.on-up {
     transform: translate3d(0, 0, 0);
     opacity: 1;
   }

   .top {
     border-bottom: solid white 1px;
     display: flex;
     width: 100%;
     justify-content: space-between;
     align-items: center;
     height: 50px;
     padding-bottom: 20px;

     h1 {
       font-size: 1.2em;
     }

     img {
       height: 100%;
       width: auto;
     }
   }

   .bot {
     display: flex;
     width: 100%;
     justify-content: space-between;
     align-items: center;
     margin-top: 10px;
   }

   button {
     background: none;
     border: none;
     font-size: inherit;
     color: inherit;
     font-weight: bold;
     font-size: 1.2em;
   }
 }
</style>