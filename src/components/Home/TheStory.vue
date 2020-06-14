<template>
  <div ref="container" class="the-story">
    <div class="right">
      <div class="title animate">
        <h2>The</h2>
        <h2 class="story">Story</h2>
      </div>
      <h3 class="animate">Discover all the story</h3>
      <div class="nav animate">
        <span>1/2</span>
        <img v-on:click="onClickRight" src="ui/arrowRight.svg" alt />
      </div>
    </div>
    <div ref="right2" class="right2">
      <p>
        This experience deals with the lonelyness.
        It’s the story of a lonely person, living in a lonely part of the world and sharing his life with his only friend :
        The Internet.
      </p>
      <p>This experience will show you two different point of view. On the one hand an objective view showing his real life, and on the other hand a subjectif vision of the world created by his relationship with the internet.</p>
      <div class="nav">
        <span>2/2</span>
        <img v-on:click="onClickLeft" src="ui/arrowLeft.svg" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Scene1 from "@/classes/HomeClasses/SceneClasses/Scene1";

export default {
  name: "TheStory",
  data() {
    return {
      animates: null,
      ind: null,
      isActive: null
    };
  },
  mounted() {
    this.animates = document.querySelectorAll(".the-story .animate");
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
      if (this.ind == 1) {
        this.enter();
      } else if (this.isActive) {
        this.isActive = false;
        this.leave();
      }
    },
    enter: function() {
      this.animates.forEach(el => {
        this.isActive = true;
        el.classList.add("on-up");
      });
    },
    leave: function() {
      this.animates.forEach(el => {
        el.classList.remove("on-up");
        this.$refs.right2.classList.remove("on-up");
      });
    },

    onClickRight: function() {
      Scene1.inFace();
      this.animates.forEach(el => {
        el.classList.remove("on-up");
      });
      this.$refs.right2.classList.add("on-up");
    },
    onClickLeft: function() {
      Scene1.outFace();
      this.animates.forEach(el => {
        el.classList.add("on-up");
      });
      this.$refs.right2.classList.remove("on-up");
    }
  }
};
</script>
 <style lang="stylus" scoped>
 .the-story {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   color: white;

   .right {
     width: 40%;
     height: 100%;
     position: absolute;
     top: 0;
     right: 0;
     display: flex;
     flex-direction: column;
     justify-content: center;

     .title {
       off(0s);

       &.on-up {
         transform: translate3d(0, 0, 0);
         opacity: 1;
       }
     }

     h2 {
       font-size: 9em;

       &.story {
         margin-top: -70px;
       }
     }

     h3 {
       font-size: 1.3em;
       margin-bottom: 30px;
       off(0.1s);

       &.on-up {
         transform: translate3d(0, 0, 0);
         opacity: 1;
       }
     }

     .nav {
       width: 60%;
       display: flex;
       justify-content: space-between;

       img {
         &:hover {
           cursor: pointer;
         }
       }

       off(0.2s);

       &.on-up {
         transform: translate3d(0, 0, 0);
         opacity: 1;
         pointer-events: all;
       }
     }
   }

   .right2 {
     width: 40%;
     height: 100%;
     position: absolute;
     top: 0;
     right: 0;
     display: flex;
     flex-direction: column;
     justify-content: center;
     transition: all 0.5s;
     transform: translate3d(-10px, 0, 0);
     opacity: 0;
     pointer-events: none;

     &.on-up {
       transform: translate3d(0, 0, 0);
       opacity: 1;
       pointer-events: all;
     }

     p {
       width: 70%;
       margin-top: 20px;
       font-weight: bold;
       font-size: 1.5em;
       line-height: 25px;
     }

     .nav {
       width: 60%;
       display: flex;
       justify-content: space-between;
       margin-top: 50px;

       img {
         &:hover {
           cursor: pointer;
         }
       }
     }
   }
 }
</style>