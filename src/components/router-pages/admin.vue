<template>
<!-- 主要界面 -->
    <el-container>
      <el-header height="100px">
        <el-container>
          <el-aside width="300px">
            <img src="@/assets/images/logo.png" width="200" height="98" alt="logo">
        </el-aside>
        <el-main>
            <el-row>
              <el-col :span="20"><h1>物联网平台</h1></el-col>
              <el-col :span="4" class="header-right">
                <el-button @click="logout">注销</el-button>
              </el-col>
            </el-row>
        </el-main>
        </el-container>
      </el-header>
      <el-container  style="height: 640px;">
        <el-aside width="260px" class="nav-box">
          <nav-menu :tree-data="navData"></nav-menu>
        </el-aside>
        <el-main class="custemor-scroll-bar">
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import NavMenu from '@/components/public/NavMenu'
import Api from "@/Api";
import { mapState, mapActions } from "vuex";
export default {
  name: "admin",
  data() {
    return {
      navData:[],
      useInfo:null,
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("loginState");
      this.$router.push("/");
    },
    isLogin() {   //判断是否登录
      let loginState = window.sessionStorage.loginState;
      if (!loginState) {
        this.$router.push("/");
      }
    }
  },
  beforeMount() {
    this.isLogin();
  },
  created() {
    // Api.get('/mockData/menu-list.json')  //获取导航菜单
    //   .then(res => {
    //       this.navData = res.data.list;
    //   });
      let menus=this.$route.params.body.menus;
      this.navData=menus;
      this.useInfo=this.$route.params;
  },
  components:{NavMenu}
};
</script>
<style>
.el-header h1{
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  text-align: center;
}
.el-header{
  border-bottom: solid 1px #e6e6e6;
}
.el-main{
  padding: 0;
}
#app>.el-container{
  border-bottom: solid 1px #e6e6e6;
}
#app .nav-box{
  border-right: solid 1px #e6e6e6;
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

