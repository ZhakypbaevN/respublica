import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Authorization from '../views/Authorization.vue'
import NotFound from '../views/404NotFound.vue'

import Home from '../views/uiLanding/Home.vue'
import Feedback from '../views/uiLanding/Feedback.vue'
import AboutParty from '../views/uiLanding/AboutParty.vue'
import News from '../views/uiLanding/News.vue'
import Contacts from '../views/uiLanding/Contacts.vue'
import PartyFraction from '../views/uiLanding/PartyFraction.vue'
import DeputiesOfMajilis from '../views/uiLanding/DeputiesOfMajilis.vue';


// News
import NewsList from '../views/uiLanding/news/NewsList.vue'
import NewsDetail from '../views/uiLanding/news/NewsDetail.vue'

// Press About Us
import PressAboutUsList from '../views/uiLanding/news/PressAboutUsList.vue'
import PressAboutUsDetail from '../views/uiLanding/news/PressAboutUsDetail.vue'

// Gallery
import VideoGallery from '../views/uiLanding/gallery/VideoGallery.vue'
import PhotoGalleryAll from '../views/uiLanding/gallery/PhotoGalleryAll.vue'

import Faq from '../views/uiLanding/Faq.vue'
import Donations from '../views/uiLanding/Donations.vue'


// ------------------ UI Bussiness ------------------
import MainDB from '../views/uiBusiness/Main.vue'

// ------------------ UI Manager ------------------
import PartyDataList from '../views/uiManager/party/PartyDataList.vue'
import ManagerPartyData from '../views/uiManager/party/PartyData.vue'


// ------------------ UI Client ------------------
import MyRequests from '../views/uiClient/requests/MyRequests.vue'
import MyRequestDetail from '../views/uiClient/requests/MyRequestDetail.vue'

import PartyData from '../views/uiClient/party/PartyData.vue'
import ExitParty from '../views/uiClient/party/ExitParty.vue'

// Layouts
const MainLayoutClient = () => import('../components/uiClient/layouts/mainLayoutClient.vue')
const MainLayoutManager = () => import('../components/uiManager/layouts/mainLayoutManager.vue')

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
  {
    path: '/deputies-of-majilis',
    name: 'DeputiesOfMajilis',
    component: DeputiesOfMajilis
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
        path: 'party-data',
        name: 'PartyData',
        component: PartyData,
      },
      {
        path: 'party-data/exit-party',
        name: 'ExitParty',
        component: ExitParty
      },
    ]
  },


  // UI Manager
  {
    path: '/manager',
    name: 'Manager',
    component: MainLayoutManager,
    meta: { title: 'manager', requiresAuth: true },
    redirect: to => {
      return '/manager/party-list/confirm'
    },
    children: [
      {
        path: 'requests',
        name: 'Requests',
        component: MyRequests
      },
      {
        path: 'party-list/:filter',
        name: 'PartyDataList',
        component: PartyDataList
      },
      {
        path: 'party-data/:party_id',
        name: 'ManagerPartyData',
        component: ManagerPartyData
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
