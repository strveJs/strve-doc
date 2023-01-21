# strveRouter

Strve Router 是 Strve.js 的官方路由管理器。 它与 Strve.js 的核心深度集成，轻松构建单页应用程序。

目前仅支持 Hash 模式。

## 开始

尝试 Strve Router 的最简单方法是使用直接导入 CDN 链接。 您可以在浏览器中打开它并按照示例学习一些基本用法。

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
			} from 'https://cdn.jsdelivr.net/npm/strve-js@5.1.1/dist/strve.full-esm.prod.js';
			import {
				initRouter,
				linkTo,
			} from 'https://cdn.jsdelivr.net/npm/strve-router@2.3.1/dist/strve-router.esm.js';

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

				useChange = () => {
					setData(() => {
						this.state.msg = 'Changed';
					});
				};

				goHome = () => {
					linkTo('/');
				};

				render = () => {
					return h`
                            <button onClick=${this.goHome}>goHome</button>
                            <h1 onClick=${this.useChange} $key>${this.state.msg}</h1>
                    `;
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

## 安装

### npm

```bash
npm install strve-router
```

### yarn

```bash
yarn add strve-router
```

### pnpm

```bash
pnpm add strve-router
```

## 使用

我们已经为您预装了项目配置，您可以使用[CreateStrveApp](/zh/tool/createStrveApp/)选择**strve-apps**模板。

## API

### initRouter()

第一个参数是一个数组对象，即需要注册的路由组件，`path`属性表示组件的路径，`template`属性是一个数组，第一项是导入的组件（按照[组件模式](/zh/essentials/usage/#组件模式))，第二项是渲染的组件函数的名称，比如下面的`render`。

第二个参数需要传递给`setData` API，匹配到对应路径的页面会相应更新。 例如，在此处的路由器文件夹中创建一个 `index.js` 文件。

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

路由匹配的组件会被渲染到`view()`方法所在的地方，通常放在主页面入口文件（如`App.js`）下。

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

### linkTo()

如果需要跳转到对应的页面，使用`linkTo()`方法，可以传递对应的路径和要传递的参数，也可以直接传递路径字符串。

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
		return h`
                <button onClick=${this.goAbout}>goAbout</button>
        `;
	};
}
```

### forward()

向前跳转 1 页。

### back()

跳回 1 页。

### go(n)

在页面中跳转 n 页。

### toParse

如果执行路由参数的操作，则要获取参数对象。 直接执行`toParse()`方法可以获取对象信息。

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
		return h`
                <button onClick="${this.goHome}">goHome</button>
                <h1 onClick=${this.getOption}>About</h1>
        `;
	};
}
```

### routerVersion

可以获取 Steve Router 的版本信息。
