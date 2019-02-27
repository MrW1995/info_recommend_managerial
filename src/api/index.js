/*
* 该文件定义了组件主要调用的ajax请求
* */

import ajax from './ajax'

export const recevieScenics = (searchSort) =>ajax("/querySenics/"+searchSort)
