<template>
    <section class="newsSlider">
    <div class="newsSlider-items">
        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="newsSlider-item">
            <img class="newsSlider-item-preview" src="/img/uiLanding/news-example.jpg" alt="">
            <div class="newsSlider-item-text">
                <h4 class="newsSlider-item-title">Полный запрет вейпов будет введен в Казахстане</h4>

                <p class="newsSlider-item-description">Этому предшествовала большая работа фракции партии Respublica,
                    государственных и общественных организаций.</p>

                <div class="newsSlider-item-bottom">
                    <div class="newsSlider-item-comment">
                        <SvgIcon name="comment-alt-lines" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>0</span>
                    </div>
                    <div class="newsSlider-item-date">
                        <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                        <span>12:30, 5 июля 2023</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
</script>
<style scoped lang="scss">
.newsSlider {
    &-items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 40px;
    }

    &-item {
        display: flex;
        border-radius: 10px;
        background: #FFF;
        padding: 25px;
        margin-right: 25px;

        &-preview {
            width: 223px;
            height: 161px;
            border-radius: 10px;
        }

        &-text {
            width: 446px;
            margin-left: 25px;

        }

        &-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
        }


        &-description {
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
        }

        &-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 25px;
        }

        &-date {
            display: flex;
            grid-gap: 5px;

            padding: 5px 10px;
            border-radius: 3px;
            border: 1px solid rgba(129, 143, 167, 0.50);

            & svg {
                width: 28px;
                height: 24px;
                fill: var(--accent-color);
            }

            & span {
                color: var(--light-gray-color);
                font-size: 16px;
                font-weight: 500;
            }
        }

        &-comment {
            display: flex;

            & span {
                color: var(--light-gray-color);
                font-size: 16px;
                font-weight: 500;
            }

            & svg {
                width: 28px;
                height: 24px;
                fill: var(--accent-color);
            }
        }

    }
}
</style>