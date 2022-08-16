# IDE 支持

## Visual Studio Code

- 模板字符串自动闭合标签

打开 **Settings** 下的 `settings.json` 并添加以下代码：

```json
"emmet.triggerExpansionOnTab": true,
"emmet.showAbbreviationSuggestions": true,
"emmet.showExpandedAbbreviation": "always",
"emmet.includeLanguages": {
    "javascript": "html"
}
```

注意：如果在`<script>`中使用，指定`type`，如`type="module"; type="text/javascript"`。

- 支持 HTML 模板字符串高亮

下载[es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)插件后，在` h`` `中间添加 `/*html*/`。
```js
function App() {
	return h/* html */ `
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

就这样，在 VSCode 编辑器中，这个插件可以使 HTML 模板字符高亮。

![](/code1.png)

- 将普通字符串自动转换为模板字符串

下载[template-string-converter](https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter)插件，然后在普通字符串中输入 `${}` 进行转换。