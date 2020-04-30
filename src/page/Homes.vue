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
        <div class="h_top_banner">
            <div>
                <swiper :options="swiperOption">
                    <swiper-slide>
                        <div class="content">
                            <img src="../assets/example/example001.jpg" alt>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="content">
                            <img src="../assets/example/example002.jpg" alt>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="content">
                            <img src="../assets/example/example003.jpg" alt>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="content">
                            <img src="../assets/example/example004.jpg" alt>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="content">
                            <img src="../assets/example/example005.jpg" alt>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {
            emailNum: '10', // 顶部邮箱消息数
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true
            }
        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.Home{
    max-width: 10rem;
    height: toRem(5000px);
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
                            color: #c10000;
                            position: absolute;
                            top: toRem(-18px);
                            right: toRem(-18px);
                        }
                    }
                }
            }
        }
    }
    .h_top_banner{
        width:100%;
        height: toRem(526px);
        padding-top: toRem(21px);
        .swiper-slide{
            width: toRem(690px)!important;
        }
        .content{
            width: toRem(690px);
            height: toRem(350px);
        }
        img{
            width: toRem(690px);
            height: toRem(350px);
        }
    }
}
</style>
