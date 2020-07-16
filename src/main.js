import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

import { api } from "@/utils/api";

Vue.prototype.api = api

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
