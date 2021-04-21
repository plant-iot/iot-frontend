import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import mainPage from '@/pages/mainPage'
import ruleEngine from '@/pages/ruleEngine'
import ruleWarning from '@/pages/ruleWarning'
import thingModelPage from '@/pages/thingModelPage'

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
    {
      path: '/ruleEngine',
      name: 'ruleEngine',
      component: ruleEngine
    },
    {
      path: '/ruleWarning',
      name: 'ruleWarning',
      component: ruleWarning
    },
    {
      path: '/thingModelPage',
      name: 'thingModelPage',
      component: thingModelPage
    }
  ]
})
