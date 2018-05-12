# axe-react

axe interface using in react-native

## usage

安装通过 `npm`

	npm install axe-react --save

## 接口文件

见 [src/index.d.ts](src/index.d.ts)

## 使用示例

* [demo-login-react](https://github.com/axe-org/demo-login-react)
* [demo-test-react](https://github.com/axe-org/demo-test-react)

## 注意事项

* 与`axe4js`接口的区别，暂时只有一处， `axe4js`中获取路由信息是异步函数，而在`axe-react`中，路由信息是一属性 `axe.router.routeInfo`