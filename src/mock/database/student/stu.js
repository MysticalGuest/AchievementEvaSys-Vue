let stu = {
  role: "学生",
  route1: "courseinfo",
  index1: "学业信息",
  route2: "warninfo",
  index2: "预警通知",
  route3: "modifyinfo",
  index3: "修改信息",
  index4: "退出系统",
}

export default stu

// 用于合并学生基本信息
export function mergeJsonObject(jsonbject1, jsonbject2) {
  var resultJsonObject={};
  for(var attr in jsonbject1){
    resultJsonObject[attr]=jsonbject1[attr];
  }
  for(var attr in jsonbject2){
    resultJsonObject[attr]=jsonbject2[attr];
  }
  return resultJsonObject;
}
