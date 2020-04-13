<template>
  <div class="home_index container_both">
    <header-fix title="首页" fixed>
      <router-link slot="left" to="/message" class="message_icon">
        <i class="webapp webapp-email"></i>
      </router-link>
      <div slot="right" class="clearFix">
        <router-link to="/history" class="history">
          <i class="webapp webapp-time"></i>
        </router-link>
        <img src="../assets/info_show.png" exam @click="toggleModel" alt="用户信息" class="info_show"/>
      </div>
    </header-fix>
    <div class="container">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <a :href="bannerLink">
            <img src="../assets/home_banner.jpg" alt="">
          </a>
        </mt-swipe-item>
        <mt-swipe-item v-for="item in swipeData" :key="item.Id">
          <a :href="item.Url">
            <error-img :src="item.Icon"></error-img>
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <section class="guide_list">
        <div class="guide_container">
          <div class="guide_item">
            <router-link to="/myCourse">
              <img src="../assets/my_course.png" alt="我的课程">
              <p>我的课程</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link :to="{name:'newsCenter', query: {categoryCode:'cadreEducationNews', title:'干教资讯'}}">
              <img src="../assets/news_ico.png" alt="干教资讯">
              <p>干教资讯</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/rankList">
              <img src="../assets/rank_ico.png" alt="排行榜">
              <p>排行榜</p>
            </router-link>
          </div>
          <!--<div class="guide_item">
            <router-link to="/resultShow">
              <img src="../assets/result_show_icon.png" alt="成果展示">
              <p>成果展示</p>
            </router-link>
          </div>-->
          <div class="guide_item">
            <router-link to="/classGarden">
              <img src="../assets/class_ico.png" alt="班级园地">
              <p>班级园地</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/ebook">
              <img src="../assets/ebook_ico.png" alt="电子书">
              <p>电子书</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/communication">
              <img src="../assets/communication_ico.png" alt="交流评论">
              <p>交流评论</p>
            </router-link>
          </div>
          <div class="guide_item">
            <router-link to="/noticeList">
              <img src="../assets/notice_ico.png" alt="通知公告">
              <p>通知公告</p>
            </router-link>
          </div>
        </div>
      </section>
      <div class="boundary"></div>
      <section class="recommend_course">
        <div class="recommend_title"><span class="primary_line"></span>课程推荐</div>
        <div class="recommend_course_list">
          <ul>
            <li v-for="item in recommendCourseData" :key="item.Id">
              <div class="recommend_course_item" @click="toPlay(item.CourseType,item.CourseId)">
                <a>
                  <error-img :src="item.CourseImg" :error-src="noCourse"></error-img>
                  <p class="course_title">{{item.CourseName}}</p>
                </a>
                <p class="clearFix"><span class="teacher pull-left">主讲人：{{item.TeacherName}}</span><span
                  class="highlight pull-right">{{item.Credit}}学时</span></p>
              </div>
            </li>
          </ul>
          <div class="noDataBg" v-if="recommendCourseData.length === 0"></div>
        </div>
      </section>
    </div>
    <footer-fix selected="home"></footer-fix>
    <mb-model :isShow.sync="showModel">
      <div class="info_content" slot>
        <div class="info_layer_avatar">
          <img class="avatar" src="../assets/user_avatar.png" alt="用户头像">
          <p>{{userInfo.Username}}</p>
        </div>
        <div class="info_detail">
          <h4>您好，欢迎来到干部教育网络学院</h4>
          <p><span>已获{{userInfo.TotalCredit}}学时，排名第{{userInfo.ScoreRank}}名</span></p>
        </div>
      </div>
    </mb-model>
  </div>

