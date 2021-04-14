import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import mainPage from '@/pages/mainPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: index
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage
    },
  ]
})