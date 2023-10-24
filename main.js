// import Vue from 'vue'
// import App from './App'
// import titleBar from '@/components/titleBar.vue'

// import uView from '@/uni_modules/uview-ui';
// import api from "network/api.js"
// import base from '@/network/baseUrl.js'
// // import rule from '@/network/rule.js'
// // import store from './store';

// Vue.use(uView);
// Vue.prototype.$rqt = api;
// Vue.prototype.$base = base;
// // Vue.prototype.$rule = rule;
 
// Vue.config.productionTip = false
// App.mpType = 'app'
 
// const app = new Vue({
//   // store,
//     ...App
// })
// app.$mount()


import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$http = function(url, method, data){
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:8080/' + url,
      method: method,
      data: data,
      header:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + uni.getStorageSync('token')
      },
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
}

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()