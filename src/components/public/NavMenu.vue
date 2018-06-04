<template>
    <!-- 导航菜单 -->
    <el-menu>
        <div  v-for="(subitem,index) in treeData" :key="index">
            <el-submenu v-if="subitem.children&&subitem.children.length>0" :index="(index+1).toString()">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span @click.stop="link(subitem.component_id)">{{subitem.name}}</span>
                </template>
                <el-menu-item v-for="(item,i) in subitem.children" @click="link(item.name,item.id)" :key="i" :index="(index+1)+'-'+(i+1)">
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else @click="link(subitem.component_id)" :index="(index+1).toString()">
               <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{subitem.name}}</span>
                </template>
            </el-menu-item>
        </div>
    </el-menu>
</template>
<script>
export default {
  name: "NavMenu",
  props: ["treeData"],
  created(){
      console.log(this.treeData,"treeDate");
  },
  methods:{
      link(name,id){
        if(name==0)
            name="add-customer"
        this.$router.push({name,params:{id}})    
      }
  }
};
</script>
<style scoped>
    .el-menu{
        border:none;
    }
    .el-menu *{
        font-size:20px;
    }
    .el-icon-menu {
        color:#409EFF;
    }
    .el-submenu .el-menu-item span{
        padding-left: 13px;
    }
</style>

