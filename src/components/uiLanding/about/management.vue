<template>
    <section>
        <!--<span class="title-text">Руководство</span>-->
        <div class="wrapper">
           
            <div class="management-items">
                <div class="management-item">
                    <img src="/img/about/position.png" alt="">
                    <div class="management-item-content">
                        <div class="management-item-content-name">
                            <span>Айдарбек Ходжаназаров</span>
                            <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                        </div>
                        <span class="management-item-content-position">
                            Председатель партии
                        </span>

                        <span class="management-item-content-text">
                            Депутат Мажилиса Парламента Республики Казахстан
                            Член Комитета по аграрным вопросам
                            Руководитель партийной фракции
                        </span>

                    </div>

                </div>
                
                <div class="management-item">
                    <img src="/img/about/position.png" alt="">
                    <div class="management-item-content">
                        <div class="management-item-content-name">
                            <span>Айдарбек Ходжаназаров</span>
                            <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                        </div>
                        <span class="management-item-content-position">
                            Председатель партии
                        </span>

                        <span class="management-item-content-text">
                            Депутат Мажилиса Парламента Республики Казахстан
                            Член Комитета по аграрным вопросам
                            Руководитель партийной фракции
                        </span>

                    </div>

                </div>
                
                <div class="management-item">
                    <img src="/img/about/position.png" alt="">
                    <div class="management-item-content">
                        <div class="management-item-content-name">
                            <span>Айдарбек Ходжаназаров</span>
                            <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                        </div>
                        <span class="management-item-content-position">
                            Председатель партии
                        </span>

                        <span class="management-item-content-text">
                            Депутат Мажилиса Парламента Республики Казахстан
                            Член Комитета по аграрным вопросам
                            Руководитель партийной фракции
                        </span>

                    </div>

                </div>
                
                <div class="management-item">
                    <img src="/img/about/position.png" alt="">
                    <div class="management-item-content">
                        <div class="management-item-content-name">
                            <span>Айдарбек Ходжаназаров</span>
                            <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                        </div>
                        <span class="management-item-content-position">
                            Председатель партии
                        </span>

                        <span class="management-item-content-text">
                            Депутат Мажилиса Парламента Республики Казахстан
                            Член Комитета по аграрным вопросам
                            Руководитель партийной фракции
                        </span>

                    </div>

                </div>
            </div>
        </div>

    </section>
</template>
<style scoped lang="scss">
.title-text {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    color: #042051;
    text-align: center;
}

.management-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
        grid-gap: 40px;
        margin-left: 63px;
        margin-top: 60px;
}

.management-item {
    display: flex;
    width: 683px;

    & img {
        width: 161px;
        height: 161px;

    }

    &-content {
        display: flex;
        flex-direction: column;
        margin-left: 25px;

        &-name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;

            & span {
                color: #042051;
                font-size: 18px;
                font-weight: 700;
                text-transform: uppercase;
            }

            & svg {
                width: 44px;
                height: 44px;
            }
        }

        &-position {
            color: #4A78EC;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        &-text {
            color: #4F4F4F;
            font-size: 18px;
            font-weight: 400;
            line-height: 26px;
        }
    }

}
</style>