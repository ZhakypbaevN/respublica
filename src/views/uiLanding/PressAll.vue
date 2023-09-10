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
                        <span>Пресса о нас</span>
                    </div>
                    <div class="press-items">
                        <RouterLink to="/press-in-full">

                            <div class="press-item">
                                <div class="press-item-img">
                                    <img src="/img/uiLanding/news-example.jpg" alt="">
                                    <div class="press-item-img-date">
                                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                        <span>05.08.2023</span>
                                    </div>
                                </div>
                                <div class="press-item-source">
                                    <span class="">kazinform.kz</span>
                                </div>
                                <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                    Р.Берденов</span>
                            </div>
                        </RouterLink>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
                                Р.Берденов</span>
                        </div>

                        <div class="press-item">
                            <div class="press-item-img">
                                <img src="/img/uiLanding/news-example.jpg" alt="">
                                <div class="press-item-img-date">
                                    <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                                    <span>05.08.2023</span>
                                </div>
                            </div>
                            <div class="press-item-source">
                                <span class="">kazinform.kz</span>
                            </div>
                            <span class="press-item-text">У Казахстана большой потенциал в сфере эко- и этнотуризма, -
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

.press-items {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px 30px;
}

.press-item {

    &-img {
        width: 435px;
        height: 211px;
        position: relative;


        & img {
            width: 435px;
            height: 211px;
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

    &-source {
        margin-top: 18px;

        & span {
            color: var(--light-gray-color);
            font-size: 18px;
            font-weight: 700;
        }
    }

    &-text {
        display: block;
        width: 461px;
        height: 48px;
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-color);

    }

}
</style>