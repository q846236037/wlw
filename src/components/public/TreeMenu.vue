<template>
  <div class="expand">
    <div>
        <el-tree ref="expandMenuList" class="expand-tree"
        v-if="isLoadingTree"
        :data="setTree"
        node-key="id"
        highlight-current
        :props="defaultProps"
        :expand-on-click-node="false"
        :render-content="renderContent"
        :default-expanded-keys="defaultExpandKeys"
        @node-click="handleNodeClick"></el-tree>
      </div>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
import TreeRender from '@/components/public/tree_render'
  export default{
    name: "TreeMenu",
    data(){
      return{
        isLoadingTree: false,//是否加载节点树
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        currentId:null,
        startCont:"",
        defaultExpandKeys: [],//默认展开节点列表
      }
    },
    props:['setTree'],
    mounted(){
      this.initExpand()
    },
    methods: {
      initExpand(){
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id)
        })
        this.isLoadingTree = true;
      },
      handleNodeClick(d,n,s){//点击节点
        // console.log('click',d,n)       
        // n.level == '1' ? d.isEdit = false :d.isEdit = false
        d.isEdit = false;//放弃编辑状态
        if(this.currentId != d.id){
          this.currentId = d.id
          this.$emit('handle-click',d)
        }
      },
      renderContent(h,{node,data,store}){//加载节点
        let that = this;
        return h(TreeRender,{
          props: {
            DATA: data,
            NODE: node,
            STORE: store
          },
          on: {
            nodeAddTop: ((s,d,n) => that.handleAddTop()),
            nodeAdd: ((s,d,n) => that.handleAdd(s,d,n)),
            nodeEdit: ((s,d,n) => that.handleEdit(s,d,n)),
            nodeEditPass: ((s,d,n) => that.handleEditPass(s,d,n)),
            nodeDel: ((s,d,n) => that.handleDelete(s,d,n))
          }
        });
      },
      handleAddTop(){
        let add = (item) => {
            //添加数据
            this.setTree.push(item)
            this.$message.success("添加顶级节点成功！")
        }
        this.$emit('add-node-top',add)
      },
      handleAdd(s,d,n){//增加节点
        if(n.level >=6){
          this.$message.error("最多只支持五级！")
          return false;
        }
        let add = (item) => {
            //添加数据
            d.children.push(item)
            //展开节点
            if(!n.expanded){
              n.expanded = true;
            }
            this.$message.success("添加子节点成功！")
        }
        this.$emit('add-node',d,add)
        
      },
      handleEdit(s,d,n){//编辑节点开始
      // console.log('tag', '')
        this.startCont = d.name
        console.log('start', d)
      },
      handleEditPass(s,d,n){//编辑节点完成
        let editFail = () => {
            d.name = this.startCont
            this.$message.error("编辑节点失败！")
        }
        this.$emit('edit-pass',d,editFail)
      },
      handleDelete(s,d,n){//删除节点
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,//节点同级数据
              _index = 99999;//要删除的index
            /*if(!n.parent.data.children){//删除顶级节点，无children
              list = n.parent.data
            }*/
            list.map((c,i) => {
              if(d.id == c.id){
                _index = i;
              }
            })
            let k = list.splice(_index,1);
            this.$message.success("删除成功！")
          }
          let isDel = () => {
            that.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$emit('del-node',d,delNode)
              // delNode()
            }).catch(() => {
              return false;
            })
          }
          isDel()
          //判断是否新增
          // d.id > this.non_maxexpandId ? delNode() : isDel()
        }
      },
    }
    
  }
</script>

<style>
.expand{
  width:300px;
  overflow:hidden;
}
.expand>div{
  height:85%;
  margin:0 auto;
  max-width:400px;
  overflow-y:auto;
}
.expand>div::-webkit-scrollbar-track{
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius:5px;
}
.expand>div::-webkit-scrollbar-thumb{
  background-color:rgba(50, 65, 87, 0.5);
  outline:1px solid slategrey;
  border-radius:5px;
}
.expand>div::-webkit-scrollbar{
  width:10px;
}
.expand-tree{
  border:none;
  margin-top:10px;
}
.expand-tree .el-tree-node.is-current,
.expand-tree .el-tree-node:hover{
  overflow:hidden;
}
.expand-tree .el-tree-node__children .is-current>.el-tree-node__content .tree-btn,
.expand-tree .el-tree-node__children .el-tree-node__content:hover .tree-btn{
  display:inline-block;
}
.expand-tree>.is-current>.el-tree-node__content .tree-btn1,
.expand-tree>.el-tree-node>.el-tree-node__content:hover .tree-btn1{
  display:inline-block;
}
.expand-tree .is-current>.el-tree-node__content .tree-label{
  font-weight:600;
  white-space:normal;
}
</style>