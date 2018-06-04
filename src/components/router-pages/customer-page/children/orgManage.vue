<template>
<!-- 组织管理 -->
    <el-container class="tag">
         <el-aside width="220px">
            <tree-menu :tree-data="custemor.treeList"></tree-menu>
        </el-aside>
        <el-main>
            <div class="manage-header">
                <el-button type="primary" plain icon="el-icon-plus" size="small">添加</el-button>
                <el-button type="primary" plain icon="el-icon-edit-outline" size="small">修改</el-button>
                <el-button icon="el-icon-delete" size="small" type="danger">删除</el-button>
                <el-button type="primary" plain icon="el-icon-plus" size="small">添加员工</el-button>
            </div>
            <div class="table-box custemor-scroll-bar">
                <table-com v-if="tableData" @remove-node="removeTabNode" @edit-node="editTabNode" :table-data.sync="tableData"></table-com>
            </div>
        </el-main>
    </el-container>
</template>
<script>
import Api from "@/Api";
import { mapState, mapActions } from "vuex";
export default {
  name: "orgManage",
  data() {
    return {
      tableData: null
    };
  },
  computed: {
    ...mapState(["custemor"])
  },
  methods: {
    ...mapActions(["dph_tree"]),
    get_table_data() {
      Api.get("/mockData/table").then(res => {
        this.tableData = res.data;
      });
    },
    removeTabNode(index, row) {  //移除表格行回调函数
      new Promise((resolv, reject) => {
        resolv("1");
      }).then(res => {
        if (res == 1) {
          this.tableData.list.splice(index, 1);
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            position: 'top-left'
          });
        } else if (res == 2) {
          this.$notify({
            title: "警告",
            message: "您没有操作权限",
            type: "warning",
            position: 'top-left'
          });
        }else{
          this.$notify.error({
          title: '失败',
          message: '服务器链接失败，请稍后重试！',
          position: 'top-left'
        });
        }
      });
    },
    editTabNode(index, row) {   //修改表格行回调函数
      //console.log(index, row);
      //this.tableData.list.splice(index, 1);
    }
  },
  watch: {
    tableData: {
      //深度检测表格数据的变化
      handler(n, o) {
        // console.log(n.list);
      },
      deep: true
    }
  },
  created() {
    this.get_table_data();
    //if (this.custemor.treeList.length == 0) {
      this.dph_tree();
   // }
  }
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-container {
  height: 100%;
}
.tag .el-aside {
  border-right: solid 1px #e6e6e6;
}
.tag .manage-header {
  padding-bottom: 5px;
}
.tag .el-main {
  overflow: hidden;
  padding: 5px 0 0 10px;
}
.tag .table-box {
  height: 536px;
  overflow: auto;
}
.custemor-scroll-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custemor-scroll-bar::-webkit-scrollbar-button,
.custemor-scroll-bar::-webkit-scrollbar-track {
  display: none;
}
.custemor-scroll-bar::-webkit-scrollbar-thumb {
  background: #6eb4fa;
  border-radius: 8px;
}
.custemor-scroll-bar::-webkit-scrollbar-button,
.custemor-scroll-bar::-webkit-scrollbar-track {
  display: none;
}
.custemor-scroll-bar::-webkit-scrollbar-track-piece {
  background: #fff;
}
</style>

