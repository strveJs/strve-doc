# babelPluginJsxToStrve

[babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) is a babel plugin that converts JSX for use with Strve tag template.

## Install

```bash
npm install babel-plugin-jsx-to-strve
```

::: tip
[CreateStrveApp](/tool/createStrveApp/) The project scaffolding tool has been installed by default. Select the `strve-jsx` or `strve-jsx-apps` template.
:::

## Usage

In your Babel configuration (`.babelrc`, `babel.config.js`, `babel` field in `package.json`, etc.), add the plugin:

```js
{
  "plugins": [
    ["babel-plugin-jsx-to-strve"]
  ]
}
```

## Options

### `tag=html`

By default, [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) will handle all functions tagged with the name `html` markup template. To use a different name, use the `tag` option in the Babel configuration:

```js
{"plugins":[
  ["babel-plugin-jsx-to-strve", {
    "tag": "html"
  }]
]}
```
