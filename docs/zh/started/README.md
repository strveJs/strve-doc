# 快速上手
尝试 `Strview.js` 最简单的方法是使用 Hello World 例子。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。你可以使用CDN版本下的`strview.global.js`。使用这个文件，会将`Strview`全局暴露，您可以直接调用。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strview.js</title>
</head>

<body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/strview@1.9.0/dist/strview.global.js"></script>
    <script>
        Strview.createView({
            el: "#app",
            data: {
                msg: 'Hello World'
            },
            template: `<p>{msg}</p>`,
        });
    </script>
</body>

</html>

```
如下图所示：

<demo-1/>