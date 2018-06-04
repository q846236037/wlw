import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
import custemor from './modules/custemor';

export default new Vuex.Store({
    state:{
       count:1,
       userInfo:" ",
    },
    mutations:{
        setUserInfo(state,userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions:{
        commitUserInfo(store,userInfo){
            store.commit('setUserInfo',userInfo);
        }
    },
    modules:{
        custemor
    }
})