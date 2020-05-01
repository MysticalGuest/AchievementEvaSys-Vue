import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '../components/views/login.vue'

import sysinterface from '../components/views/common/interface.vue'
import facultyinfo from '../components/views/common/facultyinfo.vue'

// 学生
import stuinfo from '../components/views/student/stuinfo.vue'
import academicinfo from '../components/views/student/academicinfo.vue'
import warninfo from '../components/views/student/warninfo.vue'

// 任课教师
import courseinfo from '../components/views/teacher/courseinfo.vue'
import manageeva from '../components/views/teacher/manageeva.vue'

// 课程管理员
import courselist from '../components/views/coursemanager/courselist.vue'
import reviewcourse from '../components/views/coursemanager/reviewcourse.vue'

// 专业负责人
import formatgraduation from '../components/views/majormanager/formatgraduation.vue'
import scoreanalysis from '../components/views/majormanager/scoreanalysis.vue'

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
          path:'/stu/academicinfo',
          name:'academicinfo',
          component: academicinfo
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
        {
          path:'/tea/courseinfo',
          name:'courseinfo',
          component: courseinfo
        },
        {
          path:'/tea/manageeva',
          name:'manageeva',
          component: manageeva
        }
      ]
    },{
      path: '/com',
      name: 'cominterface',
      component: sysinterface,
      children:[
        {
          path:'/com/interface',
          name:'cominfo',
          component: facultyinfo
        },
        {
          path:'/com/courselist',
          name:'courselist',
          component: courselist
        },
        {
          path:'/com/reviewcourse',
          name:'reviewcourse',
          component: reviewcourse
        }
      ]
    },{
      path: '/mam',
      name: 'maminterface',
      component: sysinterface,
      children:[
        {
          path:'/mam/interface',
          name:'maminfo',
          component: facultyinfo
        },
        {
          path:'/mam/formatgraduation',
          name:'formatgraduation',
          component: formatgraduation
        },
        {
          path:'/mam/scoreanalysis',
          name:'scoreanalysis',
          component: scoreanalysis
        }
      ]
    },
    // 404page
    { path: '*', name: 'page404', component: page404 }
  ]
})
