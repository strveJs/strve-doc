# 基本使用

## 创建视图
使用`createView`方法传入一个对象，对象属性分别为`el`、`data`、`template`。`el`表示为要挂载的DOM 元素，`data`表示为观察的数据对象，`template`表示为DOM模板字符串。定义好这三个属性之后就可以生成一个预想的视图页面。

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
                msg: 'Hello Strview.js'
            },
            template: `<p>{msg}</p>`,
        });
    </script>
</body>

</html>
```

<demo2/>

## 条件渲染
只适用于初次渲染。

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
        let isOk = false;
        Strview.createView({
            el: "#app",
            data: {
                msg: 'Hello Strview.js',
                isOk:false
            },
            template: `
            <p>{msg}</p>
            ${isOk ? `<span>hide</span>` : ''}
            `,
        });
    </script>
</body>

</html>
```

<demo2/>

## 列表渲染

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
        let liNodes = ``;
        for (let index = 1; index < 3; index++) {
            liNodes += `<li>${index}</li>`
        }
        const app = Strview.createView({
            el: '#app',
            template: `<ul>${liNodes}</ul>`
        })
    </script>
</body>

</html>
```
<demo3/>

## 事件处理
`eventListener`方法一共有三个参数，分别是**DOM节点**、**事件名称**、**回调函数**。

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
                msg: 'Hello Strview.js',
            },
            template: `
            <p>{msg}</p>
            `,
        });

        Strview.eventListener('p', 'click', () => {
            console.log(1);
        });
    </script>
</body>

</html>
```

> 1

## 响应性数据

### ref

针对单一简单属性。
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
                msg: 'Hello Strview.js',
            },
            template: `
            <p>{msg}</p>
            `,
        });

        Strview.eventListener('p', 'click', () => {
            Strview.ref().msg = 1;
        });
    </script>
</body>

</html>
```

### reactive
针对复杂属性。
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
                obj: {
                    a: 1,
                    b: 2
                }
            },
            template: `
            <button class="btn1">change</button>
            <p>{obj.a}</p>
            <p>{obj.b}</p>
            `,
        });

        Strview.eventListener('.btn1', 'click', () => {
            Strview.reactive()['obj.a'] = 2;
            Strview.reactive().obj.b = 3;
        });
    </script>
</body>

</html>
```