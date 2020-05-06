<template>
    <div class="bottomBar">
        <ul>
            <li>
                <a href="javascript:;">
                    <div class="bb_imgbox">
                        <img src="../assets/ks_mainpagest.png" alt v-if="Selected == 1">
                        <img src="../assets/ks_mainpage.png" alt v-else>
                    </div>
                    <p :class="{ 'bb_Selected': Selected == 1 }">首页</p>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="bb_imgbox">
                        <img src="../assets/ks_lilunst.png" alt v-if="Selected == 2">
                        <img src="../assets/ks_lilun.png" alt v-else>
                    </div>
                    <p :class="{ 'bb_Selected': Selected == 2 }">理论课程</p>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="bb_imgbox">
                        <img src="../assets/ks_practivest.png" alt v-if="Selected == 3">
                        <img src="../assets/ks_practive.png" alt v-else>
                    </div>
                    <p :class="{ 'bb_Selected': Selected == 3 }">每周一练</p>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="bb_imgbox">
                        <img src="../assets/ks_minest.png" alt v-if="Selected == 4">
                        <img src="../assets/ks_mine.png" alt v-else>
                    </div>
                    <p :class="{ 'bb_Selected': Selected == 4 }">我的</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'bottomBar',
    props: {
        Selected: String
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.bottomBar{
    width: 100%;
    max-width: 10rem;
    height: toRem(123px);
    border-top: 1px solid #f2f2f2;
    position: fixed;
    background: #fff;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    ul{
        display: flex;
        li{
            width: 25%;
            height: toRem(98px);
            text-align: center;
            a{
                display: inline-block;
                width: 100%;
                height: toRem(98px);
                padding-top: toRem(12px);
                p{
                    font-size: toRem(20px);
                }
            }
            &:first-of-type{
                img{
                    width: toRem(56px);
                    height: toRem(48px);
                }
            }
            &:nth-of-type(2){
                img{
                    width: toRem(56px);
                    height: toRem(46px);
                }
            }
            &:nth-of-type(3){
                img{
                    width: toRem(52px);
                    height: toRem(42px);
                }
            }
            &:last-of-type{
                img{
                    width: toRem(43px);
                    height: toRem(45px);
                }
            }
            .bb_Selected{
                color: $brand-background;
            }
            .bb_imgbox{
                height: toRem(48px);
                line-height: toRem(48px);
            }
        }
    }
}
</style>
