<template>
  <div ref="container" class="loader">
    <div class="content">
      <img class="logo" src="ui/logo.svg" />
      <div class="right">
        <p>The Home sweet home website is loading</p>
        <div class="bar-cont">
          <div ref="fill" class="fill"></div>
        </div>
      </div>
      <p ref="percentage" class="percentage">0%</p>
    </div>
  </div>
</template>

<script>
import LoadingController from "@/classes/HomeClasses/LoadingController";
export default {
  name: "loader",
  data() {
    return {};
  },
  mounted() {
    LoadingController.addOnProgress("homeLoader", this.onProgress);
    LoadingController.addOnLoad("loaderOnLoad", () => {
      this.$refs.container.classList.add("off");
    });
  },
  components: {},
  created() {},
  methods: {
    onProgress: function(e) {
      this.$refs.percentage.innerHTML = `${Math.round(e)}%`;
      this.$refs.fill.style.width = `${e}%`;
    }
  }
};
</script>
 <style lang="stylus" scoped>
 .loader {
   pointer-events: none;
   width: 100vw;
   height: 100vh;
   position: absolute;
   top: 0;
   left: 0;
   background: black;
   z-index: 3;
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
   font-size: 1.4em;
   font-weight: bold;
   transition: all 0.3s;
   opacity: 1;

   &.off {
     opacity: 0;
   }

   .content {
     display: flex;
     position: relative;
     height: 80px;
     width: 30%;
     align-items: center;

     +below(600px) {
       align-items: center;
       justify-content: center;
       flex-direction: column;
       width: 100%;
       padding: 0 20px;

       img {
         margin-bottom: 20px;
       }

       .bar-cont {
         margin: 20px 0;
       }

       .percentage {
         position: static !important;
       }
     }

     img {
       width: 30px;
       height: auto;
       margin-right: 20px;
     }

     .bar-cont {
       width: 100%;
       height: 2px;
       margin-top: 5px;

       .fill {
         height: 100%;
         background: white;
         transition: width 0.1s;
       }
     }

     .percentage {
       position: absolute;
       bottom: 0;
       right: 0;
     }
   }
 }
</style>