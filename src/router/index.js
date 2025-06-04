import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const routes = [
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  if (to.meta.requiresAuth && !user.value) {
    next('/auth')
  } else {
    next()
  }
})

export default router
