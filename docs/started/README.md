# Started

The easiest way to try Strve.js is to use the direct import CDN link. You can open it in your browser and follow the examples to learn some basic usage.

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

If you want to learn more about Strve.js in depth, you can continue reading.