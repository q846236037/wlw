/*
客户管理模块
*/
import Api from '@/Api'
export default {
  state: {
    treeList: []
  },
  mutations: {
    cmt_tree(state, payload) {
      state.treeList = payload
    }
  },
  actions: {
    dph_tree(store, payload) { //获取树行菜单
      // Api.get('/mockData/tree')
      //   .then(res => {
      //     store.commit('cmt_tree', res.data)
      //   })
      Api.treeList(this.state.userInfo.body.employee.corp_id).then(res=>{
        console.log(res);
        store.commit('cmt_tree',res.data.body)

      })
    }
  }
}
