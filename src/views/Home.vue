<template>
  <div class="home-page">
    <ThreeBackground />
    <Title />
  </div>
</template>

<script>
import Title from "@/components/Home/Title";
import ThreeBackground from "@/components/Home/ThreeBackground";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Title,
    ThreeBackground
  },
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .home-page {
 }
</style>