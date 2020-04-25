import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/views/login.vue'

import sysinterface from '../components/views/common/interface.vue'
import stuinfo from '../components/views/student/stuinfo.vue'
import courseinfo from '../components/views/student/courseinfo.vue'
import warninfo from '../components/views/student/warninfo.vue'

import facultyinfo from '../components/views/common/facultyinfo.vue'

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
      component: sysinterface,
      children:[
        {
          path:'/stu/interface',
          name:'stuinfo',
          component: stuinfo
        },
        {
          path:'/stu/courseinfo',
          name:'courseinfo',
          component: courseinfo
        },
        {
          path:'/stu/warninfo',
          name:'warninfo',
          component: warninfo
        }
      ]
    },{
      path: '/tea',
      name: 'teainterface',
      component: sysinterface,
      children:[
        {
          path:'/tea/interface',
          name:'teainfo',
          component: facultyinfo
        },
        // {
        //   path:'/stu/courseinfo',
        //   name:'courseinfo',
        //   component: courseinfo
        // },
        // {
        //   path:'/stu/warninfo',
        //   name:'warninfo',
        //   component: warninfo
        // }
      ]
    },
    // 404page
    { path: '*', name: 'page404', component: page404 }
  ]
})
