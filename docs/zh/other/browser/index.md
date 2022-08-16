# 浏览器兼容性

由于Strve.js项目构建工具默认使用[Vite](https://vitejs.dev/)构建，所以默认构建目标浏览器可以支持原生ESM和脚本标签上原生ESM动态导入。 通过官方插件`@vitejs/plugin-legacy` 可以支持旧版浏览器。

例如：

```js
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
	// options
	server: {
		strictPort: true,
		port: 3001,
	},
	plugins: [
		legacy({
			targets: ['ie >= 9'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		}),
	],
});
```
