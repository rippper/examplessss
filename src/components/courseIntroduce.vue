/**
* 课程介绍
*/
<template>
  <div class="course_introduce">
    <div class="course_detail_name">
      <p class="title">{{courseDetails.CourseName}}</p>
      <div class="clearFix">
        <div class="star_container pull-left">
          <star v-model="courseDetails.AvgScore" size="small" disabled show-score/>
        </div>
        <span class="pull-left userCount">{{courseDetails.UserCount}}人学过</span>
        <span class="pull-right">讲师：{{courseDetails.TeacherName}}</span>
      </div>
    </div>
    <div class="course_detail_list">
      <div class="detail_item">
        <p class="detail_item_left"><span class="label">课程分类：</span>{{courseDetails.ChannelName}}</p>
        <p class="detail_item_right"><span
          class="label">学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时：</span>{{courseDetails.Credit}}</p>
      </div>
      <div class="detail_item">
        <p class="detail_item_left"><span
          class="label">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</span>{{courseDetails.Duration}}分钟</p>
        <p class="detail_item_right"><span
          class="label">进&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span>{{courseDetails.BrowseScore}}</p>
      </div>
    </div>
    <div class="split"></div>
    <div class="course_detail_desc">
      <h4><span class="primary_line"></span><span>课程介绍</span></h4>
      <p>{{courseDetails.Description}}</p>
    </div>
    <!--<div class="course_collect">
      <mt-button v-if="!isCollect" type="primary" size="large" @click.native="courseCollect">
        <i class="webapp webapp-like_fill"></i>
        收藏
      </mt-button>
      <mt-button v-else type="primary" size="large" @click.native="cancelCollect">
        <i class="webapp webapp-like"></i>
        取消收藏
      </mt-button>
    </div>-->
  </div>
</template>
<script>
  import Vue from 'vue'
  import star from './star.vue'
  import { Toast, Button } from 'mint-ui'
  import { AddCollectionList, DeleteCollectionList } from '../service/getData'

  Vue.component(Button.name, Button)
  export default {
    data () {
      return {
        isCollect: 0
      }
    },
    props: {
      courseDetails: {
        type: Object,
        required: true
      }
    },
    components: {
      star
    },
    methods: {
      // 收藏
      async courseCollect () {
        let data = await AddCollectionList({ ObjId: this.courseDetails.CourseId, ObjType: 1 })
        if (data.Type === 1) {
          Toast({ message: '收藏成功', position: 'bottom' })
          this.isCollect = true
        }
      },
      // 取消收藏
      async cancelCollect () {
        let IdItem = []
        IdItem.push(this.courseDetails.CourseId)
        let data = await DeleteCollectionList({ IdItem })
        if (data.Type === 1) {
          Toast({ message: '取消收藏成功', position: 'bottom' })
          this.isCollect = false
        }
      }
    },
    watch: {
      'courseDetails.IsCollection': {
        handler (newValue, oldValue) {
          if (typeof newValue !== 'undefined') {
            this.isCollect = newValue !== 0
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .course_introduce {
    background-color: $fill-base;

    .course_detail_name {
      margin: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      line-height: toRem(40px);
      font-size: 14px;

      .title {
        font-size: 15px;
        line-height: toRem(84px);
      }

      .userCount {
        margin-left: toRem(30px);
        font-size: 12px;
        color: $color-text-thirdly;
      }

      .clearFix {
        padding: toRem(20px) 0;
      }
    }

    .course_detail_list {
      .detail_item {
        line-height: toRem(60px);
        padding: 0 toRem(30px);
        font-size: 14px;
        @extend %clearFix;

        .label {
          color: $color-text-thirdly;
          margin-right: toRem(20px);
        }
      }

      .detail_item_left {
        @extend %pull-left;
        @extend %ellipsis;
        width: 55%;
      }

      .detail_item_right {
        @extend %pull-left;
        @extend %ellipsis;
        width: 45%;
        padding-left: toRem(40px);
      }
    }

    .course_detail_desc {
      padding: toRem(30px);

      h4 {
        font-size: 14px;
      }
    }

    .split {
      display: block;
      height: toRem(20px);
      background-color: $fill-body;
    }

    .course_collect {
      padding: toRem(78px) toRem(30px) toRem(105px);
    }
  }
</style>
