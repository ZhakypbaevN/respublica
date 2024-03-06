import { createRouter, createWebHistory } from 'vue-router'

import { languages, defaultLocale } from '@/assets/lang/exports'
import i18n from '@/assets/lang'

import { useAuth } from '@/modules/auth'
import Progress from '@/modules/progress'

// -------------  Pages ---------------
import Authorization from '@/views/Authorization.vue'
import NotFound from '@/views/404NotFound.vue'
import PageInDevelopment from '@/views/InDevelopment.vue'
import PageInDevelopmentWithoutLayout from '@/views/InDevelopmentWithoutLayout.vue'

import Home from '@/views/uiLanding/Home.vue'
import Home2 from '@/views/uiLanding/Home2.vue'
import Feedback from '@/views/uiLanding/Feedback.vue'
import AboutParty from '@/views/uiLanding/AboutParty.vue'
import Contacts from '@/views/uiLanding/Contacts.vue'
import PartyFraction from '@/views/uiLanding/PartyFraction.vue'
import MeetingWithVoters from '@/views/uiLanding/MeetingWithVoters.vue'
import Marketplace from '@/views/uiLanding/Marketplace.vue'

// Deputies
import DeputiesOfMajilis from '@/views/uiLanding/deputies/DeputiesOfMajilis.vue';
import DeputiesOfMaslikhat from '@/views/uiLanding/deputies/DeputiesOfMaslikhat.vue';

// Press Center - News
import PressCenter from '@/views/uiLanding/press-center/PressCenter.vue'
import NewsList from '@/views/uiLanding/press-center/news/NewsList.vue'
import NewsDetail from '@/views/uiLanding/press-center/news/NewsDetail.vue'
import PressAboutUsList from '@/views/uiLanding/press-center/news/PressAboutUsList.vue'

// Press Center - Announcements
import AnnouncementDetail from '@/views/uiLanding/press-center/announcements/AnnouncementDetail.vue'
import AnnouncementsList from '@/views/uiLanding/press-center/announcements/AnnouncementsList.vue'

// Press Center - Gallery
import VideoGallery from '@/views/uiLanding/press-center/gallery/VideoGallery.vue'
import PhotoGalleryAll from '@/views/uiLanding/press-center/gallery/PhotoGalleryAll.vue'

import Regions from '@/views/uiLanding/Regions.vue'
import Faq from '@/views/uiLanding/Faq.vue'
import Donations from '@/views/uiLanding/Donations.vue'
import Hackathon from '@/views/uiLanding/Hackathon.vue'


// ------------------ UI Reception ------------------
import ReceptionAppealList from '@/views/uiReception/appeal/AppealList.vue'
import ReceptionAppealDetail from '@/views/uiReception/appeal/AppealDetail.vue'


// ------------------ UI Manager ------------------
import ManagerPartyDataList from '@/views/uiManager/party-members/PartyDataList.vue'
import ManagerPartyData from '@/views/uiManager/party-members/PartyData.vue'

import ManagerPartyResignationList from '@/views/uiManager/party-resignation/PartyResignationList.vue'
import ManagerPartyResignationData from '@/views/uiManager/party-resignation/PartyResignationData.vue'

import TicketNumList from '@/views/uiManager/TicketNumList.vue'
import Analytics from '@/views/uiManager/Analytics.vue'


// ------------------ UI Client ------------------
import MyRequests from '@/views/uiClient/requests/MyRequests.vue'
import MyRequestDetail from '@/views/uiClient/requests/MyRequestDetail.vue'

import UserData from '@/views/uiClient/UserData.vue'
import ExitParty from '@/views/uiClient/ExitParty.vue'
import ClientDonations from '@/views/uiClient/Donations.vue'

// Press Center - News
import ClientPressCenter from '@/views/uiClient/press-center/PressCenter.vue'
import ClientNewsList from '@/views/uiClient/press-center/news/NewsList.vue'
import ClientNewsDetail from '@/views/uiClient/press-center/news/NewsDetail.vue'
import ClientPressAboutUsList from '@/views/uiClient/press-center/news/PressAboutUsList.vue'

