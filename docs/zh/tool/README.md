# 工具

## create-strve-app
<a href="https://npmjs.com/package/create-strve-app"><img src="https://badgen.net/npm/v/create-strve-app" alt="npm package"></a>

一套快速搭建Strve.js项目的命令行工具。与早期的脚手架 Create Strve 相比，Create Strve App 更胜一筹，可直接输入命令快速创建Strve项目。Create Strve App是用[Vite](https://vitejs.dev/)来构建的，它是一种新型前端构建工具，能够显著提升前端开发体验。
### 搭建你的第一个 Strve 项目

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

### 选择模板

你可以根据自己的需要选择对应的模板。

- strve

只包含Strve.js基本使用的功能。此模板适用于项目中仅仅单页面，没有跳转其他页面的应用。

- strve-apps

不仅包含了Strve.js的基本使用的功能，而且还包含了Strve Router，适用于跳转多页面以及稍微复杂的应用。

## create-strve
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

在前面我们也简单介绍过，Create Strve是基于Strve.js的项目构建工具，您可以使用它更方便灵活地搭建页面。Create Strve同样是用[Vite](https://vitejs.dev/)来构建的。

不过，在这里推荐使用Create Strve App，它相对安装更加灵活以及快速。

### 安装

**全局安装**

```shell
npm install create-strve -g
```

**查看版本**
```shell
create-strve -v
```

**初始化项目**
```shell
create-strve init <projectName>
```

## strve-router
<a href="https://npmjs.com/package/strve-router"><img src="https://badgen.net/npm/v/strve-router" alt="npm package"></a>

Strve Router 是 Strve.js 的官方路由管理器。 它与 Strve.js 的核心深度集成，可以轻松构建单页应用程序。

目前只支持Hash模式。

### 开始

尝试 Strve Router 最简单的方法是使用直接导入 CDN 链接。 您可以在浏览器中打开它并按照示例学习一些基本用法。

如果在本地浏览器中直接使用Strve Router，则需要启用一下本地服务器。请注意，服务器打开时，默认尾部地址是`/index.html`，请删除`index.html`字段，即改成`/`。

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
        import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs@2.3.3/dist/strve.esm.min.js';
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

### 安装

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

### 使用

如果在一个项目工程中使用它，可以引入`StrveRouter`方法。参数是是一个数组对象，它是需要注册的路由组件，`path`属性代表组件的路径，`template`属性代表引入的组件。

匹配到相应的路径页面会相应的更新，所以这里必须注册一个`routerHashUpdate()`方法，然后第一个参数传入`updateView`API，第二个参数则是一个自定义方法。

比如这里在一个router文件夹下创建一个`index.js`文件。

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

 路由匹配到的组件将渲染到`routerView()`方法所在的地方，一般会放在主页面入口文件下（例如`App.js`）。

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

如果需要跳转到对应页面，使用`routerLink()`方法，可以传对应的路径和需要传的参数，也可以直接传一个路径字符串。

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

如果你需要实现后退、前进跳转页面这样操作时，同样提供了几个方法。

- `forward()`: 向前跳转1个页面
- `back()`: 向后跳转1个页面
- `go(n)`: 向前跳转n个页面

另外，如果你执行了路由传参的操作，想获取参数对象。直接执行`param2Obj()`方法就可以获取对象信息。

最后，我们已经给你预装了项目配置，你可以使用Create Strve App选择`strve-apps`模板即可。

