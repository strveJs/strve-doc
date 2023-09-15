# API

## createApp

- Parameters:

  - `Function`

- Details:

Pass in a function, which is the template function that needs to be rendered.

```js
function App() {
	return html`<h1>Hello</h1>`;
}

createApp(App).mount('#app');
```

### mount

- Parameters:

  - `HTMLElement | String`

- Details:

Mount the root component. The innerHTML of the provided DOM element will be replaced with the template rendering of the application's root component.

## html

- Parameters:

  - `Function`

- Details:

` html`` ` is a tag function. The syntax of the tag function is directly followed by a template string after the function name. For example, you can write HTML tags directly in the template string.

```js
function App() {
	return html`
			<div class='inner'>
				<h1>Hello</h1>
			</div>
    `;
}
```

::: tip
If you are using the VSCode editor, you can go to the store to download the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) plug-in,
This plugin enables HTML template string highlighting.
:::

## setData

- Parameters:

  - `Function`
  - `Object` (optional)

- Details:

The first parameter is a function. The function body needs to execute the value that will change the page state, such as `state.msg` in the example below.

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
	return html`<p onClick=${useChange}>${state.msg}</p>`;
}
```

The second parameter is the object type, and the optional attributes are as follows:

| Property | Function |
| --- | --- |
| name | The name of the function component, the type is `Function` (the type is `String` when used with the `customElement` attribute), directly pass in a function component, please refer to [Named-function-component](/essentials/usage/#named-function-component) |
| customElement | The native custom component object, whose type is Object. Just pass in the first parameter of [defineCustomElement](/essentials/api/#definecustomelement) directly. In addition, it needs to be used with `name='useCustomElement'` to update the component view as needed|

## version

- Details:

Directly get the version number of Strve.

## onMounted

- Parameters:

  - `Function`

- Details:

Life cycle hook function: triggered when the node is mounted.

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
	return html`<h1 $ref="h1" onClick=${add}>${state.count}</h1>`;
}

onMounted(() => {
	console.log(domInfo.h1); // <h1>0</h1>
});
```

## onUnmounted

- Parameters:

  - `Function`

- Details:

Life cycle hook function: called when the page is destroyed.

```js
onUnmounted(() => {
	console.log('onUnmounted!');
});
```

::: tip
Generally used with [StrveRouter](/tool/strveRouter/).
:::

## nextTick

- Parameters:

  - `Function`

- Details:

Use it immediately after changing some data to wait for the DOM to update.

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
	return html`
			<fragment>
				<h1 $ref="h1" style=${styleColor}>${state.count}</h1>
				<button onClick=${add}>Add</button>
			</fragment>
    `;
}
```

## domInfo

- Details:

It is a DOM information object, and you can define a property in `$ref` in the DOM.

```js
function add() {
	console.log(domInfo.h1); // <h1>Strve.js</h1>
}

function App() {
	return html`
			<fragment>
				<h1 $ref="h1">Strve.js</h1>
				<button onClick=${add}>Add</button>
			</fragment>
    `;
}
```

## propsData

- Details:

It is required when passing values from components.

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
	return html`
			<div>
				<component $name=${Component1.name} $props=${useGetTit}>
					${Component1()}
				</component>
				<component $name=${Component2.name}>
					${Component2()}
				</component>
			</div>
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
	return html`
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
	return html`
			<fragment>
				<div>
				${v ? html`<p>${v}</p>` : html`<null></null>`}
				</div>
				<button onClick=${f}>btn</button>
			</fragment>
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
		return html`<p class="msg">${data.count1}</p>`
	},
	styles: [`.msg { color: red; }`],
}

defineCustomElement(myCom1, 'my-com1')

function App() {
	return html`<my-com1></my-com1>`
}
```
Example 2:
```js
const myCom1 = {
	id: "myCom1",
	template: (props) => {
		return html`
				<fragment>
					<p class="msg">${props.value}</p>
					<p class="msg">${props.msg}</p>
				</fragment>
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
	return html`
			<fragment>
				<button onClick=${add}>btn</button>
				<my-com1 value=${data.count1} msg=${data.count2}></my-com1>
			<fragment>
	`
}
```