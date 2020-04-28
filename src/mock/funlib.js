// 用于合并基本信息
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
