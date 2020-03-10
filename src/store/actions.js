import {
  userLogin,
  getUser,
  getPublishStudy,
  getPublishTravel,
  getUserAdvice,
  queryUserLoginCount,
  managerUserRegister,
  queryManagerList,
  checkManagerName,
  delManagerAccount,
  checkOldPwd,
  updateManagerPwd,
  queryStudySort,
  delSortByName,
  addSort
} from '../api/index'

import {
  USER_LOGIN,
  USER_LIST,
  ADVICE_LIST,
  QUERY_USERLOGIN,
  PUBLISH_STUDY,
  PUBLISH_TRAVEL,
  MANAGER_ADD,
  MANAGER_LIST,
  CHECK_NAME,
  CHECK_DELETE,
  CHECK_OLD_PWD,
  SUCCESS_PWD,
  RESULT_SORT,
  SUCCESS_REMOVE,
  SUCCESS_ADD,
} from './mutations-types'
export default {

  async userLogin({commit},loginParams){
    const result = await userLogin(loginParams)
    commit(USER_LOGIN,result)
  },
  async getUser({commit},{pageNum,pageSize}){
    const result = await getUser({pageNum,pageSize})
    commit(USER_LIST,result)

  },
  async getPublishStudy({commit},{userId,pageNum,pageSize}){
    const result = await getPublishStudy({userId,pageNum,pageSize})
    commit(PUBLISH_STUDY,{result})
  },
  async getPublishTravel({commit},{userId,pageNum,pageSize}){
    const result = await getPublishTravel({userId,pageNum,pageSize})
    commit(PUBLISH_TRAVEL,{result})
  },
  async getUserAdvice({commit},{pageNum,pageSize}){
    const result = await getUserAdvice({pageNum,pageSize})
    commit(ADVICE_LIST,result)
  },
  async queryUserLogin({commit}){
    const result = await queryUserLoginCount()
    commit(QUERY_USERLOGIN,result)
  },
  async managerUserRegister({commit},managerVal){
    const result = await managerUserRegister(managerVal)
    commit(MANAGER_ADD,result)
  },
  async queryManagerList({commit}){
    const result = await queryManagerList()
    commit(MANAGER_LIST,result)
  },
  async checkManagerName({commit},{managerName}){
    const result = await checkManagerName(managerName)
    commit(CHECK_NAME,result)
  },
  async delManagerByName({commit},{managerName}){
    const result = await delManagerAccount({managerName})
    commit(CHECK_DELETE,result)
  },
  async checkOldPwd({commit},{userAccount,userPwd}){
    const result = await checkOldPwd({userAccount,userPwd})
    commit(CHECK_OLD_PWD,result)
  },
  async updateManagerPwd({commit},managerOldPwd){
    const result = await updateManagerPwd(managerOldPwd)
    commit(SUCCESS_PWD,result)
  },

  async queryStudySort({commit},url){
    const result = await queryStudySort(url)
    commit(RESULT_SORT,result)
  },

  async delSortByName({commit},{sortName,url}){
    const result = await delSortByName({sortName,url})
    commit(SUCCESS_REMOVE,result)
  },

  async addSort({commit},{sort,url}){
    const result = await addSort({sort,url})
    commit(SUCCESS_ADD,result)
  },


}
