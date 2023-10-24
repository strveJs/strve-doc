# Usage

## Data-binding

Strve allows developers to declaratively bind the DOM to the underlying instance's data.

### text

The form of text binding in data binding is to use the symbol `${}`.

```js
const state = {
	msg: 'Hello',
};

function App() {
	return html`<h1>${state.msg}</h1>`;
}
```

### expressions

Use expressions in symbols `${}`.

```js
const state = {
	a: 1,
	b: 2,
};

function App() {
	return html`<h1>${state.a + state.b}</h1>`;
}
```

## Property-binding

Use the notation `${}` to bind a value to the attribute `value`.

```js
const state = {
	msg: 'Hello',
};

function App() {
	return html`<input type="text" value=${state.msg}/>`;
}
```

Additionally, you can bind other properties such as `class`.

```js
const state = {
	isRed: true,
	msg: 'Hello',
};

function App() {
	return html`<h1 class=${state.isRed ? 'red' : ''}>${state.msg}</h1>`;
}
```

If you want to bind the `style` property, you can too.

```js
const state = {
	msg: 'Hello',
	style: {
		color: 'red',
		fontSize: '40px',
	},
};

function App() {
	return html`<p style=${state.style}>${state.msg}</p>`;
}
```

## Conditional-rendering

Using the notation `${}`, the label will only be displayed if the expression of the directive returns a `true` value.

```js
const state = {
	isShow: true,
};

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${useShow}>show</button>
				<div>
					${
						state.isShow
						? html`<p>Strve.js</p>`
						: html`<null></null>`
					}
				</div>
			 </fragment>
    `;
}
```

## List-rendering

Use the notation `${}` to render an array-based list, and use the array's `map` method to return an array.

```js
const state = {
	arr: [1, 2],
};

