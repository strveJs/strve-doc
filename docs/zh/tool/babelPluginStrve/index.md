# babelPluginStrve

[babelPluginStrve](https://www.npmjs.com/package/babel-plugin-strve)是一款babel 插件，将 HTML 模板字符串转化为 Virtual Dom。从之前的运行时转移到编译时，大幅度提高渲染性能。

```js
// input:
const state = {
	count: 0,
};

h`<h1 $key>${state.count}</h1>`;

// output:
{
    children: [0],
    props: {"$key": true},
    tag: "h1"
}
```


## 安装

> [createStrve](/zh/tool/createStrve/)、[createStrveApp](/zh/tool/createStrveApp/)两款项目脚手架工具都已默认安装。

### npm

```bash
npm install babel-plugin-strve
```

### yarn

```bash
yarn add babel-plugin-strve
```

### pnpm

```bash
pnpm add babel-plugin-strve
```

## 用法

在你的 Babel 配置中（`.babelrc`、`babel.config.js`、`package.json` 中的`babel`字段等），添加插件：

```json
{
	"plugins": [["babel-plugin-strve"]]
}
```

## 选项

### tag=h

默认情况下，[babelPluginStrve](https://www.npmjs.com/package/babel-plugin-strve)将处理所有带有名为 `h` 的标记函数的标记模板。 要使用不同的名称，请在 `Babel` 配置中使用 `tag` 选项：

```json
{
	"plugins": [
		[
			"babel-plugin-strve",
			{
				"tag": "html"
			}
		]
	]
}
```
