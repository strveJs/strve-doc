# SFC

SFC (Single File Component) is also a single file component, which is a special file format. A single-file component encapsulates the component's HTML template in a file ending with `.strve`, which can provide a better experience of code completion (need to change its language mode to HTML). In addition, JavaScript logic and CSS styles are separated from it, making it easier for developers to maintain and modify components.

## Install

You can use [createStrveApp](/tool/createStrveApp/) to quickly build the project.

- Basic template: select `strve-sfc` template;
- strve-router template: select `strve-sfc-apps` template;

## Usage

The SFC feature is based on Strve.js, and many uses are similar but not entirely the same. Please read the following precautions before use.

### event-handling

Only the `@` abbreviation is supported. In addition, the event name needs to be bound to the namespace and needs to be wrapped in quotes. Such as `@click="myComponent2.btn"`.

### list-rendering

Use `join('')` to remove extra commas in the rendered result page. like:

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

### conditional-rendering

Labels are wrapped using ````. like:

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

### property-binding

When binding properties, you can use no quotes, such as: `value=${msg}`.

### naming-functional-components

Named function components are not supported.

### web-components

Support.

### component-mode

Not supported.

### register-component

Call functions. like:

```js
`${component()}`;
```

### strve-router

Support.