<template>
  <div ref="container" class="trailer">
    <div class="content animate">
      <video src="teaser.mp4" controls></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trailer",
  data() {
    return {
      ind: null,
      animates: null,
      isActive: null
    };
  },
  mounted() {
    this.animates = document.querySelectorAll(
      ".trailer .animate,.trailer.animate"
    );
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
  components: {},
  created() {},
  methods: {
    checkInd: function() {
      if (this.ind == 2) {
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
 .trailer {
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   pointer-events: none;

   &.on-up {
     transform: translate3d(0, 0, 0);
     opacity: 1;
     pointer-events: all;
   }

   .content {
     width: 50%;
     off(0.2s);

     &.on-up {
       transform: translate3d(0, 0, 0);
       opacity: 1;
       pointer-events: all;
     }

     video {
       width: 100%;
       height: auto;
     }
   }
 }
</style>