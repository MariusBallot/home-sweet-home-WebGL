<template>
  <div v-on:touchmove="onTouchMove" class="overlay-ui grey">
    <div class="head">
      <div class="left">
        <img src="ui/grey/grey-logo.svg" class="logo grey-logo" alt="ui-logo" />
      </div>
      <div class="right">
        <span class="text hide"></span>
        <img src="ui/grey/grey-empty-screen.svg" class="screen grey-empty-screen" alt="ui-screen" />
        <img src="ui/grey/grey-filled-screen.svg" class="screen grey-filled-screen hide" alt="ui-screen" />
      </div>
    </div>
    <div class="body">
      <div class="sliderContainer hide">
          <div class="slider">
            <div ref="ball" class="ball"></div>
          </div>
      </div>
      <div class="creditsContainer hide">
          <div class="post">
            <img src="ui/credits/compressed/1_SOUND_DESIGN.jpg" alt="credits 1" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/2_ENVIRONMENT_DESIGN_.jpg" alt="credits 2" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/3_ANIMATION_CHARACTER_DESIGN.jpg" alt="credits 3" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/4_ARTISTIC_DIRECTION.jpg" alt="credits 4" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/5_CREATIVE_DEVELOPER.jpg" alt="credits 5" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/6_CREATIVE_DEVELOPER.jpg" alt="credits 6" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/7_SPECIAL_THANKS.jpg" alt="credits 7" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/8_INSPIRED_BY.jpg" alt="credits 8" />
          </div>
          <div class="post">
            <img src="ui/credits/compressed/9_GOBELINS.jpg" alt="credits 9" />
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
    const slider = document.querySelector('.overlay-ui .sliderContainer')
    const ui = document.querySelector('.overlay-ui')
    const credits = document.querySelector('.overlay-ui .creditsContainer')
    const text = document.querySelector('.overlay-ui .head .right .text')
    const greyFilledScreen = document.querySelector('.overlay-ui .grey-filled-screen')
    const greyEmptyScreen = document.querySelector('.overlay-ui .grey-empty-screen')

    const onReadyToSwipe = (message) => {
      slider.classList.remove("hide");
      slider.classList.add("show")
    }
    const onEnd = (message) => {
      ui.classList.add('bg-black')
    }
    const onShowCredits = (message) => {
      ui.classList.add('bg-white')

      ui.addEventListener("transitionend", ()=>{
        window.EM.emit("toggleMessage", {text: "His memories", mode: "fill"})        
        credits.classList.remove("hide");
        credits.classList.add("show")
      })
    }
    const onRemoveDisplayNoneSlider = (message) => {
      console.log("hi")
      slider.classList.remove("d-none");
    }
    const onRemoveDisplayNoneCredits = (message) => {
      credits.classList.remove("d-none");
    }
    const onToggleMessage = (message) => {
      text.innerHTML = message.text;
      if(message.mode === "fill"){
        text.classList.remove("hide")
        text.classList.add("show")

        greyEmptyScreen.classList.remove("show")
        greyEmptyScreen.classList.add("hide")

        greyFilledScreen.classList.remove("hide")
        greyFilledScreen.classList.add("show")
      }
      else if(message.mode === "empty"){
        text.classList.remove("show")
        text.classList.add("hide")

        greyFilledScreen.classList.remove("show")
        greyFilledScreen.classList.add("hide")

        greyEmptyScreen.classList.remove("hide")
        greyEmptyScreen.classList.add("show")
      }
    }

    window.EM.on('readyToSwipe', onReadyToSwipe)
    window.EM.on('end', onEnd)
    window.EM.on('removeDisplayNoneSlider', onRemoveDisplayNoneSlider)
    window.EM.on('removeDisplayNoneCredits', onRemoveDisplayNoneCredits)
    window.EM.on('toggleMessage', onToggleMessage)
    window.EM.on('showCredits', onShowCredits)

  },
  methods: {
    onTouchMove: e=>{
      const touchY = e.changedTouches[0].clientY
      const mappedY = map(touchY, 0, window.innerHeight * 0.6, 60, 13)
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

  &.grey{
    .text{
      color: #505050;
    }
  }

  &.bg-white{
    transition: all 4.3s ease-in-out;
    background: #fff!important;
  }

  &.bg-black{
    background: #000;
  }

  .head {
    padding: 37px 30px;    
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right{
      display: flex;
      align-content: center;

      .screen{
        transition: opacity 1.5s ease-in-out;
        &.show{
          opacity: 1;
          visibility: visible;
        }

        &.hide{
          opacity: 0;
          visibility: hidden;
          height: 0;
        }
      }
      
      .text {
        margin-right: 14px;
        font-size: 1.05rem;
        margin-top: 3px;
        transition: opacity 1.5s ease-in-out;

        &.show{
          opacity: 1;
          visibility: visible;
        }

        &.hide{
          opacity: 0;
          visibility: hidden;
        }
      }
    }

    .left{
      display: flex;
      align-content: center;
    }

    .logo, .screen {
      height: 30px;
    }
  }

  .body{
    width: 100vw;
    display: flex;
    justify-content: center;

    .sliderContainer{
      width: 50px;
      height: 100%;
      transition: opacity 1.5s ease-in-out;

      &.show{
        opacity: 1;
        visibility: visible;
        width: 100vw;
      }

      &.hide{
        opacity: 0;
        visibility: hidden;
        height: 0;
        width: 0;
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
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }

    .creditsContainer{
      width: 100vw;
      transition: opacity 1.7s ease-in-out;
      background: #EAEBEE;

      &.show{
        opacity: 1;
        visibility: visible;
      }

      &.hide{
        opacity: 0;
        visibility: hidden;
        height: 0;
        width: 0;
      }

      .post{
        width: 100%;

        img{
          width: 100%;
        }
      }
    }
  }
}
</style>