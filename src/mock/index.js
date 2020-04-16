// 引入mock.js及配置文件
import Mock from 'mockjs'
import User from './user'

Mock.mock('/login', 'post', (params) => {  // 此处会劫持/login接口，并返回数据
  const data = new URLSearchParams(params.body);
  if(data.get("sno")=="111"&&data.get("spassword")=="333")
    return true;
  return false;
})
