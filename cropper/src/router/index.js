import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import CropperHeader from '../components/CropperHeaderVux'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CropperHeader',
      component: CropperHeader
    }
  ]
})
