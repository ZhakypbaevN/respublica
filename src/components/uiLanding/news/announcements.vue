<template>
    <div class="title">
        <span>Анонсы, объявления</span>
    </div>
    <div class="announcements">
        <div class="announcement">
            <img src="/img/announcement.png" alt="">
            <span class="announcement-title">Обьяление</span>
            <span class="announcement-text">Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в
                топовые IT компании, прокачать свои soft скиллы, научиться</span>
        </div>
        <div class="announcement">
            <img src="/img/announcement.png" alt="">
            <span class="announcement-title">Обьяление</span>
            <span class="announcement-text">Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в
                топовые IT компании, прокачать свои soft скиллы, научиться</span>
        </div>
        <div class="announcement">
            <img src="/img/announcement.png" alt="">
            <span class="announcement-title">Обьяление</span>
            <span class="announcement-text">Интенсивный онлайн-курс, который поможет вам подготовиться к собеседованию в
                топовые IT компании, прокачать свои soft скиллы, научиться</span>
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
}

.announcements {

    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
}

.announcement {
    display: flex;
    flex-direction: column;
    width: 463px;
    height: 417px;
    background-color: var(--white-color);
    border: 1px solid var(--border-light-gray);
    border-radius: 10px;



    & img {
        width: 463px;
        height: 222px;
        border-radius: 10px;
    }

    &-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--primary-color);
        margin-top: 25px;
        margin-left: 25px;
    }

    &-text {
        font-size: 20px;
        font-weight: 400;
        margin-top: 15px;
        margin-left: 25px;
        margin-right: 28px;
        margin-bottom: 30px;

    }
}
</style>