</template>
<script>
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex'
  import { MessageBox, Swipe, SwipeItem } from 'mint-ui'
  import { headerFix, errorImg, footerFix, mbModel } from '../components'
  import { GetLink, GetCourseDetail, Login, GetCourseInfoList } from '../service/getData'
  import { toPlay } from '../service/mixins'
  import noCourse from '../assets/noCourse.png'
  import { getQueryString } from '../plugins/utils'
  import { isBindWechat } from '../service/config'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  export default {
    name: 'home',
    mixins: [toPlay],
    data () {
      return {
        showModel: false,
        swipeData: [],
        recommendCourseData: [],
        noCourse,
        code: ''
      }
    },
    components: {
      footerFix,
      errorImg,
      headerFix,
      mbModel
    },
    created () {
      this.getUserAgent()
    },
    mounted () {
      this.code = getQueryString('code')
      this.getRecommendCourse()
      this.getSwipeData()
      let ASPXAUTH = window.localStorage.getItem('ASPXAUTH')
      if (this.userAgent.weixin && isBindWechat) {
        if (ASPXAUTH) {
          this.getUserInformation()
        } else {
          /*自动登录*/
          this.login()
        }
      } else {
        this.getUserInformation()
      }
    },
    computed: {
      ...mapState(['userAgent', 'wxLoginUrl', 'wxIndexUrl', 'userInfo']),
      bannerLink () {
        return `http://www.51fenmiao.cn/wechat/#/bindMobile?platformAccount=${this.userInfo.UserAccount}&platformNumber=769`
      }
    },
    methods: {
      ...mapActions(['getUserAgent', 'getUserInformation']),
      async login () {
        let res = await Login({ Code: this.code })
        if (res.Type == 1) {
          /*登录成功*/
          this.getUserInformation()
        } else {
          MessageBox('警告', res.Message)
            .then(() => {
              window.location.href = this.wxLoginUrl
            })
        }
      },
      /*推荐课程*/
      async getRecommendCourse () {
        let data = await GetCourseInfoList()
        if (data.Type == 1) {
          this.recommendCourseData = data.Data.List
        }
      },
      /*轮播*/
      async getSwipeData () {
        let data = await GetLink()
        if (data.Type == 1) {
          this.swipeData = data.Data
        }
      },
      async getCourseDetail (Id) {
        let data = await GetCourseDetail({ Id })
        if (data.Type == 1) {
          this.toPlay(data.Data.CourseType, Id)
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      },
      toggleModel () {
        this.showModel = !this.showModel
      },
      judgeUrl (type, id) {
        let path = ''
        switch (type) {
          case 'CourseList':
            path = `/courseCenter`
            break
          case 'Article':
            path = `/newsDetails`
            break
          case 'Course':
            this.getCourseDetail(id)
            break
          case 'ArticleList':
            path = `/newsCenter`
            break
        }
        this.$router.push({ path, query: { id } })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .home_index {
    .header {
      .message_icon {
        @extend %pull-left;
        height: toRem(92px);
      }

      .webapp {
        color: $color-text-reverse;
        font-size: toRem(50px);
      }

      .history {
        @extend %pull-right;
        height: toRem(92px);
      }

      .info_show {
        width: toRem(50px);
        margin-right: toRem(25px);
        @extend %pull-right;
        margin-top: toRem(18px);
      }
    }

    .info_content {
      background: url(../assets/info_bg.png) no-repeat center bottom;
      background-size: toRem(571px) toRem(345px);
      height: toRem(533px);

      .info_layer_avatar {
        text-align: center;
        line-height: toRem(60px);
        font-size: 12px;
      }

      .avatar {
        margin-top: toRem(18px);
        @include square(117px);
      }

      .info_detail {
        text-align: center;
        padding: toRem(100px) toRem(10px) 0 toRem(10px);

        h4 {
          font-size: 14px;
        }

        p {
          margin-top: toRem(40px);
          color: $color-text-secondary;
          font-size: 13px;
        }
      }
    }

    .mint-swipe {
      height: toRem(360px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .guide_list {
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        width: 0px;
      }

      background-color: $fill-base;
      height: toRem(202px);

      .guide_container {
        width: auto;
        text-align: center;
        @include flex(flex-start);
        flex-wrap: nowrap;
      }

      .guide_item {
        flex-shrink: 0;
        width: toRem(150px);
        padding: toRem(40px) 0;

        p {
          line-height: toRem(50px);
        }

        img {
          width: toRem(84px);
        }
      }
    }

    .boundary {
      display: block;
      width: 100%;
      height: toRem(20px);
      background-color: #ebf1f1;
    }

    .recommend_course {
      padding: toRem(30px) 0 toRem(20px) toRem(25px);
      background-color: #fff;

      .recommend_title {
        font-size: 14px;
        line-height: toRem(62px);

        .primary_line {
          position: relative;
          top: 2px;
        }
      }

      .recommend_course_list {
        ul {
          @extend %clearFix;
        }

        li {
          @extend %pull-left;
          width: 50%;
          text-align: center;
          margin-top: toRem(30px);

          .recommend_course_item {
            padding-right: toRem(25px);
          }

          img {
            width: toRem(334px);
            height: toRem(178px);
          }

          .course_title {
            width: 100%;
            @extend %ellipsis;
            text-align: left;
            line-height: toRem(40px);
            font-size: 13px;
          }

          .clearFix {
            line-height: toRem(40px);
          }

          .teacher {
            color: $color-text-thirdly;
          }
        }
      }
    }
  }
</style>
