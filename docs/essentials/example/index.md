# Example

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

If you want to see the page effect, you can visit [source code repository](https://github.com/strveJs/strve-examples).

## TwoWay

```jsx
import { defineComponent } from 'strve-js';

const TwoWay = () => {
  return defineComponent(({ setData }) => {
    let value = '';
    function useInput(e) {
      setData(() => {
        value = e.target.value;
      });
    }

    return () => (
      <fragment>
        <input onInput={useInput} value={value}></input>
        <p>{value}</p>
      </fragment>
    );
  });
};

export default TwoWay;
```

## FatherToSon

```jsx
import { defineComponent } from 'strve-js';

const Son = () => {
  return defineComponent(({ setData, content }) => {
    const props = {
      list: [],
    };

    content.getList = function (val) {
      setData(() => {
        props.list = val;
      });
    };

    return () => (
      <fragment>
        <ul>
          {props.list.map((item) => (
            <li key={item.id}>{item.id}</li>
          ))}
        </ul>
      </fragment>
    );
  });
};

const Father = () => {
  return defineComponent(() => {
    const list = [
      {
        id: new Date().getTime(),
      },
    ];

    const son = Son();
    son.getList(list);

    function add() {
      list.unshift({
        id: new Date().getTime(),
      });
      son.getList(list);
    }

    return () => (
      <fragment>
        <button onClick={add}>add</button>
        <component $is={son} />
      </fragment>
    );
  });
};

export default Father;
```

## SonToFather

```jsx
import { defineComponent } from 'strve-js';

const Son = () => {
  return defineComponent(({ content }) => {
    function send() {
      content.getMsg('Hello!');
    }

    return () => (
      <fragment>
        <button onClick={send}>sendMsg</button>
      </fragment>
    );
  });
};

const Father = () => {
  return defineComponent(({ setData }) => {
    let msg = '';
    const son = Son();

    son.getMsg = function (val) {
      setData(() => {
        msg = val;
      });
    };

    return () => (
      <fragment>
        <component $is={son} />
        <h3>{msg}</h3>
      </fragment>
    );
  });
};

export default Father;
```

## Slot

```jsx
import { defineComponent } from 'strve-js';

const Son = () => {
  return defineComponent(({ setData, content }) => {
    let slotHtm;
    content.slot = function (slots) {
      setData(() => {
        slotHtm = slots;
      });
    };

    return () => (
      <fragment>
        <h2>Son</h2>
        <fragment>{slotHtm}</fragment>
      </fragment>
    );
  });
};

const Slot = () => {
  const son = Son();

  return defineComponent(() => {
    let count = 3;
    let slots;

    // slots
    function add() {
      count++;
      son.slot(slots());
    }
    slots = () => (
      <fragment>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <h3>Hello! slots</h3>
      </fragment>
    );
    son.slot(slots());

    return () => (
      <fragment>
        <h1>Slot</h1>
        <component $is={son} />
      </fragment>
    );
  });
};

export default Slot;
```

## NestedComponents

```jsx
import { defineComponent } from 'strve-js';

const NestedComponents = () => {
  const subComponent = defineComponent(({ setData }) => {
    let count = 0;

    function add() {
      setData(() => {
        count++;
      });
    }
    return () => <h2 onClick={add}>{count}</h2>;
  });

  return defineComponent(() => {
    return () => (
      <fragment>
        <h1>nestedComponents</h1>
        <component $is={subComponent} />
      </fragment>
    );
  });
};

export default NestedComponents;
```

## Timer

```jsx
import { defineComponent } from 'strve-js';

const Timer = () => {
  return defineComponent(({ setData }) => {
    const data = {
      duration: 15 * 1000,
      elapsed: 0,
    };

    const lastTime = performance.now();

    function progressRate() {
      return Math.min(data.elapsed / data.duration, 1);
    }

    let handle = null;
    function update() {
      setData(() => {
        data.elapsed = performance.now() - lastTime;
        if (data.elapsed >= data.duration) {
          cancelAnimationFrame(handle);
        } else {
          handle = requestAnimationFrame(update);
        }
      });
    }

    update();

    return () => (
      <fragment>
        <label>
          <span>Elapsed Time:</span>
          <progress value={progressRate()}></progress>
        </label>
        <div>
          <span>{(data.elapsed / 1000).toFixed(1)}</span>
          <span>s</span>
        </div>
      </fragment>
    );
  });
};

export default Timer;
```

## Store

```jsx
import { defineComponent } from 'strve-js';
import store from './store.js';

const Son = () => {
  return defineComponent(({ content, setData }) => {
    function send() {
      console.log(store.state.count);
    }

    content.update = function () {
      setData(() => {});
    };

    return () => (
      <fragment>
        <button onClick={send}>send</button>
        <p>{store.state.count}</p>
      </fragment>
    );
  });
};

const Store = () => {
  return defineComponent(({ setData }) => {
    const son = Son();

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
        son.update();
      });
    }

    return () => (
      <fragment>
        <h1 onClick={getUserInfo}>getUserInfo</h1>
        <button onClick={add}>Add</button>
        <h1>{store.state.count}</h1>
        <component $is={son} />
      </fragment>
    );
  });
};

export default Store;
```

```js
// createStateFlow.js

export default class createStateFlow {
  _mutations;
  _actions;
  _state;
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;
    this._state = new Proxy(options.state, {
      set: (target, key, value) => {
        if (this._mutations[key]) {
          this._mutations[key](target, value);
        }
        target[key] = value;
        return true;
      },
    });
  }
  commit(mutationName, payload) {
    if (this._mutations[mutationName]) {
      this._mutations[mutationName](this._state, payload);
    }
  }
  async dispatch(actionName, payload) {
    if (this._actions[actionName]) {
      await this._actions[actionName](this, payload);
    }
  }
  get state() {
    return this._state;
  }
}
```

```jsx
// store.js
import createStateFlow from './createStateFlow.js';

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

## CircleDrawer

```jsx
import { defineComponent } from 'strve-js';
import './index.less';

function clone(circles) {
  return circles.map((c) => ({ ...c }));
}

const CircleDrawer = () => {
  return defineComponent(({ setData }) => {
    const data = {
      history: [[]],
      index: 0,
      circles: [],
      selected: null,
      adjusting: false,
    };

    function onClick({ clientX: x, clientY: y }) {
      if (data.adjusting) {
        data.adjusting = false;
        data.selected = null;
        push();
        return;
      }

      data.selected = [...data.circles].reverse().find(({ cx, cy, r }) => {
        const dx = cx - x;
        const dy = cy - y;
        return Math.sqrt(dx * dx + dy * dy) <= r;
      });

      if (!data.selected) {
        data.circles.push({
          cx: x,
          cy: y,
          r: 50,
        });
        push();
      }
    }

    function push() {
      setData(() => {
        data.history.length = ++data.index;
        data.history.push(clone(data.circles));
      });
    }

    return () => (
      <fragment>
        <svg onClick={onClick}>
          {data.circles.map((circle, index) => (
            <circle key={index} cx={circle.cx} cy={circle.cy} r={circle.r}></circle>
          ))}
        </svg>
      </fragment>
    );
  });
};

export default CircleDrawer;
```

```css
/* index.less */

svg {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}

circle {
  stroke: #000;
}
```

## BlackWhiteGum

```jsx
import { defineComponent } from 'strve-js';
import './index.less';

const BlackWhiteGum = () => {
  return defineComponent(({ setData }) => {
    const data = {
      gridSize: 6400,
      grid: [],
    };

    function generateGrid() {
      setData(() => {
        for (let i = 0; i < data.gridSize; i++) {
          data.grid.push({
            color: getRandomColor(),
            id: new Date().getTime(),
          });
        }
      });
    }

    function getRandomColor() {
      const isBlack = Math.random() >= 0.5;
      return isBlack ? 'black' : 'white';
    }

    function update() {
      setData(() => {
        for (let i = 0; i < data.grid.length; i += 10) {
          data.grid[i].color = getRandomColor();
        }

        data.grid = data.grid.slice();
      });
    }

    function startTimer() {
      setInterval(update, 5000);
    }

    generateGrid();
    startTimer();

    return () => (
      <div class='grid'>
        {data.grid.map((item) => (
          <div key={item.id} class='grid-item' style={`background-color:${item.color}`}></div>
        ))}
      </div>
    );
  });
};

export default BlackWhiteGum;
```

```css
/* index.less */

.grid {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  width: 10px;
  height: 10px;
  border: 1px solid #ccc;
}
```
