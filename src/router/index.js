import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Order from '../views/Order.vue'
import Pickup from '../views/Pickup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    // meta: {
    //   hideNavbar: true,
    // },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/orders',
    name: 'Order',
    component: Order
  },
  {
    path: '/pickup',
    name: 'Pickup',
    component: Pickup
  }
]

const router = new VueRouter({
  routes
})

export default router
