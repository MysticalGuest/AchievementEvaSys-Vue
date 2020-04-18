import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/views/login.vue'

import stuinterface from '../components/views/student/stuinterface.vue'
import stuinfo from '../components/views/student/stuinfo.vue'
import courseinfo from '../components/views/student/courseinfo.vue'

import page404 from '../components/views/error/page404.vue'

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
      path: '/stu',
      name: 'stuinterface',
      component: stuinterface,
      children:[
        {
          path:'/stu/interface',
          name:'stuinfo',
          component:stuinfo
        },
        {
          path:'/stu/courseinfo',
          name:'courseinfo',
          component:courseinfo
        }
      ]
    },
    // 404page
    { path: '*', name: 'page404', component: page404 }
  ]
})
