<template>
        <div class="modal">       
            <div class="modal-header">
                <h4>{{modelData.title}}</h4>
            </div>
            <div class="modal-content">
                    <!-- <slot name="content">可定制内容区</slot> -->
                <el-form :model="item" :rules="getRule(item.reg)" v-for="(item,index) in  modelData.formData"  :key="index"  label-width="80px">
                    <el-form-item  prop="value" size="small"  :label="item.title">
                        <el-input v-if="item.type == 1" v-model="item.value" :placeholder="item.default"></el-input>
                        <el-select v-if="item.type == 2" v-model="item.value" :placeholder="item.default">
                            <el-option v-for="(subItem,count) in  item.item"  :key="count" :label="subItem.label" :value="subItem.value"></el-option>
                        </el-select>
                        <el-radio-group v-if="item.type == 3" v-model="item.value">
                            <el-radio v-for="(subItem,count) in  item.item"  :key="count" :label="subItem.value">{{subItem.label}}</el-radio>
                        </el-radio-group>
                        <el-checkbox-group v-if="item.type == 4" v-model="item.value">
                            <el-checkbox v-for="(subItem,count) in  item.item"  :key="count" :label="subItem.value" :name="subItem.value">{{subItem.label}}</el-checkbox>
                        </el-checkbox-group>
                        <el-input v-if="item.type == 5" type="textarea" v-model="item.value"></el-input>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item size="small" class="modal-footer">
                        <el-button type="primary" @click="onSubmit">{{modelData.btnMsg[0]}}</el-button>
                        <el-button @click="cancelHandle">{{modelData.btnMsg[1]}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
    </div>
</template>

<script>
    export default {
        name:'Model',
        data(){
            return {
                number: {
                    value: [
                        { required: true, message: '输入框不能为空'},
                        {pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '请输入纯数字'}
                    ]
                },
                email: {
                    value: [
                        { required: true, message: '输入框不能为空'},
                        {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱格式'}
                    ]
                },
                 tel: {
                    value: [
                        { required: true, message: '输入框不能为空'},
                        {pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '请输入正确的手机格式'}
                    ]
                },
                ID: {
                    value: [
                        { required: true, message: '输入框不能为空'},
                        {pattern: /^\d{15}|\d{18}$/, message: '请输入正确的身份证格式'}
                    ]
                },
                rulesNo:{
                    value:[]
                }
            }
        },
        props:{
            modelData:{
                type:Object,
                default:{}
            }
        },
        computed:{
           
        },
        methods:{
            getRule(reg){
                if(reg == '1'){
                    return this.number
                }if(reg == '2'){
                    return this.email
                }if(reg == '3'){
                    return this.tel
                }if(reg == '4'){
                    return this.ID
                }else{
                    return this.rulesNo
                }
            },
            onSubmit(){
                let temp = {}              
                this.modelData.formData.forEach(ele => {
                    temp[ele.name] = ele.value
                })
                this.$emit("on-ok",temp)
            },
            cancelHandle(){
                this.$emit('on-cancel')
            }
        }
    }
</script>

<style scoped>
        p,h4{
            margin:0;
        }
        .modal{
            position: absolute;
            left: 50%;
            top:50%;
            z-index: 1000;
            transform: translate(-50%,-50%);
            width: 500px;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 3px 9px rgba(0,0,0,.5);
        }
        .modal-header {
            padding: 15px;
        }
        .modal-content {
            padding: 20px;
            text-align: left
        }
        .modal-content div{
            padding: 5px;
        }
        .modal-footer {
            padding: 15px;
            text-align: right;
        }
</style>