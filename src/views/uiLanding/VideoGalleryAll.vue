<template>
    <div class="wrapper-main">
        <div class="content">
            <Header />
            <div class="wrapper-page">
                <div class="back-btn">
                    <RouterLink to="/news">
                        <Button name="Назад" type="outline-grey-light">
                            <SvgIcon name="arrow-left" :viewboxWidth="24" :viewboxHeight="24" />
                        </Button>
                    </RouterLink>
                </div>
                <div>
                    <div class="title">
                        <span>Видеогалерея</span>
                    </div>
                    <div class="video-items">
                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>

                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>

                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>

                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>

                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>

                        <div class="video-item">
                            <img src="/img/video.png" alt="youtube">
                            <div class="video-item-name">
                                <img src="/img/icons/youtube.svg" alt="">
                                <span class="video-item-name-text">Новая политическая партия: какие цели у
                                    активистов?</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    </div>
</template>
<script setup lang="ts">
import Header from '../../components/uiLanding/layouts/header.vue';
import Footer from '../../components/uiLanding/layouts/footer.vue';
</script>
<style scoped lang="scss">
.wrapper-main {
    background-color: #F6F9FD;
}

.wrapper-page {
    display: flex;
    margin-top: 40px;
    max-width: 1920px;
    margin-bottom: 50px;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
        color: #042051;
        text-align: center;
        font-size: 36px;
        font-weight: 600;
    }

}

.back-btn {

    margin-right: 50px;
    margin-left: 60px;

    & button {
        display: flex;
        justify-content: flex-end;
        flex-direction: row-reverse;
        height: 60px;
        width: 152px;

        & svg {
            padding-top: 4px;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
    }


}

.video-items {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px 40px;
}

.video-item {
    & img {
        width: 440px;
        height: 244px;
    }

    &-name {
        display: flex;
        align-items: flex-start;
        margin-top: 15px;

        & img {
            width: 35px;
            height: 35px;

        }

        & span {
            width: 390px;
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-color);
            margin-left: 15px;


        }
    }
}
</style>