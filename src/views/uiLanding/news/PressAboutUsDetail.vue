<template>
  <div class="wrapper-main">
    <div class="content">
      <Header />
      <div class="wrapper-page">
          <div class="news">
            <div class="news-title">Республиканцы посетили Жамбылскую область</div>
            <div class="news-text">Депутат Мажилиса Парламента Республики Казахстан, председатель партии Respublica
                Айдарбек Ходжаназаров, сопредседатель партии Respublica Куаныш Шонбай, заместитель руководителя
                центрального аппарата партии Маханбет Хасенов посетили Жамбылскую область. В Байзакском, Жамбылском,
                Жуалинском района партийцы встретились с представителями госорганов, предприятий, крестьянских
                хозяйств.</div>
            <div class="news-img">
                
            </div>
            <div class="news-text">Депутат Мажилиса Парламента Республики Казахстан, председатель партии Respublica
                Айдарбек Ходжаназаров, сопредседатель партии Respublica Куаныш Шонбай, заместитель руководителя
                центрального аппарата партии Маханбет Хасенов посетили Жамбылскую область. В Байзакском, Жамбылском,
                Жуалинском района партийцы встретились с представителями госорганов, предприятий, крестьянских
                хозяйств.</div>
            <div class="news-date">
                <SvgIcon name="calendar-check" :viewboxWidth="28" :viewboxHeight="28" />
                <span>05.08.2023</span>
            </div>
            <div class="news-more">
                <div class="news-more-title">Смотрите также</div>
                <div class="news-more-news">
                    <div class="news-more-news-img">
                        
                    </div>
                    <div class="news-more-news-text">
                        <div class="news-more-news-text-title">Потери жамбылским аграриям из-за засухи будут
                            возмещены</div>
                        <div class="news-more-news-text-description">Инициатива мажилисмена А.Ходжаназарова была
                            поддержана. Премьер-министр А. Смаилов на встрече с жамбылскими аграриями заверил, что
                            до </div>
                    </div>
                </div>
                <div class="news-more-news">
                    <div class="news-more-news-img">
                        
                    </div>
                    <div class="news-more-news-text">
                        <div class="news-more-news-text-title">Республиканцы обсудили с западноказахстанскими
                            предпринимателями проблемные вопросы бизнеса</div>
                        <div class="news-more-news-text-description">Западно-Казахстанскую область посетили депутаты
                            Мажилиса Парламента Республики Казахстан от партии Respublica Айдарбек Ходжаназаров и
                            ... </div>
                    </div>
                </div>
                <div class="news-more-news">
                    <div class="news-more-news-img">
                        
                    </div>
                    <div class="news-more-news-text">
                        <div class="news-more-news-text-title">Потери жамбылским аграриям из-за засухи будут
                            возмещены</div>
                        <div class="news-more-news-text-description">Инициатива мажилисмена А.Ходжаназарова была
                            поддержана. Премьер-министр А. Смаилов на встрече с жамбылскими аграриями заверил, что
                            до </div>
                    </div>
                </div>
                <div class="news-more-news">
                    <div class="news-more-news-img">
                        
                    </div>
                    <div class="news-more-news-text">
                        <div class="news-more-news-text-title">Потери жамбылским аграриям из-за засухи будут
                            возмещены</div>
                        <div class="news-more-news-text-description">Инициатива мажилисмена А.Ходжаназарова была
                            поддержана. Премьер-министр А. Смаилов на встрече с жамбылскими аграриями заверил, что
                            до </div>
                    </div>
                </div>

            </div>

          </div>

      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper-page {
  display: flex;
  justify-content: center;
}

.news {
  max-width: 920px;
  margin-top: 50px;

  &-title {
    color: var(--primary-color);
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  &-text {
    color: var(--primary-color);
    font-size: 22px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 30px;
  }

  &-img {
    width: 100%;
    margin-bottom: 30px;

    & img {
      width: 100%;
    }
  }

  &-date {
    display: flex;
    grid-gap: 5px;
    margin-bottom: 100px;

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

  &-more {
    &-title {
      color: var(--primary-color);
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 40px;
    }

    &-news {
      display: flex;
      margin-bottom: 25px;

      &-img {
        & img {
          width: 200px;
          height: 142px;
          border-radius: 10px;
        }
      }

      &-text {
        margin-left: 20px;

        &-title {
          color: var(--primary-color);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        &-description {
          color: var(--primary-color);
          font-size: 20px;
          font-weight: 400;
          line-height: 25px;
      }
      }
    }
  }
}
</style>