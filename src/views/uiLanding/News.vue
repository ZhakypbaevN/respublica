<template>
  <div class="wrapper-main">
    <div>
      <Header />
      <div class="content">
        <div class="wrapper-menu">
          <div class="left-menu">
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
  top: 20px;

  
  height: 300px;
  position: sticky;
  

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
