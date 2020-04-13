/**
* 树节点
*/
<template>
  <li class="tree_node">
    <div class="tree_title" :class="dataList[props.Id] == selectedId && 'tree_selected'">
      <span v-if="hasNodes" class="primary_line pull-left"></span>
      <span v-if="!hasNodes" class="tran_line pull-left"></span>
      <a class="tree_name" @click="nodeClick(dataList)">{{dataList[props.Name]}}</a>
      <div class="tree_toggle_icon" v-if="hasNodes">
        <i v-if="open" @click="toggle" class="webapp webapp-less"></i>
        <i v-if="!open" @click="toggle" class="webapp webapp-moreunfold"></i>
      </div>
      <i class="selected_icon webapp webapp-selected"></i>
    </div>
    <ul class="tree_container" v-show="open" v-if="hasNodes">
      <node v-for="(item,index) in dataList[props.Nodes]"
            :data-list="item"
            @itemClick="selectedNode"
            :on-select="onSelect"
            :selected-id="selectedId"
            :props="props"
            :key="index">
      </node>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'node',
    data () {
      return {
        open: false
      }
    },
    props: ['dataList', 'onSelect', 'selectedId', 'props'],
    computed: {
      hasNodes: function () {
        return this.dataList[this.props.Nodes] && this.dataList[this.props.Nodes].length
      }
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      nodeClick (data) {
        this.$emit('itemClick', data)
      },
      selectedNode (data) {
        this.onSelect(data)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .tree_container {
    width: 100%;
    padding: 0 0 0 toRem(20px);
  }

  .tree_node {
    font-size: 15px;
  }

  .tree_title {
    @include ht-lineHt(88px);
    @extend %clearFix;
    position: relative;

    .tree_name {
      @extend %pull-left;
      width: 80%;
      @extend %ellipsis;
      line-height: toRem(88px);
    }

    .tree_toggle_icon {
      @extend %pull-right;
      padding-right: toRem(20px);

      .webapp {
        color: $color-text-thirdly;
      }
    }

    .tran_line {
      display: inline-block;
      width: toRem(6px);
      height: toRem(28px);
      margin-right: toRem(20px);
      background-color: transparent;
    }

    .primary_line, .tran_line {
      margin-top: toRem(30px);
    }

    .selected_icon {
      display: none;
      position: absolute;
      right: toRem(80px);
      font-size: 24px;
    }

    &.tree_selected {
      /*background-color: lighten($brand-primary, 36%);*/
      .selected_icon {
        display: block;
        color: $brand-primary;
      }
    }
  }
</style>
