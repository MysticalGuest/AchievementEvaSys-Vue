import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/views/login.vue'
import stuinterface from '../components/views/student/stuinterface.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/stu/interface',
      name: 'stuinterface',
      component: stuinterface
    }
  ]
})
