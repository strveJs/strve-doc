# Usage

## API
### Strve

- Parameter:
    - `string`
    - `object`

- Detailed:

Initialize Strve.js. The first parameter is the name of the node selector that needs to be mounted to the HTML page. The second parameter is passed in an object, the first attribute `data` means the state object, and the second attribute `template` means the template function.

```js
Strve('#app', {
    data: { state },
    template: App
});
```
### render

- Type:`function`
- Detailed:

`render`` ` is a label function. The syntax of the label function is to directly follow the function name with a template string and get the parameters from the interpolation expression in the template string. For example, you can write HTML tags directly in the template string.

```js
function App() {
    return render`
        <div class='inner'>
            <h1>Hello</h1>
        </div >
    `;
}
```

If you are using the VSCode editor, you can go to the store and download the `comment-tagged-templates` plugin, then add `/*html*/` in the middle of `render` .

Just like that, it can make HTML tag characters highlighted.

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

- Parameter:
    - `function`
    - `string` (optional)
- Detailed:
  
The first parameter is a function. The function body needs to execute values that will change the state of the page, such as `state.msg` in the following example.

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

- Parameter:
    - `string`
    - `dictionary`
    - `string`

- Details:

Custom events are generally used to transfer data from child components to parent components. The first argument is a string representing the name of the `event`.
The second parameter is a dictionary type parameter.
- "detail", an optional default value of null for any type of data, an event-related value.
- bubbles A boolean indicating whether the event can bubble. from EventInit. Note: Test chrome is not bubbling by default.
- cancelable A boolean indicating whether the event can be canceled.

The third parameter is a string type, mainly the name of the node selector, where the node refers to the DOM node wrapped by the child component in the parent component.

For example:

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
## Interpolation

Strve.js uses JavaScript-based template string syntax, allowing developers to declaratively bind the DOM to the data of the underlying instance. All template strings of Strve.js are legal HTML, so they can be parsed by browsers and HTML parsers that follow the specification.

In the underlying implementation, Strve.js compiles the template string into a virtual DOM rendering function and minimizes the number of DOM operations.

In Strve.js, you can use JavaScript template strings to your heart's content and feel its unique charm!

### Text

The most common form of data binding is text interpolation using the symbol `${}`:

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

In addition, you can also use the more convenient method symbol `{}`, which can also achieve the desired effect.

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
However, the use of this symbol `{}` needs to be noted that it is only suitable for text interpolation within the label. For example, in the following situation, it does not work, but you can use the powerful symbol `${}`.

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

### Expression

Currently, only expressions in the symbol `${}` are supported. 

E.g:

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

## Property binding

Earlier, we can see that the use of the symbol `${}` can bind the value to the property `value`.

```js
function App() {
    return render`
        <div class='inner'>
            <input type="text" value=${state.msg}/>
        </div >
    `;
}
```

In addition, you can also bind other attributes, such as `class`.

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
If you want to bind the `style` property, you can too.

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
## Conditional rendering

We can also use the symbol `${}`, this piece of content will only be rendered when the expression of the instruction returns a value of `true`.

```js
const state = {
    isShow: false
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${useShow}>show</button>
            ${state.isShow ? render`<p>Strve.js</p>` : ''}
        </div >
    `;
}

function useShow() {
    updateView(() => {
        state.isShow = !state.isShow;
    });
}
```

## List rendering

We can use the symbol `${}` to render a list based on an array. For example, we use the `map` method of arrays to render the list, and we can add array items dynamically.

```js
const state = {
    arr: ['1', '2']
};

function App() {
    return render`
        <div class='inner'>
            <button onClick=${usePush}>push</button>
            <ul>
            ${state.arr.map((todo) => render`<li key=${todo}>${todo}</li>`)}
            </ul>
        </div >
    `;
}

function usePush() {
    updateView(() => {
        state.arr.push('3');
    });
}

```

We mentioned above that `updateView()` can pass in the second parameter, which is a string type. When using a list to render a page, if you insert data at the head of the list, you need to bind the `useFkey` field to avoid `DOM `Nodes are rendered repeatedly, which is a must. Any actions that operate on the head of the list, such as `unshift`, `pop` array methods, need to add this `useFkey` field. This is not required for other operations and has been optimized internally.

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

## Event handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event is fired. We recommend using this `onClick` camel case naming method, of course, you can also use `onclick` directly in all lowercase.

You need to use the notation `${}` to bind events.

```js
function App() {
    return render`
        <div class='inner'>
            <button onclick=${useClick}>sayHello</button>
        </div >
    `;
}

function useClick() {
    console.log('hello');
}
```
## Pair with Vue.js
Strve.js can be used not only alone, but also with [Vue.js]('https://v3.vuejs.org/'). You need to call the `Strve()` registration method after the Vue instance is mounted, and the first parameter already exists in the `template` tag.

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
If you want to fully use Strve.js in Vue components, of course you can. But in the end, it is recommended to use `export default` to export component names.

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

## Pair with React.js
Compared with the combination of Strve.js and [Vue.js]('https://v3.vuejs.org/'), it is better to use it with [React.js]('https://reactjs.org/') For flexibility. It is also necessary to call the `Strve()` method registration method after the first rendering of the component is completed.

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