# Other

## IDE support

### Visual Studio Code

- Template string auto-completion tags

Open `settings.json` under Settings and add the following code:

```json
"emmet.triggerExpansionOnTab": true,
"emmet.showAbbreviationSuggestions": true,
"emmet.showExpandedAbbreviation": "always",
"emmet.includeLanguages": {
    "javascript": "html"
}
```

Note: If used within `<script>`, specify `type`, such as `type="module"; type="text/javascript"`.

- Support HTML template string highlighting

After downloading the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plugin, add `/*html*/ in the middle of the `render```method`.

```js
function App() {
	return render/* html */ `
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

Just like that, in the VSCode editor, this plugin can make HTML template characters highlighted.

![](./../.vuepress/public/img/code1.png)

- Convert normal strings to template strings

Download the [template-string-converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter) plugin, and then enter `${}` in the normal string to convert.

## UI framework

- Bootstrap5

[https://getbootstrap.com/](https://getbootstrap.com/)

- Tailwindcss

[https://tailwindcss.com/](https://tailwindcss.com/)

## Browser Compatibility

Because the Strve.js project build tool is built with [Vite](https://vitejs.dev/) by default, the default build target browser can support native ESM and native ESM dynamic import on the script tag. Legacy browsers can be supported through the official plugin `@vitejs/plugin-legacy`.

For example:

```js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	// options
	server: {
		strictPort: true,
		port: 3001,
	},
	plugins: [
		legacy({
			targets: ['ie >= 9'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
	],
});
```

## About the author

- Name:**Vam**
- ID:**maomincoding**
- Github:[https://github.com/maomincoding](https://github.com/maomincoding)
- Twitter:[https://twitter.com/maomincoding](https://twitter.com/maomincoding)
