# Browser Compatibility

Because the Strve project build tool is built with [Vite](https://vitejs.dev/) by default, the default build target browser can support native ESM and native ESM dynamic import on the script tag. Legacy browsers can be supported through the official plugin `@vitejs/plugin-legacy`.

For example:

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
