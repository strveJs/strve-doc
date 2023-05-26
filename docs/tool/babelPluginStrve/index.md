# babelPluginStrve

[babelPluginStrve](https://www.npmjs.com/package/babel-plugin-strve) is a babel plugin that converts HTML template strings into Virtual Dom. Dramatically improved rendering performance by moving from previous runtime to compile time.

```js
// input:
const state = {
	count: 0,
};

h`<h1 $key>${state.count}</h1>`;

// output:
{
    children: [0],
    props: {"$key": true},
    tag: "h1"
}
```


## Install

> [createStrveApp](/tool/createStrveApp/) project scaffolding tool is installed by default.

### npm

```bash
npm install babel-plugin-strve
```

### yarn

```bash
yarn add babel-plugin-strve
```

### pnpm

```bash
pnpm add babel-plugin-strve
```

## Usage

In your Babel configuration (`.babelrc`, `babel.config.js`, `babel` field in `package.json`, etc.), add the plugin:

```json
{
	"plugins": [["babel-plugin-strve"]]
}
```

## Options

### tag=h

By default, [babelPluginStrve](https://www.npmjs.com/package/babel-plugin-strve) will process all markup templates with a markup function named `h`. To use a different name, use the `tag` option in your `Babel` configuration:

```json
{
	"plugins": [
		[
			"babel-plugin-strve",
			{
				"tag": "html"
			}
		]
	]
}
```
