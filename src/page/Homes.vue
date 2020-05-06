<template>
    <div class="Home">
        <div class="h_top_nav">
            <div class="h_top_nav_left">
                <img src="../assets/tz_logo.png" alt>
            </div>
            <div class="h_top_nav_right">
                <ul>
                    <li>
                        <a href="javascript:;">
                            <img src="../assets/tz_search.png" alt>
                        </a>
                    </li>
                    <li>
                        <a href="javascript" class="h_tnr_emailbg">
                            <img src="../assets/tz_email.png" alt>
                            <div class="h_tnr_emailnum" v-text="emailNum"></div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <index3DBanner :topBanner="topBanner"></index3DBanner>
        <div class="h_middle_nav">
            <ul>
                <li>
                    <div>
                        <img src="../assets/ks_xwzx.png" alt>
                    </div>
                    <p>新闻资讯</p>
                </li>
                <li>
                    <div>
                        <img src="../assets/ks_mzyl.png" alt>
                    </div>
                    <p>每周一练</p>
                </li>
                <li>
                    <div>
                        <img src="../assets/ks_fmkt.png" alt>
                    </div>
                    <p>分秒课堂</p>
                </li>
                <li>
                    <div>
                        <img src="../assets/ks_jfsc.png" alt>
                    </div>
                    <p>积分商城</p>
                </li>
            </ul>
        </div>
        <div class="h_middle_kstz">
            <div class="hm_kstz_title">
                <div class="hm_kstz_tl">
                    昆山统战
                </div>
                <div class="hm_kstz_tr">
                    <a href="javascript:;">更多+</a>
                </div>
            </div>
            <div class="hm_kstz_list">
                <ul>
                    <li>
                        <mt-swipe :auto="4000" :show-indicators="false">
                            <mt-swipe-item v-for="(item, index) in kstzBanner" :key="index">
                                <div>
                                    <div>
                                        <img :src="item.Img" alt>
                                    </div>
                                    <div class="hm_kstz_content">
                                        <div class="hm_kstz_content_title">
                                            <p v-text="item.Title"></p>
                                            <div class="hm_kstz_ct_pagelist">
                                                <span class="hm_kstz_ct_current" v-text="index + 1"></span> / <span class="hm_kstz_ct_all" v-text="kstzBanner.length"></span>
                                            </div>
                                        </div>
                                        <div class="hm_kstz_content_date">
                                            发布时间: <span v-text="item.Date"></span>
                                        </div>
                                    </div>
                                </div>
                            </mt-swipe-item>
                        </mt-swipe>
                    </li>
                    <li v-for="(item, index) in kstzBottomList" :key="index">
                        <div class="hm_kstz_content">
                            <div class="hm_kstz_content_title">
                                <p v-text="item.Title"></p>
                            </div>
                            <div class="hm_kstz_content_date">
                                发布时间: <span v-text="item.Date"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="h_bottom_fmkt">
            <div class="hm_kstz_title">
                <div class="hm_kstz_tl">
                    分秒课堂
                </div>
                <div class="hm_kstz_tr">
                    <a href="javascript:;">更多+</a>
                </div>
            </div>
            <div class="hm_fmkt_list">
                <ul>
                    <li v-for="(item, index) in courseList" :key="index">
                        <a href="javascript:;">
                            <div class="hm_fmkt_list_ip">
                                <img class="hm_fmkt_list_ci" :src="item.Img" alt>
                                <img class="hm_fmkt_list_play" src="../assets/ks_bofang.png" alt>
                            </div>
                            <div class="hm_fmkt_list_title">
                                <p v-text="item.Title"></p>
                            </div>
                            <div class="hm_fmkt_list_score">
                                <div class="hm_fmkt_list_sinfo">
                                    学时：<span v-text="item.Score"></span>
                                </div>
                                <div class="hm_fmkt_list_tea" v-text="item.Teacher"></div>
                            </div>
                            <div class="hm_fmkt_list_tp">
                                <div class="hm_fmkt_list_type" v-text="item.labelType"></div>
                                <div class="hm_fmkt_list_time" v-text="item.Time"></div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <bottomBar Selected="1"></bottomBar>
    </div>
