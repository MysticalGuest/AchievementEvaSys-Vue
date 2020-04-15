/**
 * api接口统一管理
 */
import { get, post } from '@/request/http'

export default {
  postData(action, params){
    return post(action, params)
  },
  getData(action, params){
    return get(action, params)
  }
}
