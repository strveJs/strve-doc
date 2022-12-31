# 开始

尝试 Strve.js 的一种方法是使用直接引入 CDN 链接。您可以在浏览器中打开它并按照示例学习一些基本用法。

## ES Modules

需要注意的是，Strve.js 的源码是由 ES Modules 管理的，所以直接在浏览器中使用的时候，需要在 `<script>` 标签中添加 `type="module"` 属性来表明这个文件被用作 `module` 的方式来运行。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Strve.js</title>
	</head>

	<body>
		<div id="app"></div>
		<script type="module">
			import {
				h,
				createApp,
				setData,
			} from 'https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.esm.min.js';

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

## IIFE

当然您也可以选择使用 `<script>` 标签直接引入，这样就可以直接在浏览器中打开了。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Strve.js</title>
	</head>

	<body>
		<div id="app"></div>
		<script src="https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.iife.min.js"></script>
		<script>
			const state = {
				count: 0,
			};

			function add() {
				$setData(() => {
					state.count++;
				});
			}

			function App() {
				return $h`
                        <h1 $key>${state.count}</h1>
                        <button onClick=${add}>Add</button> 
				`;
			}

			const app = $createApp(App);
			app.mount('#app');
		</script>
	</body>
</html>
```