</template>

<script>
import Vue from 'vue'
import { index3DBanner, bottomBar } from '../components'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
    name: 'Home',
    data () {
        return {
            emailNum: '10', // 顶部邮箱消息数
            topBanner: [
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-04-29'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-04-30'
                },
                {
                    Img: require('../assets/example/example003.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-05-02'
                },
                {
                    Img: require('../assets/example/example004.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-05-03'
                },
                {
                    Img: require('../assets/example/example005.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-05-05'
                }
            ],
            kstzBanner: [
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义学习进行时：在习近平新时代中国特色社会主义学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-04-29'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-04-30'
                },
                {
                    Img: require('../assets/example/example003.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-05-02'
                }
            ],
            kstzBottomList: [
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义中国特色社会主义中国特色社会主义中国特色社会主义义中国特色社会主义中国特色社会义中国特色社会主义中国特色社会...',
                    Date: '2020-04-29'
                },
                {
                    Img: require('../assets/example/example002.jpg'),
                    Title: '学习进行时：在习近平新时代中国特色社会主义...',
                    Date: '2020-04-30'
                }
            ],
            courseList: [
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '让改革发展惠及人民',
                    Score: '1.5',
                    Teacher: '刘大春',
                    labelType: '政治理论',
                    Time: '02:50'
                },
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '让改革发展惠及人民',
                    Score: '1.5',
                    Teacher: '刘大春',
                    labelType: '政治理论',
                    Time: '02:50'
                },
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '让改革发展惠及人民',
                    Score: '1.5',
                    Teacher: '刘大春',
                    labelType: '政治理论',
                    Time: '02:50'
                },
                {
                    Img: require('../assets/example/example001.jpg'),
                    Title: '让改革发展惠及人民',
                    Score: '1.5',
                    Teacher: '刘大春',
                    labelType: '政治理论',
                    Time: '02:50'
                }
            ]
        }
    },
    mounted () {

    },
    methods: {

    },
    components: {
        index3DBanner,
        bottomBar
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.Home{
    max-width: 10rem;
    padding-bottom: toRem(150px);
    margin: 0 auto;
    background: #fff url('../assets/tz_homebg.png') no-repeat 0 toRem(-40px);
    background-size: 100%;
    .h_top_nav{
        width: toRem(690px);
        height: toRem(88px);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .h_top_nav_left{
            img{
                width: toRem(374px);
                height: toRem(45px);
            }
        }
        .h_top_nav_right{
            ul{
                width: toRem(129px);
                padding-right: toRem(18px);
                display: flex;
                justify-content: space-between;
                li{
                    &:first-of-type{
                        img{
                            width: toRem(40px);
                            height: toRem(40px);
                        }
                    }
                    &:last-of-type{
                        img{
                            width: toRem(45px);
                            height: toRem(38px);
                        }
                        .h_tnr_emailbg{
                            position: relative;
                        }
                        .h_tnr_emailnum{
                            width: toRem(37px);
                            height: toRem(37px);
                            line-height: toRem(37px);
                            border-radius: toRem(37px);
                            text-align: center;
                            font-size: 0.3rem;
                            background: #fff;
                            color: $brand-background;
                            position: absolute;
                            top: toRem(-18px);
                            right: toRem(-18px);
                        }
                    }
                }
            }
        }
    }
    .h_middle_nav{
        width: toRem(690px);
        margin: toRem(40px) auto 0;
        ul{
            width: 100%;
            display: flex;
            justify-content: space-between;
            li{
                width: 25%;
                text-align: center;
                p{
                    margin-top: toRem(22px);
                    font-size: toRem(28px);
                }
                &:first-of-type{
                    img{
                        width: toRem(50px);
                        height: toRem(60px);
                    }
                }
                &:nth-of-type(2){
                    img{
                        width: toRem(59px);
                        height: toRem(59px);
                    }
                }
                &:nth-of-type(3){
                    img{
                        width: toRem(52px);
                        height: toRem(59px);
                    }
                }
                &:last-of-type{
                    img{
                        width: toRem(67px);
                        height: toRem(58px);
                    }
                }
            }
        }
    }
    .h_middle_kstz, .h_bottom_fmkt{
        margin-top: toRem(34px);
        .hm_kstz_title{
            width: toRem(690px);
            height: toRem(89px);
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .hm_kstz_tl{
                font-size: toRem(38px);
                font-weight: bolder;
            }
            .hm_kstz_tr{
                a{
                    font-size: toRem(22px);
                    color: #989898;
                }
            }
        }
        .hm_kstz_list{
            width: toRem(690px);
            margin: 0 auto;
            ul{
                li{
                    height: toRem(167px);
                    border-bottom: 1px solid #e6e6e6;
                    box-sizing: border-box;
                    &:first-of-type{
                        height: toRem(469px);
                        .hm_kstz_content_title{
                            p{
                                max-width: 8rem;
                            }
                        }
                    }
                    .mint-swipe{
                        width: 100%;
                        height: toRem(469px);
                    }
                    .mint-swipe-item{
                        img{
                            width: toRem(690px);
                            height: toRem(292px);
                            border-radius: toRem(15px);
                        }
                    }
                    .hm_kstz_content{
                        padding-top: toRem(32px);
                        .hm_kstz_content_title{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            p{
                                height: toRem(72px);
                                font-size: toRem(28px);
                                font-weight: bold;
                                @include ellipsis_two;
                            }
                            .hm_kstz_ct_pagelist{
                                margin-right: toRem(15px);
                                font-size: toRem(26px);
                                font-style: italic;
                                .hm_kstz_ct_current{
                                    font-size: toRem(36px);
                                    font-weight: bold;
                                    color: $brand-background;
                                }
                            }
                        }
                        .hm_kstz_content_date{
                            margin-top: toRem(12px);
                            font-size: toRem(20px);
                            color: #abb9c9;
                        }
                    }
                    // &:first-of-type{
                    // }
                }
            }
        }
    }
    .h_bottom_fmkt{
        .hm_fmkt_list{
            width: toRem(690px);
            margin: 0 auto;
            ul{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    margin-bottom: toRem(35px);
                    .hm_fmkt_list_ip{
                        width: toRem(332px);
                        height: toRem(212px);
                        position: relative;
                    }
                    .hm_fmkt_list_ci{
                        width: toRem(332px);
                        height: toRem(212px);
                        border-radius: toRem(15px);
                    }
                    .hm_fmkt_list_play{
                        width: toRem(52px);
                        height: toRem(52px);
                        position: absolute;
                        right: toRem(28px);
                        bottom: toRem(-28px);
                    }
                    .hm_fmkt_list_title{
                        margin-top: toRem(35px);
                        p{
                            font-size: toRem(30px);
                            @include ellipsis_two(1);
                        }
                    }
                    .hm_fmkt_list_score{
                        margin-top: toRem(10px);
                        display: flex;
                        justify-content: space-between;
                        color: #b4b4b4;
                        .hm_fmkt_list_sinfo{
                            font-size: toRem(20px);
                        }
                        .hm_fmkt_list_tea{
                            font-size: toRem(20px);
                        }
                    }
                    .hm_fmkt_list_tp{
                        margin-top: toRem(15px);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #b4b4b4;
                        .hm_fmkt_list_type{
                            width: toRem(110px);
                            height: toRem(40px);
                            line-height: toRem(40px);
                            border-radius: toRem(40px);
                            color: #fff;
                            background: #d6dede;
                            text-align: center;
                            font-size: toRem(20px);
                        }
                        .hm_fmkt_list_time{
                            font-size: toRem(20px);
                        }
                    }
                }
            }
        }
    }
}
</style>
