<template>
  <div class="notice_list_page container_top">
    <header-fix title="通知公告" fixed>
      <i class="webapp webapp-back" slot="left" @click="goBack"/>
    </header-fix>
    <section v-infinite-scroll="getNoticeList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <div class="notice_list">
        <div class="notice_item" v-for="item in noticeList"
             :key="item.NoticeId"
             @click.stop="linkTo(item.NoticeId)">
          <div class="message_title" :class="{'read':item.ReadFlag}">{{item.NoticeTitle}}</div>
          <div class="message_info clearFix">
            <span class="pull-left">{{item.NoticeCreatedate | dateFilter('yyyy.MM.dd')}}</span>
          </div>
        </div>
      </div>
      <div class="noDataBg" v-if="noDataBg"></div>
      <div class="no-data" v-if="noData">没有更多内容了...</div>
    </section>
  </div>
</template>

<script>
  import { goBack } from '../service/mixins'
  import { headerFix } from '../components'
  import { GetNoticeInfoList } from '../service/getData'

  export default {
    name: 'noticeList',
    mixins: [goBack],
    components: { headerFix },
    data () {
      return {
        page: 1,
        noticeList: [],
        noData: false,
        noDataBg: false,
        immediate: false,
        loading: false
      }
    },
    created () {
      this.getNoticeList()
    },
    methods: {
      async getNoticeList () {
        let res = await GetNoticeInfoList({ Page: this.page })
        if (res.Type === 1) {
          let list = res.Data.List
          if (list.length === 0) {
            if (this.page === 1) {
              this.noDataBg = true
              return
            }
            if (this.page > 1) {
              this.noData = true
              return
            }
          }
          this.page++
          this.noticeList = this.noticeList.concat(list)
        }
      },
      linkTo (id) {
        this.$router.push({ path: '/messageDetail', query: { id, title: '通知详情' } })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/mixin";

  .notice_list_page {
    .notice_item {
      background-color: $fill-base;
      padding: toRem(25px) toRem(30px);
      border-bottom: 1px solid $border-color-base;
    }

    .message_title {
      margin-bottom: toRem(20px);
      color: $color-text-base;
      font-size: toRem(28px);

      &.read {
        color: $color-text-secondary;
      }
    }

    .message_info {
      color: $color-text-secondary;

      img {
        width: toRem(33px);
      }
    }
  }
</style>
