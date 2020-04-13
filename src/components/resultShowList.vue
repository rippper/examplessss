/**
* 成果展示列表
*/
<template>
  <div class="result_show_list">
    <ul>
      <li v-for="(item,index) in data" @click="goDetail(item.ProductionId)" :key="index">
        <error-img :src="item.ProductionImage" alt=""></error-img>
        <p class="result_title">{{item.ProductionTitle}}</p>
        <div class="restule_desc clearFix">
          <span class="result_good pull-left"><i class="webapp webapp-goodfill"></i>{{item.AssistCount}}</span>
          <span class="result_comment pull-right"><i class="webapp webapp-commentfill"></i>{{item.CommontCount}}</span>
        </div>
      </li>
    </ul>
    <div class="noDataBg" v-if="noDataBg"></div>
    <div class="no-data" v-if="noData">没有更多内容了...</div>
  </div>
</template>
<script>
  import { errorImg } from '../components'

  export default {
    mixins: [],
    data () {
      return {}
    },
    created () {

    },
    mounted () {

    },
    props: {
      data: {
        type: Array,
        required: true
      },
      noDataBg: {
        type: Boolean,
        default: false
      },
      noData: {
        type: Boolean,
        default: false
      }
    },
    components: {
      errorImg
    },
    computed: {},
    updated () {

    },
    methods: {
      goDetail (id) {
        this.$router.push({ path: 'resultShowDetail', query: { id } })
      }
    },
    watch: {}

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .result_show_list {
    ul {
      @extend %clearFix;

      li {
        @extend %pull-left;
        width: 50%;
        background-color: $fill-base;
        margin-top: toRem(20px);
        text-align: center;

        img {
          width: toRem(341px);
          height: toRem(211px);
        }

        &:nth-child(odd) {
          padding: toRem(30px) toRem(20px) toRem(30px) toRem(20px);
        }

        &:nth-child(even) {
          padding: toRem(30px) toRem(20px) toRem(30px) 0;
        }
      }

      .restule_desc {
        color: $color-text-thirdly;

        .webapp {
          color: $color-text-thirdly;
          font-size: 14px;
          margin-right: toRem(5px);
        }
      }

      .result_title {
        @include ellipsis_two(1);
        text-align: left;
        margin: toRem(20px) 0;
      }

      .result_good {

      }

      .result_comment {

      }
    }
  }
</style>
