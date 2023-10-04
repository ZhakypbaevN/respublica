import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Authorization from '../views/Authorization.vue'
import NotFound from '../views/404NotFound.vue'

import Home from '../views/uiLanding/Home.vue'
import Feedback from '../views/uiLanding/Feedback.vue'
import AboutParty from '../views/uiLanding/AboutParty.vue'
import News from '../views/uiLanding/News.vue'
import PartyFraction from '../views/uiLanding/PartyFraction.vue'

// News
import NewsList from '../views/uiLanding/news/NewsList.vue'
import NewsDetail from '../views/uiLanding/news/NewsDetail.vue'

// Press About Us
import PressAboutUsList from '../views/uiLanding/news/PressAboutUsList.vue'
import PressAboutUsDetail from '../views/uiLanding/news/PressAboutUsDetail.vue'

// Contacts
import Contacts from '../views/uiLanding/contacts/Contacts.vue'
import ContactsBranch from '../views/uiLanding/contacts/ContactsBranch.vue'

// Gallery
import VideoGallery from '../views/uiLanding/gallery/VideoGallery.vue'
import PhotoGalleryAll from '../views/uiLanding/gallery/PhotoGalleryAll.vue'

import Faq from '../views/uiLanding/Faq.vue'
import Donations from '../views/uiLanding/Donations.vue'


// UI Bussiness
import MainDB from '../views/uiBusiness/Main.vue'

// UI Client
import MyRequests from '../views/uiClient/requests/MyRequests.vue'
import MyRequestDetail from '../views/uiClient/requests/MyRequestDetail.vue'

import ExitParty from '../views/uiClient/ExitParty.vue'

// Layouts
const MainLayoutClient = () => import('../components/uiClient/layouts/MainLayoutClient.vue')
const MainLayoutManager = () => import('../components/uiManager/layouts/MainLayoutManager.vue')

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
    name: 'NewsList',
    component: NewsList,
  },
  {
    path: '/news/:news_id',
    name: 'NewsDetail',
    component: NewsDetail,
  },
  {
    path: '/press-about-us-list',
    name: 'PressAboutUsList',
    component: PressAboutUsList,
  },
  {
    path: '/press-in-full',
    name: 'PressAboutUsDetail',
    component: PressAboutUsDetail,
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
  },


  // UI Client
  {
    path: '/client',
    name: 'Client',
    component: MainLayoutClient,
    meta: { title: 'client', requiresAuth: true },
    redirect: to => {
      return '/client/my-requests'
    },
    children: [
      {
        path: 'my-requests',
        name: 'MyRequests',
        component: MyRequests,
      },
      {
        path: 'my-requests/:request_id',
        name: 'MyRequestDetail',
        component: MyRequestDetail
      },
      {
        path: 'exit-party',
        name: 'ExitParty',
        component: ExitParty
      }
    ]
  },


  // UI Manager
  {
    path: '/manager',
    name: 'Manager',
    component: MainLayoutManager,
    meta: { title: 'manager', requiresAuth: true },
    redirect: to => {
      return '/requests'
    },
    children: [
      {
        path: '/requests',
        name: 'Requests',
        component: MyRequests
      }
    ]
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
