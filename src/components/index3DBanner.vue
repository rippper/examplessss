<template>
    <div class="index_top_banner">
        <div>
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in topBanner" :class="{ 'beSelect': index == slideIndex , 'beSelectbefore': index == slideIndex - 2, 'beSelectafter': index == slideIndex }" :key="index">
                    <div class="content">
                        <img :src="item.Img" alt ref="bannerImg">
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="it_wordspart">
            <ul>
                <li v-for="(item, index) in topBanner" :key="index" :class="{ 'it_wordspart_show': index == slideIndex }">
                    <div class="it_wp_top">
                        <div class="it_wp_tl">
                            <div class="it_wp_tl_label">
                                动态
                            </div>
                            <div class="it_wp_tl_news">
                                NEWS
                            </div>
                        </div>
                        <div class="it_wp_tr" v-text="item.Date"></div>
                    </div>
                    <div class="it_wp_bottom" v-text="item.Title"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index3dbanner',
    data () {
        const that = this
        return {
            slideIndex: 0,
            bannerLength: 0,
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                centeredSlides: 'true',
                loop: 'true',
                on: {
                    slideChangeTransitionStart: function () {
                        // console.log(t.slideIndex)
                        that.slideIndex = this.activeIndex
                        // if (that.slideIndex == 1) {
                        //     that.$refs.bannerImg[that.topBanner.length - 1].className = 'beSelectbefore'
                        // } else if (that.slideIndex == that.topBanner.length) {
                        //     that.$refs.bannerImg[0].className = 'beSelectafter'
                        // } else if (that.slideIndex == 0) {
                        //     that.$refs.bannerImg[1].className = 'beSelectafter'
                        //     that.$refs.bannerImg[4].className = 'beSelect'
                        //     that.$refs.bannerImg[3].className = 'beSelectbefore'
                        // }
                        console.log(that.slideIndex)
                    }
                }
            }
        }
    },
    methods: {

    },
    props: {
        topBanner: Array
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.index_top_banner{
    width:100%;
    height: toRem(526px);
    padding-top: toRem(21px);
    .swiper-slide{
        width: toRem(690px)!important;
        height: toRem(350px)!important;
        .content{
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-around;
            img{
                position: relative;
                top: 0;
                width: toRem(690px);
                height: toRem(350px);
                border-radius: toRem(15px);
                transition: 0.5s;
            }
            .beSelect{
                width: toRem(690px);
                height: toRem(350px);
                transform: translateX(toRem(0));
                transition: 0.3s;
            }
            .beSelectbefore{
                transform: translateX(toRem(148px));
                transition: 0.3s;
            }
            .beSelectafter{
                transform: translateX(toRem(-148px));
                transition: 0.3s;
                // width: toRem(552px);
                // height: toRem(280px);
                // position: relative;
                // right: toRem(148px);
            }
        }
    }
    .it_wordspart{
        width: 100%;
        height: toRem(156px);
        ul{
            width: 100%;
            height: 100%;
            position: relative;
            li{
                width: 100%;
                height: 100%;
                padding-top: toRem(26px);
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                z-index: 2;
                .it_wp_top{
                    width: toRem(690px);
                    margin: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .it_wp_tl{
                        display: flex;
                        .it_wp_tl_label{
                            width: toRem(85px);
                            height: toRem(35px);
                            line-height: toRem(35px);
                            font-size: toRem(24px);
                            color: #fff;
                            text-align: center;
                            border-radius: toRem(10px);
                            background: $brand-background;
                        }
                        .it_wp_tl_news{
                            line-height: toRem(35px);
                            margin-left: toRem(13px);
                            font-size: toRem(24px);
                        }
                    }
                    .it_wp_tr{
                        line-height: toRem(35px);
                        font-size: toRem(24px);
                    }
                }
                .it_wp_bottom{
                    width: toRem(690px);
                    margin: toRem(24px) auto 0;
                    font-size: toRem(30px);
                }
            }
            .it_wordspart_show {
                opacity: 1;
                z-index: 4;
            }
        }
    }
    // .content{
    //     width: toRem(690px);
    //     height: toRem(350px);
    //     position: relative;
    //     left:toRem(30px);
    // }

}
</style>
