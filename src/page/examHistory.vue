/**
* 考试记录
*/
<template>
  <div class="exam_history container_top">
    <!--头部-->
    <header-fix title="考试记录" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <!--<section v-infinite-scroll="getPaperList"
             infinite-scroll-immediate-check="immediate"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
      <exam-history-list :history-data="examData"
                         :no-data-bg="noDataBg"
                         :no-data="noData">
      </exam-history-list>
    </section>-->
    <exam-history-list :history-data="examData"
                       :no-data-bg="noDataBg"
                       :no-data="noData">
    </exam-history-list>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui'
  import { headerFix, examHistoryList } from '../components'
  import { goBack } from '../service/mixins'
  import { GetPaperList } from '../service/getData'

  export default {
    mixins: [goBack],
    data () {
      return {
        typeId: 0, //考试typeId
        examData: [], //考试列表数据
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false
      }
    },
    created () {

    },
    mounted () {
      this.getPaperList()
    },
    props: [],
    components: {
      headerFix,
      examHistoryList
    },
    computed: {},
    updated () {

    },
    methods: {
      async getPaperList () {
        this.noData = false
        this.noDataBg = false
//        this.loading = true
        Indicator.open()
        let data = await GetPaperList()
        Indicator.close()
        if (data.Type == 1) {
          let list = data.Data
          this.examData = list
          /*if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
//          this.examData = this.examData.concat(list)
          this.examData = list
          this.loading = false
          this.page += 1*/
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

</style>
