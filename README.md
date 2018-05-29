# axe-react

axe interface using in react-native

## usage

安装通过 `npm`

	npm install axe-react --save

## 接口文件

见 [src/index.d.ts](src/index.d.ts)

## 数据类型说明 

#### 基础数据类型

* Number : 数字
* String : 字符串
* Array: 列表
* Object ： 对象

需要注意，如果要在`js`模块中使用原生设置的 `Array`和`Object`对象，就要求原生传入的是纯基础数据类型，其中不能设置特殊类型。

#### 特殊类型

* Image : 图片，`js`中设置和获取的图片类型为 ， `data:image/jpeg;base64,xxx` 这种形式的`URI`形式的字符串。  
* Data： 数据类型， 对于`ios`中的`NSData`类型。 `js`中设置和获取的是 `base64字符串`.
* Date: 时间类型
* Boolean: 

这里我们实现了 `js`模块和原生模块之间的特殊类型传递。

#### Model类型

在Axe中提及的 Model类型，指可以进行序列化，且一般从后台获取的Model类型。

`JS`中设置的`Model`类型，是一个`Object`对象，键值需要是基础数据类型，不能嵌套一些特殊类型。

> 如果声明了一个`model`类型， 在设置时，一定要包含所有的`key`值， 对于空值，一定要设置为`null`类型。

如，我们在文档中声明了一个`model` ：

	{
		userName,
	}

当`userName`为空时， 必须要设置为`null`，而不是默认的`undefined` （使用null值，传递到原生时，会保留model的机构，确保原生模块能够正确访问`model`的所有属性。） 。 否则原生模块获取时会出错。

如果一个原生模块要传递`Model`给`JS`模块，则该`Model`类型，必须是纯基础数据类型构成，不能包含特殊类型。

## 注意Event

事件回调是一个闭包， 而闭包会持有对象，容易导致内存泄漏 （当路由跳转时，新页面监听了事件，然后在路由返回到之前页面，则这个监听没有释放，就可能导致内存泄漏，且事件发送时会产生异常）。

目前`axe`使用的是基于原生导航栏的多页面应用的 `react-native`模块，所以`Event`的问题会少一些。 

建议注册通知，像[demo-test-react](https://github.com/axe-org/demo-test-react)中一样，记录状态，避免重复监听！

## 使用示例

* [demo-login-react](https://github.com/axe-org/demo-login-react)
* [demo-test-react](https://github.com/axe-org/demo-test-react)

## 注意事项

* 与`axe4js`接口的区别， `axe4js`中获取路由信息是异步函数，而在`axe-react`中，路由信息是固定属性 `axe.router.routeInfo`
* 与`axe4js`接口区别，提供了一个 `navigation`工具类，以进行页面跳转和简单的导航栏操作。 因为`h5`模块暂时是单页面应用， 而 `react-native`模块是基于原生导航栏的多页面应用。

## TODO

* 优化closePage, 支持传入参数 ，即具体关闭页面的次数，默认为1， 以更好的处理多级页面弹出时，页面的正确关闭。