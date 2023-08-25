<template>
    <div class="wrapper-main">
        <div>
            <Header />
            <div class="content">
                <div class="wrapper-menu">
                    <div class="left-menu">
                        <div class="left-menu-about">
                            <SvgIcon name="about-icon" :viewboxWidth="28" :viewboxHeight="28" />
                            <span>О партии</span>

                        </div>
                        <div class="left-menu-list">
                            <ul>
                                <li>Кто мы?</li>
                                <li>Устав партии</li>
                                <li>Политическая платформа / приоритеты</li>
                                <li>Предвыборная программа партии</li>
                                <li>История</li>
                                <li>Организационная структура</li>
                                <li>Руководство</li>
                                <li>Молодежное крыло</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section class="landing-block">
                    <div class="wrapper landing-wrapper">
                        <h2 class="landing-title">Кто мы?</h2>

                        <AboutUs />

                        <div class="party-charter">
                            <span class="party-charter-title">Устав партии</span>
                            <span class="party-charter-title-upper">НОВЫЙ КАЗАХСТАН – ЭПОХА НОВОГО ВРЕМЕНИ!</span>
                        </div>
                        <h2 class="landing-title">Организационная структура аппарата партии «Respublica»</h2>
                        <img src="/img/about/party-structure.svg" class="party-structure" alt="">

                        <h2 class="landing-title">Руководство</h2>

                        <Management />


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
import AboutUs from '../../components/uiLanding/about/aboutUs.vue';
import Management from '../../components/uiLanding/about/management.vue';
</script>
  
<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;

}

.landing-block {
    margin: 60px 0;
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


    height: 510px;
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
            width: 25px;
            height: 25px;
            fill: var(--accent-color);
            margin-right: 10px;
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
                word-wrap: break-word;
                width: 210px;
                cursor: pointer;
            }
        }
    }

}

.landing-title {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    color: #042051;
    text-align: center;
    margin-bottom: 60px;
}

.party-charter {
    background: url('/img/about/people.png') center no-repeat;
    background-size: cover;
    height: 306px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;

    &-title {
        color: #FFF;
        font-size: 36px;
        font-weight: 700;
        margin-left: 238px;
        margin-top: 40px;
    }

    &-title-upper {
        color: #FFF;
        font-size: 36px;
        font-weight: 700;
        margin-left: 238px;
        margin-top: 40px;
    }
}
.party-structure {
    margin-left: 150px;
    margin-top: 60px;
    margin-bottom: 60px;
}
</style>
  