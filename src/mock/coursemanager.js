import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import com from './database/coursemanager/com.js'
import Jay from './database/coursemanager/comJay.js'

mock.onPost("/com/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("323232"+Jay.IDnum);
  if(data.get("tno")=="333"){
    return [200, mergeJsonObject(Jay.cominfo, com)];
  }
  return [401];
});

// 课程负责人端首页
mock.onPost("/com/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="333"){
    return [200, Jay.cominfo];
  }
  return [401];
});

// 课程负责人端所负责课程
mock.onPost("/com/courselist").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="333"){
    return [200, Jay.courselist];
  }
  return [401];
});

// 课程负责人端所负责课程对应学生
mock.onPost("/com/detailinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("cno:"+data.get("cno"));
  // if(data.get("tno")=="222"){
    return [200, Jay.detailData];
  // }
  // return [401];
});

// 获取选修这门课的学生
mock.onPost("/com/stuofcourse").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, Jay.stuData];
  // return [401];
});

// 获取选这门课的班级名单
mock.onPost("/com/classOfcourse").reply(config => {
  // 请求cno
  return [200, Jay.classOfcourse];
  // return [401];
});

//获取这门课所有的对应的指标点
mock.onPost("/com/courseIndexDetail").reply(config => {
  // 请求cno
  return [200, Jay.course_index_detal];
  // return [401];
});

// 绘制图表
mock.onPost("/com/courseReview").reply(config => {
  // 请求cno
  return [200, Jay.courseReview];
  // return [401];
});

// 给对应老师审核不通过的通知
mock.onPost("/com/notifyTeacher").reply(config => {
  return [200];
  // return [401];
});

// 修改改班级在某门课的成绩的审核状态
mock.onPost("/com/setCourseState").reply(config => {
  // 'classno':classno,
  //       'cno':cno,
  //       'state':state//state状态，1是已经审核，0是没有通过审核

  return [200, Jay.reviewMessage];
  // return [401];
});