/**
* 新闻中心
*/
<template>
  <div class="newsCenter container_top">
    <header-fix :title="articleTitle" fixed>
      <div slot="left">
        <a @click="goBack"><i class="webapp webapp-back"></i></a>
        <a @click="toggleNav" class="category_icon"><i class="webapp webapp-category"></i></a>
      </div>
      <router-link slot="right" to="/newsSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <nav-slide :show="showSlide" @showChange="showChange">
      <div slot="left" class="category">
        <tree :data="articleCategory" :on-select="searchArticle" :selected-id="categoryId"/>
      </div>
      <div slot="right">
        <section v-infinite-scroll="getArticleList"
                 infinite-scroll-immediate-check="immediate"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
          <news-list :news-data="articleData" :no-data-bg="noDataBg" :no-data="noData"></news-list>
        </section>
      </div>
    </nav-slide>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { headerFix, navSlide, tree, newsList } from '../components'
  import { GetArticleChannelInfoList, GetArticleInfoList } from '../service/getData'
  import { goBack } from '../service/mixins'
  import { changeTitle } from '../plugins/utils'

  Vue.use(InfiniteScroll)

  export default {
    mixins: [goBack],
    data () {
      return {
        articleTitle: '资讯中心',
        showSlide: false,
        articleCategory: [],
        categoryId: 0,
        categoryCode: '',
        articleData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false
      }
    },
    created () {
      this.categoryId = this.$route.query.id
      this.categoryCode = this.$route.query.categoryCode
      this.articleTitle = this.$route.query.title
    },
    mounted () {
      this.getArticleCategory()
      this.getArticleList()
    },
    components: {
      headerFix,
      navSlide,
      tree,
      newsList
    },
    methods: {
      toggleNav () {
        this.showSlide = !this.showSlide
      },
      showChange (val) {
        this.showSlide = val
      },
      //文章分类
      async getArticleCategory () {
        let data = await GetArticleChannelInfoList()
        if (data.Type == 1) {
          this.articleCategory = data.Data.ArticleCategoryResult
        }
      },
      //文章列表
      async getArticleList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        Indicator.open()
        let params = this.categoryId ? {
          CategoryId: this.categoryId,
          Page: this.page
        } : {
          CategoryCode: this.categoryCode,
          Page: this.page
        }
        let data = await GetArticleInfoList(params)
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data.List
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.articleData = this.articleData.concat(list)
          this.loading = false
          this.page += 1
        }
      },
      searchArticle (data) {
        this.page = 1
        this.categoryId = data.Id
        this.articleTitle = data.Name
        this.showSlide = false
        this.articleData = []
        this.getArticleList()
      }
    },
    watch: {
      articleTitle (val) {
        changeTitle(val)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .newsCenter {
    width: 100vw;
    height: 100vh;

    .category_icon {
      margin-left: toRem(10px);
    }
  }
</style>
