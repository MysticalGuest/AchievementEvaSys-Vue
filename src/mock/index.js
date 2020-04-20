// 引入mock.js及配置文件
// import Mock from 'mockjs'
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
export const mock = new MockAdapter(axios);

mock.onPost("/login").reply(config => {
  console.log("config21212:"+config.data);
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"&&data.get("spassword")=="333")
    return [200, true];
  return [200, false];
});

// mock.onPost("/stu/interface").reply(config => {
//   console.log("config  sno"+config.data);
//   const data = new URLSearchParams(config.data);
//   // const thisstu = mergeJsonObject(Mysteryguest, stu);
//   if(data.get("sno")=="111"){
//     return [200, mergeJsonObject(Mysteryguest, stu)];
//   }
//   return [401];
// });

// 拒绝所有的 POST 请求，返回 HTTP 500
// mock.onPost().reply(500);
