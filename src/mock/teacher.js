import {mock} from './index.js'

import tea from './database/teacher/tea.js'
import {mergeJsonObject} from './database/teacher/tea.js'
import iKun from './database/teacher/teaIKun.js'


mock.onPost("/tea/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, mergeJsonObject(iKun, tea)];
  }
  return [401];
});

// 教师端首页
mock.onPost("/tea/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun];
  }
  return [401];
});