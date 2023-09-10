<template>
    <div class="title">
        <span>Видеогалерея</span>
        <div>
            <RouterLink to="/video-gallery" class="title-link">
                <span>Смотреть все видео</span>
                <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
            </RouterLink>
        </div>
    </div>

    <div class="video-items">
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
            </div>
        </div>
        
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
            </div>
        </div>
        
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
            </div>
        </div>
        
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
            </div>
        </div>
        
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
            </div>
        </div>
        
        <div class="video-item">
            <img src="/img/video.png" alt="youtube">
            <div class="video-item-name">
                <img src="/img/icons/youtube.svg" alt="">
                <span class="video-item-name-text">Новая политическая партия: какие цели у активистов?</span>
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

.video-items {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px 40px;
}

.video-item {
    & img {
        width: 463px;
        height: 257px;
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
            font-size: 20px;
            font-weight: 700;
            color: var(--primary-color);
            margin-left: 15px;


        }
    }
}



</style>
