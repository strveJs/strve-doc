# Tool
## create-strve-app
<a href="https://npmjs.com/package/create-strve-app"><img src="https://badgen.net/npm/v/create-strve-app" alt="npm package"></a>

A set of command line tools to quickly build Strve.js projects. Compared with the early scaffolding Create Strve, Create Strve App is better, you can directly enter commands to quickly create Strve projects. Create Strve App is built with [Vite](https://vitejs.dev/), which is a new front-end construction tool that can significantly improve the front-end development experience.
### Scaffolding Your First Strve Project

#### npm

```bash
npm init strve-app@latest
```

#### yarn

```bash
yarn create strve-app
```

#### pnpm

```bash
pnpm create strve-app
```
### Choose a template

You can choose the corresponding template according to your needs.

- strve

Only contains the basic functions of Strve.js. This template is suitable for applications that only have a single page in the project and do not jump to other pages.

- strve-apps

Not only includes the basic functions of Strve.js, but also includes Strve Router, which is suitable for jumping multiple pages and slightly more complex applications.

## create-strve
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

We also briefly introduced before, Create Strve is a project construction tool based on Strve.js, you can use it to build pages more conveniently and flexibly. Create Strve is also built with [Vite](https://vitejs.dev/).

However, it is recommended to use Create Strve App here, which is more flexible and faster than installation.

### Install

**Global installation**

```shell
npm install create-strve -g
```

**View version**
```shell
create-strve -v
```

**Initialize the project**
```shell
create-strve init <projectName>
```

## strve-router
<a href="https://npmjs.com/package/strve-router"><img src="https://badgen.net/npm/v/strve-router" alt="npm package"></a>

Strve Router is the official route manager of Strve.js. It is deeply integrated with the core of Strve.js, making it easy to build single-page applications.

Currently only supports Hash mode.

### Start

The easiest way to try strve-router is to use the direct import CDN link. You can open it in your browser and follow the examples to learn some basic usage.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>StrveRouter</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.js';
        import { StrveRouter, routerHashUpdate, param2Obj, back, routerLink } from 'https://cdn.jsdelivr.net/npm/strve-router/dist/strve-router.esm.js';

        const state = {
            msg: 'Hello!'
        };

        const router = StrveRouter([{
            path: '/',
            template: Home
        }, {
            path: '/about',
            template: About
        }]);

        routerHashUpdate(updateView, () => {
            console.log(param2Obj());
        });

        function Home() {
            return render`
                <div class='innter'>
                    <button onClick="${goAbout}">goAbout</button>
                    <h1>Home</h1>
                </div>
            `
        }

        function About() {
            return render`
                <div class="innter">
                    <button onClick="${goback}">goback</button>
                    <button onClick="${goHome}">goHome</button>
                    <h2>About</h2>
                </div>
            `
        }

        function App() {
            return render`
              <div class='inner'>
                <p>{state.msg}</p>
                ${router.routerView()}
              </div >
          `;
        }

        function goback() {
            back();
        }

        function goAbout() {
            console.log('goAbout');
            routerLink({
                path: '/about',
                query: {
                    id: 1,
                    name: "maomin"
                }
            });
        }

        function goHome() {
            console.log('goHome');
            routerLink('/');
        }

        Strve('#app', {
            data: { state },
            template: App
        });
    </script>
</body>

</html>
```

### Install

#### npm

```bash
npm install strve-router
```

#### yarn 

```bash
yarn add strve-router
```

#### pnpm

```bash
pnpm add strve-router
```

### Use

If you use it in a project, you can introduce the StrveRouter method. The parameter is an array object, which is the routing component to be registered. The `path` property represents the path of the component, and the `template` property represents the imported component.

The page that matches the corresponding route will be updated accordingly, so a `routerHashUpdate()` method must be registered here, and then the first parameter is passed to the `updateView` API, and the second parameter is a custom method.

For example, create an `index.js` file in a router folder here.

```js
import { updateView } from 'strvejs';
import {StrveRouter,routerHashUpdate} from 'strve-router';

import Home from '../template/home';
import About from '../template/about';

const router = StrveRouter([{
    path: '/',
    template: Home
}, {
    path: '/about',
    template: About
}]);

routerHashUpdate(updateView,()=>{
    console.log('router change');
});

export default router
```

The components matched by the route will be rendered to the place where the `routerView()` method is located, usually under the main page entry file (for example, `App.js`).

```js
import { render } from 'strvejs';
import router from './router/index';

export default function Template() {
  return render`
        <div class='inner'>
          ${router.routerView()}
        </div>
    `;
}
```

If you need to jump to the corresponding page, use the `routerLink()` method, you can pass the corresponding path and parameters to be passed, or you can directly pass a path string.

```js
import { render, updateView } from 'strvejs'
import {routerLink} from 'strve-router'

export default function Home() {
    return render/*html*/`
        <div>
            <button onClick="${goAbout}">goAbout</button>
            <h1>Home</h1>
        </div>
    `
}

function goAbout() {
    routerLink({
        path: '/about',
        query: {
            id: 1,
            name: "maomin"
        }
    });
}
```

If you need to implement back and forward jump pages, several methods are also provided.

- `forward()`: Jump forward 1 page
- `back()`: Jump backward 1 page
- `go(n)`: Jump forward n pages

In addition, if you perform the operation of routing parameters, you want to get the parameter object. The object information can be obtained by directly executing the `param2Obj()` method.

Finally, we have pre-installed the project configuration for you, you can use Create Strve App to select the `strve-apps` template.