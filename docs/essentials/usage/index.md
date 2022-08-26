# Usage

## Data-binding

Strve.js uses a JavaScript-based template string syntax that allows developers to declaratively bind the DOM to the underlying instance's data. All Strve.js template strings are valid HTML, so can be parsed by spec-compliant browsers and HTML parsers.

Under the hood, Strve.js compiles template strings into virtual DOM rendering functions and minimizes DOM manipulation.

In Strve.js, you can use JavaScript template strings to your heart's content and feel its unique charm!

### text

The form of text binding in data binding is to use the notation `${}`.

```js
const state = {
	msg: 'Hello',
};

function App() {
	return h`
            <h1 $key>${state.msg}</h1>
    `;
}
```

### expressions

Use expressions in the notation `${}`.

```js
const state = {
	a: 1,
	b: 2,
};

function App() {
	return h`
            <h1 $key>${state.a + state.b}</h1>
    `;
}
```

## Property-binding

Use the notation `${}` to bind a value to the property `value`.

```js
const state = {
	msg: 'Hello',
};

function App() {
	return h`
            <input type="text" value=${state.msg} $key/>
    `;
}
```

In addition, you can also bind other properties, such as `class`.

```js
const state = {
	isRed: true,
	msg: 'Hello',
};

function App() {
	return h`
            <h1 class=${state.isRed ? 'red' : ''} $key>${state.msg}</h1>
    `;
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
	return h`
            <p style="${state.style}">${state.msg}</p>
    `;
}
```

## Conditional-rendering

Using the notation `${}`, the block will only be rendered if the directive's expression returns a `true` value.

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
	return h`
             <button onClick=${useShow}>show</button>
             <div $key>
                  ${state.isShow ? h`<p $key>Strve.js</p>` : h`<null $key></null>`}
             </div>
    `;
}
```

## List-rendering

We can render a list based on an array using the notation `${}`. For example, we use the `map` method of arrays to render lists, and we can dynamically add array items.

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
	return h`
             <button onClick=${usePush}>push</button>
             <ul $key>
               ${state.arr.map((todo) => h`<li>${todo}</li>`)}
             </ul>
    `;
}
```

When using a list to render a page, if you insert data at the head of the list, you need to pass in the value of `useFirstKey` to avoid repeated rendering of `DOM` nodes, which is a must.

Any actions that operate on the head of the list, such as `unshift`, `pop` array methods, need to add this `useFirstKey` value. This is not required for other operations and has been optimized internally.

```js
const state = {
	arr: [1, 2],
};

function useUnshift() {
  setData(
    () => {
      state.arr.unshift('2');
    },
    {
      status: 'useFirstKey',
    }
  );
}

function Home() {
	return h`
            <button onClick=${useUnshift}>unshift</button>
            <ul $key>
                ${state.arr.map((item) => h`<li $key>${item}</li>`)}
            </ul>
    `;
}
```

## Event-handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event is fired. We recommend using this camelCase `onClick` method.

Also, you need to use the notation `${}` to bind events.

```js
const state = {
	msg: 'sayHello',
};

function useClick() {
  alert('hello');
}

function App() {
	return h`
            <button onClick=${useClick}>${state.msg}</button>
    `;
}
```

## Status

### useFirstKey

When you use list rendering, inserting data at the head of the list needs to bind the `useFirstKey` field to avoid repeated rendering of `DOM` nodes.

```js
const state = {
	arr: [1, 2],
};

function useUnshift() {
  setData(
    () => {
      state.arr.unshift('2');
    },
    {
      status: 'useFirstKey',
    }
  );
}

function Home() {
	return h`
            <button onClick=${useUnshift}>unshift</button>
            <ul $key>
                ${state.arr.map((item) => h`<li $key>${item}</li>`)}
            </ul>
    `;
}
```

## Named-function-component

When we update component data, we do not need full comparison (such as the following h2, p tags, which do not belong to the content of Component1, so they do not need Diff comparison), just update the data in the component.

At this time, you need to pass an object in the second parameter of the `setData()` method, the object key is `name`, and the value is the function component that needs to be updated. In addition, what you also need to do is to wrap a `component` tag outside the function component in the parent component, and use the `$name` tag (for more information about tags, please see [Static-tags](/essentials/usage/#static-tags)), the value is the name of the function component.

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
	return h`
            <h1>Component1</h1>
            <h1 $key>${state1.count}</h1>
            <button onClick=${add1}>add1</button> 
    `;
}

function App() {
	return h`
            <h2>txt1</h2>
            <div>
                <p>txt2</p>
                <component $name=${Component1.name}>
                    ${Component1()}
                </component>
            </div>
    `;
}
```

## Static-tags

### $key

When we change the data, a Diff comparison is performed internally to find the differences, and then the page is updated accordingly. However, some nodes that do not need to be updated, such as the button and h1 tags below, do not need to be compared. Only dynamic data nodes such as the p tag need to be updated, so we explicitly add the static tag `$key` to the tag.

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
            <button onClick=${add}>add</button>
            <p $key>${state.count}</p>
            <h1>Hello Strve.js</h1>
    `;
}
```

In addition, in addition to adding tags to dynamic data nodes, you also need to pay attention to adding `$key` tags in some special scenarios, such as dynamically adding nodes and dynamically displaying and hiding nodes. Because, only nodes marked with `$key` will have the ability to be manipulated with their own DOM.

### $name

This tag needs to be used on the built-in tag `component` to indicate the internal component name, which must be the same as the function component name.

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
	return h`
            <h1 $key>${state1.count}</h1>
            <button onClick=${add1}>add1</button> 
    `;
}

function App() {
	return h`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### $props

This tag is used in conjunction with [propsData](/essentials/api/#propsdata), for example, you need to pass data to the parent component in the child component.

```js
// Son

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
// Father

function useGetTit(v) {
  console.log(v); // false
}

function App() {
	return h`
            <component $name=${Component1.name} $props=${useGetTit}>
                ${Component1()}   
            </component>
    `;
}
```

## Built-in-tags

### component

A component label, which wraps a function component inside the label.

```js
function Component1() {
	return h`
            <h1>Hello</h1>
    `;
}

function App() {
	return h`
            <component $name=${Component1.name}>
                ${Component1()}
            </component>
    `;
}
```

### null

Empty label. It can be understood as a placeholder tag and will not be rendered into the page.

Typically used for conditional rendering.

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
	return h`
            <button onClick=${useShow}>show</button>
            <div $key>
                 ${state.isShow ? h`<p $key>Strve.js</p>` : h`<null $key></null>`}
            </div>
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
        return h`
                <button onClick=${this.goHome}>goHome</button>
                <h1 onClick=${this.useChange} $key>${this.state.msg}</h1>
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
		return h`<h1 onClick=${goHome} $key>${state.msg}</h1>`;
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
	return h`
            <button onClick=${home.goAbout}>GoAbout</button>
            <h1 onClick=${home.useAdd} $key>${home.state.count}</h1>
            <h2 $key>${home.state.msg}</h2>
    `;
};
```