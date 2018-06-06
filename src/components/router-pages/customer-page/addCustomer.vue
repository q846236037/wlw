<template>
<!-- 客户管理界面 -->
    <el-container class="custemor-scroll-bar">
        <el-header>
            <el-button type="primary" plain icon="el-icon-plus" @click="showModel">新增用户</el-button>
            <Model v-show="isShow"  :model-data='modelData' @on-ok="handleOk" @on-cancel="handleCancel"/>
        </el-header>
        <el-main>
            <table-com v-if="tableData" @remove-node="removeTabNode" :table-data.sync="tableData"></table-com>
        </el-main>
    </el-container>
</template>
<script>
import Api from "@/Api";
export default {
  name: "addCustomer",
  data() {
    return {
      tableData:{
        titles:[],
        list:[],
      },
      isShow: false,
      modelData: {
        title: "后台定制模态框",
        formData: [
          {
            type: "1",
            reg: "1",
            title: "输入框",
            default: "请输入姓名",
            name: "name",
            value: ""
          },
          {
            type: "2",
            reg: "0",
            title: "select框",
            value: "",
            default: "下拉框请选择",
            name: "food",
            item: [
              {
                value: "1",
                label: "黄金糕"
              },
              {
                value: "2",
                label: "双皮奶"
              },
              {
                value: "3",
                label: "蚵仔煎"
              }
            ]
          },
          {
            type: "3",
            reg: "0",
            title: "单选框",
            name: "sex",
            value: "",
            item: [
              {
                value: "1",
                label: "男"
              },
              {
                value: "0",
                label: "女"
              }
            ]
          },
          {
            type: "4",
            reg: "0",
            title: "复选框",
            value: [],
            name: "mulSel",
            item: [
              {
                label: "选项一",
                value: "1"
              },
              {
                label: "选项二",
                value: "2"
              },
              {
                label: "选项三",
                value: "3"
              }
            ]
          },
          {
            type: "5",
            reg: "0",
            title: "文本域",
            name: "area",
            value: ""
          }
        ],
        btnMsg: ["确定", "取消"]
      }
    };
  },
  methods: {
    get_table_data() {
     Api.selectCorp().then(res => {
        console.log(res,"addCustomer");
        this.tableData.titles=[{
            "prop":"name",
            "label":"客户名称"
        },{
            "prop":"date",
            "sortable":"1",
            "label":"签约时间"
        },{
            "prop":"address",
            "label":"地区"
        },{
            "prop":"person",
            "label":"联系人"
        }];
        this.tableData.list=res.data.body;

      });
    },
    removeTabNode(index) {
      this.tableData.list.splice(index, 1);
    },
    showModel(){
      Api.formCorp().then(res=>{
        console.log(res);
        this.modelData=res.data.body;
        console.log(this.modelData,"modelData");
        this.modelData.formData.forEach(element => {
          if(element.item!=null){
            let item=element.item.substring(1,element.item.length-1);
            let array=item.split(";");
            let jsonArray=array.map(i=>{
               return eval('('+i+')');
            })
            element.item=jsonArray;
          }else{
            element.item=[];
          }
        });
        console.log(this.modelData.formData,"formData");
        this.isShow = true;
      })
      
    },
    handleOk(param) {
      this.isShow = false;
      console.log("handleOk", param);
    },
    handleCancel() {
      this.isShow = false;
      console.log("handleCancel");
    }
  },
  watch: {
    tableData: {
      //深度检测表格数据的变化
      handler(n, o) {
        // console.log(n.list)
      },
      deep: true
    }
  },
  created() {
    this.get_table_data();
  }
};
</script>
<style>
.el-header button {
  margin-top: 10px;
}
</style>