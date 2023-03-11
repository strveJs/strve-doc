# 适配

Strve.js 可以说是一个视图渲染库，将简单的字符串模版渲染成真实的页面。一个视图渲染库可以灵活的搭配其他框架或库进行使用，在下面你可以选择相应的方式进行引用。

## 适配 React.js

React 是一个用于构建用户界面的 JavaScript 库。它通过使用称为 JSX 的 HTML-in-JavaScript 语法，将 HTML 和 JavaScript 代码混合在一起，以便更轻松地构建交互性和可重用的 UI 组件。React 的主要目标是提高应用程序的性能和速度，并简化复杂的 UI 开发过程。

Strve.js 可以与 React 搭配使用，让你可以在使用 React 的同时，也可以享受 Strve.js 带来的特性。

以下是一个与 React 搭配的例子。

**App.jsx**

```jsx
import { useState, useEffect } from 'react';
import { createApp } from 'strve-js';
import { template } from './strve-template.js';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		createApp(template).mount('.strve-app');
	});
	return (
		<div className='App'>
			<div>
				<a href='https://reactjs.org' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Strve + React</h1>
			<div className='card'>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<div className='strve-app'></div>
		</div>
	);
}

export default App;
```

**strve-template.js**

```js
import { setData } from 'strve-js';

const data = {
	count: 1,
};

function add() {
	setData(() => {
		data.count++;
	});
}

export function template() {
	return html`
		<div class="card">
			<button @click=${add} $key>count is ${data.count}</button>
		</div>
	`;
}
```

如果你想查看完整代码，可以浏览[在线示例](https://stackblitz.com/edit/reactandstrve)。

## 适配 Vue.js

Vue.js 是一款流行的 JavaScript 前端框架，旨在更好地组织与简化 Web 开发。Vue 所关注的核心是 MVC 模式中的视图层，同时，它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互。Vue.js 是一套渐进式框架，只关注视图层，采用自底向上增量开发的设计。Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。Vue.js 的优点包括易于上手、轻量级、高效、快速、灵活、可扩展等。

Strve.js 同样可以与 Vue.js 搭配使用，如果 Strve.js 与 Vue.js 的 API 名称冲突，可以使用`as`使之命名为其他名称。

以下是示例代码。

**HelloWorld.vue**

```html
<script setup>
	import { ref, onMounted } from 'vue';
	import { createApp } from 'strve-js';
	import { template } from './strve-template';
	defineProps({
		msg: String,
	});

	onMounted(() => {
		createApp(template).mount('.strve-app');
	});

	const count = ref(0);
</script>

<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<button type="button" @click="count++">Vue：count is {{ count }}</button>
	</div>
	<div class="strve-app"></div>
</template>

<style scoped>
	.read-the-docs {
		color: #888;
	}
</style>
```

**strve-template.js**

```js
import { setData } from 'strve-js';
const data = {
	count: 1,
};

function add() {
	setData(() => {
		data.count++;
	});
}

export function template() {
	return html`<div class="card">
		<button type="button" @click=${add} $key>
			Strve：count is ${data.count}
		</button>
	</div>`;
}
```

如果你想查看完整代码，可以浏览[在线示例](https://stackblitz.com/edit/strveandvue)。
