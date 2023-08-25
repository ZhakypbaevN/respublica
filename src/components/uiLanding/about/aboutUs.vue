<template>
    <section>
        <div class="icon-items">
            <div class="icon-item">
                <img src="/img/icons/about/re-logo.svg" alt="">
                <div class="icon-item-description">
                    <span class="icon-item-title">Партия RESPUBLICA</span>
                    <span class="icon-item-text">что переводится с латинского как общее, или скорее - общественное,
                        государственное дело</span>
                </div>
            </div>
            <div class="icon-item">
                <img src="/img/icons/about/businessman.svg" alt="">
                <div class="icon-item-description">
                    <span class="icon-item-title">ЛЮДИ ДЕЛА:</span>
                    <span class="icon-item-text">предприниматели, управленцы, созидатели, архитекторы процессов, объединившиеся для того, чтобы претворить в жизнь нашу общую мечту</span>
                </div>
            </div>
            <div class="icon-item">
                <img src="/img/icons/about/routes.svg" alt="">
                <div class="icon-item-description">
                    <span class="icon-item-title">ВСЕ РЕГИОНЫ И РАЙОНЫ</span>
                    <span class="icon-item-text">Каждый город и поселок этой огромной страны: 
на юге, севере, западе и востоке</span>
                </div>
            </div>
            
            <div class="icon-item">
                <img src="/img/icons/about/people.svg" alt="">
                <div class="icon-item-description">
                    <span class="icon-item-title">РАВНОПРАВНЫЕ ПРЕДСТАВИТЕЛИ</span>
                    <span class="icon-item-text">полиэтнического и мультикультурного общества</span>
                </div>
            </div>
            
            <div class="icon-item">
                <img src="/img/icons/about/politicals.svg" alt="">
                <div class="icon-item-description">
                    <span class="icon-item-title">МЕТАПАРТИЯ:</span>
                    <span class="icon-item-text">цифровые номады, люди «Нового Казахстана», жители центральной Евразии, ощущающие свою принадлежность Европе и Азии</span>
                </div>
            </div>
        </div>

    </section>
</template>
<style scoped lang="scss">
.icon-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    margin-left: 40px;

}

.icon-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 60px;

    img {
        width: 60px;
    }

    &-description {
        display: flex;
        flex-direction: column;
        margin-left: 18px;
        width: 400px;

    }

    &-title {
        color: #000;
        font-size: 18px;
        font-weight: 700;
    }

    &-text {
        color: #000;
        font-size: 18px;
        font-weight: 400;
        margin-top: 15px;
    }
}</style>