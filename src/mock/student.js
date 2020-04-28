import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import stu from './database/student/stu.js'
import Mysteryguest from './database/student/stumysteryguest.js'

// 拦截/stu
// mock.onGet("/").reply(401);

mock.onPost("/stu/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    return [200, mergeJsonObject(Mysteryguest.stuinfo, stu)];
  }
  return [401];
});

// 学生端首页
mock.onPost("/stu/info").reply(config => {
  console.log("config  sno"+config.data);
  console.log("22222"+Mysteryguest.stuinfo);
  const data = new URLSearchParams(config.data);

  if(data.get("sno")=="111"){
    return [200, Mysteryguest.stuinfo];
  }
  return [401];
});

// 学生端学业信息
mock.onPost("/stu/courseinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.courseinfo];
  }
  return [401];
});

// 获取学生所选课程大纲内容及其分值
mock.onPost("/stu/courseDetailInfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("sdsdsd"+data.get("sno"));
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.courseDetailData];
  }
  return [401];
});

// 获取课程预警
mock.onPost("/stu/warninfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.warninfo];
  }
  return [401];
});
