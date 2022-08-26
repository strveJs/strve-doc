# 安装

<a href="https://npmjs.com/package/strvejs"><img src="https://badgen.net/npm/v/strvejs" alt="npm package"></a>

## CDN

如果您使用原生 ES Modules。

```html
<script type="module">
	import {
		h,
		createApp,
	} from 'https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.esm.min.js';
</script>
```

或者您可以直接在 `<script>` 标签中导入。

```html
<script src="https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.iife.min.js"></script>
```

需要注意的是，此方法需要在 API 前加上一个 `$` 符号，如下所示：

```html
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
```

## 包管理器

使用您最喜欢的包管理器安装。

### NPM

```bash
> npm install strvejs
```

### Yarn

```bash
> yarn add strvejs
```