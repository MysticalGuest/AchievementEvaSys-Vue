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
  // const thisstu = mergeJsonObject(Mysteryguest, stu);
  if(data.get("sno")=="111"){
    return [200, mergeJsonObject(Mysteryguest, stu)];
  }
  return [401];
});

mock.onPost("/stu/info").reply(config => {
  console.log("config  sno"+config.data);
  const data = new URLSearchParams(config.data);
  // const thisstu = mergeJsonObject(Mysteryguest, stu);
  if(data.get("sno")=="111"){
    return [200, Mysteryguest];
  }
  return [401];
});
