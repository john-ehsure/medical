
import axios from 'axios'
import {bus} from '@/bus/bus.js'

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['token'] = localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf("/auth_api/reg_first") > -1 || config.url.indexOf("/auth_api/reg_second")>-1 || config.url.indexOf("/auth_api/token")>-1){
    localStorage.setItem('token',"");
    // config.headers.token = "";
  }else{
    config.headers.Authorization = 'JWT '+ localStorage.getItem("token");
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && (response.config.url != '/auth_api/reg_first' || response.config.url != '/auth_api/reg_second' || response.config.url != '/auth_api/token')) {
    if (!localStorage.getItem("token")) {
      //未登录
      bus.$emit('goto', '/login')
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//基地址
let base = '';  //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}/`, params).then(res => res.data)
}

export const POSTID = (url, id, params) => {
  return axios.post(`${base}${url}/${id}/`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}/`, {params: params}).then(res => res.data)
}

export const GETID = (url, id, params) => {
  return axios.get(`${base}${url}/${id}/`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}/`, params).then(res => res.data)
}

export const PUTID = (url, id, params) => {
  return axios.put(`${base}${url}/${id}/`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}/${params}/`).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}/`, params).then(res => res.data)
}

export const PATCHID = (url, id, params) => {
  return axios.patch(`${base}${url}/${id}/`, params).then(res => res.data)
}
