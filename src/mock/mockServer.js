/*
* 使用mockjs提供的mock数据接口实现模拟请求
*
* 在vue中有的组件比较特别  不需要向外暴露什么，只需在入口文件中加载一次即可
* */

import Mock from 'mockjs'
import data from './data'

//该条语句的作用是向外暴露了url为/querySenics数据为data.senics的模板提供

Mock.mock('userLogin/123',{code:0,data:data.userInfo})


