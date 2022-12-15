/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:35:19
 * @LastEditTime: 2022-11-11 09:11:34
 * @Description:
 */
import axios from 'axios';

// 创建新的axios实例，
// const host = import.meta.env.MODE === 'production' ? '' : '/api';
const host = process.env.NODE_ENV === 'production' ? '' : '/api';

const service = axios.create({
  baseURL: host,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // withCredentials: true,
});
// 2.请求拦截器
service.interceptors.request.use((config) => {
  return config;
});

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    const res = response.data;
    if (res.code === 5112) {
      window.location.href = '/login';
    }
    return res;
  },
  (error) => {
    /***** 接收到异常响应的处理开始 *****/
    let message;
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          message = '错误请求';
          break;
        case 401:
          message = '未授权，请重新登录';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误,未找到该资源';
          // window.location.href = '/login';
          break;
        case 405:
          message = '请求方法未允许';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器端出错';
          break;
        case 501:
          message = '网络未实现';
          break;
        case 502:
          message = '网络错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网络超时';
          break;
        case 505:
          message = 'http版本不支持该请求';
          break;
        default:
          message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        // ElMessage.error('服务器响应超时，请刷新当前页');
        console.log('服务器响应超时，请刷新当前页');
      }
      // ElMessage.error('连接服务器失败');
      console.log('连接服务器失败');
    }
    // ElMessage.error(message);
    console.log(message);
    /***** 处理结束 *****/
    return Promise.reject(error.response);
  }
);

export default service;
