# API

## createApp

- 参数：

  - `Function`

- 详情：

传入一个函数，也就是需要渲染的模板函数。 您可以在 `createApp` 之后链接其他应用程序 API。

```js
function App() {
	return h`
            <h1>Hello</h1>
	`;
}

createApp(App).mount('#app');
```

### mount

- 参数：

  - `HTMLElement | String`

- 详情：

挂载根组件。 提供的 DOM 元素的 innerHTML 将替换为应用程序根组件的模板渲染。

## h

- 参数：

  - `Function`

- 详情：

` h`` `是一个标签函数，标签函数的语法是直接在函数名后跟一个模板字符串。 例如，您可以直接在模板字符串中编写 HTML 标记。

```js
function App() {
	return h`
             <div class='inner'>
                 <h1>Hello</h1>
             </div>
    `;
}
```

如果你使用的是 VSCode 编辑器，你可以去商店下载 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 插件，然后 , 在 ` h`` ` 之间添加 `/*html*/`。

就这样，在 VSCode 编辑器中，这个插件可以使 HTML 模板字符高亮。

![](/code1.png)

## setData

- 参数：

  - `Function`
  - `Object` (可选)

- 详情：

第一个参数是一个函数。 函数体需要执行会改变页面状态的值，比如下面例子中的`state.msg`。

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

第二个参数为对象类型，可选属性如下：

| 特性 | 功能 |
| --- | --- |
| status | 标识字符串类型的特殊状态字段。 具体属性值请参考 [status](/zh/essentials/usage/#status) |
| name | 函数组件的名称，类型为 `Function`（与`customElement`属性搭配使用时类型为`String`）， 直接传入一个函数组件，请参考 [命名功能组件](/zh/essentials/usage/#命名功能组件) |
| customElement | 原生自定义组件对象，类型为Object。直接传入[defineCustomElement](/zh/essentials/api/#definecustomelement) 第一个参数即可。另外，需与`name='useCustomElement'`搭配使用，以便根据需要更新组件视图|

## version

- 详情：

直接获取 Strve.js 的版本号。

## onMounted

- 参数：

  - `Function`

- 详情：

生命周期钩子函数：节点挂载完成时触发。

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

- 参数：

  - `Function`

- 详情：

生命周期钩子函数：当页面被销毁时调用。

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

- 参数

  - `Function`

- 详情：

在更改一些数据后立即使用它以等待 DOM 更新。

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

- 详情：

它是一个 DOM 信息对象，你可以在 DOM 中的 `$key` 中定义一个属性。

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

- 详情：

从组件传递值时需要使用它。

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

- 参数：

  - `Object`
  - `String`

- 详情：

支持 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 的引入。

第一个参数是对象类型，对象属性如下：

|属性|类型|必选|含义|
|-|-|-|-|
|id|`String`|是|原生自定义组件ID，应保持其唯一性|
|template|`Function`|是|返回一个模版字符串函数|
|styles|`Array<string>`|否|原生自定义组件样式集合|
|attributeChanged|`Array<string>`|否|原生自定义组件监听属性集合|
|immediateProps|`Boolean`|否|原生自定义组件是否开启立即监听属性变化|
|lifetimes|`Object`|否|原生自定义组件生命周期，与[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)生命周期一致|

第二个参数是字符串类型，原生自定义组件的名称，名称中必须含有`-`字段。

示例1：
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
示例2：
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