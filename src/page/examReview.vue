<template>
  <div class="exam_review_page container_both">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="exam_header">
      得分：{{examResult.Score}}，正确题目数：{{examResult.RightCount}}，{{examResult.PassFlag?'通过':'未通过'}}
    </div>
    <div class="exam_content" v-for="(list,index) in exam" :key="index">
      <transition name="slide-left">
        <div v-if="itemNum == index + 1">
          <p class="exam_name">
            <span class="red" v-if="list.ThemeType==0">【判断题】</span>
            <span class="red" v-else-if="list.ThemeType==1">【单选题】</span>
            <span class="red" v-else-if="list.ThemeType==2">【多选题】</span>
            <span class="red" v-else-if="list.ThemeType==3">【简答题】</span>
            <span class="red" v-else>【其它】</span>
            <span class="topic_name">{{index + 1 + '.' + list.ThemeTitle}}</span>
            <span class="red">(题目分数：{{Number(list.ThemeScore).toFixed(1)}}分，
              您的得分：{{Number(list.UserScore).toFixed(1)}}分，您的选项：{{list.UserAnswer}},
              正确选项：{{list.Question.Answer}})</span>
          </p>
          <div class="exam_list">
            <div v-if="list.ThemeType == 0">
              <mb-radio :disabled="true" :options="judgeItem" :correct-options="choosedItem[index]['Answer']"
                        v-model="choosedItem[index]['UserAnswer']"></mb-radio>
            </div>
            <div v-else-if="list.ThemeType == 1">
              <mb-radio :disabled="true" :options="list.ItemInfo" :correct-options="choosedItem[index]['Answer']"
                        v-model="choosedItem[index]['UserAnswer']"></mb-radio>
            </div>
            <div v-else-if="list.ThemeType == 2">
              <mb-checklist :disabled="true" :options="list.ItemInfo" :correct-options="choosedItem[index]['Answer']"
                            v-model="choosedItem[index]['UserAnswer']"></mb-checklist>
            </div>
            <div v-else-if="list.ThemeType == 3">
              <textarea class="answerInput"
                        v-model="choosedItem[index]['Content']"
                        rows="15"
                        placeholder="在此处出入答案内容">
              </textarea>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="exam_footer">
      <mt-button class="prev" type="primary" plain @click.native='preItem'>上一题</mt-button>
      <span class="itemNum"><span>试题</span> （{{itemNum}}/{{allItem}}）</span>
      <mt-button v-if="itemNum<allItem" type="primary" class="next" @click.native="nextItem">下一题</mt-button>
      <mt-button v-else type="primary" class="next" @click.native="submitExam">离开</mt-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { MessageBox, Button } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { headerFix, mbChecklist, mbRadio } from '../components'
  import { getStore } from '../plugins/utils'

  Vue.component(Button.name, Button)
  export default {
    mixins: [goBack],
    data () {
      return {
        examResult: {},
        exam: [],
        examTitle: '', // 标题
        examId: '',
        ticket: '',
        timeLimit: 0, // 时间限制
        itemData: null, // 当前显示题目data
        judgeItem: [
          {
            ThemeItemFlag: 'A',
            ThemeItemTitle: '正确'
          },
          {
            ThemeItemFlag: 'B',
            ThemeItemTitle: '错误'
          }
        ], // 单选item
        itemNum: 1, // 第几题
        allItem: 0,
        userInfo: null,
        choosedItem: [],
        startDate: '', // 考试开始时间
        timer: null
      }
    },
    created () {
      this.examId = this.$route.query.id
      this.startDate = new Date()
    },
    mounted () {
      this.getExam()
    },
    props: [],
    components: {
      headerFix,
      mbChecklist,
      mbRadio
    },
    methods: {
      getExam () {
        let data = getStore('webapp-exam-' + this.examId)
        console.log(data)
        let exam = data.Exam
        this.examResult = data
        this.examTitle = exam.Name
        data.Type0Questions.forEach(item => {
          item.ThemeId = item.Question.Id
          item.ThemeTitle = item.Question.Name
          item.ThemeScore = item.Question.Score
          item.ThemeType = 0
        })
        data.Type1Questions.forEach(item => {
          item.ThemeId = item.Question.Id
          item.ThemeTitle = item.Question.Name
          item.ThemeScore = item.Question.Score
          item.ItemInfo = item.Question.QuestionsItems.map(questionItem => {
            questionItem.ThemeItemFlag = questionItem.ItemFlag
            questionItem.ThemeItemTitle = questionItem.Name
            return questionItem
          })
          item.ThemeType = 1
        })
        data.Type2Questions.forEach(item => {
          item.ThemeId = item.Question.Id
          item.ThemeTitle = item.Question.Name
          item.ThemeScore = item.Question.Score
          item.ItemInfo = item.Question.QuestionsItems.map(questionItem => {
            questionItem.ThemeItemFlag = questionItem.ItemFlag
            questionItem.ThemeItemTitle = questionItem.Name
            return questionItem
          })
          item.ThemeType = 2
        })
        data.Type3Questions.forEach(item => {
          item.ThemeId = item.Question.Id
          item.ThemeTitle = item.Question.Name
          item.ThemeScore = item.Question.Score
          item.ItemInfo = item.Question.QuestionsItems.map(questionItem => {
            questionItem.ThemeItemFlag = questionItem.ItemFlag
            questionItem.ThemeItemTitle = questionItem.Name
            return questionItem
          })
          item.ThemeType = 3
        })
        data.ThemeInfoList = [...data.Type0Questions, ...data.Type1Questions, ...data.Type2Questions, ...data.Type3Questions]
        this.exam = data.ThemeInfoList
        this.allItem = data.TotalCount
        this.itemData = data.ThemeInfoList[0]
        // 初始化choosedItem
        this.initChoosedItem(this.exam)
      },
      // 初始化choosedItem
      initChoosedItem (arr) {
        if (arr instanceof Array && arr.length > 0) {
          arr.forEach((item, index) => {
            let themeID = item.ThemeId
            let examType = item.ThemeType
            if (examType === 2) {
              // 多选model类型为数组
              this.choosedItem.push({
                'UserAnswer': item.UserAnswer.split(''),
                'Answer': item.Question.Answer,
                examType,
                'ExamId': this.examId,
                'QuestionId': themeID,
                'Content': ''
              })
            } else {
              // 单选、判断 问答题
              this.choosedItem.push({
                'UserAnswer': item.UserAnswer,
                'Answer': item.Question.Answer,
                examType,
                'ExamId': this.examId,
                'QuestionId': themeID,
                'Content': ''
              })
            }
          })
        }
      },
      // 点击下一题
      nextItem () {
        this.itemNum++
      },
      // 点击上一题
      preItem () {
        if (this.itemNum > 1) {
          this.itemNum--
        } else {
          this.itemNum = 1
        }
      },
      // 提交考试
      submitExam () {
        MessageBox.confirm('确定离开本页，返回考试中心页面？')
          .then(() => {
            this.$router.push({ name: 'examCenter' })
          })
      }
    },
    watch: {
      itemNum: function (val) {
        this.itemData = this.exam[val - 1]
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .exam_review_page {
    background-color: $fill-base;
    font-size: 15px;

    & > .header {
      width: 100vw;
    }

    .exam_header {
      padding: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      text-align: center;
      line-height: toRem(62px);

      img {
        width: toRem(29px);
      }
    }

    .exam_content {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0 toRem(40px) toRem(100px);

      .exam_name {
        padding: toRem(30px) 0 toRem(100px) 0;

        .red {
          color: $brand-primary;
        }
      }

      .topic_name {
        line-height: toRem(50px);
      }

      .exam_list {
        .answerInput {
          width: 100%;
          padding: toRem(10px);
          resize: none;
          border: 1px solid $border-color-base;
          @include borderRadius(10px);
          font-size: 14px;
        }
      }
    }

    .exam_footer {
      position: fixed;
      width: 100%;
      bottom: toRem(20px);
      text-align: center;
      left: 0;
      /*line-height: 73px;*/
      background-color: #fff;

      .mint-button {
        @include wh(150px, 73px);
        padding: 0;
      }

      .prev {
        margin-left: toRem(30px);
      }

      .itemNum {
        display: inline-block;
        width: toRem(350px);
        line-height: toRem(73px);

        span {
          color: $color-text-secondary;
          font-size: 14px;
        }
      }

      .next {
        margin-right: toRem(30px);
      }
    }
  }
</style>
