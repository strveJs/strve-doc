# SFC

SFC (Single File Component) 又名单文件组件，是一种特殊的文件格式。单文件组件将组件的 HTML 模板封装在以`.strve`结尾的文件中，可以更好地获得代码快速补全的体验（需要将其语言模式换成 HTML）。另外，JavaScript 逻辑和 CSS 样式与其分离，使得开发者可以更加方便地维护和修改组件。

## 安装

我们提供了代码模板，可以快速搭建SFC项目。你只需要拉取项目代码即可，项目模板地址如下：

> https://github.com/maomincoding/strve-sfc-template

项目模板为其预装了[vite-plugin-strve](https://www.npmjs.com/package/vite-plugin-strve)，这是一款Vite插件，用于编译以`.strve`结尾的文件。

## 版本

最新版本为**5.1.1**。该版本将与 Strve.js 版本一致。

## 使用

在使用之前，请阅读下面的注意事项，以兼容 Strve.js。

- 事件处理

仅支持`@`缩写。另外，事件名称需要绑定命名空间，并且需要用引号包裹。如`@click="myComponent2.btn"`。

- 列表渲染

使用`join('')`去掉渲染结果页面中的多余逗号。如：

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

- 条件渲染

标签使用` `` `包裹。如：

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

- 属性绑定

绑定属性时，可以不带引号，如：`value=${msg}`。

- 命名功能组件

不支持命名功能组件。

- Web Components

支持 Web Components。

- 组件模式

不支持组件模式。

- 注册组件

调用函数。如：

```js
`${C2()}`;
```

- strveRouter

不支持。

- babelPluginStrve

不支持。
