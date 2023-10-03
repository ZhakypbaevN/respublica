import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Authorization from '../views/Authorization.vue'
import NotFound from '../views/404NotFound.vue'

import Home from '../views/uiLanding/Home.vue'
import Feedback from '../views/uiLanding/Feedback.vue'
import News from '../views/uiLanding/News.vue'
import AboutParty from '../views/uiLanding/AboutParty.vue'
import NewsAll from '../views/uiLanding/NewsAll.vue'
import NewsInFull from '../views/uiLanding/NewsInFull.vue'
import PressAll from '../views/uiLanding/PressAll.vue'
import PressInFull from '../views/uiLanding/PressInFull.vue'
import VideoGallery from '../views/uiLanding/VideoGallery.vue'
import PhotoGalleryAll from '../views/uiLanding/PhotoGalleryAll.vue'
import Contacts from '../views/uiLanding/Contacts.vue'
import ContactsBranch from '../views/uiLanding/ContactsBranch.vue'
import PartyFraction from '../views/uiLanding/PartyFraction.vue'
import Faq from '../views/uiLanding/Faq.vue'
import Donations from '../views/uiLanding/Donations.vue'

import MainDB from '../views/uiBusiness/Main.vue'

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // ------------- UI Landing Pages ---------------
  {
    path: '/auth',
    name: 'Authorization',
    component: Authorization,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about-party',
    name: 'AboutParty',
    component: AboutParty,
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/news-all',
    name: 'NewsAll',
    component: NewsAll,
  },
  {
    path: '/news/:news_id',
    name: 'NewsInFull',
    component: NewsInFull,
  },
  {
    path: '/press-all',
    name: 'PressAll',
    component: PressAll,
  },
  {
    path: '/press-in-full',
    name: 'PressInFull',
    component: PressInFull,
  },
  {
    path: '/video-gallery',
    name: 'VideoGallery',
    component: VideoGallery,
  },
  {
    path: '/photo-gallery',
    name: 'PhotoGalleryAll',
    component: PhotoGalleryAll,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
  {
    path: '/branch-contacts',
    name: 'ContactsBranch',
    component: ContactsBranch,
  },
  {
    path: '/party-fraction',
    name: 'PartyFraction',
    component: PartyFraction,
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq,
  },
  
  {
    path: '/donations',
    name: 'Donations',
    component: Donations,
  },
  {
    path: '/main-db',
    name: 'MainDB',
    component: MainDB,
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
