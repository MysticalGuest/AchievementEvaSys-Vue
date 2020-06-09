import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import tor from './database/tutor/tor.js'
import GEM from './database/tutor/torGEM.js'

mock.onPost("/tor/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="555"){
    return [200, mergeJsonObject(GEM.torinfo, tor)];
  }
  return [401];
});

// 教师端首页
mock.onPost("/tor/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="555"){
    return [200, GEM.torinfo];
  }
  return [401];
});

// 学生信息
mock.onPost("/tor/stulist").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="555"){
    return [200, GEM.stulist];
  }
  return [401];
});