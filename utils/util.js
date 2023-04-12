const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function count(obj, item){
    if (!obj[item]) {
        obj[item] = 1;
    } else {
        obj[item] += 1; // 统计每年对应的记录值
    }
}
const formatList=list=>{
    // 目标：{
    //      mainData:{data:[],categories:[]},
    //      year:{data:[], categories:[]}
    // }
    const result = {}
    const mainData = {}
    const yearObj = {}
    const monthObj = {}
    const dayobj = {}
    const hourObj = {}
    for (var i = 0; i < list.length; i++) {
        const record = list[i]
        var year = record.createdAt.getFullYear(); 
        var month = record.createdAt.getMonth(); 
        var day = record.createdAt.getDate(); 
        var hour = record.createdAt.getHours(); 
        var minute = record.createdAt.getMinutes(); 
        count(mainData, year)
        count(yearObj, `${year}/${month}`)
        count(monthObj, `${year}/${month}/${day}`)
        count(dayobj,`${year}/${month}/${day}/${hour}`)
        count(hourObj,`${year}/${month}/${day}/${hour}/${minute}`)
    }
    result.mainData={data:Object.values(mainData),categories:Object.keys(mainData).map(item=>`${item}年`)}
    Object.assign(result,yearObj,monthObj, dayobj,hourObj)
    return result
}
const titleArr= ['年', '月', '日', '时','分']
function generateTitle(key){
    if(!key) return '总打卡记录'
    const arr = key.split('/')
    return arr.reduce((total,curr,currIndex)=>{
        total+=(curr+titleArr[currIndex])
        return total
    }, '')
}
module.exports = {
  formatTime,
  formatList,
  generateTitle,
  titleArr
}
