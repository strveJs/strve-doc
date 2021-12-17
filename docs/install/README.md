# Install

## CDN

If you use native ES Modules.

```html
<script type="module">
  import { Strve, render, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.min.js';
</script>
```
## NPM
<a href="https://npmjs.com/package/strvejs"><img src="https://badgen.net/npm/v/strvejs" alt="npm package"></a>

```shell
npm i strvejs
```

## CLI

### create-strve-app
<a href="https://npmjs.com/package/create-strve-app"><img src="https://badgen.net/npm/v/create-strve-app" alt="npm package"></a>

A set of command line tools to quickly build Strve.js projects. Compared with the early scaffolding Create Strve, Create Strve App is better, you can directly enter commands to quickly create Strve projects. Create Strve App is built with [Vite](https://vitejs.dev/), which is a new front-end construction tool that can significantly improve the front-end development experience.

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

Create Strve is a project building tool based on Strve.js, you can use it to build pages more conveniently and flexibly.

**Global installation**

```shell
npm install create-strve -g
```

**View version**
```shell
create-strve -v
```

**Initialize the project**
```shell
create-strve init <projectName>
```