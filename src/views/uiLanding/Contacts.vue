<template>
  <div class="wrapper-main">
    <div>
      <Header />

      <section class="news landing-block" id="newsList">
        <div class="wrapper">
          <div>
            <button
              class="landing-link with-line"
              @click="() => showBlock.contactsCentralOffice = !showBlock.contactsCentralOffice"
            >
              <span>Центральный аппарат</span>
              <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
            </button>

            <Transition>
              <div v-if="showBlock.contactsCentralOffice" v-collapse>
                <ContactsCentralOffice />
              </div>
            </Transition>
          </div>
          

          <div>
            <button
              class="landing-link with-line"
              @click="() => showBlock.contactsBranch = !showBlock.contactsBranch"
            >
              <span>Филиалы</span>
              <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
            </button>

            <Transition>
              <div v-if="showBlock.contactsBranch" v-collapse>
                <ContactsBranch />
              </div>
            </Transition>

          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ContactsBranch from '../../components/uiLanding/contacts/contactsBranch.vue';
import ContactsCentralOffice from '../../components/uiLanding/contacts/contactsCentralOffice.vue';

const showBlock = reactive({
  contactsCentralOffice: false,
  contactsBranch: false
})
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;
}

.wrapper  {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
}
</style>