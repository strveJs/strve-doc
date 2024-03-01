# Change Log

::: tip
Although the version number uses the version number of Strve, the content includes not only the updated content of Strve, but also the updated content of other official tools in the same period.
:::

## v6.7.0 (Latest)

- Code refactoring and improving some APIs;
- Update [create-strve-app](https://www.npmjs.com/package/create-strve-app);

## v6.6.6

- The API and usage are overall optimized and updated to make it easier to use and more efficient;
- Update [strve-router](https://www.npmjs.com/package/strve-router);
- Update [create-strve-app](https://www.npmjs.com/package/create-strve-app);

## v6.2.6

- Optimize the Diff algorithm using the longest increasing subsequence;
- Added the usage of named components and introduced the **"isolated island"** feature;
- Event processing cancels the `@` abbreviation;
- Change API `setData`, `domInfo`;
- Delete API `defineCustomElement`, `propsData`;
- Delete the built-in properties `$props` and `$name`;
- Added built-in attributes `$render` and `$id`;
- Added APIs `createStateFlow` and `registerComponent`;
- Publish [strve-reactivity](https://www.npmjs.com/package/strve-reactivity)；
- Update [babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve);
- Update [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve);
- Update [strve-router](https://www.npmjs.com/package/strve-router);
- Update [create-strve-app](https://www.npmjs.com/package/create-strve-app);

## v6.0.2

- Remove `useFirstKey`;
- Added `key` attribute. This special attribute `key` is mainly used as a hint for Vue's virtual DOM algorithm and is used to identify vnode when comparing the old and new node lists. The double-ended Diff algorithm is used internally, which is more efficient;
- Remove static tag `$key`;
- Added built-in attribute `$ref`;
- Change API `h` to `html`;
- There must be one and only one root node, use the `<fragment></fragment>` tag;
- Update [babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve);
- Update [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve);
- Update [strve-router](https://www.npmjs.com/package/strve-router);
- Update [create-strve-app](https://www.npmjs.com/package/create-strve-app);
