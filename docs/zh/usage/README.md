# 使用

## API
### Strve

- 参数：
    - `string`
    - `object`

- 详细：

初始化Strve.js。第一个参数传入需要挂载到HTML页面的节点选择器名称。第二个参数传入一个对象，第一个属性`data`表示的意思是状态对象，第二个属性`template`表示模板函数。

```js
Strve('#app', {
    data: { state },
    template: App
});
```
### render

- 类型：`function`
- 详细：

` render`` ` 是一个标签函数，标签函数的语法是函数名后面直接带一个模板字符串，并从模板字符串中的插值表达式中获取参数。比如说，你可以在模板字符串中直接可以写HTML标签。

但是需要特别说明的是，每个视图模板必须仅有一个根节点。

```js
function App() {
    return render`
        <div class='inner'>
            <h1>Hello</h1>
        </div >
    `;
}
```

如果你使用的是VSCode编辑器，你可以去商店里下载`comment-tagged-templates`插件，然后，在` render`` ` 中间加上`/*html*/` 。

就像这样，它可以使HTML标签字符高亮显示。

```js
function App() {
    return render/*html*/`
        <div class='inner'>
            <h1>Hello</h1>
        </div >
    `;
}
```
### updateView

- 参数：
    - `function`
    - `string`(可选)
- 详细：
  
第一个参数是一个函数。函数体中需要执行将改变页面状态的值，例如以下示例中的`state.msg`。

```js
const state = {
    msg:'1'
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${useChange}>change</button>
            <p>{state.msg}</p>
        </div >
    `;
}

function useChange() {
    updateView(() => {
        state.msg = '2';
    });
}
```
第二个参数是字符串类型，在当你使用列表渲染页面时，在列表头部插入数据需要绑定`useFkey`字段，以避免`DOM`节点重复渲染。

```js
const state = {
    arr: [1, 2]
};

function Home() {
    return render`
        <div class='inner'>
            <button onClick=${useUnshift}>unshift</button>
            <ul>
                ${state.arr.map((item) => render`<li>${item}</li>`)}
            </ul>
        </div>
    `
}

function useUnshift() {
    updateView(() => {
        state.arr.unshift('2');
    }, 'useFkey')
}
```

### emitEvent

- 参数：
    - `string`
    - `dictionary`
    - `string`

- 详细：

自定义事件，一般是用于子组件数据传入父组件。第一个参数是表示 `event` 名字的字符串。
第二个参数一个字典类型参数。
- "detail"，可选的默认值是 null 的任意类型数据，是一个与 event 相关的值。
- bubbles 一个布尔值，表示该事件能否冒泡。 来自 EventInit。注意：测试chrome默认为不冒泡。
- cancelable 一个布尔值，表示该事件是否可以取消。

第三个参数是一个字符串类型，主要是节点选择器的名称，这里的节点指的是子组件在父组件中外层包裹的DOM节点。

例如：

```js
function Component1(v) {
    return render`
        <h1 onClick=${emitData}>${v}</h1>
    `
}

function emitData() {
    emitEvent('getTit', {
        detail: { title: 'This is title!' },
    }, '.component1')
}

function App() {
    return render`
        <div class='inner'>
            <div onGetTit=${getTit} class="component1">
            ${Component1(state.msg)}
            </div>
        </div >
    `;
}

function getTit(event) {
    updateView(() => {
        console.log(event.detail.title);
        state.msg = event.detail.title;
    })
}
```

### strveVersion

- 详细：
  
无参数，直接获取Strve.js的版本号。

## 插值

Strve.js 使用了基于 JavaScript 的模板字符串语法，允许开发者声明式地将 DOM 绑定至底层实例的数据。所有 Strve.js 的模板字符串都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Strve.js 将模板字符串编译成虚拟 DOM 渲染函数，并把 DOM 操作次数减到最少。

在Strve.js中，你可以尽情的使用JavaScript 的模板字符串，感受它独特的魅力吧！

### 文本

数据绑定最常见的形式就是使用符号`${}`的文本插值：

```js
const state = {
    msg: 'hello'
};

