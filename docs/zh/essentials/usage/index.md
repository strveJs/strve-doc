# 用法

## 数据绑定

Strve.js 使用基于 JavaScript 的模板字符串语法，允许开发人员以声明方式将 DOM 绑定到底层实例的数据。 所有 Strve.js 模板字符串都是有效的 HTML，因此可以被符合规范的浏览器和 HTML 解析器解析。

在底层，Strve.js 将模板字符串编译成虚拟 DOM 渲染函数并最小化 DOM 操作。

在 Strve.js 中，你可以随心所欲地使用 JavaScript 模板字符串，感受它的独特魅力！

### 文本

数据绑定中文本绑定的形式是使用符号`${}`。

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

### 表达式

使用符号 `${}` 中的表达式。

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

## 属性绑定

使用符号 `${}` 将值绑定到属性 `value`。

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

此外，您还可以绑定其他属性，例如 `class`。

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

如果你想绑定 `style` 属性，你也可以。

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

## 条件渲染

使用符号 `${}`，仅当指令的表达式返回 `true` 值时才会显示标签。

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
                  ${
										state.isShow
											? h`<p $key>Strve.js</p>`
											: h`<null $key></null>`
									}
             </div>
    `;
}
```

## 列表渲染

我们可以使用符号 `${}` 渲染基于数组的列表。 比如我们使用数组的`map`方法来渲染列表，我们可以动态添加数组项。

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

使用列表渲染页面时，如果在列表头部插入数据，需要传入`useFirstKey`的值，避免重复渲染`DOM`节点，这是必须的。

任何对链表头部进行操作的动作，比如`unshift`、`pop`数组方法，都需要加上这个`useFirstKey`值。 这对于其他操作不是必需的，并且已在内部进行了优化。

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

## 事件处理

我们可以使用 `on` 指令来监听 DOM 事件并在事件触发时执行一些 JavaScript。 我们推荐使用这种驼峰式命名法，比如`onClick`。

此外，您需要使用符号 `${}` 来绑定事件。

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

使用列表渲染时，在列表头部插入数据需要绑定`useFirstKey`字段，避免重复渲染`DOM`节点。

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

## 命名功能组件

我们更新组件数据时，不需要全量比较（比如下面的 h2、p 标签，它们不属于 Component1 的内容，所以不需要 Diff 比较），只需要更新组件中的数据即可。

这时候需要在`setData()`方法的第二个参数中传入一个对象，对象键为`name`，值为需要更新的函数组件。 另外，你还需要在父组件中，在函数组件外包裹一个`component`标签，并使用`$name`标签（静态标签的更多信息请看[静态标签](/zh/essentials/usage/#静态标签)），该值为功能组件的名称。

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

## 静态标签

### $key

当我们更改数据时，内部会进行一次 Diff 比较以找出差异，然后相应地更新页面。 但是有些不需要更新的节点，比如下面的 `<button>` 和 `<h1>` 标签，是不需要比较的。 只有 `<p>` 标签等动态数据节点需要更新，所以我们显式地在标签中添加静态标签 `$key`。

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

另外，动态数据节点除了添加标签外，还需要注意在一些特殊场景下添加`$key`标签，比如动态添加节点、动态显示和隐藏节点等。 因为，只有标有 `$key` 的节点才能使用自己的 DOM 进行操作。

### $name

该标签需要用在内置标签`component`上，表示内部组件名称，必须与功能组件名称相同。

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

该标签与 [propsData](/zh/essentials/api/#propsdata) 配合使用，例如需要在子组件中向父组件传递数据。

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

## 内置标签

### component

一个组件标签，它在标签内包裹了一个功能组件。

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

空标签。 可以理解为占位符标签，不会渲染到页面中。

通常用于条件渲染。

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
                 ${
										state.isShow
											? h`<p $key>Strve.js</p>`
											: h`<null $key></null>`
									}
            </div>
    `;
}
```

### fragment

创建一个文档片段标签。它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会对性能产生影响。

```js
const state = {
	x: 0,
	y: 0,
};

function App() {
	return $h`
            <fragment>
                <h1 $key>Mouse position is at: ${state.x}, ${state.y}</h1>
            </fragment>
    `;
}
```

## 组件模式

组件可以定义为三种模式，即：

- Class 模式；
- 构造函数模式；
- 原型模式；

**Class 模式**

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

**构造函数模式**

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

**原型模式**

此模式具有缓存机制。

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
