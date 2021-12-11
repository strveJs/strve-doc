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
## create-strve
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

We also briefly introduced before, Create Strve is a project construction tool based on Strve.js, you can use it to build pages more conveniently and flexibly. Create Strve is also built with [Vite](https://vitejs.dev/).

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

### 开始

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
        import StrveRouter from 'https://cdn.jsdelivr.net/npm/strve-router/dist/strve-router.esm.js';

        const state = {
            msg: 'Hello!'
        };

        const strveRouter = new StrveRouter([{
            path: '/',
            template: Home
        }, {
            path: '/about',
            template: About
        }]);

        strveRouter.routerHashUpdate(updateView, () => {
            console.log(strveRouter.param2Obj());
        });

        function Home() {
            return render`
                <div class='innter'>
                    <button onclick="${goAbout}">goAbout</button>
                    <h1>Home</h1>
                </div>
            `
        }

        function About() {
            return render`
                <div class="innter">
                    <button onclick="${goback}">goback</button>
                    <button onclick="${goHome}">goHome</button>
                    <h2>About</h2>
                </div>
            `
        }

        function App() {
            return render`
              <div class='inner'>
                <p>{state.msg}</p>
                ${strveRouter.routerView()}
              </div >
          `;
        }

        function goback() {
            strveRouter.back();
        }

        function goAbout() {
            console.log('goAbout');
            strveRouter.routerLink({
                path: '/about',
                query: {
                    id: 1,
                    name: "maomin"
                }
            });
        }

        function goHome() {
            console.log('goHome');
            strveRouter.routerLink('/');
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

If you use it in a modular project, you can introduce the StrveRouter object and then instantiate it. The parameter is the routing component that needs to be registered, the `path` attribute represents the path, and the `template` attribute represents the imported component.

The page that matches the corresponding path will be updated accordingly, so a `routerHashUpdate()` method must be registered here, and then the first parameter is passed to the `updateView` API, and the second parameter is a custom method. Finally, export the strveRouter instance.

For example, here is an `index.js` file created in a router folder.

```js
import StrveRouter from 'strve-router';
import {updateView} from 'strvejs';

import Home from '../template/homepage.js';
import About from '../template/aboutpage.js';

const strveRouter = new StrveRouter([{
    path: '/',
    template: Home
}, {
    path: '/about',
    template: About
}]);

strveRouter.routerHashUpdate(updateView,()=>{
    console.log('router');
});

export default strveRouter
```

The components matched by the route will be rendered to the place where the `routerView()` method is located, usually under the main page entry file (for example, `App.js`).

```js
import { render } from 'strvejs';
import strveRouter from './router/index';
function template() {
  return render`
        <div class='inner'>
        ${strveRouter.routerView()}
        </div>
    `;
}

export default template;
```

If you need to jump to the corresponding page, use the `strveRouter.routerLink()` method to pass the corresponding path and the parameters that need to be passed, or you can pass a path string directly.

```js
import { render } from 'strvejs'
import strveRouter from '../router/index.js'

function Home(){
    return render`
        <div>
            <button onclick="${goAbout}">goAbout</button>
            <h1>Home</h1>
        </div>
    `
}

function goAbout(){
    strveRouter.routerLink({
        path: '/about',
        query: {
            id: 1,
            name: "maomin"
        }
    });
}

export default Home
```

Finally, if you need to implement back and forward jump pages, several methods are also provided.

- `strveRouter.forward()`: Jump forward 1 page
- `strveRouter.back()`: Jump backward 1 page
- `strveRouter.go(n)`: Jump forward n pages