<template>
    <div class="wrapper-main">
      <div class="content">
        <Header />
        
        <section class="landing-block">
          <div class="wrapper landing-wrapper">
            <h2 class="landing-title">
              {{ $t('page.search') }}
            </h2>

            <div class="search-control">
              <Input
                v-model="searchInput"
                :placeholder="$t('formdata.enter-a-search-query')"
              />
            </div>

            <div class="search-blocks">
              <div class="search-blocks-item">
                <div class="search-blocks-item-header">
                  <h2 class="search-blocks-item-header-title">{{ $t('page.about-party') }}</h2>

                  <!-- <RouterLink :to="''" class="itemsList-viewAll">
                    <span>{{ $t('button.view-all') }}</span>
                    <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
                  </RouterLink> -->
                </div>

                <div
                  v-if="searchTotal.length"
                  class="search-blocks-item-list"
                >
                  <RouterLink
                    class="searchItem"
                    v-for="item of searchTotal.slice(0, 10)"
                    :key="item.link"
                    :to="item.link"
                  >
                    <div class="searchItem-content">
                      <div class="searchItem-content-mainInfo">

                        <h3 class="searchItem-content-mainInfo-title">
                          {{ removeHTMLTags(item.title) }}
                          <span v-if="item.subTitle">{{ removeHTMLTags(item.subTitle) }}</span>
                        </h3>

                        <p class="searchItem-content-mainInfo-description">{{ removeHTMLTags(item.description) }}</p>
                      </div>
                      
                      <h4 class="searchItem-content-page">{{ $t('page.title') }} - {{ removeHTMLTags(item.pageName) }} <span v-if="item.subTitle">{{ removeHTMLTags(item.subTitle) }}</span></h4>
                    </div>

                    <button class="itemsList-viewAll accent">
                      <span>{{ $t('button.go-over') }}</span>
                      <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
                    </button>
                  </RouterLink>
                </div>

                <Empty v-else />
              </div>


