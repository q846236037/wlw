import Vue from 'vue'
import Router from 'vue-router'
//一级路由
import login from '@/components/router-pages/login'  //登录&注册
import admin from '@/components/router-pages/admin'    //主体内容
//二级路由
import addCustomer from '@/components/router-pages/customer-page/addCustomer' //客户管理&添加客户
import Customer from '@/components/router-pages/customer-page/Customer'       //客户展示
//三级路由
import orgManage from '@/components/router-pages/customer-page/children/orgManage' //组织管理
import powerList from '@/components/router-pages/customer-page/children/powerList' //权限列表
import rolesManage from '@/components/router-pages/customer-page/children/rolesManage' //角色管理

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:login
    },
    {
      path:'/admin',
      name:'admin',
      component:admin,
      children:[
        {
          path:"/admin",
          redirect:"add-customer"
        },
        {
          path:'add-customer',
          name:'add-customer',
          component:addCustomer
        },
        {
          path: 'customer',
          name:'customer',
          component:Customer,
          children:[
            {
              path:'/admin/customer',
              redirect:'manage'
            },
            {
              path:'org-manage',
              name:'org-manage',
              component:orgManage
            },
            {
              path:'power',
              name:'power',
              component:powerList
            },
            {
              path:'roles-manage',
              name:'roles-manage',
              component:rolesManage
            }
          ]
        }
      ]
    }
  ]
})
