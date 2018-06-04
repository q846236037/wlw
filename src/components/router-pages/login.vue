<template>
    <!-- 登录界面 -->
    <div class="form-container">
        <h1>某某物联网平台</h1>
        <el-form :model="userInfo" label-width="60px">
            <el-form-item label="用户名" class="login-userid">
                <el-input v-model="userInfo.name" type="text" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="login-password">
                <el-input v-model="userInfo.pwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="login-enter">
                <el-button @click="sign_up"  type="primary">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Api from '@/Api'
    import {mapActions} from 'vuex'
    export default {
        name:'login',
        data(){
            return {
                userInfo:{
                   name:'',
                    pwd:'',
                    lvl:'3'
                }
            }
        },
        methods:{
            ...mapActions(['commitUserInfo']),
            sign_up(){
                Api.login(this.userInfo)
                .then(res => {
                    if (res.data.ret==1) {
                        window.sessionStorage.loginState = 1;
                        this.commitUserInfo(res.data)
                        this.$router.push({
                            name:'admin',
                            params:{
                                ...res.data
                            }
                        });
                    }else{
                        alert("账号或密码错误")
                    }
                    
                })
            }
        }
    }  
</script>
<style scoped>
    .form-container{
        border:solid 1px #dddddd;
        border-radius: 4px;
        width: 460px;
        height:400px;
        position:fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        overflow: hidden;
    }
    .form-container>h1{
        text-align: center;
        margin-top: 30px;
    }
    .form-container .el-form-item{
        width: 400px;
        margin: 20px auto 0;
    }
    .form-container .login-enter{
        text-align: center;
        margin-top: 60px;
    }
    .form-container .login-enter .el-button{
        width: 300px;
    }
</style>

