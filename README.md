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

* 与`axe4js`接口的区别， `axe4js`中获取路由信息是异步函数，而在`axe-react`中，路由信息是固定属性 `axe.router.routeInfo`
* 与`axe4js`接口区别，提供了一个 `navigation`工具类，以进行页面跳转和简单的导航栏操作。 因为`h5`模块暂时是单页面应用， 而 `react-native`模块是基于原生导航栏的多页面应用。