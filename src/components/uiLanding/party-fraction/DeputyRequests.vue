<template>
  <section class="deputyRequests landing-block" id="deputy-requests">
    <div class="wrapper">
      <h2 class="landing-title">{{ $t('parliamentary-inquiries') }}</h2>

      <div class="request-wrapper">
        <div class="deputies">
          <button
            v-for="(deputy, idx) of deputieslist"
            :key="deputy.name"
            class="deputies-deputy withZoomPreview"
            :class="{ active: deputy.active }"
            @click="() => toggleShow(idx)"
          >
            <div class="deputies-deputy-photo withZoomPreview-preview">
              <div
                class="deputies-deputy-photo-img bg-cover withZoomPreview-preview-img"
                :style="`background-image: url(${deputy.img});`"
              ></div>
            </div>
            <span>{{ deputy.name }}</span>
          </button>
        </div>

        <table class="deputy-requests-table" v-if="tableContentList.length">
          <thead>
            <th>{{ $t('formdata.date') }}</th>
            <th>{{ $t('formdata.file-and-brief-description') }}</th>
            <th>{{ $t('formdata.answer') }}</th>
          </thead>
          <tbody>
            <tr v-for="request of tableContentList" :key="request.date">
            
              <td>
                <span>
                  {{ convertDateTime(convertDateFormat(request.date)) }}
                </span>
              </td>

              <td :data-title="$t('formdata.file-and-brief-description')">
                <a class="text-line" :href="request.doc!" target="_blank">
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>

                  <span>
                    {{ request.name }}
                  </span>
                </a>
              </td>

              <td :data-title="$t('formdata.answer')">
                <a
                  class="text-line"
                  target="_blank"
                  v-for="answer of request.answer"
                  :href="answer['doc']"
                >
                  <div class="text-line-icon">
                    <SvgIcon name="pdf-blue" :viewboxHeight="32" :viewboxWidth="32" />
                  </div>
                  <span>
                    {{ convertDateTime(convertDateFormat(request.date)) }}
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <Empty v-else />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import convertDateTime from "@/helpers/convertDateTime";

  import { reactive, ref, onMounted } from "vue";
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  function convertDateFormat(inputDate) {
    // Разбиваем строку на составляющие (день, месяц, год)
    const [day, month, year] = inputDate.split('.');

    // Добавляем "20" перед двухзначным годом
    const fullYear = `20${year}`;

    // Формируем новую дату в формате ГГГГ-ММ-ДДT00:00:00Z
    const isoDate = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;

    return isoDate;
  }

  const deputieslist = reactive([
    {
      name: t('composition-of-faction.hodzhanazarov.full-name'),
      img: "/img/uiLanding/fraction/khodzhanazarov.jpg",
      active: true,
      data: [
        {
          date: "12.04.23",
          name: "Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қал",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/1 Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қал.pdf",
          
          answer: [
            {
              date: "12.04.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/1.1. Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қа.PDF",
            },
            {
              date: "12.04.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/1.2. Шетелдік астық және сүт өнімдерін жеткізушілер тарапынан ішкі нарықтағы бағалардың заңсыз импорты мен демпингі төңірегінде қа.PDF",
            }
          ]
        },

        {
          date: "12.05.23",
          name: "Касательно развития сельских территорий",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/120523_AH_Regarding the development of rural areas.pdf",
          
          answer: [
            {
              date: "12.05.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/120523_AX_RESPONSE_Regarding the development of rural areas.pdf",
            }
          ]
        },
        
        {
          date: "25.05.23",
          name: "Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/2 Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы 25.05.23 ДЗ.pdf",
          
          answer: [
            {
              date: "21.06.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/2 Ауыл шаруашылығы өнімдерін экспортауда қойылатын шектеулер туралы 21.06.23 ответ.pdf",
            }
          ]
        },

        {
          date: "16.06.23",
          name: "Касательно водных ресурсов",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/160623_AH_Regarding water resources.pdf",
          
          answer: [
            {
              date: "12.05.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/160623_AX_RESPONSE_Regarding water resources.pdf",
            }
          ]
        },
        
        {
          date: "14.09.23",
          name: "Касательно мер по ликвидации засухи",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/3 Касательно мер по ликвидации засухи 14.09.23 ДЗ.pdf",
          
          answer: [
            {
              date: "14.12.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/3 Жылыжай мәселесі туралы 14.12.23 ответ.pdf",
            }
          ]
        },
        {
          date: "17.11.23",
          name: "Жылыжай мәселесі туралы",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/4_Жылыжай_мәселесы_туралы_17.11.23_ДЗ.pdf",
          
          answer: [
            {
              date: "16.10.23",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/4 Касательно мер по ликвидации засухи 16.10.23 ответ.pdf",
            }
          ]
        },
        {
          date: "31.01.24",
          name: "По проблемным вопросам учета и статистики в сельском хозяйстве",
          doc: "/doc/ru/deputies-requests/khodzhanazarov/request/31.01.2024 Ходжаназаров ПО ПРОБЛЕМНЫМ ВОПРОСАМ УЧЕТА И СТАТИСТИКИ В СЕЛЬСКОМ ХОЗЯЙСТВЕ.pdf",
          
          answer: [
            {
              date: "31.01.24",
              doc: "/doc/ru/deputies-requests/khodzhanazarov/answer/31.01.2024 ответ Ходжаназаров Статистика мәселесі бойынша.pdf",
            }
          ]
        },
      ],
    },

    {
      name: t('composition-of-faction.berdenov.full-name'),
      img: "/img/uiLanding/fraction/berdenov.jpg",
      active: false,
      data: [
        {
          date: "13.04.23",
          name: "Букмекерлік кеңселер туралы",
          doc: "/doc/ru/deputies-requests/berdenov/request/130423_РБ_Букмекерлік кеңселер туралы.pdf",
          
          answer: [
            {
              date: "13.04.23",
              doc: "/doc/ru/deputies-requests/berdenov/answer/130423_РБ_ОТВЕТ_Букмекерлік кеңселер туралы.pdf",
            }
          ]
        },
        {
          date: "22.06.23",
          name: "По вопросам снижения оборота и обязательной постановки на учет по НДС",
          doc: "/doc/ru/deputies-requests/berdenov/request/220623_RB_On issues of reducing turnover and mandatory VAT registration.pdf",
          
          answer: [
            {
              date: "22.06.23",
              doc: "/doc/ru/deputies-requests/berdenov/answer/220623_РБ_ОТВЕТ_По вопросам снижения оборота и обязательной постановки на учет по НДС.pdf",
            }
          ]
        },
        {
          date: "07.09.23",
          name: "ҚТЖ және оған бағынышты мекемелер туралы",
          doc: "/doc/ru/deputies-requests/berdenov/request/ҚТЖ және оған бағынышты мекемелер туралы 07.09.23 ДЗ.pdf",
          
          answer: [
            {
              date: "13.10.23",
              doc: "/doc/ru/deputies-requests/berdenov/answer/«Қазақстан темір жолы» ҰК» АҚ қызметіне қатысты 13.10.23 ответ.pdf",
            }
          ]
        },
        {
          date: "25.01.24",
          name: "Эквайринг процессі туралы",
          doc: "/doc/ru/deputies-requests/berdenov/request/25.01.2024 ДЗ Берденов Эквайринг процессі туралы.pdf",
          
          answer: [
            {
              date: "25.01.24",
              doc: "/doc/ru/deputies-requests/berdenov/answer/25.01.2024 ответ Берденов Эквайринг процессі туралы.pdf",
            }
          ]
        },
        {
          date: "15.02.24",
          name: "Бөлшек салығы режиміне қатысты",
          doc: "/doc/ru/deputies-requests/berdenov/request/15.02.24 ДЗ Берденов Бөлшек салығы режиміне қатысты.pdf",
        },
      ],
    },

    {
      name: t('composition-of-faction.nurgul.full-name'),
      img: "/img/uiLanding/fraction/tau.jpg",
      active: false,
      data: [
        {
          date: "21.04.23",
          name: "Қосымша білім беру бойынша",
          doc: "/doc/ru/deputies-requests/tau/request/210423_nt_on additional education.pdf",
          
          answer: [
            {
              date: "21.04.23",
              doc: "/doc/ru/deputies-requests/tau/answer/210423_nt_otvet_on additional education.pdf",
            }
          ]
        },

        {
          date: "05.05.23",
          name: "Білім беру ұйымдарының техникалық персоналының жекелеген санаттарына еңбек демалысына сауықтыру жәрдемақыларын төлеу мәселесі бойынша",
          doc: "/doc/ru/deputies-requests/tau/request/050523_nt_on the issue of payment of health benefits for Labor leave to certain categories of technical personnel of educational organizations.pdf",
          
          answer: [
            {
              date: "05.05.23",
              doc: "/doc/ru/deputies-requests/tau/answer/050523_nt_otvet_on the issue of payment of health benefits for Labor leave to certain categories of technical personnel of educational organizations.pdf",
            }
          ]
        },

        {
          date: "11.05.23",
          name: "Мектеп оқушылары мен жастар арасында «вейп» атымен танымал тұтынудың электрондық жүйелерінің жаппай таралуына тыйым салу туралы",
          doc: "/doc/ru/deputies-requests/tau/request/110523_nt_about the ban on the mass distribution of electronic consumer systems, known as vape among schoolchildren and young people.pdf",
          
          answer: [
            {
              date: "11.05.23",
              doc: "/doc/ru/deputies-requests/tau/answer/110523_nt_otvet_about the ban on the mass distribution of electronic consumer systems, known as vape, among schoolchildren and young people.pdf",
            }
          ]
        },
        
        {
          date: "29.06.23",
          name: "Қазақстандағы отбасы, әйелдер және балалар мен жастардың проблемалық мәселелері",
          doc: "/doc/ru/deputies-requests/tau/request/1 Қазақстандағы отбасы, әйелдер және балалар мен жастардың проблемалық мәселелері 29.06.23 ДЗ.pdf",
          
          answer: [
            {
              date: "31.07.23",
              doc: "/doc/ru/deputies-requests/tau/answer/1 Қазақстандағы отбасыларды, әйелдерді, балалар мен жастарды қолдау жөніндегі 31.07.23 ответ.pdf",
            }
          ]
        },
        {
          date: "22.09.23",
          name: "Паллиативтік көмек туралы",
          doc: "/doc/ru/deputies-requests/tau/request/2 Паллиативтік көмек туралы 22.09.23 ДЗ.pdf",
          
          answer: [
            {
              date: "20.10.23",
              doc: "/doc/ru/deputies-requests/tau/answer/2 Паллиативтік көмек көрсету мәселелеріне қатысты 20.10.23 ответ.pdf",
            }
          ]
        },
        {
          date: "10.11.23",
          name: "Отандық киноиндустрия төңірегіндегі өзекті мәселелер бойынша",
          doc: "/doc/ru/deputies-requests/tau/request/3 Отандық киноиндустрия төңірегіндегі өзекті мәселелер бойынша 10.11.23 ДЗ.pdf",
          
          answer: [
            {
              date: "12.12.23",
              doc: "/doc/ru/deputies-requests/tau/answer/3 Отандық кинематография мәселелері бойынша 12.12.23 ответ.pdf",
            }
          ]
        },
        {
          date: "26.01.24",
          name: "Жатақханалардың жағдайы туралы",
          doc: "/doc/ru/deputies-requests/tau/request/26.01.2024 ДЗ Тау Жатақханалардың жағдайы туралы.pdf",

          answer: [
            {
              date: "26.01.24",
              doc: "/doc/ru/deputies-requests/tau/answer/26.01.2024 ответ Тау Жатақханалардың жағдайы туралы.pdf",
            }
          ]
        },

        {
          date: "05.04.24",
          name: "Туризм саласын дамытуға қатысты",
          doc: "/doc/ru/deputies-requests/tau/request/050424_nt_are related to the development of the tourism industry.pdf",

          answer: []
        }
      ],
    },

    {
      name: t('composition-of-faction.naumova.full-name'),
      img: "/img/uiLanding/fraction/naumova.jpg",
      active: false,
      data: [
        {
          date: "28.04.23",
          name: "Проблема лиц с онкологическими заболеваниями",
          doc: "/doc/ru/deputies-requests/naumova/request/280423_DN_The problem of people with cancer.pdf",
          
          answer: [
            {
              date: "28.04.23",
              name: "Проблема лиц с онкологическими заболеваниями",
              doc: "/doc/ru/deputies-requests/naumova/answer/280423_DN_RESPONSE_The problem of people with cancer.pdf",
            }
          ]
        },

        {
          date: "17.05.23",
          name: "О проблеме трудоустройства молодежи",
          doc: "/doc/ru/deputies-requests/naumova/request/170523_TO the problem of youth employment.pdf",
          
          answer: [
            {
              date: "17.05.23",
              name: "О проблеме трудоустройства молодежи",
              doc: "/doc/ru/deputies-requests/naumova/answer/170523_RESPONSE to the problem of youth employment.pdf",
            }
          ]
        },

        {
          date: "04.10.23",
          name: "Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов",
          doc: "/doc/ru/deputies-requests/naumova/request/Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов 04.10.23 ДЗ.pdf",
          
          answer: [
            {
              date: "03.11.23",
              name: "Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов",
              doc: "/doc/ru/deputies-requests/naumova/answer/Об обеспечении жильем граждан с инвалидностью и семей, имеющих детей-инвалидов 03.11.23 ответ.pdf",
            }
          ]
        },

        {
          date: "04.04.24",
          name: "О трудоустройстве инвалидов",
          doc: "/doc/ru/deputies-requests/naumova/request/040424_DN_O employment of disabled people.pdf",
          
          answer: []
        },
      ],
    },

    {
      name: t('composition-of-faction.kuspenov.full-name'),
      img: "/img/uiLanding/fraction/kuspekov.jpg",
      active: false,
      data: [
        {
          date: "14.04.23",
          name: "Барлық құзыретті органдар мен ұйымдарға ауыл шаруашылығы техникасының жеңілдікті лизинг бағдарламасын жедел іске қосу қажет",
          doc: "/doc/ru/deputies-requests/kuspekov/request/140423_ok_all competent bodies and organizations need to urgently launch the program of preferential leasing of agricultural machinery.pdf",
          
          answer: [
            {
              date: "14.04.23",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/140423_ok_otvet_confessional leasing of agricultural machinery to all competent authorities and organizations.pdf",
            }
          ]
        },

        {
          date: "21.04.23",
          name: "Адам өліміне әкеп соғатын жол-көлік оқиғаларын азайтуға, және осыған жол беретін сыбайлас жемқорлықты жоюға бағытталған жүйелі шараларды қабылдау туралы",
          doc: "/doc/ru/deputies-requests/kuspekov/request/210423_ok_ on the adoption of systematic measures aimed at reducing road accidents that lead to human death and eliminating corruption that leads to this.pdf",
          
          answer: [
            {
              date: "21.04.23",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/210423_ok_otvet_reduce_road_accidents_leading_to_human_death.pdf",
            }
          ]
        },

        {
          date: "05.05.23",
          name: "Адами капиталды дамыту бойынша",
          doc: "/doc/ru/deputies-requests/kuspekov/request/1 Адами капиталды дамыту бойынша 05.05.23 ДЗ.pdf",
          
          answer: [
            {
              date: "26.05.23",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/Адами капиталды дамыту жөніндегі ұлттық бағдарлама түріндегі стратегиялық құжатты әзірлеу жөніндегі 26.05.23 ответ.pdf",
            }
          ]
        },
        {
          date: "16.06.23",
          name: "Колледждердің дамуы бойынша",
          doc: "/doc/ru/deputies-requests/kuspekov/request/2 Колледждердің дамуы бойынша 16.06.23 ДЗ.pdf",
          
          answer: [
            {
              date: "17.07.23",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/Колледждердің дамуы бойынша 17.07.23 ответ.pdf",
            }
          ]
        },
        {
          date: "05.10.23",
          name: "Автокөлік лизингі мәселелері бойынша",
          doc: "/doc/ru/deputies-requests/kuspekov/request/3 Автокөлік лизингі мәселелері бойынша 05.10.23 ДЗ.pdf",
          
          answer: [
            {
              date: "30.10.23",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/Автокөлік лизингі мәселелері бойынша 30.10.23 ответ.pdf",
            }
          ]
        },
        {
          date: "02.02.24",
          name: "Куспеков Агломерация мәселесі",
          doc: "/doc/ru/deputies-requests/kuspekov/request/02.02.24 ДЗ Куспеков Агломерация мәселесі.pdf",
          
          answer: [
            {
              date: "02.02.24",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/02.02.24 ответ акимат Куспеков Агломерация мәселесі.pdf",
            },
            {
              date: "02.02.24",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/02.02.24 ответ ПМ Куспеков Агломерация мәселесі.pdf",
            }
          ]
        },

        {
          date: "28.04.24",
          name: "По вопросам регулирования деятельности риэлтеров",
          doc: "/doc/ru/deputies-requests/kuspekov/request/280224_OK_On_issues_of_regulation_of_realtors_activities.pdf",
          
          answer: [
            {
              date: "28.04.24",
              doc: "/doc/ru/deputies-requests/kuspekov/answer/280224_OC_RESPONSE_On issues of regulation of realtors activities.pdf",
            }
          ]
        },
      ],
    },

    {
      name: t('composition-of-faction.koshmambetov.full-name'),
      img: "/img/uiLanding/fraction/koshmambetov.jpg",
      active: false,
      data: [
        {
          date: "20.03.24",
          name: "Квазимемлекеттік мекемелердің қызметін жетілдіруге қатысты",
          doc: "/doc/ru/deputies-requests/koshmambetov/request/200324_ak_kvazis related to improving the activities of state institutions.pdf",
          
          answer: [
            {
              date: "20.03.24",
              doc: "/doc/ru/deputies-requests/koshmambetov/answer/200324_ak_otvet_kvazin relation to improving the activities of state institutions.pdf",
            }
          ]
        },
      ],
    }
  ]);

  const tableContentList = ref(deputieslist[0].data);

  const toggleShow = (idx: number) => {
    for (let i = 0; i < deputieslist.length; i++) {
      deputieslist[i].active = false;
    }
    deputieslist[idx].active = true;
    tableContentList.value = deputieslist[idx].data.map(item => item).reverse();
  };

  onMounted(() => toggleShow(0))
