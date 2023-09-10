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
                                <a href="#aboutUs">
                                    <li>Кто мы?</li>
                                </a>
                                <a href="#partyProgram">
                                    <li>Restart. Reforma. Respublica (программа партии)</li>
                                </a>
                                <a href="">
                                    <li>Это Новый Казахстан! (предвыборная программа партии)</li>
                                </a>
                                <a href="#history">
                                    <li>История</li>
                                </a>
                                <a href="#party-structure">
                                    <li>Организационная структура</li>
                                </a>
                                <a href="#management">
                                    <li>Руководство</li>
                                </a>
                                <a href="">
                                    <li>Respublica jastary</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                <section class="landing-block">
                    <div class="wrapper landing-wrapper">
                        <h2 class="landing-title scroll-top" id="aboutUs">Кто мы?</h2>

                        <AboutUs />

                        <div class="party-charter scroll-top">
                            <div class="party-charter-text">
                                <span class="party-charter-title">Устав партии</span>
                                <span class="party-charter-title-upper">НОВЫЙ КАЗАХСТАН – ЭПОХА НОВОГО ВРЕМЕНИ!</span>
                            </div>
                            <Button class="party-charter-download" name="СКАЧАТЬ УСТАВ " type="default-blue" />

                        </div>
                        <div class="scroll-top" id="partyProgram">

                            <PartyProgram />
                        </div>
                        <div class="scroll-top" id="party-structure">
                            <div class="party-structure">
                                <h2 class="landing-title">Организационная структура аппарата партии «Respublica»</h2>
                                <img src="/img/about/party-structure.svg" alt="">
                            </div>
                        </div>

                        <h2 class="landing-title scroll-top" id="history">История</h2>
                        <History />

                        <h2 class="landing-title scroll-top" id="management">Руководство</h2>
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
import PartyProgram from '../../components/uiLanding/about/partyProgram.vue';
import History from '../../components/uiLanding/about/history.vue';
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
    max-width: 1920px;
    margin: 0 auto;

}

.wrapper-menu {
    width: 325px;
    background: #042051;
}

.left-menu {
    top: 70px;
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
    text-align: left;
    margin-bottom: 60px;
    margin-left: 50px;
}

.party-charter {
    background: url('/img/about/people.png') center no-repeat;
    background-size: cover;
    height: 226px;
    width: 1490px;
    margin: 0 50px 60px 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 20px;

    &-text {
        display: flex;
        flex-direction: column;
    }


    &-title {
        color: #FFF;
        font-size: 36px;
        font-weight: 700;
    }

    &-title-upper {
        color: #FFF;
        font-size: 36px;
        font-weight: 700;
        margin-top: 30px;
    }

    &-download {
        width: 213px;
        height: 64px;
    }
}

.party-structure {
    margin-left: 50px;
    margin-top: 60px;
    margin-bottom: 60px;
    background-color: #fff;
    border-radius: 10px;
    padding-top: 50px;



    & img {
        padding-right: 50px;
        padding-left: 50px;
        padding-bottom: 50px;
        max-width: 1326px;
    }
}

.scroll-top {
    scroll-margin-top: 9.2rem;
}
</style>
  