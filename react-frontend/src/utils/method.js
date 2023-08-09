import dayjs from 'dayjs'
let method = {}

/**
 * 类型判断函数
 *
 * @param {*} v
 */
method.getType = (v) =>
  Object.prototype.toString
    .call(v)
    .replace(/\[object\s(\w+)\]/, '$1')
    .toLowerCase()

/**
 *  @desc *dayjs日期转为特定格式*
 *
 *  @param date     日期
 *  @param format   格式
 */

method.formatDate = (date, format = 'YYYY-MM-DD', preFormat, returnData) => {
  if (!date) return !returnData ? '' : '--'
  if (preFormat) {
    return dayjs(date, preFormat).format(format)
  }
  return dayjs(date).format(format)
}

/**
 *  @desc *objectEquals深比较*
 *
 *  @param v1     变量1
 *  @param v2     变量2
 */

function countProps(obj) {
  var count = 0
  for (k in obj) {
    if (obj.hasOwnProperty(k)) {
      count++
    }
  }
  return count
}

method.objectEquals = function (v1, v2) {
  if (typeof v1 !== typeof v2) {
    return false
  }

  if (typeof v1 === 'function') {
    return v1.toString() === v2.toString()
  }

  if (v1 instanceof Object && v2 instanceof Object) {
    if (countProps(v1) !== countProps(v2)) {
      return false
    }
    var r = true
    for (k in v1) {
      r = objectEquals(v1[k], v2[k])
      if (!r) {
        return false
      }
    }
    return true
  } else {
    return v1 === v2
  }
}

export default method
