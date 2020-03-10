/*
* 该文件定义了组件主要调用的ajax请求
* */


import ajax from './ajax'

const BASE_URL = "http://129.211.23.67:9527/consumer"

export const userLogin = (loginParams) =>ajax(BASE_URL+'/userLogin',loginParams,'POST')

export const getUser = ({pageNum,pageSize}) =>ajax(BASE_URL+'/get/user',{pageNum,pageSize},'GET')

export const getPublishStudy = ({userId,pageNum,pageSize}) =>ajax(BASE_URL+'/get/publish/study',{userId,pageNum,pageSize},'GET')

export const getPublishTravel = ({userId,pageNum,pageSize}) =>ajax(BASE_URL+'/get/publish/travel',{userId,pageNum,pageSize},'GET')

export const getUserAdvice = ({pageNum,pageSize}) =>ajax(BASE_URL+'/get/user/advice',{pageNum,pageSize},'GET')

export const queryUserLoginCount = () =>ajax(BASE_URL+'/get/user/logincount',{},'GET')

export const managerUserRegister = (managerVal) =>ajax(BASE_URL+'/add/user/register',managerVal,'POST')

export const queryManagerList = () =>ajax(BASE_URL+'/query/user/manager/list',{},'GET')

export const checkManagerName = ({managerName}) =>ajax(BASE_URL+'/check/user/manager/name',{managerName},'GET')

export const delManagerAccount = ({managerName}) =>ajax(BASE_URL+'/del/user/manager/by/name',{managerName},'GET')

export const checkOldPwd = ({userAccount,userPwd}) =>ajax(BASE_URL+'/check/user/old/pwd',{userAccount,userPwd},'GET')

export const updateManagerPwd = (managerOldPwd) =>ajax(BASE_URL+'/update/user/manager/pwd',managerOldPwd,'POST')

export const queryStudySort = (url) =>ajax(BASE_URL+url,{},'GET')

export const delSortByName = ({sortName,url}) =>ajax(BASE_URL+url,{sortName},'GET')

export const addSort = ({sort,url}) =>ajax(BASE_URL+url,sort,'POST')


