<template>
  <div v-on:touchmove="onTouchMove" class="overlay-ui">
    <div class="head">
      <img src="ui/grey/grey-logo.svg" class="grey-logo" alt />
      <img src="ui/grey/grey-empty-screen.svg" class="grey-empty-screen" alt />
    </div>
    <div class="body">
      <div class="sliderContainer hide">
          <div class="slider">
            <div ref="ball" class="ball"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { TweenLite } from 'gsap/gsap-core';
import SocketServer from '../../SocketServer'

const map = (value, in_min, in_max, out_min, out_max) => (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
const clamp = (num, min, max) => Math.max(Math.min(num, Math.max(min, max)), Math.min(min, max));
let hasSlidUp = false;

export default {
  name: "OverlayUI",

  mounted() {
    const onReadyToSwipe = (message) => {
      const slider = document.querySelector('.overlay-ui .sliderContainer')
      slider.classList.remove("hide");
      slider.classList.add("show")
    }
    window.EM.on('readyToSwipe', onReadyToSwipe)
  },
  methods: {
    onTouchMove: e=>{
      const touchY = e.changedTouches[0].clientY
      const mappedY = map(touchY, 0, window.innerHeight, 60, 13)
      const clampedY = clamp(mappedY, 13, 60)
      const ball = document.querySelector('.overlay-ui .ball')
      const slider = document.querySelector('.overlay-ui .sliderContainer')

      if(clampedY < 60 && !hasSlidUp){
        TweenLite.to(ball, 0.5, {
          bottom: clampedY+"%",
        })
      }else if(slider.classList.contains("show")){
        hasSlidUp = true;
        slider.classList.remove("show");
        slider.classList.add("hide")
        window.EM.emit("hasSlidUp")
        SocketServer.sendToServer("hasSlidUp", "true")
      }
    },
  },
  destroyed() {}
};
</script>
<style lang="stylus" scoped>
.overlay-ui {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 13vh 1fr;
  height: 100vh;

  .head {
    padding: 32px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .grey-logo, .grey-empty-screen {
      height: 30px;
    }
  }

  .body{
    display: flex;
    justify-content: center;

    .sliderContainer{
      width: 50px;
      height: 100%;
      transition: all 1.5s ease-in-out;

      &.show{
        opacity: 1;
        visibility: visible;
      }

      &.hide{
        opacity: 0;
        visibility: hidden;
      }
     
      .slider {
        position: relative;
        width: 100%;
        height: 100%;
        background: none;
        outline: none;
        
        .ball {
          position: absolute;
          bottom: 13%;
          width: 50px;
          height: 50px;
          background: #fff;
          cursor: pointer;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>