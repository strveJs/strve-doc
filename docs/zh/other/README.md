# 其它

## IDE支持

### Visual Studio Code

- 模板字符串自动补全标签

打开设置下的`settings.json`，加入如下代码：

```json
"emmet.triggerExpansionOnTab": true,
"emmet.showAbbreviationSuggestions": true,
"emmet.showExpandedAbbreviation": "always",
"emmet.includeLanguages": {
    "javascript": "html"
}
```

- 支持HTML模板字符串高亮显示

下载[es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)插件后，在` render`` `方法中间加上`/*html*/`。

```js
function App() {
    return render/*html*/`
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

就像这样，在VSCode编辑器中，这个插件可以使HTML模板字符高亮显示。

![](../../.vuepress/public/img/code1.png)

## UI框架

- Bootstrap5

[https://v5.bootcss.com/](https://v5.bootcss.com/)

- Tailwindcss

[https://www.tailwindcss.cn/](https://www.tailwindcss.cn/)


## 浏览器兼容性

因为Strve.js项目构建工具默认采用[Vite](https://vitejs.dev/)来搭建的，所以默认的构建目标浏览器是能 在 script 标签上支持原生 ESM 和 原生 ESM 动态导入。传统浏览器可以通过官方插件`@vitejs/plugin-legacy`支持。

例如：
```js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // options
  server: {
    strictPort:true,
    port: 3001
  },
  plugins: [
    legacy({
      targets: ['ie >= 9'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
});
```

## 更新日志
### v2.3.3

- `Strve`API的参数调整；

### v2.3.2

- HTML标签内容支持显示非字符串类型；
- 数据绑定统一使用`${}`符号绑定，不再支持`{}`符号；
- 视图模板支持多个根节点；
- 视图模板支持Text节点；
- 修复条件渲染时切换状态，无法正确渲染节点；
- 增加`watchDOMChange`API，用于监视DOM树变化；
- 增加支持HTML模板字符串高亮显示（VSCode编辑器需安装 `es6-string-html` 插件）；
- 删除`Strve`API的`data`属性参数；
- 视图模板支持Class类写法；
### v2.3.1

- 修改部分错误提示；

### v2.3.0

- 加入版本号`strveVersion`API；
- 修改`updateView`API内部逻辑；
### v2.2.0

- 支持SVG元素；
- 优化内部Diff算法；
- 加入必要的错误提示；

### v2.1.0

- 修复DOM属性property无法赋值的问题；
- 完善字符串转换为虚拟DOM逻辑问题；

### v2.0.0

- 向链表头部插入数据需要绑定`useFkey`字段，避免`DOM`节点重复渲染；

- 渲染后隐藏“DOM”节点事件方法；
   
- 绑定`Style`样式（对象）；
   
- 绑定属性统一使用`${}`符号绑定；
   
- 支持 HTML 模板字符串高亮（VSCode 编辑器需要安装 `comment-tagged-templates` 插件）；
   
- 支持父子组件互相传值；

- 适配Bootstrap5、Tailwindcss UI框架；

## 关于作者

- 英文名：**Vam**
- 昵称ID：**maomincoding**
- Github：[https://github.com/maomincoding](https://github.com/maomincoding)
- Twitter：[https://twitter.com/maomincoding](https://twitter.com/maomincoding)
- 微信公众号：前端历劫之路
