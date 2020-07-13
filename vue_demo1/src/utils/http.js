/**
 * http.js
 * 封装axios，
 * 调用方法:
 * http.get('/api/enquiry/web/query',{id:1}).then((res)=>{你的操作})
 * http.post('/api/enquiry/web/update',{id:1}).then((res)=>{你的操作})
 * http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
 */
import axios from 'axios'
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();
axios.defaults.headers['Authorization']='Basic b3JkZXItY2xpZW50Om9yZGVyLXNlY3JldC04ODg4'
//axios.defaults.headers['Content-Type'] ='application/x-www-form-urlencoded'
//axios.defaults.headers['Content-Type'] ='application/json'
axios.interceptors.request.use(config=> {

  config.headers.access_token = window.sessionStorage.getItem('access_token')
  return config

})
axios.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    if (response.data.code==200) {

    }else if(response.data.code==401){

    }else{

    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    v.$message({
      showClose: true,
      message: error.response.data,
      type: 'error'
    })
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  })
axios.defaults.baseURL='http://localhost:8768'
export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get (url, params) {
    return new Promise((resolve, reject) => {

      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params,{headers: {'Content-Type': 'application/json'}})
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {


          reject(err)
        })
    })
  },
  /**
   * postFormData方法，对应post请求，用来提交文件+数据
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  postFormData (url, params) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        },
        transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
          const formData = new FormData()
          Object.keys(data).forEach(key => {
            formData.append(key, data[key])
          })
          return formData
        }],
        url,
        method: 'post',
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