// Press Center - Announcements
import ClientAnnouncementDetail from '@/views/uiClient/press-center/announcements/AnnouncementDetail.vue'
import ClientAnnouncementsList from '@/views/uiClient/press-center/announcements/AnnouncementsList.vue'

// Press Center - Gallery
import ClientVideoGallery from '@/views/uiClient/press-center/gallery/VideoGallery.vue'
import ClientPhotoGalleryAll from '@/views/uiClient/press-center/gallery/PhotoGalleryAll.vue'


// ------------------ UI Media ------------------
import MediaNewsList from '@/views/uiMedia/news/NewsList.vue'
import MediaNewsEdit from '@/views/uiMedia/news/NewsEdit.vue'

import MediaNewsForFractionList from '@/views/uiMedia/news-for-fraction/NewsFractionList.vue'
import MediaNewsForFractionEdit from '@/views/uiMedia/news-for-fraction/NewsFractionEdit.vue'

import MediaPressAboutUsList from '@/views/uiMedia/press-about-us/PressAboutUsList.vue'
import MediaPressAboutUsEdit from '@/views/uiMedia/press-about-us/PressAboutUsEdit.vue'

import MediaVideoGalleryList from '@/views/uiMedia/video-gallery/VideoGalleryList.vue'
import MediaVideoGalleryEdit from '@/views/uiMedia/video-gallery/VideoGalleryEdit.vue'

import MediaPhotoGalleryList from '@/views/uiMedia/PhotoGalleryList.vue'

import MediaAnnouncementsList from '@/views/uiMedia/announcements/AnnouncementsList.vue'
import MediaAnnouncementsEdit from '@/views/uiMedia/announcements/AnnouncementsEdit.vue'

// ------------------ UI Client ------------------
import UsersList from '@/views/uiAdmin/UsersList.vue'

// Layouts
const MainLayoutAdmin = () => import('@/components/uiAdmin/layouts/MainLayoutAdmin.vue')
const MainLayoutReception = () => import('@/components/uiReception/layouts/MainLayoutReception.vue')
const MainLayoutClient = () => import('@/components/uiClient/layouts/MainLayoutClient.vue')
const MainLayoutManager = () => import('@/components/uiManager/layouts/MainLayoutManager.vue')
const MainLayoutMedia = () => import('@/components/uiMassMedia/layouts/MainLayoutMedia.vue')

