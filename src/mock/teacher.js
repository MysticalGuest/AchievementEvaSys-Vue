import {mock} from './index.js'

import {mergeJsonObject} from '@/mock/funlib.js'

import tea from './database/teacher/tea.js'
import iKun from './database/teacher/teaIKun.js'


mock.onPost("/tea/interface").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, mergeJsonObject(iKun.teainfo, tea)];
  }
  return [401];
});

// 教师端首页
mock.onPost("/tea/info").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.teainfo];
  }
  return [401];
});

// 获取老师所教的课程
mock.onPost("/tea/courseinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.courseData];
  }
  return [401];
});

// 获取老师通知消息
mock.onPost("/tea/message").reply(config => {
  const data = new URLSearchParams(config.data);
  if(data.get("tno")=="222"){
    return [200, iKun.inform];
  }
  return [401];
});

// 获取选修这门课的学生
mock.onPost("/tea/stuofcourse").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.stuData];
  // return [401];
});

// 获取这个学生在某个课程指标点的登记情况
mock.onPost("/tea/teaIndexDetailState").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.detailState];
  // return [401];
});

// 登记学生在这门课对应指标点分值时,获取指标点下拉框
mock.onPost("/tea/registerGrade").reply(config => {
  // const data = new URLSearchParams(config.data);
  // if(data.get("tno")=="222"){
  //   return [200, iKun.inform];
  // }
  return [200, iKun.index_options];
  // return [401];
});

mock.onPost("/tea/detailinfo").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("cno:"+data.get("cno"));
  // if(data.get("tno")=="222"){
    return [200, iKun.detailData];
  // }
  // return [401];
});

mock.onPost("/tea/GradeUpload").reply(config => {
  // config.data是一个FormData对象
  const data = config.data;
  const file = data.get("file");
  // 返回当前 File 对象所引用文件最后修改时间的 Date 对象
  console.log("LastModifiedDate:"+file.lastModifiedDate);
  // 只读 	返回当前 File 对象所引用文件最后修改时间， 自 1970年1月1日0:00 以来的毫秒数
  console.log("LastModified:"+file.lastModified);
  console.log("Name:"+file.name);
  console.log("Size:"+file.size);
  console.log("Type:"+file.type);// 只读 	返回文件的 MIME 类型
  console.log("Path:"+file.webkitRelativePath);// 只读 	返回 File 相关的 path 或 URL
  // if(data.get("tno")=="222"){
    return [200, iKun.gradeUploadResult];
  // }
  // return [401];
});

//上传老师给指标点的分值
mock.onPost("/tea/courseIndexDetailScore").reply(config => {
  const data = new URLSearchParams(config.data);
  console.log("cno:"+data.get("cno"));
  console.log("score:"+data.get("score"));
  // if(data.get("tno")=="222"){
    return [200, iKun.registerResult];
  // }
  // return [401];
});
