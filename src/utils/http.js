import axios from 'axios'
import nprogress from "nprogress";
import "nprogress/nprogress.css";
axios.defaults.baseURL='http://localhost:3000/api'
axios.defaults.timeout = 5000;  //超市时间是5秒
axios.defaults.withCredentials = true;  //允许跨域
//Content-Type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
  // config.headers.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxIn0.qfd0G-elhE1aGr15LrnYlIZ_3UToaOM5HeMcXrmDGBM';
    nprogress.start()
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


axios.interceptors.response.use(function (response) {
    nprogress.done()
    return response;
  }, function (error) {
    
    return Promise.reject(error);
  });
