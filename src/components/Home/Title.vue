<template>
  <div class="title">
    <div class="content">
      <img src="ui/logo.svg" class="logo animate" alt />
      <img src="ui/title.png" alt class="title animate" />
      <div class="animate bottom-title">
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
  mounted() {
    let animates = document.querySelectorAll(".title .animate");
    animates.forEach(el => {
      el.classList.add("on-up");
    });

    window.EM.on("tScroll", ind => {
      animates.forEach(el => {
        if (ind == 0) el.classList.add("on-up");
        if (ind == 1) el.classList.remove("on-up");
      });
    });
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

   +below(600px) {
     padding: 20px;
   }

   .logo {
     width: 40px;
     height: auto;
     off(0.2s);

     &.on-up {
       transform: translate3d(0, 0, 0);
       opacity: 1;
     }
   }

   .title {
     margin: 20px 0;
     width: 800px;
     height: auto;
     off(0s);

     +below(600px) {
       width: 100%;
       padding: 0;
     }

     &.on-up {
       transform: translate3d(0, 0, 0);
       opacity: 1;
     }
   }

   .bottom-title {
     width: 100%;
     display: flex;
     justify-content: space-between;
     font-weight: bold;
     font-size: 1.4em;
     off(0.1s);

     +below(600px) {
       font-size: 1em;
     }

     &.on-up {
       transform: translate3d(0, 0, 0);
       opacity: 1;
     }
   }

   .scroll-more {
     display: flex;
     align-items: center;

     +below(600px) {
       display: none;
     }

     img {
       margin-right: 10px;
     }
   }
 }
</style>