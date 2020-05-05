<template>
    <div class="index_top_banner">
        <div>
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in topBanner" :key="index">
                    <div class="content">
                        <img :src="item.Img" :class="{ 'beSelect': index == slideIndex, 'beSelectbefore': index == slideIndex - 1, 'beSelectafter': index == slideIndex + 1 }" alt ref="bannerImg">
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="it_wordspart">
            <ul>
                <li v-for="(item, index) in topBanner" :key="index">

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
                slidesPerView: 1,
                spaceBetween: 20,
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
                        // console.log(that.slideIndex)
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
        width: toRem(750px)!important;
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
                width: toRem(552px);
                height: toRem(280px);
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
        background: #000;
        ul{
            width: 100%;
            height: 100%;
            li{
                width: 100%;
                height: 100%;
                padding-top: toRem(26px);
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
