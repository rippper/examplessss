/**
* 树
*/
<template>
  <ul class="tree_container">
    <tree-node v-for="(item,index) in data"
               :data-list="item"
               @itemClick="selectedNode"
               :on-select="onSelect"
               :selected-id="selectedId"
               :props="props"
               :key="index">
    </tree-node>
  </ul>
</template>
<script>
  import treeNode from './treeNode.vue'

  export default {
    props: {
      data: Array,
      onSelect: Function,
      selectedId: [String, Number],
      props: {
        type: Object,
        default () {
          return {
            Name: 'Name',
            Id: 'Id',
            Nodes: 'Nodes'
          }
        }
      }
    },
    components: {
      treeNode
    },
    methods: {
      selectedNode (data) {
        this.onSelect(data)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
