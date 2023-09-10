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
                        <span>Новости</span>
                    </div>
                    <div class="news-items">
                        <RouterLink to="/news-in-full">
                            <div class="news-item">
                                <div class="news-item-img">
                                    <img src="/img/news.png" alt="">
                                    <div class="news-item-img-date">
                                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                        <span>05.08.2023</span>
                                    </div>
                                </div>
                                <div class="news-item-name">
                                    <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                                </div>
                                <div class="news-item-line"></div>
                                <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                    Р.Берденов</span>
                            </div>
                        </RouterLink>
                        <div class="news-item">
                            <div class="news-item-img">
                                <img src="/img/news.png" alt="">
                                <div class="news-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="news-item-name">
                                <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                            </div>
                            <div class="news-item-line"></div>
                            <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>
                        <div class="news-item">
                            <div class="news-item-img">
                                <img src="/img/news.png" alt="">
                                <div class="news-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="news-item-name">
                                <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                            </div>
                            <div class="news-item-line"></div>
                            <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>
                        <div class="news-item">
                            <div class="news-item-img">
                                <img src="/img/news.png" alt="">
                                <div class="news-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="news-item-name">
                                <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                            </div>
                            <div class="news-item-line"></div>
                            <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>
                        <div class="news-item">
                            <div class="news-item-img">
                                <img src="/img/news.png" alt="">
                                <div class="news-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="news-item-name">
                                <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                            </div>
                            <div class="news-item-line"></div>
                            <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>
                        <div class="news-item">
                            <div class="news-item-img">
                                <img src="/img/news.png" alt="">
                                <div class="news-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="news-item-name">
                                <span class="">Партия Respublica начала акцию "Абай айлығы"</span>
                            </div>
                            <div class="news-item-line"></div>
                            <span class="news-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
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

.news-items {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px 30px;
}

.news-item {

    &-img {
        width: 440px;
        height: 313px;
        position: relative;


        & img {
            width: 440px;
            height: 313px;
            border-radius: 10px;
        }

        &-date {
            display: flex;
            grid-gap: 5px;
            align-items: center;
            background-color: #042051;
            padding: 5px 15px;
            width: 137px;
            height: 30px;
            border-radius: 0px 10px;
            position: absolute;
            bottom: 0;

            & svg {
                width: 24px;
                height: 24px;
                fill: var(--white-color);
            }

            & span {
                color: var(--white-color);
            }

        }

    }

    &-name {
        margin-top: 15px;

        & span {
            color: var(--primary-color);
            font-size: 20px;
            font-weight: 700;
        }
    }

    &-text {
        display: block;
        width: 461px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(4, 32, 81, 0.80);

    }

    &-line {
        width: 54px;
        height: 3px;
        background-color: var(--accent-color);
        margin-bottom: 15px;
        margin-top: 20px;
    }
}
</style>