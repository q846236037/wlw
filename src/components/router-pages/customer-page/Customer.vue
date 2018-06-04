<template>
<!-- 客户界面 -->
        <el-container>
            <el-header>
                <el-button :type="nowIndex==0?'primary':'default'" @click="link(0,'org-manage',$route.params.id)">组织管理</el-button>
                <el-button :type="nowIndex==1?'primary':'default'" @click="link(1,'power')">权限列表</el-button>
                <el-button :type="nowIndex==2?'primary':'default'" @click="link(2,'roles-manage')">角色管理</el-button>
            </el-header>
             <el-container>
                <el-main>
                      <router-view></router-view>
                </el-main>
             </el-container>
        </el-container>
</template>
<script>
export default {
  name: "Customor",
  data() {
    return {
      nowIndex: 0
    };
  },
  beforeDestroyed(){
    console.log(1)
  },
  methods: {
    link(index, name, id) {
      this.nowIndex = index;
      this.$router.push({ name, params: { id } });
    }
  }
};
</script>
<style scoped>
.el-header button {
  margin-top: 10px;
}
.el-container {
  height: 100%;
}
</style>

