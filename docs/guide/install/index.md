# Install

<a href="https://npmjs.com/package/strve-js"><img src="https://badgen.net/npm/v/strve-js" alt="npm package"></a>

## CDN

If you use native ES Modules.

```html
<script type="module">
	import {
		h,
		createApp,
	} from 'https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.esm.min.js';
</script>
```

Or you can import directly in the `<script>` tag .

```html
<script src="https://cdn.jsdelivr.net/npm/strvejs@4.3.0/dist/strve.iife.min.js"></script>
```

It should be noted that this method requires a `$` sign before the API，like this:

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

## Package manager

Install using your favorite package manager.

### NPM

```bash
> npm install strvejs
```

### Yarn

```bash
> yarn add strvejs
```
