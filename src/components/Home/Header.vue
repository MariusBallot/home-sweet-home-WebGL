<template>
  <div ref="container" class="header animate">
    <div class="top">
      <img src="ui/logo.svg" class="logo" alt />
      <img src="ui/title.png" alt class="title" />
    </div>
    <div class="bot">
      <div class="credit-nav">
        <button v-on:click="onCredits" class="credit on">Credits</button>
        <button v-on:click="onBack" class="back">Back</button>
      </div>
      <button>Start the experience</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      animates: null,
      credButt: null,
      backButt: null
    };
  },
  mounted() {
    this.animates = document.querySelectorAll(".header.animate");
    let isActive = false;

    this.credButt = document.querySelector(".credit");
    this.backButt = document.querySelector(".back");

    window.EM.on("tScroll", ind => {
      this.animates.forEach(el => {
        if (ind >= 1) {
          el.classList.add("on-up");
          isActive = true;
        } else if (isActive) {
          isActive = false;
          el.classList.remove("on-up");
        }
      });
    });

    window.EM.on("inCredits", () => {});
  },
  components: {},
  created() {},
  methods: {
    onCredits: function() {
      window.EM.emit("inCredits");
      this.credButt.classList.remove("on");
      this.backButt.classList.add("on");
    },
    onBack: function() {
      window.EM.emit("outCredits");
      this.credButt.classList.add("on");
      this.backButt.classList.remove("on");
    }
  }
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
     pointer-events: all;
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
       font-weight: 400;
     }

     .logo {
       height: 100%;
       width: auto;
     }

     .title {
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

     .credit-nav {
       position: relative;

       .credit {
         off(0s);

         &.on {
           opacity: 1;
           transform: translate3d(0, 0, 0);
           pointer-events: all;
         }
       }

       .back {
         position: absolute;
         top: 0;
         left: 0;
         off(0s);

         &.on {
           opacity: 1;
           transform: translate3d(0, 0, 0);
           pointer-events: all;
         }
       }
     }

     button {
       cursor: pointer;

       &:focus {
         outline: none;
       }
     }
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