# Started

Strve is a JavaScript library that converts strings into views (user interfaces). Strve is not only easy to use, but also flexible in breaking down different chunks of code. Developing user interfaces using template strings mainly takes advantage of the power of JavaScript and focuses only on JavaScript files.

The way to try Strve is to open it in a browser and follow the examples to learn some basic usage.

## ES Modules

Most modern browsers already support ES modules, so we can use Strve through CDN and ES modules like this:

::: warning
If you open the above index.html directly in the browser, you will find that it throws an error because ES modules cannot work through the `file://` protocol. In order for this to work, you need to use a local HTTP server to serve index.html via the `http://` protocol.
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Strve.js</title>
  </head>

  <body>
    <script type="module">
      import {
        html,
        setData,
        createApp,
      } from "https://cdn.jsdelivr.net/npm/strve-js@6.0.2/dist/strve.full-esm.js";

      const state = {
        count: 0,
      };

      function add() {
        setData(() => {
          state.count++;
        });
      }

      function App() {
        return html`<h1 onClick=${add}>${state.count}</h1>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>
```

## UMD

You can also choose to use the `<script>` tag to import it, so that it can be opened directly in the browser.

::: warning
It should be noted that in this way you need to use the corresponding method through object destructuring.
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Strve.js</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/strve-js@6.0.2/dist/strve.full.prod.js"></script>
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
       return html`<h1 onClick=${add}>${state.count}</h1>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>
```
