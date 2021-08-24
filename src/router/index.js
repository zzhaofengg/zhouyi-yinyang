import Vue from 'vue'
import VueRouter from 'vue-router'
import Divination from '../components/Divination.vue'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'Divination',
  component: Divination
}]

const router = new VueRouter({
  routes
})


export default router
