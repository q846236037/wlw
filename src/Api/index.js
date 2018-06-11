import axios from 'axios'

let HTTP= axios.create({
    baseURL:'http://localhost:8080/MySpring/',
    timeout:1000,
    responseType:'json',
    withCredentials: true,
})

export default {
    login(params){
        return HTTP.get('login_corp',{
            params
        })
    },
    selectCorp(params){
        return HTTP.get('corp', {
          params
        })
    },
    formCorp(params){
        return HTTP.get('form/1',{
            params
        })
    },
    treeList(params){
        return HTTP.get('corp/'+params+'/dept')
    },
    tableDate(params){
        return HTTP.get('corp/'+params);
    },
    tableCorpDept(corpId,deptId){
         return HTTP.get('corp/' + corpId + '/' + deptId + '/deptEmployee')
    },
    deleteDept(corpID,deptID){
        return HTTP.delete('corp/' + corpID +'/dept/'+deptID)
    },
    updateDept(params) {
        return HTTP.put('corp/' + params.corp_id + '/dept/' + params.id,{
            params
        })
    }
}