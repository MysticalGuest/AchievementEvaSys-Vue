import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import mam from './database/majormanager/mam.js'
import Joker from './database/majormanager/mamJoker.js'

mock.onPost("/mam/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="444"){
    return [200, mergeJsonObject(Joker.maminfo, mam)];
  }
  return [401];
});

// 教师端首页
mock.onPost("/mam/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="444"){
    return [200, Joker.maminfo];
  }
  return [401];
});