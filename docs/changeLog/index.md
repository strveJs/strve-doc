# Change Log

Although the version number is taken from the version number of Strve.js, the content not only contains the update content of Strve.js, but also the update content of other official tools in the same period.

## v5.6.2 (Latest)

- Optimize `onMounted`, `nextTick` API;
- Support JSX syntax;
- Update [babel-plugin-strve](https://www.npmjs.com/package/babel-plugin-strve), add call expression mode;
- Release [babel-plugin-jsx-to-strve](https://www.npmjs.com/package/babel-plugin-jsx-to-strve), which converts JSX to markup templates for use with Strve.js ;

## v5.1.1

- Add the compile module;
- Adjust the source code warehouse building module;
- Different versions:
  1. Full version: both the compiler (code used to compile template strings into JavaScript rendering functions) and the runtime version are included;
  2. Runtime: code used to create instances, render and process virtual DOM. Basically, it is to remove everything else from the compiler;
- The prefix of listening events can be abbreviated as @;
- Introducing compilers: Develop a babel plugin [(babel-plugin-strve)](https://www.npmjs.com/package/babel-plugin-strve) to render the HTML template string into a Virtual Dom, which is transferred from the previous runtime to the compilation time;
- Introducing Web Components:
  1. New defineCustomElement API supports the introduction of Web Components;
  2. Support for Web Components UI frameworks (e.g. https://quark-design.hellobike.com/);
  3. Add the customElement field in the setDataAPI to update the component view as needed;

## v4.3.0

- Add `propsData`、`onMounted`、`onUnmounted`、`nextTick`、`domInfo`API;
- remove `emit`、`watchDom`、`clone`API;
- Added `$props` tag;
- Added iife file format, an automatic function, suitable as `<script>` tag;

## v3.1.0

- Modify API:

  | Old API          | New API     |
  | ---------------- | ----------- |
  | `Strve`          | `createApp` |
  | `render`         | `h`         |
  | `updateView`     | `setData`   |
  | `watchDOMChange` | `watchDom`  |
  | `emitEvent`      | `emit`      |
  | `strveVersion`   | `version`   |
  | `deepCloneData`  | `clone`     |

- Adjust `createApp` API;
- `useFkey` tag changed to `useFirstKey`;
- add tags `$key`, `$name`;
- Add component tag `<component>`, empty node tag `<null>`;
- Adjust `setData` API;
- Optimize the Diff algorithm;
- TypeScript refactoring code;

## v2.3.4

- Added data deep copy API `deepCloneData`;

## v2.3.3

- Parameter adjustment of `Strve` API;

## v2.3.2

- HTML tag content supports displaying non-string types;
- The `${}` symbol is used for data binding, and the `{}` symbol is no longer supported;
- View templates support multiple root nodes;
- View template supports Text node;
- Fixed switching states during conditional rendering, and nodes could not be rendered correctly;
- Added `watchDOMChange` API for monitoring DOM tree changes;
- Added support for HTML template string highlighting (VSCode editor needs to install `es6-string-html` plugin);
- Remove the `data` attribute parameter of the `Strve` API;
- View templates support Class writing;

## v2.3.1

- Modify some error messages;

## v2.3.0

- Added version number `strveVersion` API;
- Modify the internal logic of `updateView` API;

## v2.2.0

- Support SVG elements;
- Optimize internal diff algorithm;
- Add necessary error prompt;

## v2.1.0

- Fixed the problem that the DOM attribute property could not be assigned;
- Improve the logical problem of converting strings to virtual DOM;

## v2.0.0

- Inserting data into the head of the list needs to bind the `useFkey` field to avoid repeated rendering of the `DOM` node;
- Hide the `DOM` node event method after rendering;
- Bind the `Style` style (object);
- The binding properties are uniformly bound using the `${}` symbol;
- Support HTML template string highlighting (VSCode editor needs to install `comment-tagged-templates` plugin);
- Support parent and child components to pass values to each other;
- Adapt to Bootstrap5、Tailwindcss UI framework;
