# Started

Strve.js is a JS library that converts strings into views. The string here refers to the template string, so you only need to develop the view with JavaScript. The view here refers to the HTML page we usually write, that is, the view layer.

Strve.js is not only easy to use, but also flexible to disassemble different code blocks. Using template strings to develop views mainly takes advantage of native JavaScript’s ability to separate code blocks more flexibly and focus only on JavaScript files.

The way to try Strve.js is to open it in your browser and follow the examples to learn some basic usage.

## ES Modules

In the rest of this document we mainly use ES module syntax. Most modern browsers already support ES modules natively. So we can use Strve.js via CDN as well as native ES modules like this:

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
			} from 'https://cdn.jsdelivr.net/npm/strve-js@5.6.2/dist/strve.full-esm.js';

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

Of course, you can also choose to use the `<script>` tag to import directly, so that it can be opened directly in the browser.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Strve.js</title>
	</head>

	<body>
		<script src="https://cdn.jsdelivr.net/npm/strve-js@5.6.2/dist/strve.full.prod.js"></script>
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
