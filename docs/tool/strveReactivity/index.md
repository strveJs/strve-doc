# strveReactivity

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

Standalone responsiveness Strve.

## Introduce

Powered by [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity) and [strve-js](https://github.com/strveJs/strve) Custom elements JavaScript library.

The main features are as follows:

- Web Components
- Hooks
- Reactivity API
- Props
- Emit
- Slot
- Styles
- Automatic registration component
- Virtual DOM

## API

```js
// strve-reactivity API
export {
  resetView,
  createApp,
  nextTick,
  domInfo,
  onMounted,
  onUnmounted,
  watchProps,
  registerComponent,
  defineComponent,
};
// @vue/reactivity API
export * from './reactivity.js';
```

## Example

### Initialization

```js
// main.js
import { createApp } from 'strve-reactivity';
import register from './components/register';

import App from './App';

register();
createApp(App).mount('#app');
```

### Application Entrance

```jsx
// App.jsx
export default () => <my-component></my-component>;
```

### Register Parent Component

```jsx
// MyComponent.jsx
import { ref, defineComponent, reactive } from 'strve-reactivity';

export const MyComponent = defineComponent(() => {
  const items = reactive([
    {
      id: 1,
      tit: 'A',
    },
    {
      id: 2,
      tit: 'B',
    },
  ]);
  const count = ref(4);
  const increase = () => {
    items.unshift({
      id: count.value++,
      tit: 'C',
    });
  };

  return () => (
    <fragment>
      <button onclick={increase}>increase</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <span>-</span>
            <span>{item.tit}</span>
          </li>
        ))}
      </ul>
      <my-child></my-child>
    </fragment>
  );
});
```

### Register Subcomponent

```jsx
// MyChild.jsx
import { defineComponent, reactive, onMounted, onUnmounted } from 'strve-reactivity';

export const MyChild = defineComponent(() => {
  const state = reactive({ count: 0, msg: '' });
  const increase = () => {
    state.count++;
  };

  onMounted(() => {
    console.log('child mounted');
  });

  onUnmounted(() => {
    console.log('child unmounted');
  });

  return () => (
    <fragment>
      <p>{state.msg}</p>
      <p>{state.count}</p>
      <button onClick={increase}>increase</button>
    </fragment>
  );
});
```

### Global Registration

```js
// register.js
import { registerComponent } from 'strve-reactivity';
import { MyComponent } from './MyComponent';
import { MyChild } from './MyChild';

// global registration
export default function register() {
  registerComponent('my-child', MyChild);
  registerComponent('my-component', MyComponent);
}
```

## Other Examples

There are other usages of `strve-reactivity`, you can go to [example](https://github.com/strveJs/strve-reactivity/tree/main/example).
