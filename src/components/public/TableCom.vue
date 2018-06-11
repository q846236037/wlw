<template>
<!-- 表格组件 -->
  <div class="table-container">
     <el-table 
    class="custemor-scroll-bar" 
    :header-cell-style="{'text-align':'center','background':'#409EFF','color':'#fff'}" 
    :cell-style="{'text-align':'center'}" 
    :data.sync="list" 
    border
    @header-click="sortChange"
    @cell-click="cellClick" 
    style="100%">
        <el-table-column 
        v-for="(title,i) in titles" 
        :key="i" 
        :prop="title.prop" 
        :label="title.label"
        :sortable="title.sortable==1">
        </el-table-column>

        <el-table-column v-if="isEdit" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination  v-if="isPagination"
                    :current-page="page"
                    background
                    @current-change="currentChange"
                    layout="total, prev, pager, next, jumper"
                    :page-size="20"
                    :total="tableData.list.length">
                    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "TableCom",
  props: {
    tableData:"", //渲染表格所需数据
    isEdit: {
      //是否可编辑
      type: Boolean,
      default: true
    },
    isPagination: {
      //是否需要分页
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log(this.tableData,"tabledata");
  },
  data() {
    return {
      page: 1, //分页页码
      copyList:JSON.parse(JSON.stringify(this.tableData.list)) //复制表格数据，用于清空排序
    };
  },
  computed: {
    titles() {
      return this.tableData.titles;
    },
    list() {
      let n = 20; //每页显示20条
      console.log(this.tableData,"list");
      var datalist = this.tableData.list;
      console.log(typeof(datalist),'typeof...')
      console.log(datalist);

      return datalist.filter((item, index) => {
        return index >= (this.page - 1) * n && index < n + n * (this.page - 1);
      });
    }
  },
  watch:{
    tableData:{  //深度检测
      handler(n,o){
        if(n.list.length<this.copyList.length){
          this.copyList = JSON.parse(JSON.stringify(o.list))
        }
      },
      deep:true
    }
  },
  methods: {
    handleEdit(index, row) {
      //编辑
      this.$emit('edit-node', index + 20 * (this.page - 1),row)
    },
    handleDelete(index, row) {
      //删除
      this.$emit("remove-node", index + 20 * (this.page - 1),row);
    },
    sortChange(col) {
      //排序后触发
      if (col.sortable) {
        if (col.order == "ascending") {
          this.tableData.list.sort((a, b) => {
            return new Date(a[col.property]) - new Date(b[col.property]);  //升序排序
          });
        } else if (col.order == "descending") {
          this.tableData.list.sort((a, b) => {
            return new Date(b[col.property]) - new Date(a[col.property]);  //降序排序
          });
        } else {
          this.tableData.list = JSON.parse(JSON.stringify(this.copyList));  //清空排序
        }
      }
    },
    cellClick(row, column, cell, event) {
      this.$router.push({ name: "org-manage", params: { id: row.id } });
    },
    currentChange(page) {
      //修改页码
      this.page = page;
    }
  }
};
</script>
<style>
.el-table .ascending .sort-caret.ascending {
  border-bottom-color: rgb(110, 6, 245);
}
.el-table .sort-caret.ascending {
  border-bottom-color: #eee;
}
.el-table .descending .sort-caret.descending {
  border-top-color: rgb(110, 6, 245);
}
.el-table .sort-caret.descending {
  border-top-color: #eee;
}
.el-table td,
.el-table th {
  padding: 5px 0;
}
.el-table td {
  cursor: pointer;
}
.el-table__row:hover {
  background-color: #a6cff8 !important;
}
.el-table__row > td {
  background-color: transparent !important;
}
.table-container .el-pagination {
  width: 725px;
  margin: 20px auto 10px;
}
</style>
