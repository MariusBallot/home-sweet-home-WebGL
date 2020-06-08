<template>
  <div class="home-page">
    <Title />
    <router-link to="connection">connection page</router-link>
  </div>
</template>

<script>
import Title from "@/components/Home/Title";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Title
  },
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .home-page {
 }
</style>