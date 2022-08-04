# Change Log

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
