import { NativeModules } from 'react-native'
import { is, AXEData, parseAxeData } from './base'

const axeData = NativeModules.axe_data

let sharedData = new AXEData()
// sharedData 基本 所有接口与 普通的data 接口相同。 但是以下三个接口实现不同。
sharedData.setObjectForKey = function (key, value) {
  value['key'] = key
  axeData.setData(value)
}
sharedData.removeItem = function (key) {
  if (key && is.String(key)) {
    axeData.removeData(key)
  }
}
// 共享数据的 get方法，是异步的，需要使用回调来获取值。如
//  axe.data.get("login_status",function(data){console.log(data) })
//  共享数据获得的 model 类型， 在 js 中是复制的， 直接修改不会改变共享数据中的值， 所以如果要做修改，就需要提交一下， 即调用 setModel 方法。
sharedData.get = function (key, callback) {
  if (!is.String(key) || typeof callback !== 'function') {
    return
  }
  axeData.getData(key, function (data) {
    if (data) {
      data = parseAxeData(data)
    }
    callback(data)
  })
}

export default {
  sharedData: sharedData,
  create: function () {
    return new AXEData()
  }
}
