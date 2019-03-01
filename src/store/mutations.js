/*
* 该文件的主要作用是用于修改state的状态
* */
import {
  USER_LOGIN
}from './mutations-types'
export default {
  [USER_LOGIN](state,{userInfo}){
      state.userInfo = userInfo
  }
}
