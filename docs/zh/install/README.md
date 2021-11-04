# 安装

## CDN

如果你使用原生 ES Modules。

```html
<script type="module">
 import { Strve, render, useEvent, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs@1/dist/strve.esm.min.js';
</script>
```
## NPM
<a href="https://npmjs.com/package/strvejs"><img src="https://badgen.net/npm/v/strvejs" alt="npm package"></a>

```shell
npm i strvejs
```

## 命令行工具
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

`create-strve`是基于`strve.js`的项目构建工具，您可以使用它更方便灵活地搭建页面。

**全局安装**

```shell
npm install create-strve -g
```

**查看版本**
```shell
create-strve -v
```

**初始化项目**
```shell
create-strve init <projectName>
```