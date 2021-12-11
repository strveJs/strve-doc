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
## create-strve
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

在前面我们也简单介绍过，Create Strve是基于Strve.js的项目构建工具，您可以使用它更方便灵活地搭建页面。Create Strve同样是用[Vite](https://vitejs.dev/)来构建的。

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

如果在一个模块化工程中使用它，可以引入StrveRouter对象，然后实例化。参数是需要注册的路由组件，`path`属性代表路径，`template`属性代表引入的组件。

匹配到相应的路径页面会相应的更新，所以这里必须注册一个`routerHashUpdate()`方法，然后第一个参数传入`updateView`API，第二个参数则是一个自定义方法。最后导出strveRouter实例。

比如这里在一个router文件夹下创建一个`index.js`文件。

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

 路由匹配到的组件将渲染到`routerView()`方法所在的地方，一般会放在主页面入口文件下（例如`App.js`）。

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

如果需要跳转到对应页面，使用`strveRouter.routerLink()`方法，可以传对应的路径和需要传的参数，也可以直接传一个路径字符串。

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

最后，如果你需要实现后退、前进跳转页面这样操作时，同样提供了几个方法。

- `strveRouter.forward()`: 向前跳转1个页面
- `strveRouter.back()`: 向后跳转1个页面
- `strveRouter.go(n)`: 向前跳转n个页面