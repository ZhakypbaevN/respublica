import { createRouter, createWebHistory } from 'vue-router'

// -------------  Pages ---------------
import Authorization from '../views/Authorization.vue'
import NotFound from '../views/404NotFound.vue'
import PageInDevelopment from '../views/InDevelopment.vue'

import Home from '../views/uiLanding/Home.vue'
import Feedback from '../views/uiLanding/Feedback.vue'
import AboutParty from '../views/uiLanding/AboutParty.vue'
import News from '../views/uiLanding/News.vue'
import Contacts from '../views/uiLanding/Contacts.vue'
import PartyFraction from '../views/uiLanding/PartyFraction.vue'

// Deputies
import DeputiesOfMajilis from '../views/uiLanding/deputies/DeputiesOfMajilis.vue';
import DeputiesOfMaslikhat from '../views/uiLanding/deputies/DeputiesOfMaslikhat.vue';

// News
import NewsList from '../views/uiLanding/news/NewsList.vue'
import NewsDetail from '../views/uiLanding/news/NewsDetail.vue'
import AnnounceDetail from '../views/uiLanding/news/AnnounceDetail.vue'
import MeetingWithVoters from '../views/uiLanding/news/MeetingWithVoters.vue'

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
import BusinessAppealList from '../views/uiBusiness/appeal/AppealList.vue'
import BusinessAppealDetail from '../views/uiBusiness/appeal/AppealDetail.vue'



// ------------------ UI Manager ------------------
import ManagerPartyDataList from '../views/uiManager/party/PartyDataList.vue'
import ManagerPartyData from '../views/uiManager/party/PartyData.vue'

import ManagerPartyResignationList from '../views/uiManager/party-resignation/PartyResignationList.vue'
import ManagerPartyResignationData from '../views/uiManager/party-resignation/PartyResignationData.vue'

import TicketNumList from '../views/uiManager/TicketNumList.vue'



// ------------------ UI Client ------------------
import MyRequests from '../views/uiClient/requests/MyRequests.vue'
import MyRequestDetail from '../views/uiClient/requests/MyRequestDetail.vue'

import UserData from '../views/uiClient/UserData.vue'
import ExitParty from '../views/uiClient/ExitParty.vue'



// ------------------ UI Media ------------------
import MediaNewsList from '../views/uiMedia/news/NewsList.vue'
import MediaNewsEdit from '../views/uiMedia/news/NewsEdit.vue'

import MediaNewsForFractionList from '../views/uiMedia/news-for-faction/NewsFactionList.vue'
import MediaNewsForFractionEdit from '../views/uiMedia/news-for-faction/NewsFactionEdit.vue'

import MediaPressAboutUsList from '../views/uiMedia/press-about-us/PressAboutUsList.vue'
import MediaPressAboutUsEdit from '../views/uiMedia/press-about-us/PressAboutUsEdit.vue'

import MediaVideoGalleryList from '../views/uiMedia/video-gallery/VideoGalleryList.vue'
import MediaVideoGalleryEdit from '../views/uiMedia/video-gallery/VideoGalleryEdit.vue'

import MediaPhotoGalleryList from '../views/uiMedia/PhotoGalleryList.vue'

import MediaAnnouncementsList from '../views/uiMedia/announcements/AnnouncementsList.vue'
import MediaAnnouncementsEdit from '../views/uiMedia/announcements/AnnouncementsEdit.vue'


