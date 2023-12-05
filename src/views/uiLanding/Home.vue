<template>
  <div class="home wrapper-main">
    <div>
      <Header defaultFixed withoutPaddingBottom dark />

      <Intro />

      <AboutUs />

      <PartyProgram />

      <NewsList />

      <AboutParty
        @showJoinPartyModal="() => showJoinPartyModal = true"
      />

      <AnnouncementsList />
    </div>

    <Footer /> 
  </div>

  <JoinPartyModal
    :show="showJoinPartyModal"
    @hide="() => showJoinPartyModal = false"
  />
</template>

<script setup lang="ts">
  import Intro from '@/components/uiLanding/home-page/Intro.vue'
  import AboutUs from '@/components/uiLanding/home-page/AboutUs.vue'
  import PartyProgram from '@/components/uiLanding/home-page/PartyProgram.vue'
  import AboutParty from '@/components/uiLanding/home-page/AboutParty.vue'
  import NewsList from '@/components/uiLanding/home-page/NewsList.vue'
  import AnnouncementsList from '@/components/uiLanding/home-page/AnnouncementsList.vue'
  import JoinPartyModal from '@/components/uiLanding/feedback/JoinPartyModal.vue';

  import { onMounted, reactive, ref } from 'vue';

  import { NewsValues } from '@/types/news';
  import { getNewsList } from '@/actions/uiLanding/news';

  const showJoinPartyModal = ref(false)
  const announceValues = reactive<NewsValues>({
    tableValues: null,
    total: 0,
    isEmpty: false,
    searchEmpty: true
  })

  onMounted(() => {
    getData();
  })

  const getData = async () => {
    announceValues.isEmpty = false
    const { data, total } = await getNewsList('announcements', {offset: 0,limit: 3})
    announceValues.tableValues = data;
    announceValues.total = total;
    if (!total) {
      announceValues.isEmpty = true
    }
  }
</script>