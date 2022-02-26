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

Strve Router is the official route manager for Strve.js. It is deeply integrated with the core of Strve.js, making it easy to build single-page applications.

Currently only Hash mode is supported.

### Started

The easiest way to try Strve Router is to use a direct import CDN link. You can open it in your browser and follow the example to learn some basic usage.

If you use Strve Router directly in your local browser, you need to enable the local server. Please note that when the server is opened, the default trailing address is `/index.html`, please delete the `index.html` field, that is, change it to `/`.

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
        import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs@2.3.4/dist/strve.esm.min.js';
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
                <button onClick="${goAbout}">goAbout</button>
                <h1>Home</h1>
            `
        }

        function About() {
            return render`
                <button onClick="${goback}">goback</button>
                <button onClick="${goHome}">goHome</button>
                <h2>About</h2>
            `
        }

        function App() {
            return render`
                <div class="inner">
                    <p>${state.msg}</p>
                    <div>
                        ${router.routerView()}
                    </div>
                </div>
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

        Strve('#app', App);
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

If you use it in a project, you can introduce the `StrveRouter` method. The parameter is an array object, which is the routing component to be registered. The `path` property represents the path of the component, and the `template` property represents the imported component.

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

The components matched by the route will be rendered to the place where the `routerView()` method is located, which is usually placed under the main page entry file (such as `App.js`).

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

There are also several methods provided if you need to perform operations such as backward and forward jumping pages.

- `forward()`: jump forward 1 page
- `back()`: jump back 1 page
- `go(n)`: jump forward n pages

In addition, if you perform the operation of routing parameters, you want to get the parameter object. Object information can be obtained by directly executing the `param2Obj()` method.

Finally, we have pre-installed the project configuration for you, you can use Create Strve App to select the `strve-apps` template.

