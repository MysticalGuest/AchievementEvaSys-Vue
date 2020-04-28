// axios package
// 引入axios，并加到原型链中
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index' //@ 等价于/src这个目录
import router from '@/router'

Vue.prototype.$axios = axios;
Vue.prototype.$store = store;
axios.defaults.baseURL = '/'  //关键代码
// 设置默认的请求超时时间。超过了10s，告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;
// post请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



/*==============================
		拦截器
	==============================*/
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        console.log("请求拦截器config"+config.headers.Authorization);
        const token = store.state.token;
        console.log("store.state"+store.state);
        console.log("token:"+token);
        token && (config.headers.Authorization = token);
        // if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        //             config.headers.Authorization = token;
        //         }
        return config;
    },
    error => {
        console.log("error:"+error);
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    // 请求成功
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        console.log("响应拦截器"+response.status);
        if (response.status === 200) {
          console.log("响应拦截器"+response.status);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    // 请求失败
    error => {
      console.log("响应拦截器error::"+error);
      console.log("响应拦截器码:"+error.response.status);
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:{
                  console.log("响应拦截器error::401");
                  console.log("401::"+router);
                  console.log("401::"+router.currentRoute.fullPath);
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);


/*==============================
		封装get方法和post方法
	==============================*/
// const Domain = "http://148.70.15.23:8000";  // 定义根域名
const Domain = "";
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(sction, params){
    return new Promise((resolve, reject) =>{
        // url 判断是测试环境 就要拿 测试环境的域名， 正式环境的就要用 正式域名
        let url = Domain + action;
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(action, params) {
    return new Promise((resolve, reject) => {
        let url = Domain + action;
        axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
