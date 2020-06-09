<template>
  <div class="home-page">
    <Header />
    <ThreeBackground />
    <Title />
    <!-- <TheStory /> -->
  </div>
</template>

<script>
import Title from "@/components/Home/Title";
import ThreeBackground from "@/components/Home/ThreeBackground";
import Header from "@/components/Home/Header";
import TheStory from "@/components/Home/TheStory";
import ScrollController from "@/classes/HomeClasses/ScrollController";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Title,
    ThreeBackground,
    Header,
    TheStory
  },
  created() {
    ScrollController.init();
  },
  mounted() {
    window.EM.on("tScroll", this.onTScroll);
  },
  methods: {
    onTScroll: function() {}
  }
};
</script>
 <style lang="stylus" scoped>
 .home-page {
 }
</style>