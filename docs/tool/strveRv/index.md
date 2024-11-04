# strveRv

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

## Introduce

Strve-rv is a reactivity library for building user interfaces on the web.

- Declarative rendering: We can declaratively describe the relationship between the final output HTML and JavaScript state.
- Responsiveness: Automatically track JavaScript state and responsively update DOM when it changes.
- Componentization: A function is a component, which can be combined arbitrarily according to the scale of the application. And the "island feature" unique to components makes the level of virtual DOM tree calculation controlled at the component level.
- Lightweight: The compressed file size is less than 10k.
- Supports all APIs of [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity).
- Supports [StrveRouter](/tool/createStrveApp/).

Powered by [@vue/reactivity](https://github.com/vuejs/core/tree/main/packages/reactivity) and [strve-js](https://github.com/strveJs/strve). So you must be familiar with the usage of both before using StrveRv.

## API

### defineComponent

Defines a component.

The first parameter is a configuration object, which can be passed. Its configuration attribute is mount, which is used to mount the root component. Receives a "container" parameter, which can be an actual DOM element or a CSS selector string.

The second parameter is a function, which must be passed. Returns an HTML template. The function parameter is an object, and the object's attribute is content.

::: warning
It should be noted here that when we use it to mount the root component, we must use one or more `<component>` tags to carry the component.
:::

```jsx
const Component1 = defineComponent(() => {
  return () => <h1>Hello Component1</h1>;
});

const Component2 = defineComponent(() => {
  return () => <h1>Hello Component2</h1>;
});

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <fragment>
        <component $is={Component1}></component>
        <component $is={Component2}></component>
      </fragment>
    );
  }
);
```

Among them, we can use content to define data for the component and use it when you need it.

```jsx
const app = defineComponent(({ content }) => {
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

### onMounted

Register a callback function to be executed after the component is mounted.

```jsx
defineComponent(() => {
  onMounted(() => {
    console.log('onMounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
});
```

### onUnmounted

Registers a callback function to be called after the component instance is unmounted.

```jsx
defineComponent(() => {
  onUnmounted(() => {
    console.log('onUnmounted', 'about');
  });

  return () => (
    <fragment>
      <h1>About</h1>
    </fragment>
  );
});
```

### domInfo

Get DOM information.

```jsx
defineComponent(() => {
  const h1 = ref();

  function getDomInfo() {
    console.log('domInfo', domInfo.get(h1));
  }

  return () => (
    <fragment>
      <h1 $ref={h1} onClick={getDomInfo}>
        Hello
      </h1>
    </fragment>
  );
});
```

## Example

### Single component environment

```jsx
import { defineComponent, ref, reactive, watch, domInfo, computed } from 'strve-rv';

const Component1 = defineComponent(() => {
  const count = ref(1);

  function add() {
    count.value += 1;
  }

  const plusOne = computed(() => count.value + 1);

  return () => (
    <fragment>
      <h1 onClick={add}>{count.value}</h1>
      <p>{plusOne.value}</p>
    </fragment>
  );
});

const Component3 = defineComponent(() => {
  const count = ref(3);
  const obj = reactive({
    name: 'admin',
  });
  const h1 = ref();

  function add() {
    count.value += 1;
    obj.name = 'add';
    console.log('Component3', domInfo.get(h1));
  }

  return () => (
    <fragment>
      <h1 onClick={add} $ref={h1}>
        {count.value}
      </h1>
      <p>{obj.name}</p>
    </fragment>
  );
});

const Component2 = defineComponent(() => {
  const count = ref(2);
  const h1 = ref();

  function add() {
    count.value += 1;
    console.log('Component2', domInfo.get(h1));
  }

  watch(
    () => count.value,
    (v) => {
      console.log('watch', v);
    }
  );

  return () => (
    <fragment>
      <h1 onClick={add} $ref={h1}>
        {count.value}
      </h1>
      <component $is={Component3}></component>
    </fragment>
  );
});

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => (
      <fragment>
        <component $is={Component1}></component>
        <component $is={Component2}></component>
      </fragment>
    );
  }
);
```

### Multi-component routing environment

```jsx
// home.jsx
import { defineComponent, ref, onMounted, onUnmounted } from 'strve-rv';
import { linkTo } from 'strve-router';
import { useMouse } from './mouse.js';

const component1 = () =>
  defineComponent(() => {
    const count = ref(1);

    function add() {
      count.value += 1;
    }
    onMounted(() => {
      console.log('onMounted', 'Component1');
    });
    onUnmounted(() => {
      console.log('onUnmounted', 'Component1');
    });

    return () => (
      <fragment>
        <h1 onClick={add}>{count.value}</h1>
      </fragment>
    );
  });

const home = () =>
  defineComponent(() => {
    const Component1 = component1();
    const { x } = useMouse();

    function goAbout() {
      linkTo({
        path: '/about',
        query: {
          id: 1,
          name: 'admin',
        },
      });
    }

    onMounted(() => {
      console.log('onMounted', 'home');
    });
    onMounted(() => {
      console.log('onMounted1', 'home1');
    });

    onUnmounted(() => {
      console.log('onUnmounted', 'home');
    });

    onUnmounted(() => {
      console.log('onUnmounted1', 'home1');
    });

    return () => (
      <fragment>
        <button onClick={goAbout}>goAbout</button>
        <h1>Home</h1>
        <div>{x.value}</div>
        <component $is={Component1}></component>
      </fragment>
    );
  });

export default home;
```

```jsx
// about.jsx
import { defineComponent, onMounted, onUnmounted, ref } from 'strve-rv';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(({ content }) => {
    content.id = 'about';
    function goHome() {
      linkTo({
        path: '/',
      });
    }
    const count = ref(0);

    function add() {
      count.value++;
      content.id = 'about';
    }

    function getOption() {
      console.log(toParse());
    }

    onMounted(() => {
      console.log('onMounted', 'about');
    });

    onUnmounted(() => {
      console.log('onUnmounted', 'about');
    }, content);

    onUnmounted(() => {
      console.log('onUnmounted', 'about2');
    }, content);

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
        <h2 onClick={add}>{count.value}</h2>
      </fragment>
    );
  });

export default about;
```

```js
// mouse.js
import { ref, onMounted, onUnmounted } from 'strve-rv';

export function useMouse() {
  const x = ref(0);

  function update(event) {
    x.value = event.pageX;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return { x };
}
```
