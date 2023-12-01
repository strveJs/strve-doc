# API

::: tip
For a better reading experience, the following code examples are all written using JSX syntax, except for the `html` API which is written using tag templates.
:::

## createApp

- parameter：

  - `Function`

- details：

Pass in a function, which is the template function that needs to be rendered.

```jsx
function App() {
  return <h1>Hello</h1>;
}

createApp(App).mount('#app');
```

### mount

- parameter：

  - `HTMLElement | String`

- details：

Mount the root component. This method accepts a "container" parameter, which can be an actual DOM element or a CSS selector string.

## html

- parameter：

  - `Function`

- details：

` html`` ` is a tag function. The syntax of the tag function is to directly follow the function name with a template string. For example, you can write HTML tags directly in the template string.

```js
function App() {
  return html`<h1>Hello</h1>`;
}
```

::: tip
If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plug-in,
This plugin enables HTML template string highlighting.
:::

## setData

- parameter：

  - `Function`
  - `Array` (optional)

- details：

The first parameter is a function. The function body needs to execute the value that will change the page state, such as `state.msg` in the example below.

```jsx
const state = {
  msg: '1',
};

function useChange() {
  setData(() => {
    state.msg = '2';
  });
}

function App() {
  return <p onClick={useChange}>{state.msg}</p>;
}
```

The second parameter (optional) is an array with a length of 2.

| Index | Function                                                                                   |
| ----- | ------------------------------------------------------------------------------------------ |
| 0     | The first array item is the component name that needs to be registered and must be unique. |
| 1     | The second array item is the method name of the page template being rendered.              |

::: tip
When we pass in the second parameter according to the specification, the "island feature" of the named component is automatically enabled.
:::

Let’s briefly introduce it here to have a macro understanding.

```jsx
function Home() {
  let [homeCom, render] = [registerComponent()];
  let count = 0;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () => (
    <fragment $id={homeCom}>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
      <input value={count} />
    </fragment>
  ));
}
```

You may already have some questions, but don’t worry, we will introduce every detail in the subsequent documents.

## registerComponent

- details：

Register the component name and return the unique component name.

```jsx
function Home() {
  let [homeCom, render] = [registerComponent()];
  let count = 0;

  function add() {
    setData(() => {
      count++;
    }, [homeCom, render]);
  }

  return (render = () => (
    <fragment $id={homeCom}>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
      <input value={count} />
    </fragment>
  ));
}
```

## onMounted

- parameter：

  - `Function`

- details：

Life cycle hook function: triggered when the node is mounted.

```jsx
function Home() {
  let count = 0;
  let render;

  onMounted(() => {
    console.log('HOME mount');
  });

  function add() {
    setData(() => {
      count++;
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  ));
}
```

## onUnmounted

- parameter：

  - `Function`

- details：

Life cycle hook function: called when the page is destroyed.

```js
onUnmounted(() => {
  console.log('onUnmounted!');
});
```

## nextTick

- parameter：

  - `Function`

- details：

Use it immediately after changing some data to wait for the DOM to update.

```jsx
function Home() {
  let count = 0;
  const h1Ref = Object.create(null);
  let styleColor = 'color:red';
  let render;

  function add() {
    setData(() => {
      count++;
      styleColor = 'color:green';
      nextTick(() => {
        console.log(domInfo.get(h1Ref)); // <h1 style="color:green">1</h1>
      });
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1 $ref={h1Ref} style={styleColor}>
        {count}
      </h1>
    </fragment>
  ));
}
```

## domInfo

- details：

Can get DOM information and return `WeakMap` object. An attribute can be defined in the DOM using `$ref`. The attribute value must be a reference type, usually `Object.create(null)`.

```jsx
function Home() {
  const h1Ref = Object.create(null);
  let render;

  function view() {
    nextTick(() => {
      console.log(domInfo.get(h1Ref)); // <h1>1</h1>
    });
  }

  return (render = () => (
    <fragment>
      <button onClick={view}>Btn</button>
      <h1 $ref={h1Ref}>1</h1>
    </fragment>
  ));
}
```

## version

- details：

Get the version number of Strve directly.

## createStateFlow

- details：

A lightweight state manager. The usual way is to pass in an object, and the object properties include `state`, `mutations`, and `actions`.

| Properties | Function                    |
| ---------- | --------------------------- |
| state      | store data                  |
| mutations  | Synchronized update data    |
| actions    | Asynchronous operation data |

Below we give a simple example.

```js
// store.js
import { createStateFlow } from 'strve-js';

const store = new createStateFlow({
  state: {
    count: 0,
    user: '',
  },
  // for synchronization
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  // for asynchronous
  actions: {
    fetchUser: async (context) => {
      const user = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ name: 'John Doe', age: 30 });
        }, 1000);
      });
      context.commit('setUser', user);
    },
    increment: (context) => {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    },
  },
});

export default store;
```

```jsx
// App.jsx
import { setData } from 'strve-js';
import store from './store.js';

function getUserInfo() {
  setData(() => {
    store.dispatch('fetchUser').then(() => {
      console.log(store.state.user); // { name: 'John Doe', age: 30 }
    });
  });
}

function add() {
  setData(() => {
    store.commit('increment');
  });
}

function App() {
  return (
    <fragment>
      <h1 onClick={getUserInfo}>getUserInfo</h1>
      <button onClick={add}>Add</button>
      <h1>{store.state.count}</h1>
    </fragment>
  );
}
```
