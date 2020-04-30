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

// 获取老师通知消息
mock.onPost("/tea/message").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.inform];
  }
  return [401];
});

// 获取选修这门课的学生
mock.onPost("/tea/stuofcourse").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.stuData];
  // return [401];
});

// 获取这个学生在某个课程指标点的登记情况
mock.onPost("/tea/teaIndexDetailState").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.detailState];
  // return [401];
});

// 登记学生在这门课对应指标点分值时,获取指标点下拉框
mock.onPost("/tea/registerGrade").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.index_options];
  // return [401];
});

mock.onPost("/tea/detailinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("cno:"+data.get("cno"));
  // if(data.get("tno")=="222"){
    return [200, iKun.detailData];
  // }
  // return [401];
});
