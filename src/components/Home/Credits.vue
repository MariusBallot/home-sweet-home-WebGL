<template>
  <div ref="container" class="creadits animate">
    <div class="content">
      <h2>Credits</h2>
      <div class="names">
        <ul>
          <li>
            <span class="left">Sound Design</span>
            <span class="right">Ouri Levin</span>
          </li>
          <li>
            <span class="left">Environment Design</span>
            <span class="right">Luc Miramont</span>
          </li>
          <li>
            <span class="left">Animation / Character Design</span>
            <span class="right">Ouri Levin</span>
          </li>
          <li>
            <span class="left">Artistic Direction</span>
            <span class="right">Luc Miramont</span>
          </li>
          <li>
            <span class="left">Creative Development</span>
            <span class="right">Michael De Laborde</span>
          </li>
          <li>
            <span class="left">Creative Development</span>
            <span class="right">Marius Ballot</span>
          </li>
          <li>
            <span class="left">Project inspiration</span>
            <span class="right">
              « The Man Who Married a Robot / Love Theme »
              By The 1975
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Credits",
  data() {
    return {};
  },
  mounted() {
    let animates = document.querySelectorAll(
      ".creadits .animate,.creadits.animate"
    );
    let isActive = false;

    window.EM.on("inCredits", () => {
      animates.forEach(el => {
        el.classList.add("on-up");
      });
    });
    window.EM.on("outCredits", () => {
      animates.forEach(el => {
        el.classList.remove("on-up");
      });
    });
  },
  components: {},
  created() {},
  methods: {}
};
</script>
 <style lang="stylus" scoped>
 .creadits {
   width: 100%;
   height: 90%;
   position: absolute;
   top: 0;
   left: 0;
   color: white;
   font-weight: bold;
   off(0.2s);

   &.on-up {
     transform: translate3d(0, 0, 0);
     opacity: 1;
   }

   .content {
     width: 70%;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;

     h2 {
       font-size: 6em;
     }

     .names {
       display: flex;
       justify-content: space-between;
       font-size: 1.5em;
       width: 60%;

       ul {
         list-style-type: none;
         width: 100%;

         li {
           width: 100%;
           display: flex;
           justify-content: space-between;
           margin-top: 10px;

           .left {
             text-align: right;
           }

           span {
             width: 48%;
           }
         }
       }
     }
   }
 }
</style>