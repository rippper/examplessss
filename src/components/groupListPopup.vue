<template>
  <transition :name="transitionName">
    <div class="group_list_popup cell_container container_top" v-show="isShow">
      <header-fix :title="title" fixed>
        <a @click="backGroupList" slot="left"><i class="webapp webapp-back"></i></a>
        <!--<a class="confirm_btn" @click="handleConfirm" slot="right">确认</a>-->
      </header-fix>
      <div class="cell" v-if="parentId != 0" @click="setParentGroup">
        <span>当前部门</span>
        <i v-if="parentId === groupId" class="webapp webapp-duihao"></i>
      </div>
      <div class="cell" v-for="(item) in groupList"
           :key="item.UserGroupId"
           @click="getChildrenGroup(item)">
        <span>{{item.UserGroupName}}</span>
        <i v-if="item.ChildCount != 0" class="webapp webapp-right"></i>
        <i v-if="item.UserGroupId === groupId && item.ChildCount === 0" class="webapp webapp-duihao"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import { Indicator } from 'mint-ui'
  import { GetGroupList } from '../service/getData'
  import { headerFix } from './index'

  export default {
    components: { headerFix },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      showAllGroup: {
        type: Boolean,
        default: true
      },
      groupId: {
        type: [String, Number]
      },
      groupName: {
        type: String
      }
    },
    data () {
      return {
        groupIdStack: [], // 记录部门的Id的栈
        groupListStack: {}, // 存储已获取的部门列表
        groupList: [], // 部门列表
        parentId: 0,
        title: this.groupName || '选择部门',
        transitionName: 'slide-left',
        isFirst: true,
        choosedIdStack: [],
        choosedItem: {}
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      async getGroupList ({ ParentId }) {
        Indicator.open()
        let data = await GetGroupList({ ParentId })
        Indicator.close()
        if (data.IsSuccess) {
          let list = data.Data.GroupInfoList
          if (list && list.length > 0) {
            this.groupList = list
            this.groupListStack[ParentId] = list
          } else if (list.length === 0) {
            this.groupList = []
            this.groupListStack[ParentId] = []
          }
        }
      },
      backGroupList () {
        this.groupIdStack.pop() // 移除堆栈末尾
        this.$nextTick(() => {
          let len = this.groupIdStack.length
          if (len === 0) {
            this.groupList = []
            this.$emit('close')
          } else {
            let { Id, title } = this.groupIdStack[len - 1]
            this.parentId = Id
            this.title = title
            this.groupList = this.groupListStack[Id]
          }
        })
      },
      getChildrenGroup (item) {
        if (item.ChildCount === 0) {
          this.choosedItem = { ...item, ParentId: this.parentId }
          this.getGroup()
        } else {
          let ParentId = item.UserGroupId
          this.parentId = ParentId
          this.title = item.UserGroupName
          this.groupIdStack.push({ Id: ParentId, title: this.title })
          if (this.groupListStack[ParentId]) {
            this.groupList = this.groupListStack[ParentId]
          } else {
            this.getGroupList({ ParentId })
          }
        }
      },
      setParentGroup () {
        this.choosedItem = { UserGroupId: this.parentId, UserGroupName: this.title, ParentId: this.parentId }
        this.getGroup()
      },
      getGroup () {
        this.isFirst = false
        const { UserGroupId, UserGroupName } = this.choosedItem
        this.choosedIdStack = [...this.groupIdStack]
        this.$emit('update:data', { ...this.choosedItem, GroupId: UserGroupId, groupName: UserGroupName })
        this.$emit('close')
      },
      handleConfirm () {
        this.getGroup()
      }
    },
    watch: {
      isShow (newVal) {
        if (newVal) {
          if (this.isFirst) {
            let params = this.showAllGroup ? {
              UserGroupId: 0,
              UserGroupName: '选择部门'
            } : {
              UserGroupId: this.userInfo.GroupId || 0,
              UserGroupName: this.userInfo.GroupName || '选择部门'
            }
            this.getChildrenGroup(params)
          } else {
            this.groupIdStack = [...this.choosedIdStack]
            let len = this.groupIdStack.length
            let { Id, title } = this.groupIdStack[len - 1]
            this.parentId = Id
            this.title = title
            this.groupList = this.groupListStack[Id]
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .group_list_popup {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow-y: scroll;

    .header_left, .header_right {
      flex: 4;
    }

    .header_title {
      flex: 15;
    }

    .confirm_btn {
      font-size: toRem(28px);
      color: $brand-info;
    }

    .cell {
      padding: toRem(20px) 0;
      line-height: toRem(50px);
      margin: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      color: $color-text-secondary;
      font-size: 14px;
      position: relative;
      @include flex(flex-start);

      span {
        color: $color-text-secondary;
        width: 100%;
      }

      .webapp-right {
        color: #666;
        font-size: 20px;
        position: absolute;
        right: 0;
      }

      .webapp-duihao {
        color: $brand-primary;
        font-size: 20px;
        position: absolute;
        right: 0;
      }
    }
  }
</style>
