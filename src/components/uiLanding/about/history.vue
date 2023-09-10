<template>
    <div class="history-wrapper">
        <div id="timeline-container">
            <div class="inner-container">
                <ul class="timeline">
                    <li class="timeline-item" data-date="2022, 29 декабря">
                        <div class="timeline-item-block">
                            <img src="/img/about/history.png" alt="history">
                            <div class="timeline-item-block-text">Учредительный съезд прошел в городе Алматы 3 декабря 2022
                                года.
                                На съезде принято решение о создании политической партии и утверждено её название - партия
                                «Respublica».
                                Утверждены Устав, Программа партии. Сформирован руководящий орган партии и избраны высшие
                                руководящие лица. Избран контрольно-ревизионный орган партии. Принято решение о создании
                                региональных филилов.
                                Председателем партии избран глава компании «Олжа Агро» Айдарбек Ходжаназаров,
                                сопредседателями – предприниматели Бейбит Алибеков, Максим Барышев, Руслан Берденов, Нурлан
                                Коянбаев, Сырымбек Тау, Куаныш Шонбай, Динара Шукижанова.</div>
                        </div>
                    </li>
                    <li class="timeline-item" data-date="2023, 18 января">
                        <div class="timeline-item-block">
                            <div class="timeline-item-block-text">Общественное объединение «Партия «Respublica»
                                зарегистрировано в Министерстве юстиции Республики Казахстан 18 января 2023 года. Начата
                                регистрация филиалов партии.</div>
                        </div>
                    </li>
                    <li class="timeline-item" data-date="2023, 6 февраля">
                        <div class="timeline-item-block">
                            <img src="/img/about/history.png" alt="history">
                            <div class="timeline-item-block-text">В г.Астана прошел II съезд партии Respublica.
                                Принято решение о выдвижении кандидатов в депутаты Мажилиса Парламента Республики Казахстан
                                восьмого созыва, избираемых по партийным спискам и по одномандатным территориальным
                                избирательным округам.
                                Утверждена Предвыборная программа партии «Respublica».
                                Внесены изменения и дополнения в Устав партии «Respublica».</div>
                        </div>
                    </li>
                    <li class="timeline-item" data-date="2023, 19 марта">
                        <div class="timeline-item-block">
                            <div class="timeline-item-block-text">По итогам внеочередных выборов депутатов Мажилиса
                                Парламента VIII созыва партия «Respublica» набрала 8,59% голосов избирателей и получила
                                шесть мандатов в нижней палате.
                                Фракция партии «Respublica» зарегистрирована Постановлением Бюро Мажилиса Парламента
                                Республики Казахстан.
                                Решением Собрания партии «Respublica» утвержден список депутатов Фракции.
                                В состав фракции вошли депутаты Ходжаназаров А.А., Берденов Р.А., Куспеков О.Х, Наумова
                                Д.Р., Тау Н., Шукижанова Д.А.
                                На первом заседании депутатов – членов фракции руководителем фракции избран Председатель
                                партии «Respublica» Ходжаназаров А.А.
                                В маслихаты всех уровней от партии «Respublica» избрано 56 депутатов.</div>
                        </div>
                    </li>
                    <li class="timeline-item" data-date="2023, 29 июля">
                        <div class="timeline-item-block">
                            <img src="/img/about/history.png" alt="history">
                            <div class="timeline-item-block-text">Внеочередной выездной III съезд партии состоялся 29 июля
                                2023 года в поселке Бурабай Акмолинской области.
                                Решением съезда внесены изменения в Устав партии, утверждены новый состав Центрального
                                совета партии, Правила и состав контрольно-ревизионной комиссии, принято решение о создании
                                молодежного объединения «Respublica jastary».</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>
<style scoped lang="scss">
#timeline-container {

    /* overflow: auto;*/
    margin-left: 121px;

    .inner-container {
        max-width: 1368px;
        margin: 0 auto;

    }
}

.timeline {
    margin: 0 auto;
    position: relative;
    left: 120px;
    /*width: 80%;*/
    max-width: 1191px;
    margin-top: 16px;
    margin-left: 5%;
}

.timeline-item {
    text-align: center;
    font-size: 1.4rem;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-left: 1px solid #4A78EC;

    position: relative;
    list-style-type: none;
    --item-width: calc(100%);

    &-block {
        display: flex;
        grid-gap: 30px;
        background-color: white;
        padding: 30px;
        margin-top: -25px;
        border-radius: 10px;

        img {
            width: 227px;
            height: 155px;
        }

        &-text {
            text-align: left;
            color: #042051;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 25px;
        }

    }

    &::after {
        content: attr(data-date);
        position: absolute;
        right: calc(var(--item-width) + 40px);
        color: #4A78EC;
        font-size: 23px;
        top: -10px;
        font-weight: 700;
        float: right;
        white-space: nowrap;
    }

    &::before {
        content: "";
        border-radius: 50%;
        width: 13px;
        height: 13px;
        background-color: #4A78EC;
        position: absolute;
        left: -7px;
        top: 0px;
    }

    &:last-child {
        border-bottom: none;
    }
}</style>