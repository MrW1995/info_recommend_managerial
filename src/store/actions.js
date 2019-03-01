import {
  UserLogin
} from '../api/index'

import {
  USER_LOGIN,
} from './mutations-types'
export default {

  async userLogin({commit}){
    console.log("123")
    let UserName = "123"
    let UserPwd = "456"
    const result = await UserLogin({UserName,UserPwd});
    console.log(result)
    if(code===0){
      const userInfo = result.data
      commit(USER_LOGIN,{userInfo})
    }
  }

}
