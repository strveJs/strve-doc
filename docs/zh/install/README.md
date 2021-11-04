# 安装

## CDN

直接引入以下地址：
```html
<script src="https://cdn.jsdelivr.net/npm/strview@1.9.0/dist/strview.global.js"></script>
```

如果你使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件：

```html
<script type="module">
  import { createView } from 'https://cdn.jsdelivr.net/npm/strview@1.9.0/dist/strview.esm.js'
</script>
```
## NPM

最新稳定版本：`1.9.0`
```shell
npm install strview
```

## 命令行工具 (CLI)

`strviewApp`是基于`strview.js`的项目构建工具，您可以使用它更方便灵活地搭建页面。如何安装它，你可以使用`strviewCli`来快速安装`strviewApp`。

**全局安装**
```shell
npm install strview-cli -g
```

**查看版本**
```shell
strview-cli -v
```

**初始化项目**
```shell
strview-cli init <projectName>
```