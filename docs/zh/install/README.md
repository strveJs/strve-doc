# 安装

## CDN

如果你使用原生 ES Modules。

```html
<script type="module">
	import {
		h,
		createApp,
	} from 'https://cdn.jsdelivr.net/npm/strvejs@3.2.0/dist/strve.esm.min.js';
</script>
```

## NPM

<a href="https://npmjs.com/package/strvejs"><img src="https://badgen.net/npm/v/strvejs" alt="npm package"></a>

```shell
npm i strvejs
```

## 命令行工具

### create-strve-app

<a href="https://npmjs.com/package/create-strve-app"><img src="https://badgen.net/npm/v/create-strve-app" alt="npm package"></a>

一套快速搭建 Strve.js 项目的命令行工具。与早期的脚手架 Create Strve 相比，Create Strve App 更胜一筹，可直接输入命令快速创建 Strve 项目。Create Strve App 是用[Vite](https://vitejs.dev/)来构建的，它是一种新型前端构建工具，能够显著提升前端开发体验。

**npm**

```bash
npm init strve-app@latest
```

**yarn**

```bash
yarn create strve-app
```

**pnpm**

```bash
pnpm create strve-app
```

### create-strve

<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

Create Strve 是基于 Strve.js 的项目构建工具，您可以使用它更方便灵活地搭建页面。

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
