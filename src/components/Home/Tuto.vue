<template>
  <div ref="container" class="tuto animate">
    <div class="content">
      <h2>You'll need a</h2>
      <h3>Computer & Smartphone</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tuto",
  data() {
    return {
      ind: null,
      animates: null,
      isActive: null
    };
  },
  mounted() {
    this.animates = document.querySelectorAll(".tuto .animate,.tuto.animate");
    this.isActive = false;

    window.EM.on("tScroll", ind => {
      this.ind = ind;
      this.checkInd();
    });

    window.EM.on("inCredits", () => {
      if (this.isActive) this.leave();
    });
    window.EM.on("outCredits", () => {
      if (this.isActive) this.checkInd();
    });
  },
  methods: {
    checkInd: function() {
      if (this.ind == 3) {
        this.enter();
      } else if (this.isActive) {
        this.isActive = false;
        this.leave();
      }
    },
    enter: function() {
      this.animates.forEach(el => {
        el.classList.add("on-up");
      });
      this.isActive = true;
    },
    leave: function() {
      this.animates.forEach(el => {
        el.classList.remove("on-up");
      });
    }
  }
};
</script>
 <style lang="stylus" scoped>
 .tuto {
   width: 100%;
   height: 90%;
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   pointer-events: none;
   color: white;
   font-size: 3em;
   off(0.2s);

   &.on-up {
     transform: translate3d(0, 0, 0);
     opacity: 1;
     pointer-events: all;
   }

   h2 {
     text-align: center;
   }

   h3 {
     color: rgba(0, 0, 0, 0);
     -webkit-text-stroke-width: 1px;
     -webkit-text-stroke-color: white;
     font-size: 2.8em;
     width: 800px;
     line-height: 150px;
     text-align: center;
   }
 }
</style>