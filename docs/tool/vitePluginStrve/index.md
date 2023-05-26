# vitePluginStrve

[vitePluginStrve](https://www.npmjs.com/package/vite-plugin-strve) is a Vite plugin for compiling files ending with `.strve`.

## Install

```bash
npm i vite-plugin-strve -D
```

## Usage

```js
// vite.config.js
import { defineConfig } from 'vite';
import { strve } from 'vite-plugin-strve';

export default defineConfig({
	plugins: [strve()],
});
```