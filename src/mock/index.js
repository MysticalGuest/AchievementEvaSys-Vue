// 引入mock.js及配置文件
// import Mock from 'mockjs'
import axios from 'axios'
// 通过axios-mock-adapter生成代理api地址
import MockAdapter from 'axios-mock-adapter'



// 设置模拟调试器实例
export const mock = new MockAdapter(axios);

mock.onPost("/login").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("sno")=="111"&&data.get("spassword")=="111")
    return [200, "student"];
  else if(data.get("tno")=="222"&&data.get("tpassword")=="222")
    return [200, "teacher"];
  else if(data.get("tno")=="333"&&data.get("tpassword")=="333")
    return [200, "coursemanager"];
  else if(data.get("tno")=="444"&&data.get("tpassword")=="444")
    return [200, "majormanager"];
  else if(data.get("tno")=="555"&&data.get("tpassword")=="555")
    return [200, "tutor"];
  return [200, false];
});

// 指定路由拦截
// mock.onPost("/specifyRouteIntercept").reply(404);

// 拒绝所有的 POST 请求，返回 HTTP 500
// mock.onPost().reply(500);
