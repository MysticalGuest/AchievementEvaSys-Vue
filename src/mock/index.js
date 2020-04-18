// 引入mock.js及配置文件
// import Mock from 'mockjs'
import Mysteryguest from './stumysteryguest.js'
import axios from 'axios'
// 通过axios-mock-adapter生成代理api地址
import MockAdapter from 'axios-mock-adapter'

// Mock.mock('/login', 'post', (params) => {  // 此处会劫持/login接口，并返回数据
//   const data = new URLSearchParams(params.body);
//   if(data.get("sno")=="111"&&data.get("spassword")=="333")
//     return true;
//   return false;
// })

// Mock.mock('/stu/interface', 'post', (params) => {
//   // console.log("res:"+res);
//   console.log("params:"+params);
//   const data = new URLSearchParams(params.body);
//   console.log("data:"+data);
//   // res.status(401);
//   if(data.get("sno")=="111")
//     return Mysteryguest;
//   // return {params.status: 401};
//   // params.status(401);

// })

// 设置模拟调试器实例
var mock = new MockAdapter(axios);

mock.onPost("/login").reply(config => {
  console.log("config21212:"+config.data);
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"&&data.get("spassword")=="333")
    return [200, true];
  return [200, false];
});

mock.onPost("/stu/interface").reply(config => {
  console.log("config  /stu/"+config.data);
  console.log("config  sno"+config.data);
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"){
    console.log("Mysteryguest"+Mysteryguest.name);
    return [200, Mysteryguest];
  }
  return [401];
});

// mock.onPost('/lo').reply(404)

// 拒绝所有的 POST 请求，返回 HTTP 500
// mock.onPost().reply(500);
