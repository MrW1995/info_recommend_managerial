/*
* 该文件的主要作用是用于修改state的状态
* */
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
  /*同步*/
  COPY_USER,
  CHANGE_USERID,
  CHANGE_PAGENUM,
  CLEAR_ARR,
  CHANGE_ARTICLE,
  CHANGE_PAGESIZE,
  CHANGE_PUBLISHLIST,
  CHANGE_STUDY,
  CHANGE_TRAVEL,
  CHANGE_TOTALPAGE,
  CHANGE_ADDBOOL,
  CHECK_NAME_BOOL,
  CHECK_DEL_BOOL,
  CHANGE_OLD_BOOL,
  CHANGE_OLD_PWD,
  CHANGE_SUCCESS_PWD,
  REMOVE_FLAG,
  SORT_FLAG,
  ADD_FLAG,
}from './mutations-types'
export default {
  [USER_LOGIN](state,result){
      state.userInfo = result.user
      if(result.code === '0'){
        window.localStorage.setItem('token',result.token)
        const user = result.user
        window.localStorage.setItem('user',JSON.stringify(user))
        state.token = result.token;
        state.user = result.user
        state.login = true
      }
  },
  [USER_LIST](state,result){
    state.totalPage = result.total
    state.userList = result.user
  },
  [PUBLISH_STUDY](state,{result}){
    state.totalPage = result.totalCount
    state.publishList = []
    let resultt = result.publishStudy
    for(let i = 0;i<resultt.length;i++){
      state.publishList.push({sourceId:resultt[i].studySourceId,sourceUserId:resultt[i].studyUserId,sourceContent:resultt[i].studyContent,sourceImg:resultt[i].studyImg,
        sourceUrlsPwd:resultt[i].studyUrlsPwd,sourceUrls:resultt[i].studyUrls,sourceSorts:resultt[i].studySorts,sourceDateTime:resultt[i].studyDateTime,sourceAddress:'',sourceTicket:''})
    }
  },
  [PUBLISH_TRAVEL](state,{result}){
    state.totalPage = result.totalCount
    state.publishList = []
    let resultt = result.travelPublish
    for(let i = 0;i<resultt.length;i++){
      state.publishList.push({sourceId:resultt[i].publishTravelId,sourceUserId:resultt[i].userId,sourceContent:resultt[i].publishTitle,sourceImg:resultt[i].publishImgArr
        ,sourceUrls:'',sourceUrlsPwd:'',sourceSorts:resultt[i].sorts,sourceDateTime:resultt[i].publishDateTime,sourceAddress:resultt[i].travelAddress,sourceTicket:resultt[i].admissionTicket})
    }
  },
  [ADVICE_LIST](state,result){
    state.totalPage = result.total
    state.adviceList = result.userAdvice
  },
  [QUERY_USERLOGIN](state,result){
    let date = ''
    let week = ''
    let date1 = ''
    let index = 0
    let weeks = []
    let count = []
    for(let i = 0; i < result.userLoginCounts.length; i++){
      date = result.userLoginCounts[i].everydayDate
      date1 = new Date(date)
      if(date1.getDay()==0){
        index = 6
        week = "周日"
      }
      if(date1.getDay()==1){
          index = 0
          week = "周一"
      }
      if(date1.getDay()==2){
        index = 1
        week = "周二"
      }
      if(date1.getDay()==3){
          index = 2
          week = "周三"
      }
      if(date1.getDay()==4){
          index = 3
          week = "周四"
      }
      if(date1.getDay()==5){
          index = 4
          week = "周五"
      }
      if(date1.getDay()==6){
          index = 5
          week = "周六"
      }
      weeks[index] = week
      count[index] = result.userLoginCounts[i].count
    }
    state.weekArr = weeks
    state.userLoginCount = count
  },
  [MANAGER_LIST](state,result){
    state.managerList = result.backstageUsers
  },
  [MANAGER_ADD](state,result){
    if(result.code === 0)
      state.managerAdd = true
  },
  [CHECK_NAME](state,result){
    if(result.code === 0)
      state.checkName = true
  },
  [CHECK_DELETE](state,result){
    if(result.code === 0)
      state.delBool = true
  },
  [CHECK_OLD_PWD](state,result){
    if(result.code === 0)
      state.oldPwd = true
    else
      state.oldPwdAlert = true
  },
  [SUCCESS_PWD](state,result){
    if(result.code === 0)
      state.successPwd = true
  },
  [RESULT_SORT](state,result){
      state.resultSort = []
      for(let i = 0 ; i < result.sort.length; i++){
        state.resultSort.push(result.sort[i].sort)
      }
  },
  [SUCCESS_REMOVE](state,result){
    if(result.code === 0)
      state.removeFlag = true
  },
  [SUCCESS_ADD](state,result){
    if(result.code === 0)
      state.addFlag = true
    if(result.code === 2)
      state.sortFlag = true
  },
  /*同步方法*/
  [COPY_USER] (state,reciveVal){
    state.singleUser = reciveVal
  },
  [CHANGE_USERID](state,reciveVal){
    state.userId = reciveVal
  },
  [CHANGE_PAGENUM](state,reciveVal){
    state.currentPage = reciveVal
  },
  [CLEAR_ARR](state,reciveVal){
    state.clearArr = reciveVal
  },
  [CHANGE_ARTICLE](state,reciveVal){
    state.singleArticle = reciveVal
  },
  [CHANGE_PAGESIZE](state,reciveVal){
    state.pageSize = reciveVal
  },
  [CHANGE_PUBLISHLIST](state){
    state.publishList = []
  },
  [CHANGE_STUDY](state,boolVal){
    state.queryStudy = boolVal
  },
  [CHANGE_TRAVEL](state,boolVal){
    state.queryTravel = boolVal
  },
  [CHANGE_TOTALPAGE](state,num){
    state.totalPage = num
  },
  [CHANGE_ADDBOOL](state,boolVal){
    state.managerAdd = boolVal
  },
  [CHECK_NAME_BOOL](state,boolVal){
    state.checkName = boolVal
  },
  [CHECK_DEL_BOOL](state,boolVal){
    state.delBool = boolVal
  },
  [CHANGE_OLD_BOOL](state,boolVal){
    state.oldPwdAlert = boolVal
  },
  [CHANGE_OLD_PWD](state,boolVal){
    state.oldPwd = boolVal
  },
  [CHANGE_SUCCESS_PWD](state,boolVal){
    state.successPwd = boolVal
  },
  [REMOVE_FLAG](state,boolval){
    state.removeFlag = boolval
  },
  [SORT_FLAG](state,boolval){
    state.sortFlag = boolval
  },
  [ADD_FLAG](state,boolval){
    state.addFlag = boolval
  }
}
