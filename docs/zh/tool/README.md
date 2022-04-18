# 工具

## create-strve-app

<a href="https://npmjs.com/package/create-strve-app"><img src="https://badgen.net/npm/v/create-strve-app" alt="npm package"></a>

一套快速搭建 Strve.js 项目的命令行工具。与早期的脚手架 Create Strve 相比，Create Strve App 更胜一筹，可直接输入命令快速创建 Strve 项目。Create Strve App 是用[Vite](https://vitejs.dev/)来构建的，它是一种新型前端构建工具，能够显著提升前端开发体验。

### 搭建你的第一个 Strve 项目

#### npm

```bash
npm init strve-app@latest
```

#### yarn

```bash
yarn create strve-app
```

#### pnpm

```bash
pnpm create strve-app
```

### 选择模板

你可以根据自己的需要选择对应的模板。

- strve

只包含 Strve.js 基本使用的功能。此模板适用于项目中仅仅单页面，没有跳转其他页面的应用。

- strve-apps

不仅包含了 Strve.js 的基本使用的功能，而且还包含了 Strve Router，适用于跳转多页面以及稍微复杂的应用。

## create-strve

<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

在前面我们也简单介绍过，Create Strve 是基于 Strve.js 的项目构建工具，您可以使用它更方便灵活地搭建页面。Create Strve 同样是用[Vite](https://vitejs.dev/)来构建的。

不过，在这里推荐使用 Create Strve App，它相对安装更加灵活以及快速。

### 安装

**全局安装**

```shell
npm install create-strve -g
```

**查看版本**

```shell
create-strve -v
```

**初始化项目**

```shell
create-strve init <projectName>
```

## strve-router

<a href="https://npmjs.com/package/strve-router"><img src="https://badgen.net/npm/v/strve-router" alt="npm package"></a>

Strve Router 是 Strve.js 的官方路由管理器。 它与 Strve.js 的核心深度集成，可以轻松构建单页应用程序。

目前只支持 Hash 模式。

### 开始

尝试 Strve Router 最简单的方法是使用直接导入 CDN 链接。 您可以在浏览器中打开它并按照示例学习一些基本用法。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>strve-router</title>
	</head>

	<body>
		<div id="app"></div>
		<script type="module">
			import {
				h,
				createApp,
				setData,
			} from 'https://cdn.jsdelivr.net/npm/strvejs@3.1.0/dist/strve.esm.min.js';
			import {
				initRouter,
				linkTo,
			} from 'https://cdn.jsdelivr.net/npm/strve-router@2.1.0/dist/strve-router.esm.js';

			class Home {
				constructor() {
					this.state = {
						count: 0,
					};
				}

				useAdd = () => {
					setData(() => {
						this.state.count++;
					});
				};

				goAbout = () => {
					linkTo('/about');
				};

				render = () => {
					return h`
                    <button onClick=${this.goAbout}>goAbout</button>
                    <h1 onClick=${this.useAdd} $key>${this.state.count}</h1>
                `;
				};
			}

			class About {
				constructor() {
					this.state = {
						msg: 'About',
					};
				}

				render = () => {
					return h`
                    <button onClick=${this.goHome}>goHome</button>
                    <h1 onClick=${this.useChange} $key>${this.state.msg}</h1>
                `;
				};

				useChange = () => {
					setData(() => {
						this.state.msg = 'Changed';
					});
				};

				goHome = () => {
					linkTo('/');
				};
			}

			const router = initRouter(
				[
					{
						path: '/',
						template: [Home, 'render'],
					},
					{
						path: '/about',
						template: [About, 'render'],
					},
				],
				setData
			);

			function App() {
				return h`
            <div class="main">
                ${router.view()}
            </div>
            `;
			}

			const app = createApp(App);
			app.mount('#app');
		</script>
	</body>
</html>
```

### 安装

#### npm

```bash
npm install strve-router
```

#### yarn

```bash
yarn add strve-router
```

#### pnpm

```bash
pnpm add strve-router
```

### 使用

我们已经给你预装了项目配置，你可以使用[Create Strve App](/strvejs-doc/zh/tool/#create-strve-app)选择**strve-apps**模板即可。

### API

#### initRouter()

第一个参数是是一个数组对象，它是需要注册的路由组件，`path`属性表示组件的路径，`template`属性是一个数组，第一项则是引入的组件，第二项则是渲染的组件函数名称。

组件可以是 Class 类 定义，也可以是构造函数定义。

**Class 类**

```js
class About {
	goHome = () => {
		linkTo({
			path: '/',
		});
	};

	render = () => {
		return h/*html*/ `
            <button onClick="${this.goHome}">goHome</button>
    `;
	};
}
```

**构造函数**

```js
function About() {
	function goHome() {
		linkTo('/');
	}

	function render() {
		return h/*html*/ ` <button onClick="${goHome}">goHome</button>`;
	}

	return {
		render,
	};
}
```

第二个参数需要传入`setData`API，匹配到相应的路径页面会相应的更新。比如这里在一个 router 文件夹下创建一个`index.js`文件。

```js
import { setData } from 'strvejs';
import { initRouter } from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const router = initRouter(
	[
		{
			path: '/',
			template: [Home, 'render'],
		},
		{
			path: '/about',
			template: [About, 'render'],
		},
	],
	setData
);

export default router;
```

路由匹配到的组件将渲染到`view()`方法所在的地方，一般会放在主页面入口文件下（例如`App.js`）。

```js
// App.js

import { h } from 'strvejs';
import router from './router/index';

export default function App() {
	return h`
        <div class='inner'>
          ${router.view()}
        </div>
    `;
}
```

#### linkTo()

如果需要跳转到对应页面，使用`linkTo()`方法，可以传对应的路径和需要传的参数，也可以直接传一个路径字符串。

```js
import { h, setData } from 'strvejs';
import { linkTo } from 'strve-router';

export default class Home {
	goAbout = () => {
		linkTo({
			path: '/about',
			query: {
				id: 1,
				name: 'maomin',
			},
		});
	};

	render = () => {
		return h/*html*/ `
            <button onClick=${this.goAbout}>goAbout</button>
        `;
	};
}
```

#### forward()

向前跳转 1 个页面。

#### back()

向后跳转 1 个页面。

#### go(n)

向前跳转 n 个页面。

#### toParse

如果你执行了路由传参的操作，想获取参数对象。直接执行`toParse()`方法就可以获取对象信息。

```js
import { h, setData } from 'strvejs';
import { linkTo, toParse } from 'strve-router';

export default class About {
	goHome = () => {
		linkTo({
			path: '/',
		});
	};

	getOption = () => {
		console.log(toParse());
	};

	render = () => {
		return h/*html*/ `
            <button onClick="${this.goHome}">goHome</button>
            <h1 onClick=${this.getOption}>About</h1>
    `;
	};
}
```

#### routerVersion

可以获取 Strve Router 版本信息。