<!-- 
              <div class="search-blocks-item">
                <div class="search-blocks-item-header">
                  <h2 class="search-blocks-item-header-title">{{ $t('regions.regions-and-deputies-of-maslikhats') }}</h2>

                  <RouterLink :to="''" class="itemsList-viewAll">
                    <span>{{ $t('button.view-all') }}</span>
                    <SvgIcon name="double-arrow-right" :viewboxWidth="24" :viewboxHeight="24" />
                  </RouterLink>
                </div>

                <div
                  v-if="searchTotal.length"
                  class="search-blocks-item-list"
                >
                  
                </div>

                <Empty v-else />
              </div> -->


              
            </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
  import { watch, onMounted, ref } from 'vue';

  import { staticInfoList } from '@/assets/search/blocks.json';
  import i18n from '@/assets/lang'

  import getTranslate from '@/helpers/getTranslate';
  import removeHTMLTags from '@/helpers/removeHTMLTags';
  

  const searchInput = ref('')

  const searchTotal = ref([]);

  const searchScript = (object, title, description = null) => {
    let searchedInTitle = false,
      searchedInDesscription = false,
      searchedInKeywords = false;
    if (title) searchedInTitle = title.toLowerCase().includes(searchInput.value.toLowerCase());
    if (description) searchedInDesscription = description.toLowerCase().includes(searchInput.value.toLowerCase());

    searchedInKeywords = object[`keywords-${i18n.global.locale.value}`].some(keyword =>
      keyword.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    
    return searchedInTitle || searchedInDesscription || searchedInKeywords;
  }
  
  const searchResults = () => {
    searchTotal.value = [];

    // Проходим по каждой странице
    staticInfoList.forEach(page => {
      const pagetitle = getTranslate(page['page-title'])
      const searchedInPage = searchScript(page, pagetitle);

      if (searchedInPage && searchInput.value != '') {
        searchTotal.value.push({
          title: pagetitle,
          subTitle: getTranslate(page.blocks[0]['block-title']),
          description: 
            page.blocks[0]['description'] !== null
              ? getTranslate(page.blocks[0]['description'])
              :
                `${
                  page.blocks[0].content[0]['title'] !== null
                    ? `${getTranslate(page.blocks[0].content[0]['title'])} - `
                    : ''
                }` + getTranslate(page.blocks[0].content[0]['description']),
          link: page['link'],
          pageName: pagetitle
        })
      }

      page.blocks.forEach(block => {
        const blockTitle = getTranslate(block['block-title'])
        const blockDescription = typeof block['description'] == 'string' ? getTranslate(block['description']) : null;

        const searchedInBlock = searchScript(block, blockTitle, blockDescription);
          
        if (searchedInBlock) {
          searchTotal.value.push({
            title: blockTitle,
            subTitle: null,
            description: 
              blockDescription
                ?? `${
                    block.content[0]['title'] !== null
                      ? `${getTranslate(block.content[0]['title'])} - `
                      : ''
                  }` + getTranslate(block.content[0]['description'])
            ,
    
            link: block['link'] ?? page['link'] + block['block-id'],
            pageName: pagetitle
          })
        }

        block.content.forEach(content => {
          const contentTitle = content['title'] != null ? getTranslate(content['title']) : null;
          const contentDescription = getTranslate(content['description'])

          const searchedInContent = searchScript(content, contentTitle, contentDescription);

          if (searchedInContent) {
            searchTotal.value.push({
              title: contentTitle,
              subTitle: blockTitle,
              description: contentDescription,
      
              link: page['link'] + content['content-id'],
              pageName: pagetitle
            })
          }
        });
      });
      
    });

    if (searchInput.value == '') searchTotal.value.shift()
  };


  onMounted(searchResults)

  watch(
    () => searchInput.value,
    searchResults
  )
</script>

<style lang="scss">
  .search {
    min-height: 60vh;

    &-control {
      margin-bottom: 70px;
    }

    &-blocks {
      display: flex;
      flex-direction: column;
      grid-gap: 60px;

      &-item {
        &-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
  
          margin-bottom: 14px;

          &-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--light-gray-color);
          }
        }

        &-list {
          display: flex;
          flex-direction: column;

          & .searchItem:last-of-type {
            border-bottom: none !important;
          }
        }
      }
    }

    // Adaptation
    @media (max-width: 992px) {
      &-control {
        margin-bottom: 60px;
      }

      &-blocks {
        grid-gap: 50px;

        &-item {
          &-header {
            margin-bottom: 12px;

            &-title {
              font-size: 22px;
            }
          }
        }
      }
    }

    @media (max-width: 768px) {
      &-control {
        margin-bottom: 50px;
      }

      &-blocks {
        grid-gap: 40px;

        &-item {
          &-header {
            margin-bottom: 10px;

            &-title {
              font-size: 22px;
            }
          }
        }
      }
    }

    @media (max-width: 576px) {
    }

    @media (max-width: 380px) {
    }
  }

  .searchItem {
    display: flex;
    justify-content: space-between;
    grid-gap: 40px;

    padding: 24px 20px;
    
    border-bottom: 1px solid var(--gray-color-op20);
    background-color: transparent;

    transition: all .3s ease-in-out;

    &:hover {
      background-color: var(--accent-color-op05);

      & .searchItem-content-mainInfo-title {
        color: var(--accent-color);
      }
    }

    &-content {
      &-mainInfo {
        margin-bottom: 14px;

        &-title {
          font-size: 32px;
          font-weight: 600;

          margin-bottom: 4px;

          transition: all .3s ease-in-out;

          & span {
            font-size: 16px;
            color: var(--light-gray-color);
          }
        }

        &-description {
          font-size: 18px;
          font-weight: 400;
          color: var(--gray-color);

          width: 100%;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
                  line-clamp: 2; 
          -webkit-box-orient: vertical;
        }
      }

      &-page,
      &-page span {
        font-size: 16px;
        font-weight: 500;
        color: var(--light-gray-color-op80);

      }

      &-page span {
        display: none;
      }
    }

    // Adaptation
    @media (max-width: 992px) {
      grid-gap: 30px;
      padding: 22px 18px;

      &-content {
        &-mainInfo {
          margin-bottom: 12px;

          &-title {
            font-size: 26px;
            margin-bottom: 2px;

            & span {
              font-size: 14px;
            }
          }

          &-description {
            font-size: 16px;
          }
        }

        &-page,
        &-page span {
          font-size: 14px;
        }
      }
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: end;
      grid-gap: 8px;

      padding: 20px 16px;

      &-content {
        width: 100%;

        &-mainInfo {
          margin-bottom: 8px;

          &-title {
            font-size: 22px;
            margin-bottom: 4px;

            & span {
              display: none !important;
            }
          }

          &-description {
            font-size: 14px;
          }
        }

        &-page span {
          display: inline;
        }
      }
    }

    @media (max-width: 576px) {
      padding: 16px 15px;
      margin: 0 -15px;

      &-content {
        &-mainInfo {
          margin-bottom: 6px;

          &-title {
            font-size: 20px;
            margin-bottom: 3px;
          }
        }
      }
    }
  }
</style>