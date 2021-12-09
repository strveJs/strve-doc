# 工具

## create-strve
<a href="https://npmjs.com/package/create-strve"><img src="https://badgen.net/npm/v/create-strve" alt="npm package"></a>

在前面我们也简单介绍过，`create-strve`是基于`Strve.js`的项目构建工具，您可以使用它更方便灵活地搭建页面。`create-strve`是用[Vite](https://vitejs.dev/)来构建的，它是一种新型前端构建工具，能够显著提升前端开发体验。

### 安装

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

### 启动

```shell
yarn dev
# OR
npm run dev
```

### 部署

```shell
yarn build
# OR
npm run build
```

### 配置

因为`create-strve`是用[Vite](https://vitejs.dev/)来构建的，所以你可以按照[Vite](https://vitejs.dev/)的约定配置进行自定义配置`create-strve`。