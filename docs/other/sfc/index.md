# SFC

SFC (Single File Component) is also a single file component, which is a special file format. A single-file component encapsulates the component's HTML template in a file ending with `.strve`, which can provide a better experience of code completion (need to change its language mode to HTML). In addition, JavaScript logic and CSS styles are separated from it, making it easier for developers to maintain and modify components.

## Install

You can use [createStrveApp](/tool/createStrveApp/) to quickly build the project and select the `strve-sfc` template.

The project template is pre-installed with [vite-plugin-strve](https://www.npmjs.com/package/vite-plugin-strve), which is a Vite plugin used to compile and end with `.strve` document.

## Version

The latest version is **5.1.1**. This version will match the Strve.js version.

## Usage

Before using, please read the notes below for compatibility with Strve.js.

- Event handling

Only the `@` abbreviation is supported. In addition, the event name needs to be bound to the namespace and needs to be wrapped in quotes. Such as `@click="myComponent2.btn"`.

- List rendering

Use `join('')` to remove extra commas in the rendered result page. like:

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

- Conditional rendering

Labels are wrapped using ````. like:

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

- Property binding

When binding properties, you can use no quotes, such as: `value=${msg}`.

- Naming functional components

Named function components are not supported.

- Web Components

Support for Web Components.

- Component mode

Component mode is not supported.

- Register component

Call functions. like:

```js
`${C2()}`;
```

- strveRouter

not support.

- babelPluginStrve

not support.