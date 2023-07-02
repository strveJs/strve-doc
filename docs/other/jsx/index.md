# JSX Support

The common way we use Strve.js is to write HTML-like tags in tag templates. We know that this method is not particularly friendly in terms of smart code prompts and code formatting in some scenarios. Therefore, we provide a new coding method, we can use JSX syntax to write Strve.js. JSX is a JavaScript syntax extension that lets you write HTML-like tags in JavaScript files.

## Learn JSX syntax

We can go to React official documentation [https://zh-hans.react.dev/learn/writing-markup-with-jsx](https://zh-hans.react.dev/learn/writing-markup-with-jsx) to learn more about JSX syntax.

## Use

[createStrveApp](/tool/createStrveApp/) project scaffolding tool has been installed by default, select `strve-jsx` or `strve-jsx-apps` template.

After we use createStrveApp to build the Strve project, we will find that [babelPluginStrve](/tool/babelPluginStrve/), [babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/) are installed at the same time, because we need to use [babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/ ) to convert JSX to label templates, and then use [babelPluginStrve](/tool/babelPluginStrve/) to convert label templates to Virtual DOM, and then implement differentiated update views.