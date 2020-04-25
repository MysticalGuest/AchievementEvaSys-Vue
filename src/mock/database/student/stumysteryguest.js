let stuinfo = {
  sno: '2017115146',
  name: '肖梦杰',
  department: "软件工程",
  academy: "软件学院",
  classnum:'4',
  IDnum:"420621200001011234",
  birth:"2000-01-01",
  nation:"汉族",
  political:"中国共产主义青年团团员",
  origin:"湖北",
  scategory:"普通本科生",
  email:"vue@mail.com",
  address:"湖北省襄阳市樊城区",
  phone:"15172345643"
}

// let courseinfo = [
//   {cname: '数据结构',grade: '87',credit: '4'},
//   {cname: '微积分',grade: '87',credit: '4'},
//   {cname: '数字逻辑',grade: '87',credit: '4'},
//   {cname: '软件工程',grade: '87',credit: '4'},
//   {cname: '软件测试',grade: '87',credit: '4'},
//   {cname: '概率论与数理统计',grade: '87',credit: '4'},
//   {cname: '线性代数',grade: '87',credit: '4'},
//   {cname: '操作系统',grade: '87',credit: '4'},
//   {cname: '人工智能',grade: '87',credit: '4'},
//   {cname: '计算机网络',grade: '87',credit: '4'},
//   {cname: '数据库',grade: '87',credit: '4'},
//   {cname: '程序设计基础',grade: '87',credit: '4'},
//   {cname: '面向对象程序设计',grade: '87',credit: '4'},
//   {cname: 'Python',grade: '87',credit: '4'},
//   {cname: '高级数据库',grade: '87',credit: '4'},
//   {cname: 'UML',grade: '87',credit: '4'},
//   {cname: '计算机组成原理',grade: '87',credit: '4'},
//   {cname: '基础物理',grade: '87',credit: '4'},
//   {cname: '项目管理',grade: '87',credit: '4'},
//   {cname: '电子商务',grade: '87',credit: '4'},
//   {cname: '管理信息系统',grade: '87',credit: '4'},
//   {cname: '马克思主义原理',grade: '87',credit: '4'}
// ]

let indexContentData = [{
  index_detail_id: '1-1',//指标点的id
  index_detail_content: "1234312431",//指标点的内容
  score:'66'//这个指标点对应的分数
}]

// let indiv_score = 80//个人评价值

let courseAchieveData = [{
  cno: "1-1",
  cname: "数据结构",
  nature: "必修课程",
  ca_name: "张三",//课程负责人
  tperiod: 36,//课时
  credit: 4,//学分
}]

let courseinfo = {
  indexContentData: indexContentData,
  indiv_score: 8, //个人评价值
  courseAchieveData: courseAchieveData
}

let courseDetailData = [{
  course_detail_name: "其中作业，平时表现，期末表现",//课程教学大纲内容
  index_detail_id: "1",//指标点编号
  index_detail_content: "qwerrtyrtyr",//指标点内容
  index_score: "8",//这个课在这个指标点的实际分值
},
{
  course_detail_name: "其中作业，平时表现，期末表现",//课程教学大纲内容
  index_detail_id: "2",//指标点编号
  index_detail_content: "qwerrtyrtyr",//指标点内容
  index_score: "8",//这个课在这个指标点的实际分值
},
{
  course_detail_name: "其中作业，平时表现，期末表现",//课程教学大纲内容
  index_detail_id: "3",//指标点编号
  index_detail_content: "qwerrtyrtyr",//指标点内容
  index_score: "8",//这个课在这个指标点的实际分值
}]

let warninfo = [{
  cno: "1-1",//课程号
  cname: "数据结构",//课程名
  warning: "预警",//分为"预警"和"未预警"
}]
       
export default {stuinfo, warninfo, courseinfo, courseDetailData}
