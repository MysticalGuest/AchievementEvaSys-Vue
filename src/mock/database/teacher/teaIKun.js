let teainfo = {
  tno: '2017101',
  name: '蔡徐坤',
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

let courseData = [{
    cno: "1",
    cname: "数据结构",
    nature: "必修课程",
    ca_name: "张三",
    tperiod: 36,
    credit: 4,
  },
  {
    cno: "2",
    cname: "计算机网络",
    nature: "必修课程",
    ca_name: "张三",
    tperiod: 54,
    credit: 3.5,
  },
  {
    cno: "3",
    cname: "篮球",
    nature: "选修课程",
    ca_name: "张三",
    tperiod: 72,
    credit: 2,
  },
  {
    cno: "4",
    cname: "网页设计",
    nature: "必修课程",
    ca_name: "张三",
    tperiod: 144,
    credit: 1,
  },
]

let detailData = [{
  cname: "数据结构",//课程名
  course_detail_name: "目标 1. 掌握基软件测试的基本概念、基本理论、常用测试方法与测试技术。",//课程教学大纲
  index_detail_id: "1-1",//指标点id
  index_detail_content: "能够将数理知识、软件工程基础知识、软件专业知识及相关领域知识用于复杂软件问题的理解和表述。",//指标点的内容
}]

// 老师通知消息
let inform = {
  message : "课程审核通过！"
}

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

let detailState = [{
  index_detail_id: '1-1',
  appraisal_value: '0.76'
},{
  index_detail_id: '4-3',
  appraisal_value: '0.98',
  approval_status: '已审核',
}]

let index_options=[{
  index_detail_id: '1-1',
  label: "指标点1-1",
  state: '未登记'
},
{
  index_detail_id: '1-9',
  label: "指标点1-9",
  state: '已登记'
}]

export default {teainfo, courseData, detailData, inform, stuData, detailState, index_options}
