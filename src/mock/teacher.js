import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import tea from './database/teacher/tea.js'
import iKun from './database/teacher/teaIKun.js'


mock.onPost("/tea/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, mergeJsonObject(iKun.teainfo, tea)];
  }
  return [401];
});

// 教师端首页
mock.onPost("/tea/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.teainfo];
  }
  return [401];
});

// 获取老师所教的课程
mock.onPost("/tea/courseinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.courseData];
  }
  return [401];
});

mock.onPost("/tea/detailinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("cno:"+data.get("cno"));
  // if(data.get("tno")=="222"){
    return [200, iKun.detailData];
  // }
  // return [401];
});
