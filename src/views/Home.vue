<template>
  <div class="home-page">
    <Loader />
    <Header />
    <ThreeBackground />
    <Title />
    <TheStory />
    <Trailer />
  </div>
</template>

<script>
import ScrollController from "@/classes/HomeClasses/ScrollController";

import Loader from "@/components/Home/Loader";
import ThreeBackground from "@/components/Home/ThreeBackground";
import Header from "@/components/Home/Header";
import Title from "@/components/Home/Title";
import TheStory from "@/components/Home/TheStory";
import Trailer from "@/components/Home/Trailer";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Title,
    ThreeBackground,
    Header,
    TheStory,
    Loader,
    Trailer
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