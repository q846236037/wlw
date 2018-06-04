<template>
    <!-- 权限管理 -->
    <div class="power-list-box">
        <table-com :table-data="list" :is-edit="false" :is-pagination="false"></table-com>
    </div>
</template>
<script>
export default {
  name: "powerList",
  data() {
    return {
      list: {
        titles: [
          {
            prop: "name",
            label: "权限名称"
          }
        ],
        list: [
          { name: "超级浏览器权限" },
          { name: "超级浏览器权限" },
          { name: "超级浏览器权限" },
          { name: "超级浏览器权限" },
          { name: "超级浏览器权限" }
        ]
      }
    };
  }
};
</script>
<style>
.power-list-box{
    width: 400px;
    margin:30px auto;
}
</style>

