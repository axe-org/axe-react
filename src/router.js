import { NativeModules } from 'react-native'
import { is, AXEData } from './base'

let axeRouter = NativeModules.axe_router

// 路由接口。
let routerFunc = function (url, param, callback) {
  if (is.String(url)) {
    let payload = {}
    payload['url'] = url
    if (param) {
      if (Object.getPrototypeOf(param) !== AXEData.prototype) {
        return
      }
      payload['param'] = param.datas
    }
    if (callback) {
      if (typeof callback !== 'function') {
        return
      }
      axeRouter.route(payload, function (data) {
        // 将data 转换为 AXEData.
        if (data) {
          let axeData = new AXEData()
          // 该data 满足格式。
          axeData.datas = data
          data = axeData
        }
        callback(data)
      })
    } else {
      axeRouter.routeWithoutCallback(payload)
    }
  }
}
// 在 h5模块中，已知 h5回调时的页面关闭由原生代码实现，所以这里只要调用回调即可。
let routerCallback = function (param) {
  if (param && Object.getPrototypeOf(param) === AXEData.prototype) {
    axeRouter.callback(param.datas)
  } else {
    axeRouter.callback()
  }
}
// source 用来获取路由跳转而来的一些信息。 需要注意异步调用问题。
// source.needCallback  Boolean 类型， 是否有回调。
// source.payload       AXEData 类型， 附带的参数。
//

let _sourceInfo = {needCallback: false}
let data = axeRouter.lastRouteInfo
if (data) {
  let payload = data['payload']
  if (payload) {
    let axeData = new AXEData()
    axeData.datas = payload
    _sourceInfo['payload'] = axeData
  }
  _sourceInfo['needCallback'] = data['needCallback'] === 'true'
}

export default {
  route: routerFunc,
  callback: routerCallback,
  // 上次跳转信息。
  routeInfo: _sourceInfo // 同步获取source.
}
