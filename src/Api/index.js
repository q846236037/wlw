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
    }
}