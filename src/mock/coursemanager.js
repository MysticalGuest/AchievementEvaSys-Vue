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