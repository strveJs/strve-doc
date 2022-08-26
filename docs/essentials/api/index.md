# API

## createApp

- Parameters:

  - `Function`

- Details:

Pass in a function, which is the template function that needs to be rendered. You can chain other application APIs after `createApp`.

```js
function App() {
	return h`
            <h1>Hello</h1>
    `;
}

createApp(App).mount('#app');
```

### mount

- Parameters:

  - `HTMLElement | String`

- Details:

Mount the root component. The innerHTML of the provided DOM element will be replaced with the template rendering of the root component of the application.

## h

- Parameters:

  - `Function`

- Details:

` h`` ` is a label function, the syntax of label function is to directly follow the function name with a template string. For example, you can write HTML tags directly in template strings.

```js
function App() {
	return h`
             <div class='inner'>
                 <h1>Hello</h1>
             </div>
    `;
}
```

If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plugin, then, in Add `/*html*/` between ` h`` `.

Just like that, in the VSCode editor, this plugin can make HTML template characters highlighted.

![](/code1.png)

## setData

- Parameters:

  - `Function`
  - `Object` (optional)

- Details:

The first parameter is a function. The function body needs to execute values ​​that will change the state of the page, such as `state.msg` in the following example.

```js
const state = {
	msg: '1',
};

function useChange() {
  setData(() => {
    state.msg = '2';
  });
}

function App() {
	return h`
            <button onClick=${useChange}>change</button>
            <p $key>${state.msg}</p>
    `;
}
```

The second parameter is the object type, and the optional properties are as follows:

| Properties | Functions                                                                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status     | Identifies a special status field, of type String. For specific attribute values, please refer to [status](/essentials/usage/#status)                                                    |
| name       | The name of the function component, the type is Function. Directly pass in a function component, please refer to [Named-function-component](/essentials/usage/#named-function-component) |

## version

- Details:

Directly get the version number of Strve.js.

## onMounted

- Parameters:

  - `Function`

- Details:

Lifecycle hook: Triggered when the node mount is complete.

```js
const state = {
	count: 0,
};

function add() {
  setData(() => {
    state.count++;
  });
}

function App() {
	return h`
            <h1 $key="h1">${state.count}</h1>
            <button onClick=${add}>Add</button> 
    `;
}

onMounted(() => {
	console.log(domInfo.h1); // <button>Add</button>
});
```

## onUnmounted

- Parameters:

  - `Function`

- Details:

Lifecycle hook: Called when the page is destroyed.

```js
class Home {
	constructor() {
		onUnmounted(() => {
			console.log('onUnmounted'); // onUnmounted
		});
	}

	goAbout = () => {
		linkTo('/about');
	};

	render = () => h`
            <button onClick=${this.goAbout}>goAbout</button>
    `;
}

class About {
	constructor() {
		onMounted(() => {
			console.log(document.querySelector('button'));
		});
	}

	goHome = () => {
		linkTo('/');
	};

	render = () => h`
            <button onClick=${this.goHome}>goHome</button>
    `;
}
```

## nextTick

- Parameters:

  - `Function`

- Details:

Use it right after changing some data to wait for the DOM to update.

```js
const state = {
	count: 0,
};

let styleColor = 'color:red';

function add() {
  setData(() => {
    styleColor = 'color:green';
    state.count++;
    nextTick(() => {
      console.log(domInfo.h1); // <h1 style="color:green">1</h1>
    });
  });
}

function App() {
	return h`
            <h1 $key="h1" style=${styleColor}>${state.count}</h1>
            <button onClick=${add}>Add</button> 
    `;
}
```

## domInfo

- Details:

It is a DOM information object, you can define a property in `$key` in the DOM.

```js
function add() {
  console.log(domInfo.h1); // <h1>Strve.js</h1>
}

function App() {
	return h`
            <h1 $key="h1">Strve.js</h1>
            <button onClick=${add}>Add</button> 
    `;
}
```

## propsData

- Details:

It needs to be used when passing a value from a component.

```js
// Father

function useGetTit(v) {
  console.log(v);
  setData(
          () => {
            propsData.Component2 = v;
          },
          {
            name: Component2,
          }
  );
}

function App() {
	return h`
            <component $name=${Component1.name} $props=${useGetTit}>
                ${Component1()}   
            </component>
            <component $name=${Component2.name}>
                ${Component2()}   
            </component>
    `;
}
```

```js
// Component1

let isShow = true;

function emitData() {
  isShow = !isShow;
  propsData.Component1(isShow);
}

function Component1() {
	return h`
            <h1 onClick=${emitData}>Son</h1>
    `;
}
```

```js
// Component2

let v = true;

function f() {
  setData(
          () => {
            v = propsData.Component2;
            console.log(v);
          },
          {
            name: Component2,
          }
  );
}

function Component2() {
	return h`
            <div $key>
            ${v ? h`<p $key>${v}</p>` : h`<null></null>`}
            </div>
            <button onClick=${f}>btn</button>
    `;
}
```