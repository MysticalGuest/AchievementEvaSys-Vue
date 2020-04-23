// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'

import stu from './database/stu.js'
import {mergeJsonObject} from './database/stu.js'
import Mysteryguest from './database/stumysteryguest.js'

import {mock} from './index.js'
// const mock = new MockAdapter(axios);


mock.onPost("/stu/interface").reply(config => {
  console.log("config  sno"+config.data);
  const data = new URLSearchParams(config.data);
  console.log("sddsds"+Mysteryguest.stuinfo);
  // const thisstu = mergeJsonObject(Mysteryguest, stu);
  if(data.get("sno")=="111"){
    return [200, mergeJsonObject(Mysteryguest.stuinfo, stu)];
  }
  return [401];
});

mock.onPost("/stu/info").reply(config => {
  console.log("config  sno"+config.data);
  console.log("22222"+Mysteryguest.stuinfo);
  const data = new URLSearchParams(config.data);

  if(data.get("sno")=="111"){
    return [200, Mysteryguest.stuinfo];
  }
  return [401];
});

mock.onPost("/stu/courseinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.courseinfo];
  }
  return [401];
});

//获取学生所选课程大纲内容及其分值
mock.onPost("/stu/courseDetailInfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("sdsdsd"+data.get("sno"));
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.courseDetailData];
  }
  return [401];
});

//获取课程预警
mock.onPost("/stu/warninfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    return [200, Mysteryguest.warninfo];
  }
  return [401];
});
