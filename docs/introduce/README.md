# Introduce

The pronunciation of Strve.js /str'vi/ is the splicing of a string (String) and a view (View). Strve.js is a JS library that can convert strings to views. The strings here refer to template strings, so you only need to develop the view in JavaScript. The view here refers to the HTML page we usually write, that is, the view layer.

Strve.js is not only easy to use, but also flexible to disassemble different code blocks. Using template strings to develop views mainly takes advantage of the capabilities of native JavaScript, which allows for more flexible separation of code blocks, and you only focus on JavaScript files.

Strve.js is another lightweight MVVM framework, you only need to care about the data and how to operate it, and leave the rest to Strve.js for internal processing. Strve.js first converts the template string into a virtual DOM, and then performs the Diff algorithm to update the real DOM by comparing the state differences between the two before and after. This is also the solution used by many frameworks to improve browser performance, but Strve.js is more lightweight.

If you want to get started with the project, then see how to install it below!