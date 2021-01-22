//#创建http.js文件
import axios from 'axios'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';

//只要axios一开始发请求 就先走拦截器里面的逻辑 然后去做真实的接口请求或者发送

// http request 拦截器  拦截在"请求"之前就给请求们加上请求头
axios.interceptors.request.use(
    config => { //将所有的axios的header里加上token_type和access_token
        config.headers.token = `${localStorage.token}`;
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器 带请求头返回的信息报不报错
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        //401 清除token信息并跳转到登录页面
        if (error.response.status == 401) {
            router.replace({    //如果失败，跳转到登录页面
                name: 'Home'
            })
        }
        return Promise.reject(error.response.data)
    });

export default axios;       //然后再次export出去，嘿嘿 main.js那里就得改改咯



