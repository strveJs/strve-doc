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

下载**comment-tagged-templates**插件。在` render`` `方法中间加上`/* html */`。

```js
function App() {
    return render/* html */`
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

## UI框架

- Bootstrap5

[https://v5.bootcss.com/](https://v5.bootcss.com/)

- Tailwindcss

[https://www.tailwindcss.cn/](https://www.tailwindcss.cn/)


## 更新日志

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
