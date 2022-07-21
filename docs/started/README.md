# Started

The easiest way to try Strve.js is to use direct ingest CDN links. You can open it in your browser and follow the example to learn some basic usage.

It should be noted that the source code of Strve.js is managed by ES Modules, so when using it directly in the browser, you need to add a `type="module"` attribute to the `script` tag to indicate that this file is used as a `module' ` way to run.

If you want to learn more about Strve.js in depth, you can read on.

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
