# 开始

尝试 Strve.js 最简单的方法是使用直接引入 CDN 链接。你可以在浏览器打开它，跟着例子学习一些基础用法。

需要注意的是，Strve.js 源代码是用 ES Modules 管理的，所以在浏览器直接使用就需要在`script`标签上添加一个`type="module"`的属性来表示这个文件是作为`module`的方式来运行的。

如果你还想深入学习其他关于 Strve.js 的内容，你可以继续往下阅读。

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
			} from 'https://cdn.jsdelivr.net/npm/strvejs@3.2.0/dist/strve.esm.min.js';

			const state = {
				count: 0,
			};

			function App() {
				return h`
            <h1 $key>${state.count}</h1>
            <button onClick=${add}>Add</button> 
        `;
			}

			function add() {
				setData(() => {
					state.count++;
				});
			}

			const app = createApp(App);
			app.mount('#app');
		</script>
	</body>
</html>
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOmyLW" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOmyLW">
  Strve.js-示例</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>
