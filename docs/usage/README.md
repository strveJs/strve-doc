# Usage

## API

### createApp

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

#### Application API

##### mount

- Parameters:

  - `HTMLElement | String`

- Details:

Mount the root component. The innerHTML of the provided DOM element will be replaced with the template rendering of the root component of the application.

### h

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

![](../../.vuepress/public/img/code1.png)

### setData

- Parameters:

  - `Function`
  - `Object` (optional)

- Details:

The first parameter is a function. The function body needs to execute values ​​that will change the state of the page, such as `state.msg` in the following example.

```js
const state = {
	msg: '1',
};

function App() {
	return h`
        <button onClick=${useChange}>change</button>
        <p $key>${state.msg}</p>
    `;
}

function useChange() {
	setData(() => {
		state.msg = '2';
	});
}
```

The second parameter is the object type, and the optional properties are as follows:

| Properties | Functions                                                                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status     | Identifies a special status field, of type String. For specific attribute values, please refer to [status](/strvejs-doc/usage/#status)                                                    |
| name       | The name of the function component, the type is Function. Directly pass in a function component, please refer to [Named-function-component](/strvejs-doc/usage/#named-function-component) |

### emit

- Parameters:

  - `String`
  - `Dictionary`
  - `String`

- Details:

Custom events are generally used to transfer data from child components to parent components.

The first parameter is a string representing the `event` name. When used in a parent component, you need to add `on` before the custom event name.

The second parameter is a dictionary type parameter:

- **detail**: The optional default value is `null` for any type of data, which is a value associated with `event`.
- **bubbles**: A boolean value indicating whether the event can bubble. from `EventInit`. Note: Test chrome defaults to not bubbling.
- **cancelable**: A boolean value indicating whether the event can be cancelled.

The third parameter is a string type, mainly the name of the node selector, where the node refers to the DOM node wrapped by the child component in the parent component.

E.g:

```js
// Son
function Component1() {
	return h`
        <h1 onClick=${emitData}>Son</h1>
    `;
}

function emitData() {
	emit(
		'getTit',
		{
			detail: { title: 'This is title!' },
		},
		'.component1'
	);
}

// Father
function App() {
	return h`
        <div onGetTit=${useGetTit} class="component1">
            ${Component1()}
        </div>
    `;
}

function useGetTit(event) {
	setData(() => {
		console.log(event.detail.title); // This is title!
	});
}
```

### version

- Details:

No parameter, directly get the version number of Strve.js.

### watchDom

- Parameters:

  - `String`
  - `Object`
  - `Function`

- Details:

Has the ability to monitor changes made to the DOM tree. The first parameter is a string type, which is the name of the node used for monitoring; the second parameter is a configuration object, the specific configuration is the same as [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver); the third parameter is a callback function.

In addition, two methods are provided, namely the start monitoring method `start()` and the stop monitoring method `stop()`.

```js
const config = {
	attributes: true,
	childList: true,
	subtree: true,
	childList: true,
	characterDataOldValue: true,
	characterData: true,
};

const domChange = watchDOMChange('.watch-dom', config, (v) =>
	console.log(v, 'changed')
);

domChange.start();
domChange.stop();
```

### clone

- Parameters:

  - `Object`

- Details:

Creates a new object to accept the object value to be recopied or referenced.

The original object is completely copied from the memory to the new object, and a new space is opened up from the heap memory to store the new object, and the modification of the new object will not change the original object, and the two achieve real separation.

```js
const sourceData = {
	msg: 'App',
};

let state = clone(sourceData);

function App() {
	return h`
         <button onClick=${useChange}>Change</button>
         <p $key>${state.msg}</p>
     `;
}

function useChange() {
	setData(() => {
		state.msg = 'Hello';
	});
}
```

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

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="podPpXZ" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/podPpXZ">
  Strve.js-数据绑定(文本)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

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

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOmMRJ" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOmMRJ">
  Strve.js-数据绑定(表达式)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

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

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="JjOLjKa" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/JjOLjKa">
  Strve.js-属性绑定(value)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

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

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="mdqxdRb" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/mdqxdRb">
  Strve.js-属性绑定(class)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

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

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOVWoO" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOVWoO">
  Strve.js-属性绑定(style)</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## Conditional-rendering

Using the notation `${}`, the block will only be rendered if the directive's expression returns a `true` value.

```js
const state = {
	isShow: true,
};

function App() {
	return h`
         <button onClick=${useShow}>show</button>
         <div $key>
              ${state.isShow ? h`<p $key>Strve.js</p>` : h`<null $key></null>`}
         </div>
     `;
}

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="dyZmyzE" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/dyZmyzE">
  Strve.js-条件渲染</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## List-rendering

We can render a list based on an array using the notation `${}`. For example, we use the `map` method of arrays to render lists, and we can dynamically add array items.

```js
const state = {
	arr: [1, 2],
};

function App() {
	return h`
         <button onClick=${usePush}>push</button>
         <ul $key>
           ${state.arr.map((todo) => h`<li>${todo}</li>`)}
         </ul>
     `;
}

function usePush() {
	setData(() => {
		state.arr.push(3);
	});
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="NWwYWYp" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/NWwYWYp">
  Strve.js-列表渲染</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

When using a list to render a page, if you insert data at the head of the list, you need to pass in the value of `useFirstKey` to avoid repeated rendering of `DOM` nodes, which is a must.

Any actions that operate on the head of the list, such as `unshift`, `pop` array methods, need to add this `useFirstKey` value. This is not required for other operations and has been optimized internally.

```js
const state = {
	arr: [1, 2],
};

function Home() {
	return render`
        <button onClick=${useUnshift}>unshift</button>
        <ul $key>
            ${state.arr.map((item) => render`<li>${item}</li>`)}
        </ul>
    `;
}

function useUnshift() {
	updateView(
		() => {
			state.arr.unshift('2');
		},
		{
			status: 'useFirstKey',
		}
	);
}
```

## Event-handling

We can use the `on` directive to listen to DOM events and execute some JavaScript when the event is fired. We recommend using this camelCase `onClick` method.

Also, you need to use the notation `${}` to bind events.

```js
const state = {
	msg: 'sayHello',
};

function App() {
	return h`
         <button onClick=${useClick}>${state.msg}</button>
     `;
}

function useClick() {
	alert('hello');
}
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="dyZmyex" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/dyZmyex">
  Strve.js-事件处理</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>

## Status

### useFirstKey

When you use list rendering, inserting data at the head of the list needs to bind the `useFirstKey` field to avoid repeated rendering of `DOM` nodes.

```js
const state = {
	arr: [1, 2],
};

function Home() {
	return render`
        <button onClick=${useUnshift}>unshift</button>
        <ul $key>
            ${state.arr.map((item) => render`<li>${item}</li>`)}
        </ul>
    `;
}

function useUnshift() {
	updateView(
		() => {
			state.arr.unshift('2');
		},
		{
			status: 'useFirstKey',
		}
	);
}
```

## Named-function-component

When we update component data, we do not need full comparison (such as the following h2, p tags, which do not belong to the content of Component1, so they do not need Diff comparison), just update the data in the component.

At this time, you need to pass an object in the second parameter of the `setData()` method, the object key is `name`, and the value is the function component that needs to be updated. In addition, what you also need to do is to wrap a `component` tag outside the function component in the parent component, and use the `$name` tag (for more information about tags, please see [Static-tags](/strvejs-doc/usage/#static-tags)), the value is the name of the function component.

```js
const state1 = {
	count: 0,
};

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
            <component $name="Component1">
                ${Component1()}
            </component>
        </div>
        `;
}

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
```

## Static-tags

### $key

When we change the data, a Diff comparison is performed internally to find the differences, and then the page is updated accordingly. However, some nodes that do not need to be updated, such as the button and h1 tags below, do not need to be compared. Only dynamic data nodes such as the p tag need to be updated, so we explicitly add the static tag `$key` to the tag.

```js
const state = {
	count: 0,
};

function App() {
	return h`
        <button onClick=${add}>add</button>
        <p $key>${state.count}</p>
        <h1>Hello Strve.js</h1>
`;
}

function add() {
	setData(() => {
		state.count++;
	});
}
```

In addition, in addition to adding tags to dynamic data nodes, you also need to pay attention to adding `$key` tags in some special scenarios, such as dynamically adding nodes and dynamically displaying and hiding nodes. Because, only nodes marked with `$key` will have the ability to be manipulated with their own DOM.

### $name

This tag needs to be used on the built-in tag `component` to indicate the internal component name, which must be the same as the function component name.

```js
const state1 = {
	count: 0,
};

function Component1() {
	return h`
        <h1 $key>${state1.count}</h1>
        <button onClick=${add1}>add1</button> 
        `;
}

function App() {
	return h`
        <component $name="Component1">
            ${Component1()}
        </component>
        `;
}

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
        <component $name="Component1">
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

function App() {
	return h`
        <button onClick=${useShow}>show</button>
        <div $key>
             ${state.isShow ? h`<p $key>Strve.js</p>` : h`<null $key></null>`}
        </div>
    `;
}

function useShow() {
	setData(() => {
		state.isShow = !state.isShow;
	});
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

	render = () => {
		return h`
            <button onClick=${this.goHome}>goHome</button>
            <h1 onClick=${this.useChange} $key>${this.state.msg}</h1>
    `;
	};

	useChange = () => {
		setData(() => {
			this.state.msg = 'Changed';
		});
	};

	goHome = () => {
		linkTo('/');
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
