<template>
<!-- 角色管理 -->
    <div class="roles-box">
        <div class="manage-header">
            <el-button type="primary" plain icon="el-icon-plus" size="small">新建角色</el-button>
        </div>
        <div class="table-box custemor-scroll-bar">
            <table-com v-if="tableData" :table-data="tableData" :is-pagination="false"></table-com>
        </div>
    </div>
</template>
<script>
    export default {
        name:'rolesManage',
        data(){
            return {
                tableData:{
                    titles:[
                        {
                            prop:'name',
                            label:'角色名称'
                        },
                        {
                            prop:'power',
                            label:'权限'
                        }
                    ],
                    list:[
                        {
                            name:'超级管理员',
                            power:'默认系统自带，康吉管理员'
                        },
                        {
                            name:'超级管理员',
                            power:'默认系统自带，康吉管理员'
                        }
                         ,{
                            name:'超级管理员',
                            power:'默认系统自带，康吉管理员'
                        }
                    ]
                }
            }
        }
    }
</script>
<style>
    .roles-box{
        padding: 5px 0 0 10px;
    }
     .roles-box .manage-header{
        padding-bottom: 5px;
    }
</style>

