# babelPluginJsxToStrve

[babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) is a babel plugin that converts JSX for use with Strve.js tag template.

```js
// input:
const state = {
  count: 0,
};
const Hello = () => <h1 $key>{state.count}</h1>;

// output:
h`<h1 $key>${state.count}</h1>`;
```

## Install

> [createStrveApp](/tool/createStrveApp/) project scaffolding tool has been installed by default, select `strve-jsx` or `strve-jsx-apps` template.

### npm

```bash
npm install babel-plugin-jsx-to-strve
```

### yarn

```bash
yarn add babel-plugin-jsx-to-strve
```

### pnpm

```bash
pnpm add babel-plugin-jsx-to-strve
```

## Usage

In your Babel configuration (.babelrc, babel.config.js, babel field in package.json, etc.), add the plugin:

```js
{
  "plugins": [
    ["babel-plugin-jsx-to-strve"]
  ]
}
```

## Options

### `tag=h`

By default, [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve) will process all markup with a markup function named h template. To use a different name, use the tag option in your Babel configuration:

```js
{"plugins":[
  ["babel-plugin-jsx-to-strve", {
    "tag": "html"
  }]
]}
```
