# Usage

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

## Data Binding

Strve allows developers to declaratively bind the DOM to the underlying instance's data.

### Text

The form of text binding in data binding is to use the symbol `{}`.

```jsx
const state = {
	msg: 'Hello',
};

function App() {
	return h1>{state.msg}</h1>
}
```

### Expression

Use expressions within the notation `{}`.

```jsx
const state = {
	a: 1,
	b: 2,
};

function App() {
	return <h1>{state.a + state.b}</h1>
}
```

## Property Binding

Use the notation `{}` to bind a value to the property `value`.

```jsx
const state = {
	msg: 'Hello',
};

function App() {
	return <input type="text" value=${state.msg}/>
}
```

Additionally, you can bind other properties such as `class`.

```jsx
const state = {
	isRed: true,
	msg: 'Hello',
};

function App() {
	return <h1 class={state.isRed ? 'red' : ''}>{state.msg}</h1>
}
```

If you want to bind the `style` property, you can too.

```jsx
const state = {
	msg: 'Hello',
	style: {
		color: 'red',
		fontSize: '40px',
	},
};

function App() {
	return <p style={state.style}>{state.msg}</p>
}
```

## Conditional Rendering

Using the notation `{}`, the label will only be displayed if the expression of the directive returns a `true` value.

```jsx
const state = {
  isShow: true,
};

function useShow() {
  setData(() => {
    state.isShow = !state.isShow;
  });
}

function App() {
  return (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Strve.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

## List Rendering

Use the notation `{}` to render an array-based list, and use the array's `map` method to return an array.

```jsx
const state = {
  arr: [1, 2],
};

function usePush() {
  setData(() => {
    state.arr.push(3);
  });
}

function App() {
  return (
    <fragment>
      <button onClick={usePush}>push</button>
      <ul>
        {state.arr.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </fragment>
  );
}
```

::: warning
Child elements under the same parent element must have unique keys. Duplicate keys will cause rendering exceptions. The special attribute key is mainly used as a hint for Strve's virtual DOM algorithm, and is used to identify vnode when comparing the old and new node lists.
:::

## Event Handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event fires. We recommend using this camelCase naming method, such as `onClick`.

Additionally, you need to use the notation `{}` to bind events.

```jsx
const state = {
  msg: 'sayHello',
};

function useClick() {
  alert('hello');
}

function App() {
  return (
    <fragment>
      <button onClick={useClick}>{state.msg}</button>
    </fragment>
  );
}
```

## Named Component

Strve applications are composed of components. A component is a part of a UI (user interface) that has its own logic and appearance. Components can be as small as a button or as large as an entire page.

In Strve, a component is a function. If you give it a unique and specific name, then it is called a named component.

```jsx
import { setData, registerComponent } from 'strve-js';

export const MyComponent = registerComponent('MyComponent');

export function myComponent() {
  let count = 1;
  let render;

  function add() {
    setData(() => {
      count++;
    }, [MyComponent, render]);
  }

  return (render = () => (
    <fragment>
      <h1 onClick={add}>{count}</h1>
    </fragment>
  ));
}
```
We encapsulate a `myComponent` component, and the component name is `MyComponent`. This component name should be unique. So, where do we reuse or use components?

```jsx
import { createApp, setData } from 'strve-js';
import { myComponent, MyComponent } from './myComponent';

function App() {
  let render;

  return (render = () => (
    <fragment>
	  <h1>App</h1>
      <component $name={myComponent}>{myComponent()()}</component>
    </fragment>
  ));
}

createApp(App()).mount('#main');
```

The internal rendering system of Strve is built based on virtual DOM. Virtual DOM (Virtual DOM, referred to as VDOM) is a programming concept, which means to "virtually" represent the UI required by the target through a data structure and save it in the memory. Then use the Diff algorithm to compare the old and new data and synchronize the real DOM with it.

If the virtual DOM tree is too large and the Diff calculation time is greater than 16.6ms, it may cause performance lag. One feature of named components is "isolated islands". What is an "isolated island"? An isolated island can be understood as an independent module in the Strve application. Decompose a huge virtual DOM tree into many independent modules, so that the Diff calculation time will be controlled at the module level, greatly reducing the calculation time and improving performance.

::: tip
Complying with the coding standards of named components, Strve will automatically start modular and accurate updates of components internally.
:::

## Built-in Properties

### $ref

The `$ref` attribute can reference a DOM element. It is used to reference other elements within a component or DOM element.

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

### $name

This attribute needs to be used on the built-in tag `component` to represent the internal component name. Can be an object or array.

```jsx
import { myComponent, MyComponent } from './myComponent';

function App() {
  let render;

  return (render = () => (
    <fragment>
	  <h1>App</h1>
      <component $name={myComponent}>{myComponent()()}</component>
    </fragment>
  ));
}
```
```jsx
import { myComponent, MyComponent, MyComponent1 } from './myComponent';

function App() {
  let render;

  return (render = () => (
    <fragment>
	  <h1>App</h1>
      <component $name={[myComponent,MyComponent1]}>{myComponent()()}</component>
    </fragment>
  ));
}
```

## Built-in Tags

### component

Component placeholder tag, which wraps a component within the tag.

```jsx
import { createApp, setData } from 'strve-js';
import { myComponent, MyComponent } from './myComponent';

function App() {
  let render;

  return (render = () => (
    <fragment>
	  <h1>App</h1>
      <component $name={myComponent}>{myComponent()()}</component>
    </fragment>
  ));
}

createApp(App()).mount('#main');
```

### null

Placeholder tags will not be rendered into the page.

```jsx
const state = {
  isShow: true,
};

function useShow() {
  setData(() => {
    state.isShow = !state.isShow;
  });
}

function App() {
  return (
    <fragment>
      <button onClick={useShow}>show</button>
      <div>{state.isShow ? <p>Strve.js</p> : <null></null>}</div>
    </fragment>
  );
}
```

### fragment

Create a document fragment tag. It is not part of the real DOM tree, its changes will not trigger a re-rendering of the DOM tree, and will not have an impact on performance.

::: warning
There is only one root component, so you will see it used as the root component in many places in the documentation.
:::

```jsx
const state = {
  x: 0,
  y: 0,
};

function App() {
  return (
    <fragment>
      <h1>
        Mouse position is at: {state.x}, {state.y}
      </h1>
	  <h2>Hello!</h2>
    </fragment>
  );
}

```