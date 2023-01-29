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

| Property | Function |
| --- | --- |
| status | Identifies a special status field of type string. For specific attribute values, please refer to [status](/essentials/usage/#status) |
| name | The name of the function component, the type is `Function` (the type is `String` when used with the `customElement` attribute), directly pass in a function component, please refer to [Named-function-component](/essentials/usage/#named-function-component) |
| customElement | The native custom component object, whose type is Object. Just pass in the first parameter of [defineCustomElement](/essentials/api/#definecustomelement) directly. In addition, it needs to be used with `name='useCustomElement'` to update the component view as needed|

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
## defineCustomElement

- Parameters:

  - `Object`
  - `String`

- Details:

Support for the introduction of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

The first parameter is the object type, and the object properties are as follows:

|Attribute|Type|Required|Meaning|
|-|-|-|-|
|id|`String`| true |Native custom component ID, it should be unique|
|template|`Function`|true|Returns a template string function|
|styles|`Array<string>`|false|Native custom component style collection|
|attributeChanged|`Array<string>`|false|Native custom component monitor attribute collection|
|immediateProps|`Boolean`|fasle|Whether the native custom component is enabled to immediately monitor property changes|
|lifetimes|`Object`|false|Native custom component life cycle, consistent with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) life cycle|

The second parameter is a string type, the name of the native custom component, and the name must contain a `-` field.

Example 1:

```js
const data = {
	count1: 1
}

const myCom1 = {
	id: "myCom1",
	template: () => {
		return h`
			   <p class="msg" $key>${data.count1}</p>
		`
	},
	styles: [`.msg { color: red; }`],
}

defineCustomElement(myCom1, 'my-com1')

function App() {
	return h`
			<my-com1></my-com1>
	`
}
```
Example 2:
```js
const myCom1 = {
	id: "myCom1",
	template: (props) => {
		return h`
				<p class="msg" $key>${props.value}</p>
				<p class="msg" $key>${props.msg}</p>
		`
	},
	styles: [`.msg { color: red; }`],
	attributeChanged: ['value', 'msg'],
	immediateProps: true,
	lifetimes: {
		attributeChangedCallback(v) {
			console.log(v);
		}
	}
}

defineCustomElement(myCom1, 'my-com1');

const data = {
	count1: 1,
	count2: '1',
}

function add() {
	setData(() => {
		data.count1++;
	})
}

function App() {
	return h`
			<button @click="${add}">btn</button>
			<my-com1 value=${data.count1} msg="${data.count2}" $key></my-com1>
	`
}
```