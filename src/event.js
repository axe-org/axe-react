import { NativeModules } from 'react-native'
import { is, AXEData } from './base'
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge'

const axeEvent = NativeModules.axe_event

// 本地记录 事件与回调
let registeredEvents = {}
// 在 BatchedBridge 注册一个 CallbaleModule , 以使事件通过调用的方式告知js。
BatchedBridge.registerCallableModule(
  'axe_event',
  {
    callback: (data) => {
      // 将data 转换为 AXEData.
      let name = data['name']
      let payload = data['payload']
      if (payload) {
        let axeData = new AXEData()
        // 该data 满足格式。
        axeData.datas = payload
        payload = axeData
      }
      let callbackList = registeredEvents[name]
      if (callbackList) {
        // 如果有回调，则读取回调。
        for (let index in callbackList) {
          callbackList[index](payload)
        }
      }
    }
  }
)

// 事件接口。
// 注册函数
let registerFunc = function (eventName, callback) {
  if (is.String(eventName) && typeof callback === 'function') {
    let callbackList = registeredEvents[eventName]
    if (!callbackList) {
      callbackList = []
      registeredEvents[eventName] = callbackList
    }
    callbackList.push(callback)
    axeEvent.registerListener(eventName)
  }
}
// 取消注册函数 , 需要注意，这里取消监听，会直接删掉当前网页的这个 eventName的全部监听。
let cancelRegisterFunc = function (eventName) {
  if (is.String(eventName)) {
    registeredEvents[eventName] = undefined
    axeEvent.removeListener(eventName)
  }
}
// 发送事件通知
let postEventFunc = function (eventName, data) {
  // 因为 axe的目标是 业务模块之间的交互，所以不考虑本地的监听。
  if (is.String(eventName)) {
    let event = {}
    event['name'] = eventName
    if (data) {
      if (Object.getPrototypeOf(data) !== AXEData.prototype) {
        return
      }
      event['data'] = data.datas
    }
    axeEvent.postEvent(event)
  }
}

export default {
  postEvent: postEventFunc,
  registerListener: registerFunc,
  removeListener: cancelRegisterFunc
}
