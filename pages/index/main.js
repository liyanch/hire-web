import Vue from 'vue';
import App from './App';
import titleBar from '@/components/titleBar.vue';
import navbar from '@/components/nav.vue';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('titleBar', titleBar)
Vue.component('navbar', navbar)

const app = new Vue({
	...App
})
app.$mount()