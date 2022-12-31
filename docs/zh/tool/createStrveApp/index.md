# createStrveApp

一套用于快速构建 Strve.js 项目的命令行工具。 与早期的脚手架 Create Strve 相比，Create Strve App 更好，可以直接输入命令快速创建 Strve 项目。 Create Strve App 是使用 [Vite](https://vitejs.dev/) 构建的，这是一个新的前端构建工具，可以显着提升前端开发体验。

## 搭建您的第一个 Strve 项目

### npm

```bash
npm init strve-app@latest
```

### yarn

```bash
yarn create strve-app
```

### pnpm

```bash
pnpm create strve-app
```

## 选择一个模板

您可以根据需要选择相应的模板。

- strve

仅包含 Strve.js 的基本功能。 该模板适用于项目中只有一个页面且不跳转到其他页面的应用。

- strve-apps

不仅包含了 Strve.js 的基本功能，还包含了 Strve Router，适用于跳转多个页面以及稍微复杂一些的应用。