</script>

<style scoped lang="scss">

.deputies {
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 15px;
  margin-bottom: 50px;

  &-deputy {
    display: grid;
    grid-template-columns: 44px 1fr;
    grid-gap: 10px;
    align-items: center;

    padding: 10px 15px 10px 10px;

    border-radius: 200px;
    border: 2px transparent solid;
    background-color: var(--white-color);
    box-shadow: 0 4px 8px rgba(160,174,192,.08);

    transition: all 0.3s ease-in-out;

    &:hover {
      border-color: var(--accent-color-op50);
      background-color: var(--accent-color-op10);
    }

    &.active {
      background-color: var(--accent-color);

      & span {
        color: var(--white-color);
      }
    }

    &-photo {
      border-radius: 50%;

      &-img {
        padding-bottom: 100%;
      }
    }

    & span {
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 500;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    grid-gap: 15px;
    margin-bottom: 50px;

    &-deputy {
      grid-template-columns: 42px 1fr;
      grid-gap: 10px;

      padding: 8px 15px 8px 8px;

      & span {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 1200px) {
    grid-gap: 12px;
    margin-bottom: 40px;

    &-deputy {
      grid-template-columns: 38px 1fr;
      grid-gap: 8px;

      padding: 4px 10px 4px 4px;

      & span {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 992px) {
    grid-gap: 10px;
    margin-bottom: 30px;

    &-deputy {
      grid-template-columns: 36px 1fr;
      grid-gap: 8px;

      padding: 4px 10px 4px 4px;

      & span {
        font-size: 18px;
      }
    }
  }

  @media (max-width: 768px) {
    grid-gap: 10px 12px;
    margin-bottom: 26px;

    &-deputy {
      padding: 2px 10px 2px 2px;

      & span {
        font-size: 16px;
      }
    }
  }
}

.deputy-requests-table {
  width: 100%;
  max-width: 1490px;
  border: none;
  border-spacing: 0 8px;

  table-layout: fixed;

  & thead {
    & th {
      text-align: left;
      color: var(--primary-color);
      font-size: 20px;
      font-weight: 400;
      line-height: 1.2;
      
      padding-right: 13px;
      padding-right: 0px;
    }

    th:first-child {
      width: 250px;
      padding-left: 42px;
    }

    th:last-child {
      width: 270px;
    }

    td:last-child {
      padding-right: 42px;
    }
  }
  
  & tbody {
    tr {
      border-bottom: 0.5px solid rgba(129, 143, 167, 0.5);

      td {
        padding: 25px;
        padding-left: 0px;

        border: 2px solid transparent;
        background-color: var(--white-color);

        border-color: var(--accent-color-op50);
        background-color: var(--accent-color-op10);

        & span {
          font-size: 20px;
          font-weight: 400;
          line-height: 1.2;
        }
      }

      td:first-child {
        padding-left: 42px;
        
        border-right: none;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }

      td:nth-child(2) {
        border-left: none;
        border-right: none;
      }

      td:last-child {
        padding-right: 42px;
        
        border-left: none;
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;

        & a {
          margin-bottom: 10px;
        }
      }
    }
  }

  & .text-line {
    cursor: pointer;

    display: grid;
    align-items: center;
    grid-template-columns: 32px 1fr;
    grid-gap: 4px;
    
    & span {
      font-size: 18px;
      text-decoration-line: underline;
      transition: all .3s ease-in-out;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
              line-clamp: 2; 
      -webkit-box-orient: vertical;
    }

    &-icon {
      margin-right: 10px;

      & svg {
        width: 32px;
        height: 32px;
      }
    }

    &:hover span {
      color: var(--accent-color);
    }
  }

  // Adaptation
  @media (max-width: 1400px) {
    border-spacing: 0 8px;

    & thead {
      & th {
        font-size: 20px;
        padding-right: 10px;
      }

      th:first-child {
        width: 250px;
        padding-left: 32px;
      }

      th:last-child {
        width: 270px;
      }

      td:last-child {
        padding-right: 32px;
      }
    }
    
    & tbody {
      tr {
        td {
          padding: 18px 20px;
          padding-left: 0px;

          & span {
            font-size: 20px;
          }
        }

        td:first-child {
          padding-left: 32px;
        }

        td:last-child {
          padding-right: 32px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 30px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 18px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    border-spacing: 0 6px;

    & thead {
      & th {
        font-size: 18px;
        padding-right: 10px;
      }

      th:first-child {
        width: 180px;
        padding-left: 28px;
      }

      th:last-child {
        width: 180px;
      }

      td:last-child {
        padding-right: 28px;
      }
    }
    
    & tbody {
      tr {
        td {
          padding: 14px 16px;
          padding-left: 0px;

          & span {
            font-size: 18px;
          }
        }

        td:first-child {
          padding-left: 28px;
        }

        td:last-child {
          padding-right: 28px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 26px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 18px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    border-spacing: 0 4px;

    & thead {
      display: none;
    }
    
    & tbody {
      display: flex;
      flex-direction: column;
      grid-gap: 14px;

      tr {
        display: flex;
        flex-direction: column;

        padding: 14px;
        background-color: var(--accent-color-op10);
        border: 1.4px solid var(--accent-color-op50);
        border-radius: 10px;

        td {
          padding: 0px !important;
          border: none;
          background-color: transparent;
          margin-bottom: 16px;
        }

        td:last-child {
          margin-bottom: 0px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 26px 1fr;
      grid-gap: 4px;
      
      & span {
        font-size: 16px;
      }

      &-icon {
        margin-right: 10px;

        & svg {
          width: 26px;
          height: 26px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    border-spacing: 0 4px;

    & thead {
      & th {
        padding-right: 10px;
      }

      th:first-child {
        width: 120px;
        padding-left: 20px;
      }

      th:last-child {
        width: 120px;
      }

      td:last-child {
        padding-right: 20px;
      }
    }
    
    & tbody {
      tr {
        td {
          border-width: 1.2px;
          padding: 10px 12px;
          padding-left: 0px;

          &::before {
            content: attr(data-title)':';

            display: inline-block;
            margin-bottom: 10px;

            color: var(--primary-color);
            font-size: 18px;
            font-weight: 400;
            line-height: 1.2;
          }
        }

        td:first-child {
          padding-left: 20px;

          &::before {
            display: none;
          }

          & span {
            color: var(--accent-color);
            font-weight: 600;
          }
        }

        td:last-child {
          padding-right: 20px;
        }
      }
    }

    & .text-line {
      grid-template-columns: 24px 1fr;
      grid-gap: 4px;
      
      &-icon {
        margin-right: 10px;

        & svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
