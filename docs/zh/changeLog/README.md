# 更新日志

## v2.3.4

- 增加数据深拷贝API`deepCloneData`；
## v2.3.3

- `Strve`API的参数调整；

## v2.3.2

- HTML标签内容支持显示非字符串类型；
- 数据绑定统一使用`${}`符号绑定，不再支持`{}`符号；
- 视图模板支持多个根节点；
- 视图模板支持Text节点；
- 修复条件渲染时切换状态，无法正确渲染节点；
- 增加`watchDOMChange`API，用于监视DOM树变化；
- 增加支持HTML模板字符串高亮显示（VSCode编辑器需安装 `es6-string-html` 插件）；
- 删除`Strve`API的`data`属性参数；
- 视图模板支持Class类写法；
## v2.3.1

- 修改部分错误提示；

## v2.3.0

- 加入版本号`strveVersion`API；
- 修改`updateView`API内部逻辑；
## v2.2.0

- 支持SVG元素；
- 优化内部Diff算法；
- 加入必要的错误提示；

## v2.1.0

- 修复DOM属性property无法赋值的问题；
- 完善字符串转换为虚拟DOM逻辑问题；

## v2.0.0

- 向链表头部插入数据需要绑定`useFkey`字段，避免`DOM`节点重复渲染；

- 渲染后隐藏“DOM”节点事件方法；
   
- 绑定`Style`样式（对象）；
   
- 绑定属性统一使用`${}`符号绑定；
   
- 支持 HTML 模板字符串高亮（VSCode 编辑器需要安装 `comment-tagged-templates` 插件）；
   
- 支持父子组件互相传值；

- 适配Bootstrap5、Tailwindcss UI框架；