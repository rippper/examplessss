/**
* 个人中心
*/
<template>
  <div class="personalCenter container_bottom">
    <div class="person_top">
      <img src="../assets/person_cener_avatar.png" alt="">
      <div class="my_info">
        <h4>{{userInfo.Username}}</h4>
        <p>
          学时：{{userInfo.MobileCredit}}
          <!--<span class="shuxian">|</span>
          等级：{{userInfo.TotalCredit}}-->
          <!--<span class="shuxian">|</span>
          学习币：{{userInfo.Cion}}-->
        </p>
      </div>
    </div>
    <div class="cell_list_one">
      <!--<mt-cell title="我的收藏" is-link to="/myCollect">
        <i slot="icon" class="webapp webapp-shoucang" style="color: #e95c2c;"></i>
      </mt-cell>
      <mt-cell title="学习档案" is-link to="/learningPortfolio">
        <i slot="icon" class="webapp webapp-kecheng" style="color: #00ce6a;"></i>
      </mt-cell>-->
      <mt-cell title="我的学时" is-link to="/myCredit">
        <i slot="icon" class="webapp webapp-kecheng" style="color: #ce76a4;"></i>
      </mt-cell>
      <mt-cell title="我的课程" is-link to="/myCourse">
        <i slot="icon" class="webapp webapp-kecheng" style="color: #ce76a4;"></i>
      </mt-cell>
    </div>
    <div class="cell_list_two">
      <mt-cell title="我的考试" is-link to="/examCenter">
        <i slot="icon" class="webapp webapp-exam" style="color: #49e2fe;"></i>
      </mt-cell>
    </div>
    <!--<div class="cell_list_two">
      <mt-cell title="站内信息" is-link to="/notice">
        <i slot="icon" class="webapp webapp-advise" style="color: #a59be7;"></i>
      </mt-cell>
      <mt-cell title="操作指南" is-link to="/newsDetails?id=3">
        <i slot="icon" class="webapp webapp-book" style="color: #f5c754;"></i>
      </mt-cell>
    </div>-->
    <div class="cell_list_three">
      <mt-cell title="设置" is-link to="/setting">
        <i slot="icon" class="webapp webapp-set" style="color: #ec80c6;"></i>
      </mt-cell>
    </div>
    <div class="exit">
      <mt-button v-if="userAgent.weixin && isBindWechat" @click.native="delBind" type="primary" size="large">
        解除微信绑定
      </mt-button>
      <mt-button v-else @click.native="exit" type="primary" size="large">安全退出</mt-button>
    </div>
    <footer-fix selected="personalCenter"/>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MessageBox, Cell, Button } from 'mint-ui'
  import { mapState, mapActions } from 'vuex'
  import { footerFix } from '../components'
  import { LoginOut, DelBind } from '../service/getData'
  import { isBindWechat } from '../service/config'

  Vue.component(Cell.name, Cell)
  Vue.component(Button.name, Button)
  export default {
    data () {
      return {
        isBindWechat
      }
    },
    mounted () {
      this.getUserInformation()
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'wxLoginUrl'])
    },
    components: {
      footerFix
    },
    methods: {
      ...mapActions(['getUserInformation']),
      async exit () {
        let data = await LoginOut()
        if (data.Type == 1) {
          window.localStorage.removeItem('ASPXAUTH')
          this.$router.push('/login')
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      },
      async delBind () {
        let data = await DelBind()
        if (data.Type == 1) {
          window.localStorage.removeItem('ASPXAUTH')
          window.location.href = this.wxLoginUrl
        } else if (data.Type != 401) {
          MessageBox('警告', data.Message)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .personalCenter {
    background-color: $fill-body;

    .person_top {
      width: 10rem;
      height: toRem(390px);
      padding: 0 toRem(36px);
      background: url("../assets/person_center_bg.png") no-repeat center;
      background-size: 10rem toRem(390px);
      @include flex(flex-start);
      align-items: center;

      img {
        @include square(128px);
        margin-top: toRem(65px);
      }

      .my_info {
        padding-left: toRem(20px);
        color: $color-text-reverse;
        margin-top: toRem(65px);

        h4 {
          font-size: 16px;
          color: $color-text-reverse;
          margin-bottom: toRem(30px);
        }

        p {
          font-size: 14px;
        }

        .shuxian {
          margin: 0 toRem(15px);
        }
      }
    }

    .cell_list_one, .cell_list_two, .cell_list_three {
      padding: 0 toRem(30px);
      background-color: $fill-base;
    }

    .cell_list_two {
      margin: toRem(30px) 0;
    }

    .exit {
      padding: toRem(50px) toRem(30px) toRem(10px) toRem(30px);
    }

    .webapp {
      font-size: toRem(32px);
    }
  }
</style>
