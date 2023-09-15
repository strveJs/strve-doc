# JSX Support

The common way we use Strve is to write HTML-like tags in tag templates. We know that this method is not particularly friendly in terms of code intelligent prompts and code formatting in some scenarios. Therefore, we provide a new coding method, we can use JSX syntax to write Strve. JSX is a JavaScript syntax extension that allows you to write HTML-like tags in JavaScript files.

## Learn JSX syntax

We can go to React official documentation [https://react.dev/learn/writing-markup-with-jsx](https://react.dev/learn/writing-markup-with-jsx) to learn more about JSX syntax.

## Use

[CreateStrveApp](/tool/createStrveApp/) The project scaffolding tool has been installed by default. Just select the `strve-jsx` or `strve-jsx-apps` template.

::: tip
After we use CreateStrveApp to build the Strve project, we will find that [babelPluginStrve](/tool/babelPluginStrve/) and [babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/) are also installed. This is because we need to use [babelPluginJsxToStrve](/tool/babelPluginJsxToStrve/ ) Convert JSX to a tag template, and then use [babelPluginStrve](/tool/babelPluginStrve/) to convert the tag template to Virtual DOM to achieve differentiated update views.
:::