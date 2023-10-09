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
                        <span>Фотогалерея</span>
                    </div>

                    <div class="gallery">
                        <div class="gallery-photos">
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>

                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>
                            <div class="gallery-photo">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                            </div>

                        </div>
                        <div class="gallery-albums">
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album active">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
                            </div>
                            <div class="gallery-album">
                                <img src="https://demo.akorda.kz/assets/media/kz-2_mediumThumb.jpg" alt="">
                                <div class="gallery-album-info">
                                    <span class="gallery-album-info-name">Выборы</span>
                                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                                    <span class="gallery-album-info-city">Астана</span>
                                </div>
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

.gallery {
    display: flex;
    margin-top: 40px;

    &-photos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;

    }

    &-photo {
        & img {
            width: 271px;
            height: 190px;
        }

    }

    &-albums {
        display: flex;
        flex-direction: column;
        height: 650px;
        width: 550px;
        overflow-y: scroll;
        overflow-x: hidden;
        margin-left: 45px;

    }

    &-album {
        display: flex;
        height: 150px;
        width: 517px;
        padding: 20px 25px;
        border-bottom: 1px rgba(129, 143, 167, 0.50) solid;

        & img {
            width: 110px;
            height: 110px;
            border-radius: 100px;
        }

        &-info {
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            &-name {
                font-weight: 700;
                color: var(--primary-color);
                font-size: 20px;
                margin-bottom: 15px;
            }

            &-date {
                font-size: 18px;
                color: var(--light-gray-color);
                font-weight: 500;
                margin-bottom: 15px;
            }

            &-city {
                font-size: 18px;
                font-weight: 400;
                color: var(--grey-color);


            }

        }

    }
}

.active {
    background-color: #4A78EC1A;
}
</style>