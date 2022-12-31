# Started

A way to try Strve.js is to use direct ingest CDN links. You can open it in your browser and follow the example to learn some basic usage.

## ES Modules

It should be noted that the source code of Strve.js is managed by ES Modules, so when using it directly in the browser, you need to add a `type="module"` attribute to the `<script>` tag to indicate that this file is used as a `'module'` way to run.

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
				$setData(() => {
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

Of course, you may also use the scene introduced directly in the script, so that it can be opened directly in the browser.

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
