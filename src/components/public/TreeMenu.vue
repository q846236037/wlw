<template>
<!-- 树形菜单 -->
    <div class="tree-box">
        <el-tree :data="treeData" show-checkbox node-key="id" @node-click="clickNode"></el-tree>
    </div>
</template>
<script>
export default {
  name: "TreeMenu",
  props: ["treeData"],
  methods: {
    clickNode(dataNode, node, vm) {
      //console.log(dataNode.label)  //节点内容
      //console.log(dataNode.$treeNodeId)//节点ID
      console.log(dataNode, node, vm)
    }
  }
};
</script>
<style>
.tree-box * {
  font-size: 18px;
}
</style>