function usePush() {
	setData(() => {
		state.arr.push(3);
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${usePush}>push</button>
				<ul>
				${state.arr.map((todo) => html`<li key=${todo}>${todo}</li>`)}
				</ul>
			</fragment>
    `;
}
```
::: warning
Child elements under the same parent element must have unique keys. Duplicate keys will cause rendering exceptions. The special attribute key is mainly used as a hint for Strve's virtual DOM algorithm, and is used to identify vnode when comparing the old and new node lists.
:::

## Event-handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event fires. We recommend using this camelCase naming method, such as `onClick`. Additionally, the `on` directive can be abbreviated as `@`.

Additionally, you need to use the notation `${}` to bind events.

```js
const state = {
	msg: 'sayHello',
};

function useClick() {
	alert('hello');
}

function App() {
	return html`
			<fragment>
				<button onClick=${useClick}>${state.msg}</button>
				<button @click=${useClick}>${state.msg}</button>
			</fragment>
    `;
}
```

## Named-function-component

When we update the component data, we do not need to compare the full amount (such as the h2 and p tags below, they do not belong to the content of Component1, so Diff is not needed), we only need to update the data in the component.

At this time, you need to pass in an object in the second parameter of the `setData()` method. The object key is `name` and the value is the function component that needs to be updated. In addition, you also need to wrap a `component` tag outside the function component in the parent component and use the `$name` built-in attribute (for more information, please see [Built-in-properties](/essentials/usage/#built-in-properties)) , this value is the name of the functional component.

```js
const state1 = {
	count: 0,
};

function add1() {
	setData(
		() => {
			state1.count++;
		},
		{
			name: Component1,
		}
	);
}

function Component1() {
	return html`
			<fragment>
				<h1>Component1</h1>
				<h1>${state1.count}</h1>
				<button onClick=${add1}>add1</button>
			</fragment>
    `;
}

function App() {
	return html`
			<fragment>
				<h2>txt1</h2>
				<div>
					<p>txt2</p>
					<component $name=${Component1.name}>
						${Component1()}
					</component>
				</div>
			</fragment>
    `;
}
```

## Built-in-properties

### $ref

The `$ref` attribute can reference a DOM element. It is used to reference other elements within a component or DOM element.

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

### $name

This attribute needs to be used on the built-in tag `component`, which represents the name of the internal component and must be the same as the name of the functional component.

```js
const state1 = {
	count: 0,
};

function add1() {
	setData(
		() => {
			state1.count++;
		},
		{
			name: Component1,
		}
	);
}

function Component1() {
	return html`
			<fragment>
				<h1>${state1.count}</h1>
				<button onClick=${add1}>add1</button>
			</fragment>
    `;
}

function App() {
	return html`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### $props

This attribute is used with [propsData](/essentials/api/#propsdata) when, for example, you need to pass data from a child component to a parent component.

```js
// Son

let isShow = true;

function emitData() {
	isShow = !isShow;
	propsData.Component1(isShow);
}

function Component1() {
	return html`<h1 onClick=${emitData}>Son</h1>`;
}
```

```js
// Father

function useGetTit(v) {
	console.log(v); // false
}

function App() {
	return html`
            <component $name=${Component1.name} $props=${useGetTit}>
                ${Component1()}
            </component>
    `;
}
```

## Built-in-tags

### component

Component placeholder label, which wraps a functional component within the label.

```js
function Component1() {
	return html`<h1>Hello</h1>`;
}

function App() {
	return html`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### null

Placeholder tags will not be rendered into the page.

```js
const state = {
	isShow: true,
};

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
}

function App() {
	return html`
			<fragment>
				<button onClick=${useShow}>show</button>
				<div>
					${
						state.isShow
						? html`<p>Strve.js</p>`
						: html`<null></null>`
					}
				</div>
			</fragment>
    `;
}
```

### fragment

Create a document fragment tag. It is not part of the real DOM tree, its changes will not trigger a re-rendering of the DOM tree, and will not have an impact on performance.

```js
const state = {
	x: 0,
	y: 0,
};

function App() {
	return html`
            <fragment>
                <h1>Mouse position is at: ${state.x}, ${state.y}</h1>
            </fragment>
    `;
}
```

## Component mode

Components can be defined in three modes, namely:

- Class mode;
- Constructor mode;
- Prototype mode;

**Class mode**

```js
class About {
	constructor() {
		this.state = {
			msg: 'About',
		};
	}

	useChange = () => {
		setData(() => {
			this.state.msg = 'Changed';
		});
	};

	goHome = () => {
		linkTo('/');
	};

	render = () => {
		return html`
				<fragment>
					<button onClick=${this.goHome}>goHome</button>
					<h1 onClick=${this.useChange}>${this.state.msg}</h1>
				</fragment>
        `;
	};
}
```

**Constructor mode**

```js
function About() {
	const state = {
		msg: 'About',
	};

	function goHome() {
		linkTo('/');
	}

	function render() {
		return html`<h1 onClick=${goHome}>${state.msg}</h1>`;
	}

	return {
		render,
	};
}
```

**Prototype mode**

This mode has a caching mechanism.

```js
const Home = function () {};
const home = Home.prototype;

home.state = {
	msg: 'Home',
	count: 0,
};

home.useAdd = function () {
	setData(() => {
		home.state.count++;
	});
};

home.goAbout = function () {
	linkTo('/about');
};

home.render = function () {
	return html`
			<fragment>
				<button onClick=${home.goAbout}>GoAbout</button>
				<h1 onClick=${home.useAdd}>${home.state.count}</h1>
				<h2>${home.state.msg}</h2>
			</fragment>
    `;
};
```

## Web Components

The main benefit of custom elements is that they can be used with any framework, or even without a framework. They are ideal when you target end users who may use different front-end technology stacks, or when you want to decouple the final application from the implementation details of the components it uses.

Use the [`defineCustomElement`](/essentials/api/#definecustomelement) API to register native custom elements.

In addition, it should be noted that when we update the internal custom element data, such as the following, the internal Virtual Dom does not need to be compared in full, and we can use the `customElement` field in the `setData` API.

```js
const data = {
	count: 1
}

function changeCount() {
	setData(() => {
		data.count++;
	}, {
		customElement: myCom2,
		name: 'useCustomElement'
	})
}

const myCom2 = {
	id: "myCom2",
	template: () => {
		return html`<h2 @click=${changeCount}>${data.count}</h2>`
	},
}

defineCustomElement(myCom2, 'my-com2');

function App() {
	return html`
			<fragment>
				<h1>1</h1>
				<my-com2></my-com2>
			</fragment>
	`
}
```