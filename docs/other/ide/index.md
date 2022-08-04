# IDE support

## Visual Studio Code

- Template string auto-completion tags

Open `settings.json` under **Settings** and add the following code:

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

After downloading the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plugin, add `/*html*/ in the middle of the `h```method`.

```js
function App() {
	return h/* html */ `
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

Just like that, in the VSCode editor, this plugin can make HTML template characters highlighted.

![](/code1.png)

- Convert normal strings to template strings

Download the [template-string-converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter) plugin, and then enter `${}` in the normal string to convert.
