# Adapt

Strve can be said to be a view rendering library that renders simple string templates into real pages. A view rendering library can be flexibly used with other frameworks or libraries. Below you can choose the appropriate way to reference it.

## Adapt React.js

React is a JavaScript library for building user interfaces. It mixes HTML and JavaScript code together by using an HTML-in-javascript syntax called JSX to make it easier to build interactive and reusable UI components. The main goals of React are to improve application performance and speed, and to simplify complex UI development.

Strve can be used with React, allowing you to enjoy Strve features while using React.

Here is an example paired with React.

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
				<button onClick=${add}>count is ${data.count}</button>
			</div>
	`;
}
```

## Adapt Vue.js

Vue is a popular JavaScript front-end framework designed to better organize and simplify Web development. The core focus of Vue is the view layer in the MVC pattern. At the same time, it can easily obtain data updates and realize the interaction between the view and the model through specific methods within the component. Vue is a progressive framework that focuses only on the view layer and uses a bottom-up incremental development design. The goal of Vue is to implement responsive data binding and composite view components through the simplest possible API. The advantages of Vue include easy to use, lightweight, efficient, fast, flexible, extensible and so on.

Strve can also be used with Vue. If Strve conflicts with Vue' API name, you can use `as` to give it a different name.

Here's the sample code.

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
	return html`
			<div class="card">
				<button type="button" onClick=${add}>
					Strve：count is ${data.count}
				</button>
			</div>
	`;
}
```
