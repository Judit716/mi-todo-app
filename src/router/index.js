import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/', name: 'Dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
