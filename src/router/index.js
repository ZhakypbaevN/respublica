import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Home from '../views/Home.vue'
import NotFound from '../views/404NotFound.vue'

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // ------------- UI Landing Pages ---------------
  {
    path: '/',
    name: 'Home',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash }
    } else if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
