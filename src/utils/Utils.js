import Vue from 'vue'
const util = {
  splitArr:function (getArrSort,lineNumber) {
    const arr = []
    //准备一个小的数组
    let minArr = []
    getArrSort.forEach(s =>{

      //当minArr的长度为4时 就创建新的数组
      if(minArr.length === lineNumber){
        minArr = []
      }
      //当minArr为空时 说明该数组是刚创建的  与大的数组进行关联
      if(minArr.length === 0){
        arr.push(minArr)
      }
      //每遍历一个就往里面装一个
      minArr.push(s)
    })
    return arr
  },
  splitDate:function(value){
    let str = value.split("/")
    let result = ''
    for(let i = 0;i < str.length; i++){
      result = result + str[i]
      if ( i != str.length -1)
        result = result + "-"
    }
    return result
  },
  dateFormat:function(date){
    let seperator1 = "-"
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    return currentdate
  },
}

Vue.prototype.util = util

