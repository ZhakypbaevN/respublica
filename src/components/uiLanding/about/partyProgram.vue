<template>
    <div class="program-wrapper">
        <div class="program">
            <img src="/img/about/program-two.png" alt="">
            <span class="program-title">Restart. Reforma. Respublica </span>
            <span class="program-sub-title">(программа партии)</span>
            <Button name="Скачать PDF" type="outline-blue" class="program-btn">
                <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
            </Button>
        </div>
        
        <div class="program">
            <img src="/img/about/program-one.png" alt="">
            <span class="program-title">Это Новый Казахстан!</span>
            <span class="program-sub-title">(предвыборная программа партии)</span>
            <Button name="Скачать PDF" type="outline-blue" class="program-btn">
                <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
            </Button>
        </div>
    </div>
</template>
<style scoped lang="scss">
.program-wrapper {
    display: flex;
    grid-gap: 40px;
    margin-left: 50px;
}

.program {
    background-color: var(--white-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 20px;

    & img {
        margin-bottom: 20px;
    }

    &-title {
        font-size: 28px;
        font-weight: 700;
        line-height: 40px;
        text-transform: uppercase;
        color: var(--primary-color);

    }

    &-sub-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px;
        text-transform: uppercase;
        color: var(--primary-color);
        margin-bottom: 21px;
    }

    &-btn {
        display: flex;
        align-items: center;
        grid-gap: 10px;
        border-radius: 100px;

        & svg {
            height: 24px;
            width: 24px;
            fill: var(--accent-color);
        }
    }
}
</style>