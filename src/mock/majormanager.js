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

// 专业负责人端首页
mock.onPost("/mam/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="444"){
    return [200, Joker.maminfo];
  }
  return [401];
});

// 获取所有指标点
mock.onPost("/mam/getAllIndexDetail").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="444"){
    return [200, Joker.allIndexDetail];
  // }
  return [401];
});

// 获取整个年级个人评价值平均分
mock.onPost("/mam/getAvg").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="444"){
    return [200, Joker.score];
  // }
  return [401];
});

// 格式化培养方案第一步,获得表格毕业要求数据
mock.onPost("/mam/getIndex").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="444"){
    return [200, Joker.indexData];
  // }
  return [401];
});

// 格式化培养方案第二步,选择一个毕业要求,获得表格指标点数据
mock.onPost("/mam/getIndexDetail").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("index_id"+data.get("index_id"));
  if(data.get("index_id")=="1"){
    return [200, Joker.indexDetailOfIndex];
  }
  // return [401];
});

// 添加毕业要求
mock.onPost("/mam/submitIndex").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("newIndexName"+data.get("newIndexName"));
  console.log("newIndexContent"+data.get("newIndexContent"));
  // if(data.get("index_id")=="1"){
    return [200, Joker.addIndexResult];
  // }
  // return [401];
});

// 移除毕业要求
mock.onPost("/mam/removeIndex").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("index_id"+data.get("index_id"));
  // if(data.get("index_id")=="1"){
    return [200, Joker.removeIndexResult];
  // }
  // return [401];
});

// 添加指标点
mock.onPost("/mam/submitIndexDetail").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("indexdetailvalue"+data.get("indexdetailvalue"));
  console.log("newIndexDetailContent"+data.get("newIndexDetailContent"));
  // if(data.get("index_id")=="1"){
    return [200, Joker.addIndexResult];
  // }
  // return [401];
});

// 移除指标点
mock.onPost("/mam/removeIndexDetail").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("indexdetailvalue"+data.get("indexdetailvalue"));
  console.log("index_detail_id"+data.get("index_detail_id"));
  // if(data.get("index_id")=="1"){
    return [200, Joker.removeIndexDetailResult];
  // }
  // return [401];
});