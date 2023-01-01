# 安装

上一篇，我们简单快速地了解 Strve.js 的使用，那么我们在这一篇详细说明下 Strve.js 有哪些安装方法。

## CDN

如果你想使用原生 ES Modules。

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

使用您最喜欢的包管理器安装。

### Npm

```bash
> npm install strve-js
```

### Yarn

```bash
> yarn add strve-js
```
