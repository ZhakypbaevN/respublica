<template>
    <h2 class="title">Состав фракции партии RESPUBLICA</h2>

    <div class="fraction-items">
        <div class="fraction-item">
            <img src="/img/fraction/khodzhanazarov.png" alt="khodzhanazarov">
            <div class="fraction-item-name">ХОДЖАНАЗАРОВ Айдарбек</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">Руководитель фракции,<br>
                    член Комитета по аграрным вопросам</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>

        <div class="fraction-item">
            <img src="/img/fraction/berdenov.png" alt="berdenov">
            <div class="fraction-item-name">БЕРДЕНОВ Руслан</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">Член Комитета по финансам и бюджету</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>

        <div class="fraction-item">
            <img src="/img/fraction/kuspekov.png" alt="kuspekov">
            <div class="fraction-item-name">КУСПЕКОВ Олжас</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">Член Комитета по международным делам, обороне и безопасности</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>
        
        <div class="fraction-item">
            <img src="/img/fraction/naumova.png" alt="naumova">
            <div class="fraction-item-name">НАУМОВА Динара</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">член Комитета по законодательству и судебно-правовой реформе</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>
                
        <div class="fraction-item">
            <img src="/img/fraction/tau.png" alt="tau">
            <div class="fraction-item-name">ТАУ Нургул</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">Член Комитета по социальнокультурному развитию</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>

                        
        <div class="fraction-item">
            <img src="/img/fraction/shukizhanova.png" alt="shukizhanova">
            <div class="fraction-item-name">ШУКИЖАНОВА Динара</div>
            <div class="fraction-item-description">
                <div class="fraction-item-description-text">Член Комитета по экономической реформе и региональному развитию</div>
                <div class="fraction-item-social">
                    <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="facebook" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>

                    <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank"
                        class="header-top-snList-item">
                        <SvgIcon name="instagram" :viewboxHeight="32" :viewboxWidth="32" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.title {
    color: var(--primary-color);
    font-family: Tilda Sans;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.fraction-items {
    display: grid;
    grid-gap: 50px;
    grid-template-columns: repeat(3, 1fr);
    margin: 50px 250px;
}
.fraction-item {
    display: flex;
    flex-direction: column;

    & img {
        width: 330px;
        height: 299px;
    }

    &-name {
        width: 330px;
        height: 50px;
        background-color: var(--accent-color);
        color: var(--white-color);
        font-size: 20px;
        font-weight: 700;
        line-height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-description {
        width: 330px;
        height: 150px;
        background-color: var(--white-color);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 15px;

        &-text {
            color: var(--primary-color);
            font-size: 20px;
            font-weight: 400;
            line-height: 25px;
            margin: 10px 20px 0 20px;

        }
    }

    &-social {
        display: flex;
        grid-gap: 20px;
        margin-left: 20px;
        & a {
            display: block;
            height: 32px;
            width: 32px;
        }
    }
}
</style>