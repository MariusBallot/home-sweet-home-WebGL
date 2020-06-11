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
    return {};
  },
  mounted() {
    let animates = document.querySelectorAll(
      ".trailer .animate,.trailer.animate"
    );
    let isActive = false;

    window.EM.on("tScroll", ind => {
      animates.forEach(el => {
        if (ind == 2) {
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