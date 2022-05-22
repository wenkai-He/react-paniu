import axios from 'axios'
import nprogress from "nprogress";
import "nprogress/nprogress.css";
axios.defaults.baseURL='http://localhost:3000'

axios.interceptors.request.use(function (config) {
  if(localStorage.getItem('token')){
    config.headers.token = localStorage.getItem('token')
  }
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
