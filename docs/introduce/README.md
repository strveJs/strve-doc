# Introduce

The pronunciation of Strve.js /str'vi/ is the concatenation of String and View. Strve.js is a JS library that can convert strings into views. The string here refers to the template string, so you only need to develop the view in JavaScript. Strve.js is not only easy to use, but also easy to flexibly disassemble and assemble different code blocks.


Using template strings to develop views mainly takes advantage of the capabilities of native JavaScript, which can separate code blocks more flexibly. You only focus on JavaScript files. From another point of view, the current source code file is only about 4kb, of course, this is the size of the current version of the file. In later versions, features will be added, and the amount of code will definitely increase. However, Strve.js will try its best to be lightweight.

Strve.js is a lightweight MVVM framework, you only need to care about the data and how to operate it, and other tasks are handled internally by Strve.js. Strve.js first converts the template string into a virtual DOM, and then performs the Diff algorithm to update the real DOM by comparing the state difference between the two before and after. This is also a scheme adopted by many frameworks to improve browser performance, but Strve.js is more lightweight.

Strve.js currently only has 3 APIs, is it easy to get started? If you want to get started with the project, please see how to install it below!