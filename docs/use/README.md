# Use

## Create view

Use the `createView` method to pass in an object, and the object properties are `el`, `data`, and `template`. `el` represents the DOM element to be mounted, `data` represents the observed data object, and `template` represents the DOM template string. After defining these three attributes, an expected view page can be generated.

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

## Conditional rendering
Only applicable to the first rendering.

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

## List rendering

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

## Event handling
The `eventListener` method has a total of three parameters, namely **DOM node**, **event name**, and **callback function**.

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

## Responsive data

### ref

For a single simple attribute.
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

For complex attributes.
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