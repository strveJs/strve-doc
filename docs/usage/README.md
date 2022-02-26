# Usage

## API
### Strve

- parameter：
    - `string`
    - `function`

- detailed：

Initialize Strve.js. The first parameter passes in the name of the node selector that needs to be mounted on the HTML page. The second parameter passes in a function, which is the template function that needs to be rendered.

```js
function App() {
    return render`
        <h1>Hello</h1>
    `
}

Strve('#app', App);
```
### render

- parameter：`function`
- detailed：

` render`` ` is a label function, the syntax of the label function is a template string directly after the function name. For example, you can write HTML tags directly in the template string.

```js
function App() {
    return render`
        <div class='inner'>
            <h1>Hello</h1>
        </div >
    `;
}
```

If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plugin, then, in Add `/*html*/` in the middle of `render`` `.

Just like that, in the VSCode editor, this plugin can make HTML template characters highlighted.

![](./../.vuepress/public/img/code1.png)

### updateView

- parameter：
    - `function`
    - `string`(optional)
- detailed：
  
The first parameter is a function. The function body needs to execute values that will change the state of the page, such as `state.msg` in the following example.

```js
const state = {
    msg:'1'
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${useChange}>change</button>
            <p>${state.msg}</p>
        </div >
    `;
}

function useChange() {
    updateView(() => {
        state.msg = '2';
    });
}
```
The second parameter is a string type. When you use a list to render the page, inserting data at the head of the list needs to bind the `useFkey` field to avoid repeated rendering of the `DOM` node.

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

- parameter：
    - `string`
    - `dictionary`
    - `string`

- detailed：

Custom events are generally used to transfer data from child components to parent components. The first argument is a string representing the name of the `event`.
The second parameter is a dictionary type parameter.
- "detail": The optional default value is `null` for any type of data, which is a value associated with `event`.
- "bubbles": A boolean value indicating whether the event can bubble. from `EventInit`. Note: Test chrome is not bubbling by default.
- "cancelable": A boolean value indicating whether the event can be canceled.

The third parameter is a string type, mainly the name of the node selector, where the node refers to the DOM node wrapped by the child component in the parent component.

E.g:

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

- detailed：
  
No parameters, directly get the version number of Strve.js.

### watchDOMChange

- parameter：
    - `string`
    - `object`
    - `function`

- detailed：

Has the ability to monitor changes made to the DOM tree. The first parameter is a string type, which is the name of the node used for monitoring; the second parameter is a configuration object, the specific configuration is the same as [MutationObserver](https://developer.mozilla.org/en-US/docs/Web /API/MutationObserver); the third parameter is a callback function.

In addition, two methods are provided, namely the start monitoring method `start()` and the stop monitoring method `stop()`.

```js
const config = {
    attributes: true, 
    childList: true, 
    subtree: true, 
    childList: true, 
    characterDataOldValue: true, 
    characterData: true
}

const domChange = watchDOMChange('.watch-dom', config, (v) => console.log(v, 'changed'));

domChange.start();
domChange.stop();
```
### deepCloneData

- parameter：
    - `object`

- detailed：

Creates a new object to accept the object value to be recopied or referenced.

The original object is completely copied from the memory to the new object, and a new space is opened up from the heap memory to store the new object, and the modification of the new object will not change the original object, and the two achieve real separation.

```js
function App() {

    const sourceData = {
        msg: 'App'
    }

    let state = deepCloneData(sourceData);

    function template() {
        return render`
            <button onClick=${useChange}>Change</button>
            <p>${state.msg}</p>
    `
    }

    function useChange() {
        updateView(() => {
            state.msg = 'Hello';
        })
    }

    return { template }
}
```
## Data binding

Strve.js uses a JavaScript-based template string syntax that allows developers to declaratively bind the DOM to the underlying instance data. All Strve.js template strings are valid HTML, so can be parsed by spec-compliant browsers and HTML parsers.

Under the hood, Strve.js compiles template strings into virtual DOM rendering functions and minimizes the number of DOM manipulations.

In Strve.js, you can use JavaScript template strings to your heart's content and feel its unique charm!

### Text

The form of text binding in data binding is to use the notation `${}`.

```js
const state = {
    msg: 'hello'
};

function App() {
    return render`
        <h1>${state.msg}</h1>
    `;
}
```
<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="podPpXZ" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/podPpXZ">
  Strve.js-数据绑定(文本)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

### Expression

Use expressions in the notation `${}`.

```js
const state = {
    a: 1,
    b: 2
};

function App() {
    return render`
        <h1>${state.a + state.b}</h1>
    `;
}
```
<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOmMRJ" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOmMRJ">
  Strve.js-数据绑定(表达式)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## Property binding

Use the notation `${}` to bind a value to the property `value`.

```js
const state = {
  msg:'Hello'
};

