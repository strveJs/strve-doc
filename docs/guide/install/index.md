# Install

::: tip
In the previous article, we briefly and quickly understood the use of Strve, so in this article we will explain in detail the installation methods of Strve.
:::

## CDN

If you want to use ES Module.

::: warning
If you open the above index.html directly in the browser, you will find that it throws an error because ES modules cannot work through the `file://` protocol. In order for this to work, you need to use a local HTTP server to serve index.html via the `http://` protocol.
:::

```html
<script type="module">
  import {
    html,
    setData,
    createApp,
  } from 'https://cdn.jsdelivr.net/npm/strve-js@6.2.6/dist/strve.full-esm.prod.js';

  const state = {
    count: 0,
  };

  function add() {
    setData(() => {
      state.count++;
    });
  }

  function App() {
    return html`<h1>${state.count}</h1>`;
  }

  const app = createApp(App);
  app.mount('#app');
</script>
```

If you find the above method a bit troublesome, you can also import it directly in the `<script>` tag.

::: tip
All top-level APIs of this version are exposed as properties on the global Strve object.
:::

```html
<script src="https://cdn.jsdelivr.net/npm/strve-js@6.2.6/dist/strve.full.prod.js"></script>
<script>
  const { html, setData, createApp } = Strve;

  const state = {
    count: 0,
  };

  function add() {
    setData(() => {
      state.count++;
    });
  }

  function App() {
    return html`<h1>${state.count}</h1>`;
  }

  const app = createApp(App);
  app.mount('#app');
</script>
```

::: tip
The above two methods use the production version by default. If you want to get more accurate code positioning during development, you can use the development version. You only need to delete the `prod` field in the file suffix `*.prod.js`.
:::

## Package Manager

When building large applications with Strve, it is recommended to install using a package manager.

```bash
> npm install strve-js
```

## CLI

When you build a large-scale application, it is recommended to use the official project scaffolding [CreateStrveApp](/tool/createStrveApp/) provided by Strve to build the project. Quickly build complex scaffolding for single page applications (SPA). It provides out-of-the-box build settings for modern front-end workflows.

## Explanation of the different builds

You'll find many different builds of Strve in the `dist/` directory of the NPM package. Here are the differences between them:

|                                          | ES Module (used based on build tools) | ES Module (directly used in browsers) | UMD                |
| ---------------------------------------- | ------------------------------------- | ------------------------------------- | ------------------ |
| Full Version                             | -                                     | strve.full-esm.js                     | strve.full.js      |
| Full version (production environment)    | -                                     | strve.full-esm.prod.js                | strve.full.prod.js |
| Runtime version                          | strve.runtime-esm.js                  | -                                     | -                  |
| Runtime version (production environment) | strve.runtime-esm.prod.js             | -                                     | -                  |

Different versions:

- **Full version:** includes compiler (code for compiling template strings into JavaScript rendering functions) and runtime versions;

- **Runtime version:** Code for creating instances, rendering and manipulating the virtual DOM. Basically, it removes everything else from the compiler;
