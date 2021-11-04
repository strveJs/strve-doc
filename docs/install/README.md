# Install

## CDN

Directly introduce the following address：
```html
<script src="https://cdn.jsdelivr.net/npm/strview@1.9.0/dist/strview.global.js"></script>
```

If you use native ES Modules, there is also a build file compatible with ES Module：

```html
<script type="module">
  import { createView } from 'https://cdn.jsdelivr.net/npm/strview@1.9.0/dist/strview.esm.js'
</script>
```
## NPM

Latest stable version：`1.9.0`
```shell
npm install strview
```

## CLI

`strviewApp` is a project building tool based on `strview.js`, you can use it to build pages more conveniently and flexibly. How to install it, you can use `strviewCli` to quickly install `strviewApp`.

**Global installation**
```shell
npm install strview-cli -g
```

**View version**
```shell
strview-cli -v
```

**Initialize the project**
```shell
strview-cli init <projectName>
```