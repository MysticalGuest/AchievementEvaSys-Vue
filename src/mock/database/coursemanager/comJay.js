let cominfo = {
  tno: '2017101',
  name: '周杰伦',
  department: "信息科学与技术学院",
  academy: "信息科学与技术学院",
  IDnum:"420621200001011235",
  officenum:"302",
  birth:"1990-01-02",
  nation:"汉族",
  political:"中国共产党党员",
  origin:"湖南",
  degree:"博士",
  email:"vue@teamail.com",
  address:"湖北省襄阳市襄城区",
  phone:"18172345647"
}

let courselist=[{
  cno: "1",
  cname: "数据结构",
  nature: "必修课程",
  ca_name: "张三",
  tperiod: 36,
  credit: 4,
},{
  cno: "2",
  cname: "计算机网络",
  nature: "必修课程",
  ca_name: "张三",
  tperiod: 54,
  credit: 3.5,
},{
  cno: "3",
  cname: "面向对象程序设计",
  nature: "选修课程",
  ca_name: "蔡徐坤",
  tperiod: 72,
  credit: 2,
},{
  cno: "4",
  cname: "计算机组成原理",
  nature: "必修课程",
  ca_name: "张三",
  tperiod: 144,
  credit: 1,
}]

let detailData = [{
  cname: "人工智能",//课程名
  course_detail_name: "目标 1. 掌握基软件测试的基本概念、基本理论、常用测试方法与测试技术。",//课程教学大纲
  index_detail_id: "1-1",//指标点id
  index_detail_content: "能够将数理知识、软件工程基础知识、软件专业知识及相关领域知识用于复杂软件问题的理解和表述。",//指标点的内容
}]

let stuData = [{
  sno: "2017119075",
  sname: '赵鹏程',
  approval_status: '未审核'
},{
  sno: "2017119074",
  sname: '赵小程',
  approval_status: '未审核'
},{
  sno: "2017119073",
  sname: '赵大程',
  approval_status: '已审核'
},{
  sno: "2017119079",
  sname: '赵晓程',
  approval_status: '未审核'
}]

let classOfcourse = [{
  class_name: "2017-1",//班级号
  state: '登记完成',
},{
  class_name: "2017-3",//班级号
  state: '登记缺失',
},{
  class_name: "2017-4",//班级号
  state: '登记完成',
}]

let course_index_detal = [{
    index_detail_id:'1-1'//指标点id
  },{
    index_detail_id:'1-2'
}]

let courseReview = {
  avg: 86,//这个班这门课这个指标点的平均分
  min: 60,//这个班这门课这个指标点的最低分
  max: 96,//这个班这门课这个指标点的最高分
  ydata:[100,66,44,33,22,11,10,9,8,7,6,5,4,3,2,1]//返回这个指标点所有人成绩从高到低排列
}

let reviewMessage = {
  message: "fail"
}

export default {cominfo, courselist, detailData, stuData, classOfcourse, course_index_detal, courseReview, reviewMessage}