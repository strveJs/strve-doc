# 快速上手
尝试 Strve.js 最简单的方法是使用直接引入CDN链接。你可以在浏览器打开它，跟着例子学习一些基础用法。
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Strve.js</title>
    <style>
        .inner {
            width: 900px;
            margin: 40px auto;
            text-align: center;
            padding: 40px;
            box-shadow: 0 0 20px #ccc;
        }

        button {
            margin: 10px;
        }
    </style>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import { Strve, updateView, render, emitEvent } from 'https://cdn.jsdelivr.net/npm/strvejs/dist/strve.esm.js';
        const state = {
            arr: [{
                id: '1',
                txt: '1'
            }, {
                id: '2',
                txt: '2'
            }, {
                id: '3',
                txt: '3'
            }, {
                id: '4',
                txt: '4'
            }],
            msg: 'hello',
            a: 2,
            style: {
                color: 'red',
                fontSize: "40px"
            },
            obj: {
                a: {
                    b: {
                        c: 1
                    }
                }
            }
        };

        function Component1(v) {
            return render/* html */`
                    <h1 onClick=${emitData}>${v}</h1>
                    <ul class="list-group">
                        ${state.arr.map((todo) => render/* html */`<li class="list-group-item">${todo.txt}</li>`)}
                    </ul>
            `
        }

        function emitData() {
            emitEvent('getTit', {
                detail: { title: 'This is title!' },
            }, '.component1')
        }

        function App() {
            return render/* html */`
              <div class='inner'>
                  <p style="${state.style}">{state.obj.a.b.c}</p>
                  <input type="text" class="form-control" value=${state.obj.a.b.c}/>
                  <p>${state.msg}</p>
                  <p>${state.a + state.a}</p>
                  <button type="button" class="btn btn-primary" onClick=${useChange}>Change</button>
                  <button type="button" class="btn btn-primary" onClick=${usePush}>Push</button>
                  <div onGetTit=${getTit} class="component1">
                    ${Component1(state.msg)}
                  </div>
              </div >
          `;
        }

        function getTit(event) {
            updateView(() => {
                state.msg = event.detail.title;
            })
        }

        function useChange() {
            updateView(() => {
                state.arr.splice(1, 1, {
                    id: '0',
                    txt: '0'
                });
            })
        }

        let count = 5;
        function usePush() {
            updateView(() => {
                // state.obj.a.b.c = 3;
                // state.style.color = 'blue';
                // state.arr.length = 2;
                // state.arr[1] = {
                //     id: '4',
                //     txt: '4'
                // }
                // state.msg = 'world';
                let a = count++;
                state.arr.push({
                    id: a,
                    txt: a
                })
                // state.arr.pop();
                // state.arr.unshift({
                //     id: a,
                //     txt: a
                // });
                // state.arr.shift();
            });
            // 'useFkey'
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