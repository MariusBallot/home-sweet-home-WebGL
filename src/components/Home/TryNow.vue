<template>
  <div ref="container" class="try-now animate">
    <div class="scroll">
      <img src="ui/arrowUp.svg" alt />
      Scroll to go
    </div>
    <div class="content">
      <div class="title">
        <img src="ui/logoBigGrey.svg" alt class="grey-logo" />
        <h2>Try It Now</h2>
        <img src="ui/upBoy.png " alt class="upBoy" />
      </div>
      <p class="under-title">
        The story is waiting for you to begin.
        <br />The only thing left to do is to download it.
      </p>
      <div class="xp-links">
        <a class="unity">
          <h2>1</h2>
          <h3>Download for Mac or PC</h3>
        </a>
        <a class="unity">
          <h2>2</h2>
          <h3>Connect your mobile device</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TryNow",
  data() {
    return {};
  },
  mounted() {
    let animates = document.querySelectorAll(
      ".try-now .animate,.try-now.animate"
    );
    let isActive = false;

    window.EM.on("tScroll", ind => {
      animates.forEach(el => {
        if (ind == 4) {
          el.classList.add("on-up");
          isActive = true;
        } else if (isActive) {
          isActive = false;
          el.classList.remove("on-up");
        }
      });
    });
  },
  components: {},
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .try-now {
   width: 100%;
   height: 90%;
   position: absolute;
   top: 0;
   left: 0;
   color: white;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   off(0s);

   &.on-up {
     transform: translate3d(0, 0, 0);
     opacity: 1;
     pointer-events: all;
   }

   .scroll {
     transform: translate3d(0, -100px, 0);
     font-weight: bold;
   }

   .content {
     margin-top: 80px;

     .title {
       position: relative;
       z-index: 1;
       display: flex;

       .grey-logo {
         height: 180px;
         width: auto;
         margin-right: 20px;
       }

       h2 {
         font-size: 8em;
         width: 350px;
         line-height: 80px;
       }

       .upBoy {
         position: absolute;
         top: -70px;
         right: -70px;
         z-index: -1;
         height: 350px;
       }
     }

     .under-title {
       margin-left: 200px;
       font-weight: bold;
       position: relative;
       z-index: 1;
     }

     .xp-links {
       display: flex;
       justify-content: space-between;
       position: relative;
       z-index: 1;
       transform: translate3d(0, 150px, 0);

       a {
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         cursor: pointer;

         h2 {
           color: rgba(0, 0, 0, 0);
           -webkit-text-stroke-width: 1px;
           -webkit-text-stroke-color: white;
           font-size: 8em;
           margin-bottom: -80px;
         }

         h3 {
           text-decoration: underline;
         }
       }
     }
   }
 }
</style>