function App() {
    return render`
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

另外你还可以使用更简便的方法符号`{}`，同样可以达到预想的效果。

```js
const state = {
    msg: 'hello'
};

function App() {
    return render`
        <div class='inner'>
            <p>{state.msg}world</p>
        </div >
    `;
}
```
但是，使用这种符号`{}`需要注意的是，它只适用于标签内的文本插值。例如如下这种情况，它是不起作用的，不过你可以使用强大的符号`${}`。

```js
// Bad
function App() {
    return render`
        <div class='inner'>
            <input type="text" value={state.msg}/>
        </div >
    `;
}

// Good
function App() {
    return render`
        <div class='inner'>
            <input type="text" value=${state.msg}/>
        </div >
    `;
}
```

### 表达式

目前仅支持在符号`${}`中使用表达式。

例如：

```js
const state = {
    a: 1,
    b: 2
};

function App() {
    return render`
        <div class='inner'>
            <p>${state.a + state.b}</p>
        </div >
    `;
}
```

## 属性绑定

前面，我们可以看到使用符号`${}`可以与属性`value`绑定值。

```js
function App() {
    return render`
        <div class='inner'>
            <input type="text" value=${state.msg}/>
        </div >
    `;
}
```

另外，你还可以绑定其他属性，例如`class`。

```js
const state = {
    isRed: true
};

function App() {
    return render`
    <div class='inner'>
        <p class=${state.isRed ? 'red' : ''}>Strve.js</p>
    </div >
`;
}
```

如果你想绑定`style`属性，同样也可以。

```js
const state = {
    msg: 'hello',
    style: {
        color: 'red',
        fontSize: "40px"
    }
};
function App() {
    return render`
        <div class='inner'>
            <p style="${state.style}">{state.msg}</p>
        </div >
    `;
}
```

## 条件渲染

我们也可以使用符号`${}`，这块内容只会在指令的表达式返回 `true` 值的时候被渲染。

```js
const state = {
    isShow: false
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${useShow}>show</button>
            ${state.isShow ? render`<p>Strve.js</p>` : ''
        }
        </div >
    `;
}

function useShow() {
    updateView(() => {
        state.isShow = !state.isShow;
    });
}
```

## 列表渲染

我们可以用符号`${}`基于一个数组来渲染一个列表。比如我们使用数组的`map`方法来渲染列表，并且可以动态添加数组项。

```js
const state = {
    arr: ['1', '2']
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${usePush}>push</button>
            <ul>
            ${state.arr.map((todo) => render`<li>${todo}</li>`)}
            </ul>
        }
        </div >
    `;
}

function usePush() {
    updateView(() => {
        state.arr.push('3');
    });
}

```

上面我们提到`updateView()`可以传入第二个参数，它是字符串类型，在使用列表渲染页面时，如果在列表头部插入数据则需要绑定`useFkey`字段，以避免`DOM`节点重复渲染，这是必须要做的。任何在列表头部操作的动作，如`unshift`、`pop`数组方法都需要加上这个`useFkey`字段。其他操作则不需要这样，内部已经进行了优化。

```js
const state = {
    arr: [1, 2]
};

function Home() {
    return render`
        <div class='inner'>
            <button onClick=${useUnshift}>unshift</button>
            <ul>
                ${state.arr.map((item) => render`<li>${item}</li>`)}
            </ul>
        </div>
    `
}

function useUnshift() {
    updateView(() => {
        state.arr.unshift('2');
    }, 'useFkey')
}
```

## 事件处理

我们可以使用`on`指令来监听 DOM 事件，并在触发事件时执行一些 JavaScript。我们推荐使用这种`onClick`驼峰式命名方法，当然，直接使用`onclick`这种全小写方式也可以。

需要使用符号`${}`来绑定事件。

```js
function App() {
    return render`
        <div class='inner'>
            <button onClick=${useClick}>sayHello</button>
        }
        </div >
    `;
}

function useClick() {
    console.log('hello');
}
```

## 与Vue.js搭配
Strve.js不仅可以单独使用，也可以与[Vue.js]('https://v3.vuejs.org/')搭配使用。你需要在Vue实例挂载完成后被调用`Strve()`注册方法，并且第一个参数已经在`template`标签中存在。

**App.vue**
```html
<template>
  <div id="container">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld ,{hello} from './components/HelloWorld.vue';
import { about,state } from './components/About.vue';
import { render, Strve } from "strvejs";
const AppTm = () => render`
      <div>
        ${hello()}
        ${about()}
      </div>
`;
export default {
  name: "App",
  components:{
    HelloWorld
  },
  mounted() {
    Strve("#container", {
      data: {state},
      template: AppTm,
    });
  },
};
</script>
```
如果需要与Vue共享一个方法，推荐在`setup`方法中使用。

**HelloWorld.vue**
```html
<template>
  <div>
    <img src="../assets/logo.png" alt="" @click="useCliimg">
  </div>
</template>
<script>
import { render } from "strvejs";
import styles from '../assets/hello/hello.module.css';

export const hello = ()=>render`
<h2 class="${styles.color}" onClick=${useCliimg}>hello</h2>
`
function useCliimg(){
    console.log(1);
}

export default {
  name:'HelloWorld',
  setup(){
    return {
      useCliimg
    }
  }
}
</script>

```
如果，你想在Vue组件中完全使用Strve.js，当然也可以。不过最后，推荐使用`export default`导出组件名。

**About.vue**
```html
<script>
import { render, updateView } from "strvejs";
import styles from '../assets/about/about.module.css';

export const about = ()=>render`
<div>
    <p>{state.msg}</p>
   <h2 class="${styles.color}" onClick=${useClick}>about</h2>
</div>
`
export const state = {
    msg:"hello"
}

function useClick() {
    updateView(()=>{
        state.msg = 'world';
    })
}
export default {
    name:"About"
}
</script>

```

## 与React.js搭配
Strve.js与[Vue.js]('https://v3.vuejs.org/')搭配相比，与[React.js]('https://reactjs.org/')搭配使用更为灵活。同样需要在组件第一次渲染完成后调用`Strve()`方法注册方法。

**App.js**
```js
import {useEffect} from 'react'
import {Strve,render,updateView} from 'strvejs';
import './App.css';

const state = {
  msg:"Hello"
}

function Home(){
  return render`<h1 onClick=${useClick}>{state.msg}</h1>`
}

function useClick(){
  updateView(()=>{
    state.msg = "World";
  })
}

function App() {
  useEffect(()=>{
    Strve(".App",{
      data:{state},
      template: Home
    })
  })
  return (<div className="App"></div>);
}

export default App;
```