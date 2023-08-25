<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <div class="content">
        <div class="wrapper-menu">
          <div class="left-menu" id="menu-left">
            <div class="left-menu-inner" :class="{ 'sticky': isSticky }" :style="{top: obsaluteTop}">
              <div class="left-menu-about">
                <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                <span>О партии</span>

              </div>
              <div class="left-menu-list">
                <ul>
                  <li>Новости</li>
                  <li>Пресса о нас</li>
                  <li>Видеогалерея</li>
                  <li>Фотогалерея</li>
                  <li>Анонсы, объявления</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section class="landing-block">
          <div class="wrapper landing-wrapper">
            <h2 class="landing-title">Новости</h2>
            <NewsList />


          </div>
        </section>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
import NewsList from '../../components/uiLanding/news/newsList.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isSticky = ref(false);
const menuOffsetTop = ref(0);
const obsaluteTop = ref('0px')

const handleScroll = () => {
  if (window.pageYOffset >= document.querySelector('header')!.offsetHeight) {
    const headerMain = document.querySelector('#header-main');
    obsaluteTop.value = headerMain!.offsetHeight + 'px';
    isSticky.value = true;
  } else {
    obsaluteTop.value = '0px';
    isSticky.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  const manuLeft = document.querySelector('#menu-left');
  menuOffsetTop.value = manuLeft!.offsetTop;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.wrapper-main {
  background-color: #F6F9FD;

}

.landing-block {
  margin-left: 40px;
}

.content {
  display: flex;

}
.wrapper-menu {
  width: 325px;
  background: #042051;
}
.left-menu {
  position: relative;
  &-inner {
    height: 300px;
    position: absolute;
    left: 0;
    top: 0px;

    transition: all .2s linear;
    
    &.sticky {
      position: fixed;
    }
  }

  

  &-about {
    width: 285px;
    height: 56px;
    border-radius: 10px;
    background: #0B2960;
    margin-left: 20px;
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      color: #FFF;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
    }

    & svg {
      width: 44px;
      height: 44px;
      fill: var(--accent-color);
    }
  }

  &-list {
    margin-top: 27px;
    margin-left: 47px;

    & ul {
      & li {
        color: #FFF;
        font-size: 18px;
        font-weight: 400;
        margin-top: 20px;
      }
    }
  }

}

.landing-title {
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  color: #042051;
}</style>
