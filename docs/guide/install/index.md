# Install

In the previous article, we briefly and quickly understood the use of Strve.js, so we will explain in detail the installation methods of Strve.js in this article.

## CDN

If you want to use ES Modules.

> If you opened the above index.html directly in your browser, you'll see that it throws an error because ES modules don't work over the `file://` protocol. In order for this to work, you need to use a local HTTP server to serve index.html via the `http://` protocol.

```html
<script type="module">
	import {
		h,
		setData,
		createApp,
	} from 'https://cdn.jsdelivr.net/npm/strve-js@5.6.0/dist/strve.full-esm.prod.js';

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

If you think the above method is a bit cumbersome, for more convenience, you can also directly import it in the `<script>` tag and use it directly.

```html
<script src="https://cdn.jsdelivr.net/npm/strve-js@5.6.0/dist/strve.full.prod.js"></script>
```

It should be noted that in this way, you need to use the corresponding method through object destructuring.

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

> The above two methods use the production version by default. If you want to get better code error prompts in the development environment, you can use the development version. You only need to delete the `prod` field in the file suffix `*.prod.js` That's it.

## Package Manager

Package manager installation is recommended when building large applications with Strve.js.

Install using your favorite package manager.

### Npm

```bash
> npm install strve-js
```

### Yarn

```bash
> yarn add strve-js
```

## CLI

When you build a large application, it is recommended to use the official project scaffolding provided by Strve.js to build the project. Quickly build complex scaffolding for single-page applications (SPAs). It provides out-of-the-box build settings for modern front-end workflows.

> [CreateStrveApp](/tool/createStrveApp/)

## Explanation of the different builds

You'll find many different builds of Strve.js in the `dist/` directory of the NPM package. Here are the differences between them:

|                                          | ES Module (used based on build tools) | ES Module (directly used in browsers) | UMD                |
| ---------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------ |
| Full Version                             | -                                     | strve.full-esm.js                     | strve.full.js      |
| Full version (production environment)    | -                                     | strve.full-esm.prod.js                | strve.full.prod.js |
| Runtime version                          | strve.runtime-esm.js                  | -                                     | -                  |
| Runtime version (production environment) | strve.runtime-esm.prod.js             | -                                     | -                  |

Different versions:

1. Full version: includes compiler (code for compiling template strings into JavaScript rendering functions) and runtime versions;
2. Runtime version: Code for creating instances, rendering and manipulating the virtual DOM. Basically, it removes everything else from the compiler;
