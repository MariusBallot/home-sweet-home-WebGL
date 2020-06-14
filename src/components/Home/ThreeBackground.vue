<template>
  <div ref="container" class="three-background"></div>
</template>

<script>
import HomeThree from "@/classes/HomeClasses/HomeThree";
import ModelLoader from "@/classes/HomeClasses/ModelLoader";
import LoadingController from "@/classes/HomeClasses/LoadingController";

export default {
  name: "ThreeBackground",
  data() {
    return {};
  },
  mounted() {
    LoadingController.addOnLoad("homeOnLoad", () => {
      HomeThree.start(this.$refs.container);
    });
    ModelLoader.start(this.$refs.container);
  },
  components: {},
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .three-background {
   width: 100vw;
   height: 100vh;
   position: absolute;
   top: 0;
   left: 0;
 }
</style>