import moment from "moment"








/**
  *@param xDate Date
**/
export default function toYYMMDDHHmmss(xDate){
  console.log('xDate',xDate)
  const date = xDate?new Date(xDate).toLocaleTimeString():new Date()/* .setFullYear(2018,11,25) *///
  console.log('date',date)
  let Y = (date.getFullYear()).valueOf()
  let M = (date.getMonth()+1).valueOf()
  let D = (date.getDate()).valueOf()
  let H = (date.getHours()).valueOf()
  let m = (date.getMinutes()).valueOf()
  let s = (date.getSeconds()).valueOf()
  console.log('Y+M+D+H+m+s',Y+M+D+H+m+s)
  return Number(Y+M+D+H+m+s)
}