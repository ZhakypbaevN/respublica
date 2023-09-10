<template>
    <div class="wrapper-main">
        <Header />
        <div class="content-wrapper">
            <div class="title">Адрес центрального аппарата партии Respublica</div>
            <div class="contacts">
                <div class="contacts-address">
                    <SvgIcon name="marker-grey" :viewboxWidth="28" :viewboxHeight="28" />
                    <div class="contacts-address-block">
                        <span class="contacts-address-block-field">Адрес:</span>
                        <span class="contacts-address-block-data">г. Астана, пр. Мангилик ел, 33/1. Бизнес-центр IPLAZA, 9
                            этаж</span>
                    </div>
                    <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
                    <div class="contacts-address-block">
                        <span class="contacts-address-block-field">По общим вопросам:</span>
                        <a href="tel:+77017228251" class="contacts-address-block-data">+7 701 722 8251</a>
                    </div>
                    <SvgIcon name="envelope-grey" :viewboxWidth="28" :viewboxHeight="28" />
                    <div class="contacts-address-block">
                        <span class="contacts-address-block-field">Общие вопросы:</span>
                        <a href="mailto:info@respublica-partiyasy.kz"
                            class="contacts-address-block-data">info@respublica-partiyasy.kz</a>
                    </div>

                </div>
                <div class="contacts-number">
                    <SvgIcon name="marker-grey" :viewboxWidth="28" :viewboxHeight="28" />
                    <div class="contacts-number-block">
                        <span class="contacts-number-block-field">Для СМИ:</span>
                        <a href="tel:+77758715399" class="contacts-number-block-data">+7 775 871 5399</a>
                    </div>
                    <SvgIcon name="call-gery" :viewboxWidth="28" :viewboxHeight="28" />
                    <div class="contacts-number-block">
                        <span class="contacts-number-block-field">Для СМИ:</span>
                        <a href="mailto:akparat2020@gmail.com" class="contacts-number-block-data">akparat2020@gmail.com</a>
                    </div>
                </div>
            </div>
            <RouterLink to="/branch-contacts" class="contacts-link">
     
                
                    <span>Контакты филиалов</span>
                    <SvgIcon name="double-arrow-right" :viewboxWidth="20" :viewboxHeight="20" />
                
  
        </RouterLink>

        </div>




        <Footer />
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

.content-wrapper {
    margin: 0 auto;

}

.title {
    color: #042051;
    text-align: center;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    margin-top: 50px;
    margin-bottom: 40px;
}

.contacts {
    display: flex;

    &-address {
        border-radius: 10px;
        background: #FFF;
        display: inline-grid;
        grid-template-columns: auto auto;
        justify-content: start;
        padding-bottom: 30px;
        width: 873px;
        height: 300px;
        margin-right: 30px;

        & svg {
            width: 32px;
            height: 32px;
            margin: 30px 15px 0 30px;
        }


        &-block {
            display: flex;
            flex-direction: column;
            margin-top: 30px;

            &-field {
                color: #818FA7;
                font-size: 20px;
                font-weight: 500;
                line-height: 30px;
            }

            &-data {
                color: #042051;
                font-size: 20px;
                font-weight: 600;
                line-height: 30px;
            }


        }
    }

    &-number {
        border-radius: 10px;
        background: #FFF;
        display: inline-grid;
        grid-template-columns: auto auto;
        justify-content: start;
        padding-bottom: 30px;
        width: 487px;
        height: 299px;

        & svg {
            width: 32px;
            height: 32px;
            margin: 30px 15px 0 30px;
        }


        &-block {
            display: flex;
            flex-direction: column;
            margin-top: 30px;

            &-field {
                color: #818FA7;
                font-size: 20px;
                font-weight: 500;
                line-height: 30px;
            }

            &-data {
                color: #042051;
                font-size: 20px;
                font-weight: 600;
                line-height: 30px;
            }


        }
    }

    &-link {
        display: flex;
        align-items: center;
        grid-gap: 36px;

        border-left: 5px var(--accent-color) solid;
        padding: 5px 0 5px 15px;
        margin-top: 80px;
        margin-bottom: 100px;

        & span {
            color: var(--primary-color);
            font-size: 36px;
            font-weight: 600;
        }

        & svg {
            width: 32px;
            height: 32px;
            fill: var(--accent-color);
        }
    }
}
</style>