const routes = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: '404' } },
  { path: '/page-in-development', name: 'PageInDevelopment', component: PageInDevelopment },
  // ------------- UI Landing Pages ---------------
  {
    path: '/auth/:logOrReg?',
    name: 'Authorization',
    component: Authorization,
    meta: { title: 'authorization' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'home' }
  },
  {
    path: '/v2',
    name: 'Home2',
    component: Home2,
    meta: { title: 'home' }
  },
  {
    path: '/about-party',
    name: 'AboutParty',
    component: AboutParty,
    meta: { title: 'about-party' }
  },
  {
    path: '/party-fraction',
    name: 'PartyFraction',
    component: PartyFraction,
    meta: { title: 'party-faction' }
  },
  {
    path: '/regions/:region_id?',
    name: 'Regions',
    component: Regions,
    meta: { title: 'regions' }
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq,
    meta: { title: 'question-and-answer' }
  },
  {
    path: '/donations',
    name: 'Donations',
    component: Donations,
    meta: { title: 'donations' }
  },
  {
    path: '/deputies-of-majilis',
    name: 'DeputiesOfMajilis',
    component: DeputiesOfMajilis,
    meta: { title: 'mazhilis-deputies' }
  },
  {
    path: '/deputies-of-maslikhat/:region_id?',
    name: 'DeputiesOfMaslikhat',
    component: DeputiesOfMaslikhat,
    meta: { title: 'maslikhats-deputies' }
  },
  {
    path: '/meeting-with-voters/:meetingWithVoters_id',
    name: 'MeetingWithVoters',
    component: MeetingWithVoters,
    meta: { title: 'meeting-with-voters' }
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace,
    meta: { title: 'marketpalce' }
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: { title: 'feedback' }
  },
  {
    path: '/news',
    name: 'News',
    component: PressCenter,
    meta: { title: 'press-center' }
  },
  {
    path: '/news-all',
    name: 'NewsList',
    component: NewsList,
    meta: { title: 'news' }
  },
  {
    path: '/news/:news_id',
    name: 'NewsDetail',
    component: NewsDetail,
    meta: { title: 'news' }
  },
  {
    path: '/press-about-us-list',
    name: 'PressAboutUsList',
    component: PressAboutUsList,
    meta: { title: 'the-press-about-us' }
  },
  {
    path: '/announce-list',
    name: 'AnnouncesList',
    component: AnnouncementsList,
    meta: { title: 'announcements' }
  },
  {
    path: '/announce/:announce_id',
    name: 'AnnounceDetail',
    component: AnnouncementDetail,
    meta: { title: 'announcements' }
  },
  {
    path: '/video-gallery',
    name: 'VideoGallery',
    component: VideoGallery,
    meta: { title: 'video-gallery' }
  },
  {
    path: '/photo-gallery',
    name: 'PhotoGalleryAll',
    component: PhotoGalleryAll,
    meta: { title: 'photo-gallery' }
  },
  {
    path: '/contacts/:centralOfficeOrBranches?',
    name: 'Contacts',
    component: Contacts,
    meta: { title: 'contacts' }
  },
  {
    path: '/hackathon',
    name: 'Hackathon',
    component: Hackathon,
    meta: { title: 'hackathon' }
  },

  // UI Admin
  {
    path: '/admin',
    name: 'Admin',
    component: MainLayoutAdmin,
    meta: { title: 'admin', requiresAuth: true },
    redirect: to => {
      return '/admin/users?offset=0&limit=20&search='
    },
    children: [
      {
        path: 'users',
        name: 'UsersList',
        component: UsersList,
        meta: { title: 'users' }
      },

      // Manager
      {
        path: 'party-list/:filter',
        name: 'AdminPartyDataList',
        component: ManagerPartyDataList,
        meta: { title: 'party-members' }
      },
      {
        path: 'deleted-party-list/:filter',
        name: 'AdminDeletedPartyDataList',
        component: ManagerPartyDataList,
        meta: { title: 'deleted-party-members' }
      },
      {
        path: 'party-data/:party_id',
        name: 'AdminPartyData',
        component: ManagerPartyData,
        meta: { title: 'party-members-data' }
      },

      {
        path: 'party-resignation-list',
        name: 'AdminPartyResignationList',
        component: ManagerPartyResignationList,
        meta: { title: 'requests-for-deletion' }
      },
      {
        path: 'party-resignation-data/:party_id',
        name: 'AdminPartyResignationData',
        component: ManagerPartyResignationData,
        meta: { title: 'requests-for-deletion-detail' }
      },
      {
        path: 'ticket-num-data-list',
        name: 'AdminTicketNumList',
        component: TicketNumList,
        meta: { title: 'vip-rooms' }
      },
      {
        path: 'analytics',
        name: 'AdminAnalytics',
        component: Analytics,
        meta: { title: 'analytics' }
      },

      // Media
      {
        path: 'news-list',
        name: 'AdminNewsList',
        component: MediaNewsList,
        meta: { title: 'news' }
      },
      {
        path: 'news-list/create',
        name: 'AdminNewsCreate',
        component: MediaNewsEdit,
        meta: { title: 'editing-the-news' }
      },
      {
        path: 'news-list/:news_id',
        name: 'AdminNewsEdit',
        component: MediaNewsEdit,
        meta: { title: 'new-news' }
      },
      {
        path: 'news-for-fraction',
        name: 'AdminNewsForFractionList',
        component: MediaNewsForFractionList,
        meta: { title: 'news-for-the-faction' }
      },
      {
        path: 'news-for-fraction/create',
        name: 'AdminNewsForFractionCreate',
        component: MediaNewsForFractionEdit,
        meta: { title: 'create-news-for-the-faction' }
      },
      {
        path: 'news-for-fraction/:news_id',
        name: 'AdminNewsForFractionEdit',
        component: MediaNewsForFractionEdit,
        meta: { title: 'edit-news-for-the-faction' }
      },
      {
        path: 'press-about-us',
        name: 'AdminPressAboutUsList',
        component: MediaPressAboutUsList,
        meta: { title: 'the-press-about-us' }
      },
      {
        path: 'press-about-us/create',
        name: 'AdminPressAboutUsCreate',
        component: MediaPressAboutUsEdit,
        meta: { title: 'create-press-about-us' }
      },
      {
        path: 'press-about-us/:news_id',
        name: 'AdminPressAboutUsEdit',
        component: MediaPressAboutUsEdit,
        meta: { title: 'edit-press-about-us' }
      },
      {
        path: 'video-gallery',
        name: 'AdminVideoGalleryList',
        component: MediaVideoGalleryList,
        meta: { title: 'video-gallery' }
      },
      {
        path: 'video-gallery/create',
        name: 'AdminVideoGalleryCreate',
        component: MediaVideoGalleryEdit,
        meta: { title: 'create-video' }
      },
      {
        path: 'video-gallery/:news_id',
        name: 'AdminVideoGalleryEdit',
        component: MediaVideoGalleryEdit,
        meta: { title: 'edit-video' }
      },
      
      {
        path: 'photo-gallery',
        name: 'AdminPhotoGalleryList',
        component: MediaPhotoGalleryList,
        meta: { title: 'photo-gallery' }
      },

      {
        path: 'announcements',
        name: 'AdminAnnouncementsList',
        component: MediaAnnouncementsList,
        meta: { title: 'announcements' }
      },
      {
        path: 'announcements/create',
        name: 'AdminAnnouncementsCreate',
        component: MediaAnnouncementsEdit,
        meta: { title: 'create-announcements' }
      },
      {
        path: 'announcements/:news_id',
        name: 'AdminAnnouncementsEdit',
        component: MediaAnnouncementsEdit,
        meta: { title: 'edit-announcements' }
      }
    ]
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
      {
        path: 'make-an-appointment',
        name: 'MakeAnAppointment',
        component: PageInDevelopmentWithoutLayout,
        meta: { title: 'make-an-appointment' }
      },
      {
        path: 'my-requests',
        name: 'MyRequests',
        component: PageInDevelopmentWithoutLayout,
        // component: MyRequests,
        meta: { title: 'my-appeals' }
      },
      {
        path: 'my-requests/:request_id',
        name: 'MyRequestDetail',
        component: MyRequestDetail,
        meta: { title: 'my-appeals-detail' }
      },
      {
        path: 'user-data',
        name: 'UserData',
        component: UserData,
        meta: { title: 'personal-data' }
      },
      {
        path: 'party-data/exit-party',
        name: 'ExitParty',
        component: ExitParty,
        meta: { title: 'quitting-the-party' }
      },
      {
        path: 'news',
        name: 'ClientNews',
        component: ClientPressCenter,
        meta: { title: 'press-center' }
      },
      {
        path: 'news-all',
        name: 'ClientNewsList',
        component: ClientNewsList,
        meta: { title: 'news' }
      },
      {
        path: 'news/:news_id',
        name: 'ClientNewsDetail',
        component: ClientNewsDetail,
        meta: { title: 'news' }
      },
      {
        path: 'press-about-us-list',
        name: 'ClientPressAboutUsList',
        component: ClientPressAboutUsList,
        meta: { title: 'the-press-about-us' }
      },
      {
        path: 'announce-list',
        name: 'ClientAnnouncesList',
        component: ClientAnnouncementsList,
        meta: { title: 'announcements' }
      },
      {
        path: 'announce/:announce_id',
        name: 'ClientAnnounceDetail',
        component: ClientAnnouncementDetail,
        meta: { title: 'announcements' }
      },
      {
        path: 'video-gallery',
        name: 'ClientVideoGallery',
        component: ClientVideoGallery,
        meta: { title: 'video-gallery' }
      },
      {
        path: 'photo-gallery',
        name: 'ClientPhotoGalleryAll',
        component: ClientPhotoGalleryAll,
        meta: { title: 'photo-gallery' }
      },
      {
        path: 'donations',
        name: 'ClientDonations',
        component: ClientDonations,
        meta: { title: 'donations' }
      }
    ]
  },


  // UI Reception
  {
    path: '/reception',
    name: 'Reception',
    component: MainLayoutReception,
    meta: { title: 'reception', requiresAuth: true },
    redirect: to => {
      return '/reception/appeal-list/new'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'ReceptionNotFound', component: NotFound },
      { path: '/page-in-development', name: 'ReceptionPageInDevelopment', component: PageInDevelopment },
      {
        path: 'appeal-list/:filter',
        name: 'ReceptionAppealList',
        component: ReceptionAppealList,
        meta: { title: 'the-history-of-appeals' }
      },
      {
        path: 'appeal-data/:appeal_id',
        name: 'ReceptionAppealDetail',
        component: ReceptionAppealDetail,
        meta: { title: 'requests-for-deletion-detail' }
      },
      {
        path: 'analytics',
        name: 'ReceptionAnalytics',
        component: Analytics,
        meta: { title: 'analytics' }
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
      return '/manager/party-list/active?offset=0&limit=20&published=true&search=&full_name=&ticket_number=&join_date&birth_date'
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'ManagerNotFound', component: NotFound },
      { path: '/page-in-development', name: 'ManagerPageInDevelopment', component: PageInDevelopment },
      {
        path: 'party-list/:filter',
        name: 'ManagerPartyDataList',
        component: ManagerPartyDataList,
        meta: { title: 'party-members' }
      },
      {
        path: 'deleted-party-list/:filter',
        name: 'ManagerDeletedPartyDataList',
        component: ManagerPartyDataList,
        meta: { title: 'deleted-party-members' }
      },
      {
        path: 'party-data/:party_id',
        name: 'ManagerPartyData',
        component: ManagerPartyData,
        meta: { title: 'party-members-data' }
      },

      {
        path: 'party-resignation-list',
        name: 'ManagerPartyResignationList',
        component: ManagerPartyResignationList,
        meta: { title: 'requests-for-deletion' }
      },
      {
        path: 'party-resignation-data/:party_id',
        name: 'ManagerPartyResignationData',
        component: ManagerPartyResignationData,
        meta: { title: 'requests-for-deletion-detail' }
      },
      {
        path: 'ticket-num-data-list',
        name: 'TicketNumList',
        component: TicketNumList,
        meta: { title: 'vip-rooms' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: Analytics,
        meta: { title: 'analytics' }
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
      return '/media/news-list?offset=0&limit=20&published=true&search='
    },
    children: [
      { path: '/:pathMatch(.*)*', name: 'MediaNotFound', component: NotFound },
      { path: '/page-in-development', name: 'MediaPageInDevelopment', component: PageInDevelopment },
      {
        path: 'news-list',
        name: 'MediaNewsList',
        component: MediaNewsList,
        meta: { title: 'news' }
      },
      {
        path: 'news-list/create',
        name: 'MediaNewsCreate',
        component: MediaNewsEdit,
        meta: { title: 'editing-the-news' }
      },
      {
        path: 'news-list/:news_id',
        name: 'MediaNewsEdit',
        component: MediaNewsEdit,
        meta: { title: 'new-news' }
      },
      {
        path: 'news-for-fraction',
        name: 'MediaNewsForFractionList',
        component: MediaNewsForFractionList,
        meta: { title: 'news-for-the-faction' }
      },
      {
        path: 'news-for-fraction/create',
        name: 'MediaNewsForFractionCreate',
        component: MediaNewsForFractionEdit,
        meta: { title: 'create-news-for-the-faction' }
      },
      {
        path: 'news-for-fraction/:news_id',
        name: 'MediaNewsForFractionEdit',
        component: MediaNewsForFractionEdit,
        meta: { title: 'edit-news-for-the-faction' }
      },
      
      {
        path: 'press-about-us',
        name: 'MediaPressAboutUsList',
        component: MediaPressAboutUsList,
        meta: { title: 'the-press-about-us' }
      },
      {
        path: 'press-about-us/create',
        name: 'MediaPressAboutUsCreate',
        component: MediaPressAboutUsEdit,
        meta: { title: 'create-press-about-us' }
      },
      {
        path: 'press-about-us/:news_id',
        name: 'MediaPressAboutUsEdit',
        component: MediaPressAboutUsEdit,
        meta: { title: 'edit-press-about-us' }
      },
      
      {
        path: 'video-gallery',
        name: 'MediaVideoGalleryList',
        component: MediaVideoGalleryList,
        meta: { title: 'video-gallery' }
      },
      {
        path: 'video-gallery/create',
        name: 'MediaVideoGalleryCreate',
        component: MediaVideoGalleryEdit,
        meta: { title: 'create-video' }
      },
      {
        path: 'video-gallery/:news_id',
        name: 'MediaVideoGalleryEdit',
        component: MediaVideoGalleryEdit,
        meta: { title: 'edit-video' }
      },
      
      {
        path: 'photo-gallery',
        name: 'MediaPhotoGalleryList',
        component: MediaPhotoGalleryList,
        meta: { title: 'photo-gallery' }
      },

      {
        path: 'announcements',
        name: 'MediaAnnouncementsList',
        component: MediaAnnouncementsList,
        meta: { title: 'announcements' }
      },
      {
        path: 'announcements/create',
        name: 'MediaAnnouncementsCreate',
        component: MediaAnnouncementsEdit,
        meta: { title: 'create-announcements' }
      },
      {
        path: 'announcements/:news_id',
        name: 'MediaAnnouncementsEdit',
        component: MediaAnnouncementsEdit,
        meta: { title: 'edit-announcements' }
      }
    ]
  }
]

