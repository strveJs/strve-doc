# IDE support

::: tip
If you use tag templates to write Strve applications, the following content will help you.
:::

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

Download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plug-in.

- Convert normal strings to template strings

Download the [template-string-converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter) plug-in, and then enter `${}` in a normal string to convert.
