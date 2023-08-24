import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Authorization from '../views/Authorization.vue'
import NotFound from '../views/404NotFound.vue'

import Home from '../views/uiLanding/Home.vue'
import News from '../views/uiLanding/News.vue'

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // ------------- UI Landing Pages ---------------
  {
    path: '/auth',
    name: 'Authorizationx',
    component: Authorization,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
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
