let maminfo = {
  tno: '2017101',
  name: '小丑',
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

let allIndexDetail = [{
  index_detail_id:'1-1'
},
{
  index_detail_id:'1-2'
}]

let score = {
  avg: 88
}

let indexData = [{
  index_id : "1",
  index_name: "好好学习1",
  index_content:"好好学习，天天向上!"
}]

let indexDetailOfIndex = [{
  index_detail_id: '1-1',//指标点id
  index_detail_content:'121321'//指标点内容
},
{
  index_detail_id: '1-1',
  index_detail_content:'121321'
}]

let addIndexResult = {message : "success"}

let removeIndexResult = {message : "fail"}

let addIndexDetailResult = {message : "fail"}

let removeIndexDetailResult = {message : "success"}

export default {maminfo, allIndexDetail, score, indexData, 
                indexDetailOfIndex, addIndexResult, removeIndexResult, addIndexDetailResult,
                removeIndexDetailResult
}