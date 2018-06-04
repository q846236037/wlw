<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'App',
  mounted(){
    window.onbeforeunload = function(){
      window.sessionStorage.setItem('aaa','111111');
    }
  }
}
</script>

<style>
html,body{
  min-width: 960px;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-aside::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.el-aside::-webkit-scrollbar-button, .el-aside::-webkit-scrollbar-track {
    display: none;
}
.el-aside::-webkit-scrollbar-thumb {
    background:#6eb4fa;
    border-radius: 8px;
}
.el-aside::-webkit-scrollbar-button, .el-aside::-webkit-scrollbar-track {
    display: none;
}
.el-aside::-webkit-scrollbar-track-piece {
    background: #fff;
}
</style>
