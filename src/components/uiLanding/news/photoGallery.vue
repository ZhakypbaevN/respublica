<template>
    <div class="title">
        <span>Фотогалерея</span>
        <div>
            <RouterLink to="/photo-gallery" class="title-link">
                <span>Перейти в галерею</span>
                <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
            </RouterLink>
        </div>
    </div>

    <div class="gallery">
        <div class="gallery-photos">
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>

            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>
            <div class="gallery-photo">
                <img src="/img/uiLanding/events-2.jpg" alt="">
            </div>

        </div>
        <div class="gallery-albums">
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album active">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
            <div class="gallery-album">
                <img src="/img/uiLanding/events-2.jpg" alt="">
                <div class="gallery-album-info">
                    <span class="gallery-album-info-name">Выборы</span>
                    <span class="gallery-album-info-date">Июль 20, 2023 01:51</span>
                    <span class="gallery-album-info-city">Астана</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style  scoped lang="scss">
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;

    & span {
        color: #042051;
        text-align: center;
        font-size: 36px;
        font-weight: 600;
    }

    &-link {
        display: inline-flex;
        align-items: center;
        grid-gap: 10px;

        & span {
            color: var(--primary-color);
            font-size: 20px;
            font-weight: 600;
        }

        & svg {
            width: 24px;
            height: 24px;
            fill: var(--primary-color);
        }
    }

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
}</style>