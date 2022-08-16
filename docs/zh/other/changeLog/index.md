# 更新日志

## v4.3.0

- 添加`propsData`、`onMounted`、`onUnmounted`、`nextTick`、`domInfo`API；
- 移除`emit`、`watchDom`、`clone`API；
- 添加了`$props`标签；
- 添加`iife`文件格式，一个自动执行的功能，适合作为`<script>`标签；

## v3.1.0

- 修改API：

  | 旧 API          | 新 API     |
  | ---------------- | ----------- |
  | `Strve`          | `createApp` |
  | `render`         | `h`         |
  | `updateView`     | `setData`   |
  | `watchDOMChange` | `watchDom`  |
  | `emitEvent`      | `emit`      |
  | `strveVersion`   | `version`   |
  | `deepCloneData`  | `clone`     |

- 调整`createApp` API；
- `useFkey` 标签更改为 `useFirstKey`；
- 添加标签`$key`，`$name`；
- 添加组件标签`<component>`，空节点标签`<null>`；
- 调整`setData` API；
- 优化Diff算法；
- TypeScript 重构代码；

## v2.3.4

- 添加了数据深拷贝 API `deepCloneData`；

## v2.3.3

- `Strve` API 的参数调整；

## v2.3.2

- HTML标签内容支持显示非字符串类型；
- `${}` 符号用于数据绑定，不再支持`{}` 符号；
- 视图模板支持多个根节点；
- 视图模板支持文本节点；
- 修复条件渲染时切换状态，节点无法正确渲染的问题；
- 添加了 `watchDOMChange` API 用于监控 DOM 树的变化；
- 增加了对 HTML 模板字符串高亮的支持（VSCode 编辑器需要安装 `es6-string-html` 插件）；
- 移除 `Strve` API 的 `data` 属性参数；
- 视图模板支持Class写法；

## v2.3.1

- 修改一些错误信息；

## v2.3.0

- 添加了版本号`strveVersion` API；
- 修改`updateView` API的内部逻辑；

## v2.2.0

- 支持 SVG 元素；
- 优化内部diff算法；
- 增加必要的错误提示；

## v2.1.0

- 修复 DOM 属性属性无法赋值的问题；
- 改进将字符串转换为虚拟 DOM 的逻辑问题；

## v2.0.0

- 向链表头部插入数据需要绑定`useFkey`字段，避免`DOM`节点重复渲染；
- 渲染后隐藏“DOM”节点事件方法；
- 绑定`Style`样式（对象）；
- 绑定属性统一使用`${}`符号绑定；
- 支持 HTML 模板字符串高亮（VSCode 编辑器需要安装 `comment-tagged-templates` 插件）；
- 支持父子组件互相传值；
- 适配Bootstrap5、Tailwindcss UI框架；
