# 快速上手
尝试 Strve.js 最简单的方法是使用直接引入CDN链接。你可以在浏览器打开它，跟着例子学习一些基础用法。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Hello Strve.js</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, updateView, render } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.js';

        const state = {
            arr: ['1', '2'],
            msg: 'hello',
            a: 1
        };

        function App() {
            return render`
              <div class='inner'>
                  <p>{state.msg}</p>
                  <p>${state.a + state.a}</p> 
                  <button id='btn2' onclick=${usePush}>push</button>
                  <ul>
                    ${state.arr.map((todo) => render`<li key=${todo}>${todo}</li>`)}
                  </ul>
              </div>
          `;
        }

        function usePush() {
            updateView(() => {
                state.arr.push('3');
            });
        }

        Strve('#app', {
            data: { state },
            template: App
        });
    </script>
</body>

</html>
```

如果你还想深入学习其他关于 Strve.js 的内容，你可以继续往下阅读。