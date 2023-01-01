# 开始

尝试 Strve.js 的方法是在浏览器中打开它，并按照示例学习一些基本用法。

## ES Modules

在本文档的其余部分我们使用的主要是 ES 模块语法。现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Strve.js:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Strve.js</title>
	</head>

	<body>
		<script type="module">
			import {
				h,
				setData,
				createApp,
			} from 'https://cdn.jsdelivr.net/npm/strve-js@5.1.1/dist/strve.full-esm.js';

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
	</body>
</html>
```

## UMD

当然你也可以选择使用 `<script>` 标签直接引入，这样就可以直接在浏览器中打开了。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Strve.js</title>
	</head>

	<body>
		<script src="https://cdn.jsdelivr.net/npm/strve-js@5.1.1/dist/strve.full.prod.js"></script>
		<script>
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
		</script>
	</body>
</html>
```
