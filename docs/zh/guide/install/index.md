# 安装

上一篇，我们简单快速地了解 Strve.js 的使用，那么我们在这一篇详细说明下 Strve.js 有哪些安装方法。

## CDN

如果你想使用 ES Modules。

> 如果直接在浏览器中打开了上面的 index.html，你会发现它抛出了一个错误，因为 ES 模块不能通过 file:// 协议工作。为了使其工作，你需要使用本地 HTTP 服务器通过 http:// 协议提供 index.html。

```html
<script type="module">
	import {
		h,
		setData,
		createApp,
	} from 'https://cdn.jsdelivr.net/npm/strve-js@5.1.1/dist/strve.full-esm.prod.js';

	const state = {
		count: 0,
	};

	function add() {
		setData(() => {
			state.count++;
		});
	}

	function App() {
		return h`
                <h1 $key>${state.count}</h1>
                <button onClick=${add}>Add</button> 
		`;
	}

	const app = createApp(App);
	app.mount('#app');
</script>
```

如果你觉得上述方法有点麻烦，为了更加方便，也可以直接在 `<script>` 标签中导入，直接使用。

```html
<script src="https://cdn.jsdelivr.net/npm/strve-js@5.1.1/dist/strve.full.prod.js"></script>
```

需要注意的是，这种方式你需要通过对象解构来使用相应的方法。

```js
const { h, setData, createApp } = Strve;
const state = {
	count: 0,
};

function add() {
	setData(() => {
		state.count++;
	});
}

function App() {
	return h`
			<h1 $key>${state.count}</h1>
			<button onClick=${add}>Add</button> 
	`;
}

const app = createApp(App);
app.mount('#app');
```

> 上面两种方式，默认都使用了生产版本，如果你想在开发环境获得更好的代码错误提示，那么可以用开发版本，只需要把文件后缀`*.prod.js`中`prod`字段删除即可。

## 包管理器

在用 Strve.js 构建大型应用时推荐使用 包管理器 安装。

使用您最喜欢的包管理器安装。

### Npm

```bash
> npm install strve-js
```

### Yarn

```bash
> yarn add strve-js
```

## 命令行工具

当你构建大型应用时，推荐使用 Strve.js 提供的官方项目脚手架来搭建项目。为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了开箱即用的构建设置。

目前有两款工具：

1. [CreateStrveApp](/zh/tool/createStrveApp/)
2. [CreateStrve](/zh/tool/createStrve/)

## 对不同构建版本的解释

在 NPM 包的 dist/ 目录你将会找到很多不同的 Strve.js 构建版本。这里列出了它们之间的差别：

|  | ES Module (基于构建工具使用) | ES Module (直接用于浏览器) | UMD |
| --- | --- | --- | --- |
| 完整版 | - | strve.full-esm.js | strve.full.js |
| 完整版(生产环境) | - | strve.full-esm.prod.js | strve.full.prod.js |
| 运行时版 | strve.runtime-esm.js | - | - |
| 运行时版(生产环境) | strve.runtime-esm.prod.js | - | - |

不同的版本：

1. 完整版本：包括编译器(用于将模板字符串编译为 JavaScript 呈现函数的代码)和运行时版本；
2. 运行时版：用于创建实例、渲染和处理虚拟 DOM 的代码。基本上，它是从编译器中删除所有其他内容；