const progress = new Progress()
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

const { user, loaded, logged, getUser, logout } = useAuth()

router.beforeEach(async (to, from, next) => {
  const lang = to.params.lang || defaultLocale;
  i18n.global.locale.value = lang;
  if ([to.meta.title] != 'home') document.title = languages[i18n.global.locale.value].page[to.meta.title] + ' - Respublica'
  else document.title = languages[i18n.global.locale.value].page[to.meta.title]

  progress.start()
  const htmlElementBody = document.querySelector('body');
  const htmlElementApp = document.querySelector('div#app');

  if (to.matched[0].name === 'Admin' || to.matched[0].name === 'Reception' || to.matched[0].name === 'Manager' || to.matched[0].name === 'Media') {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1300, initial-scale=1')
    htmlElementBody.style = 'overflow:overlay !important;'
    htmlElementApp.style = 'min-width:1300px !important;'
  } else {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0')
    htmlElementBody.style = ''
    htmlElementApp.style = ''
  }

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  if (!logged()) {
    next({ name: 'Authorization', params: { logOrReg: 'login' } })
    return
  }

  if (loaded.value) {
    next()
    return
  }

  try {
    await getUser()
    next()
  } catch (error) {
    logout()
    next({ name: 'Authorization', params: { logOrReg: 'login' } })
  }
})

router.afterEach(progress.end)

export default router