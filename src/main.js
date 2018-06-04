// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TreeMenu from './components/public/TreeMenu'
import TableCom from './components/public/TableCom'
import Model from './components/public/Model'
import router from './router'
import './Mock';    //模拟数据
import store from './store'
import axios from 'axios'
axios.defaults.withCredentials = true;

Vue.use(ElementUI);

Vue.component(TreeMenu.name,TreeMenu);    //树形菜单
Vue.component(TableCom.name,TableCom);    //表格
Vue.component(Model.name,Model);          //模态框
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
