import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import InGame from '../views/InGame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inGame',
    name: 'InGame',
    component: InGame
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