function App() {
    return render`
        <input type="text" value=${state.msg}/>
    `;
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="JjOLjKa" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/JjOLjKa">
  Strve.js-属性绑定(value)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

In addition, you can also bind other properties, such as `class`.

```js
const state = {
   isRed: true,
   msg:'Hello'
};

function App() {
    return render`
        <h1 class=${state.isRed ? 'red' : ''}>${state.msg}</h1>
`;
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="mdqxdRb" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/mdqxdRb">
  Strve.js-属性绑定(class)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

If you want to bind the `style` property, you can too.

```js
const state = {
    msg: 'Hello',
    style: {
        color: 'red',
        fontSize: "40px"
    }
};
function App() {
    return render`
        <p style="${state.style}">${state.msg}</p>
    `;
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOVWoO" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOVWoO">
  Strve.js-属性绑定(style)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## Conditional rendering

Using the notation `${}`, the block will only be rendered if the directive's expression returns a `true` value.

```js
const state = {
    isShow: false
};

function App() {
    return render`
        <button onClick=${useShow}>show</button>
        ${state.isShow ? render`<p>Strve.js</p>` : ''}
    `;
}

function useShow() {
    updateView(() => {
        state.isShow = !state.isShow;
    });
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="dyZmyzE" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/dyZmyzE">
  Strve.js-条件渲染</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## List rendering

We can render a list based on an array using the notation `${}`. For example, we use the `map` method of arrays to render lists, and we can dynamically add array items.

```js
const state = {
    arr: [1, 2]
};

function App() {
    return render`
        <button onClick=${usePush}>push</button>
        <ul>
          ${state.arr.map((todo) => render`<li>${todo}</li>`)}
        </ul>
    `;
}

function usePush() {
    updateView(() => {
        state.arr.push(3);
    });
}

```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="NWwYWYp" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/NWwYWYp">
  Strve.js-列表渲染</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

We mentioned above that `updateView()` can pass in the second parameter, which is a string type. When using a list to render a page, if you insert data at the head of the list, you need to bind the `useFkey` field to avoid `DOM `Nodes are rendered repeatedly, which is a must. Any actions that operate on the head of the list, such as `unshift`, `pop` array methods, need to add this `useFkey` field. This is not required for other operations and has been optimized internally.

```js
const state = {
    arr: [1, 2]
};

function Home() {
    return render`
            <button onClick=${useUnshift}>unshift</button>
            <ul>
                ${state.arr.map((item) => render`<li>${item}</li>`)}
            </ul>
    `
}

function useUnshift() {
    updateView(() => {
        state.arr.unshift(2);
    }, 'useFkey')
}
```

## Event handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event is fired. We recommend using this camelCase `onClick` method.

Also, you need to use the notation `${}` to bind events.

```js
function App() {
    return render`
        <button onClick=${useClick}>${state.msg}</button>
    `;
}

function useClick() {
    alert('hello');
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="dyZmyex" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/dyZmyex">
  Strve.js-事件处理</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## Paired with Vue.js
Strve.js can be used not only alone, but also with [Vue.js]('https://v3.vuejs.org/'). You need to call the `Strve()` registration method after the Vue instance is mounted, and the first parameter already exists in the `template` tag.

**App.vue**
```html
<template>
  <div id="container">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld ,{ hello } from './components/HelloWorld.vue';
import { about } from './components/About.vue';
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
    Strve("#container", AppTm);
  },
};
</script>
```
If you need to share a method with Vue, it is recommended to use it in the `setup` method.

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
    console.log('hello');
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
If you want to use Strve.js entirely in your Vue components, of course you can. But in the end, it is recommended to use `export default` to export the component name.

**About.vue**
```html
<script>
import { render, updateView } from "strvejs";
import styles from '../assets/about/about.module.css';

const state = {
    msg:"hello"
}

export const about = ()=>render`
   <p>${state.msg}</p>
   <h2 class="${styles.color}" onClick=${useClick}>about</h2>
`

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

## Paired with React.js
Strve.js is more flexible to use with [React.js]('https://reactjs.org/') than [Vue.js]('https://v3.vuejs.org/') . It is also necessary to call the `Strve()` method registration method after the first rendering of the component is completed.

**App.js**
```js
import {useEffect} from 'react'
import {Strve,render,updateView} from 'strvejs';
import './App.css';

const state = {
  msg:"Hello"
}

function Home(){
  return render`<h1 onClick=${useClick}>${state.msg}</h1>`
}

function useClick(){
  updateView(()=>{
    state.msg = "World";
  })
}

function App() {
  useEffect(()=>{
    Strve(".App", Home)
  })
  return (<div className="App"></div>);
}

export default App;
```