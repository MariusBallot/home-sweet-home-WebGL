import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection.vue'
import InGame from '../views/InGame.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connection',
    name: 'Connection',
    component: Connection
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
