# 快速上手
尝试 `Strve.js` 最简单的方法是使用直接引入CDN链接。你可以在浏览器打开它，跟着例子学习一些基础用法。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Strve.js</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, render, useEvent, updateView } from 'https://cdn.jsdelivr.net/npm/strvejs@1/dist/strve.esm.min.js';

        const state = {
            arr: ['1', '2'],
        };

        function App() {
            return render`
              <div class='inner'>
                  <button id='btn2'>push</button>
                  <ul>
                    ${state.arr.map((todo) => render`<li key=${todo}>${todo}</li>`)}
                  </ul>
              </div>
          `;
        }

        Strve('#app', {
            data: Object.assign(state),
            template: App,
            ways: [useEvent('#btn2', 'click', f2)],
        });

        function f2() {
            updateView(() => {
                state.arr.push('3');
            });
        }
    </script>
</body>

</html>
```