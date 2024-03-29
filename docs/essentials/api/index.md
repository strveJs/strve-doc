# API

::: tip
For a better reading experience, the following code examples are all written using JSX syntax, except for the `html` API which is written using tag templates.
:::

## defineComponent

Define components.

The first parameter is the configuration object and can be passed. Its configuration property is `mount`, which is used to mount the root component. Receives a "container" parameter, which can be an actual DOM element or a CSS selector string.

The second parameter is a function and must be passed. Return the HTML template. The parameter of the function is an object, and the properties of the object are `content` and `setData` respectively.

```jsx
defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <div>
        <h1>Hello Strve</h1>
      </div>
    );
  }
);
```

Among them, we can use `content` to define data for the component and use it when you need it.

```jsx
const app = defineComponent(({ setData, content }) => {
  content.data = {
    name: 'Strve',
  };

  return () => (
    <div>
      <h1>Hello Strve</h1>
    </div>
  );
});

console.log(app.data); // {name:'Strve'}
```

## setData

Modify page data.

The first parameter is a function and must be passed. Execute the callback function to modify the associated page data.
The second parameter is the context, which must be passed in the outer scope but not in the inner scope.

**Internal scope:**

```jsx
defineComponent(({ setData }) => {
  let count = 0;

  function add() {
    setData(() => {
      count++;
    });
  }

  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
});
```

**External scope:**

```jsx
import { defineComponent, setData } from 'strve-js';

let count = 0;

const app = defineComponent(() => {
  return () => (
    <fragment>
      <button onClick={add}>Add</button>
      <h1>{count}</h1>
    </fragment>
  );
});

function add() {
  setData(() => {
    count++;
  }, app);
}
```

## html

` html`` ` is a tag function. The syntax of the tag function is to directly follow the function name with a template string. For example, you can write HTML tags directly in the template string.

In the JSX syntax environment, this API will not be used.

```js
defineComponent(() => {
  let count = 0;

  return () => html`<p>${count}</p>`;
});
```

::: tip
If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plug-in,
This plugin enables HTML template string highlighting.
:::