// Layouts
const MainLayoutBusiness = () => import('../components/uiBusiness/layouts/mainLayoutBusiness.vue')
const MainLayoutClient = () => import('../components/uiClient/layouts/mainLayoutClient.vue')
const MainLayoutManager = () => import('../components/uiManager/layouts/mainLayoutManager.vue')
const MainLayoutMedia = () => import('../components/uiMedia/layouts/mainLayoutMedia.vue')

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  { path: '/page-in-development', name: 'PageInDevelopment', component: PageInDevelopment },
  // ------------- UI Landing Pages ---------------
  {
    path: '/auth/:logOrReg?',
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
    path: '/announce/:announce_id',
    name: 'AnnounceDetail',
    component: AnnounceDetail,
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
    path: '/contacts/:centralOfficeOrBranches?',
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
  {
    path: '/deputies-of-maslikhat',
    name: 'DeputiesOfMaslikhat',
    component: DeputiesOfMaslikhat
  },
  {
    path: '/meeting-with-voters/:meetingWithVoters_id',
    name: 'MeetingWithVoters',
    component: MeetingWithVoters
  },


  // UI Client
  {
    path: '/client',
    name: 'Client',
    component: MainLayoutClient,
    meta: { title: 'client', requiresAuth: true },
    redirect: to => {
      return '/client/user-data'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'ClientNotFound', component: NotFound },
      { path: '/page-in-development', name: 'ClientPageInDevelopment', component: PageInDevelopment },
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
        path: 'user-data',
        name: 'UserData',
        component: UserData,
      },
      {
        path: 'party-data/exit-party',
        name: 'ExitParty',
        component: ExitParty
      },
    ]
  },

  // UI Business
  {
    path: '/business',
    name: 'Business',
    component: MainLayoutBusiness,
    meta: { title: 'business', requiresAuth: true },
    redirect: to => {
      return '/business/appeal-list/new'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'BusinessNotFound', component: NotFound },
      { path: '/page-in-development', name: 'BusinessPageInDevelopment', component: PageInDevelopment },
      {
        path: 'appeal-list/:filter',
        name: 'BusinessAppealList',
        component: BusinessAppealList
      },
      {
        path: 'appeal-data/:appeal_id',
        name: 'BusinessAppealDetail',
        component: BusinessAppealDetail
      },
      {
        path: 'analytics',
        name: 'BusinessAnalytics',
        component: PageInDevelopment
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
      return '/manager/party-list/active'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'ManagerNotFound', component: NotFound },
      { path: '/page-in-development', name: 'ManagerPageInDevelopment', component: PageInDevelopment },
      {
        path: 'party-list/:filter',
        name: 'ManagerPartyDataList',
        component: ManagerPartyDataList
      },
      {
        path: 'party-data/:party_id',
        name: 'ManagerPartyData',
        component: ManagerPartyData
      },

      {
        path: 'party-resignation-list',
        name: 'ManagerPartyResignationList',
        component: ManagerPartyResignationList
      },
      {
        path: 'party-resignation-data/:party_id',
        name: 'ManagerPartyResignationData',
        component: ManagerPartyResignationData
      },

      {
        path: 'ticket-num-data-list',
        name: 'TicketNumList',
        component: TicketNumList
      }
    ]
  },


  // UI Media
  {
    path: '/media',
    name: 'Media',
    component: MainLayoutMedia,
    meta: { title: 'media', requiresAuth: true },
    redirect: to => {
      return '/media/news-list'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'MediaNotFound', component: NotFound },
      { path: '/page-in-development', name: 'MediaPageInDevelopment', component: PageInDevelopment },
      {
        path: 'news-list',
        name: 'MediaNewsList',
        component: MediaNewsList,
      },
      {
        path: 'news-list/create',
        name: 'MediaNewsCreate',
        component: MediaNewsEdit
      },
      {
        path: 'news-list/:news_id',
        name: 'MediaNewsEdit',
        component: MediaNewsEdit
      },

      {
        path: 'news-for-fraction',
        name: 'MediaNewsForFractionList',
        component: MediaNewsForFractionList,
      },
      {
        path: 'news-for-fraction/create',
        name: 'MediaNewsForFractionCreate',
        component: MediaNewsForFractionEdit
      },
      {
        path: 'news-for-fraction/:news_id',
        name: 'MediaNewsForFractionEdit',
        component: MediaNewsForFractionEdit
      },
      
      {
        path: 'press-about-us',
        name: 'MediaPressAboutUsList',
        component: MediaPressAboutUsList,
      },
      {
        path: 'press-about-us/create',
        name: 'MediaPressAboutUsCreate',
        component: MediaPressAboutUsEdit
      },
      {
        path: 'press-about-us/:news_id',
        name: 'MediaPressAboutUsEdit',
        component: MediaPressAboutUsEdit
      },
      
      {
        path: 'video-gallery',
        name: 'MediaVideoGalleryList',
        component: MediaVideoGalleryList,
      },
      {
        path: 'video-gallery/create',
        name: 'MediaVideoGalleryCreate',
        component: MediaVideoGalleryEdit
      },
      {
        path: 'video-gallery/:video_id',
        name: 'MediaVideoGalleryEdit',
        component: MediaVideoGalleryEdit
      },
      
      {
        path: 'photo-gallery',
        name: 'MediaPhotoGalleryList',
        component: MediaPhotoGalleryList,
      },

      {
        path: 'announcements',
        name: 'MediaAnnouncementsList',
        component: MediaAnnouncementsList,
      },
      {
        path: 'announcements/create',
        name: 'MediaAnnouncementsCreate',
        component: MediaAnnouncementsEdit
      },
      {
        path: 'announcements/:news_id',
        name: 'MediaAnnouncementsEdit',
        component: MediaAnnouncementsEdit
      },
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
