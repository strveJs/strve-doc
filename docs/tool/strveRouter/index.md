# strveRouter

Strve Router is the official routing manager of Strve. It is deeply integrated with Strve’s core to easily build single-page applications.

## Started

The easiest way to try Strve Router is to use a direct import CDN link. You can open it in your browser and follow the examples to learn some basic usage.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>strve-router</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module">
      import {
        html,
        createApp,
        setData,
      } from "https://cdn.jsdelivr.net/npm/strve-js@6.0.2/dist/strve.full-esm.prod.js";
      import {
        initRouter,
        linkTo,
      } from "https://cdn.jsdelivr.net/npm/strve-router@4.0.1/dist/strve-router.esm.js";

      class Home {
        constructor() {
          this.state = {
            count: 0,
          };
        }

        useAdd = () => {
          setData(() => {
            this.state.count++;
          });
        };

        goAbout = () => {
          linkTo("/about");
        };

        render = () => {
          return html`
                  <fragment>
                    <button onClick=${this.goAbout}>goAbout</button>
                    <h1 onClick=${this.useAdd}>${this.state.count}</h1>
                  </fragment>
          `;
        };
      }

      class About {
        constructor() {
          this.state = {
            msg: "About",
          };
        }

        useChange = () => {
          setData(() => {
            this.state.msg = "Changed";
          });
        };

        goHome = () => {
          linkTo("/");
        };

        render = () => {
          return html`
                  <fragment>
                    <button onClick=${this.goHome}>goHome</button>
                    <h1 onClick=${this.useChange}>${this.state.msg}</h1>
                  </fragment>
          `;
        };
      }

      const router = initRouter(
        [
          {
            path: "/",
            template: [Home, "render"],
          },
          {
            path: "/about",
            template: [About, "render"],
          },
        ],
        setData
      );

      function App() {
        return html`<div class="main">${router.view()}</div>`;
      }

      const app = createApp(App);
      app.mount("#app");
    </script>
  </body>
</html>
```

## Install

```bash
npm install strve-router
```

## Usage

You can use [CreateStrveApp](/tool/createStrveApp/) and choose the **strve-apps** or **strve-jsx-apps** template.

## API

### initRouter()

The first parameter is an array object, which is the routing component that needs to be registered, the `path` attribute represents the path of the component, the `template` attribute is an array, and the first item is the imported component (in accordance with [Component-mode](/essentials/usage/#component-mode)), the second item is the name of the rendered component function, such as `render` below.

The second parameter needs to be passed to the `setData` API, and the page that matches the corresponding path will be updated accordingly. For example, create an `index.js` file in a router folder here.

```js
import { setData } from 'strvejs';
import { initRouter } from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const router = initRouter(
	[
		{
			path: '/',
			template: [Home, 'render'],
		},
		{
			path: '/about',
			template: [About, 'render'],
		},
	],
	setData
);

export default router;
```

The component matched by the route will be rendered to the place where the `view()` method is located, which is usually placed under the main page entry file (such as `App.js`).

```js
// App.js

import { html } from "strvejs";
import router from "./router/index";

export default function App() {
  return html`
          <div class='inner'>
            ${router.view()}
          </div>
  `;
}
```

### linkTo()

If you need to jump to the corresponding page, use the `linkTo()` method. You can pass the corresponding path and parameters to be passed, or you can pass the path string directly.

```js
import { html, setData } from "strvejs";
import { linkTo } from "strve-router";

export default class Home {
  goAbout = () => {
    linkTo({
      path: "/about",
      query: {
        id: 1,
        name: "maomin",
      },
    });

    // linkTo("/about");
  };

  render = () => {
    return html`<button onClick=${this.goAbout}>goAbout</button>`;
  };
}
```

### forward()

Jump forward 1 page.

### back()

Jump back 1 page.

### go(n)

Jump forward n pages.

### toParse

If you perform the operation of routing parameters, you want to get the parameter object. Object information can be obtained by directly executing the `toParse()` method.

```js
import { html, setData } from "strvejs";
import { linkTo, toParse } from "strve-router";

export default class About {
  goHome = () => {
    linkTo({
      path: "/",
    });
  };

  getOption = () => {
    console.log(toParse());
  };

  render = () => {
    return html`
            <fragment>
              <button onClick=${this.goHome}>goHome</button>
              <h1 onClick=${this.getOption}>About</h1>
            </fragment>
    `;
  };
}
```

### routerVersion

Strve Router version information can be obtained.