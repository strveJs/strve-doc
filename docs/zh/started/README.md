# 开始
尝试 Strve.js 最简单的方法是使用直接引入CDN链接。你可以在浏览器打开它，跟着例子学习一些基础用法。

需要注意的是，Strve.js源代码是用ES Modules管理的，所以在浏览器直接使用就需要在`script`标签上添加一个`type="module"`的属性来表示这个文件是作为`module`的方式来运行的。

如果你还想深入学习其他关于 Strve.js 的内容，你可以继续往下阅读。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Strve.js</title>
</head>

<body>
    <div id="app"></div>
    <script type="module">
        import {
            Strve,
            updateView,
            render,
            emitEvent
        } from "https://cdn.jsdelivr.net/npm/strvejs@2.3.3/dist/strve.esm.min.js";
        const state = {
            arr: [
                {
                    id: "1",
                    txt: "1"
                },
                {
                    id: "2",
                    txt: "2"
                },
                {
                    id: "3",
                    txt: "3"
                }
            ],
            msg: "hello",
            a: 2,
            style: {
                color: "red",
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
            return render`
                    <h1 onClick=${emitData}>${v}</h1>
                    <ul class="list-group">
                        ${state.arr.map((todo) => 
                            render`
                            <li class="list-group-item">${todo.txt}</li>`)
                        }
                    </ul>
            `;
        }

        function emitData() {
            emitEvent(
                "getTit",
                {
                    detail: { title: "This is title!" }
                },
                ".component1"
            );
        }

        function App() {
            return render`
              <div class='inner'>
                  <p style="${state.style}">${state.obj.a.b.c}</p>
                  <input type="text" class="form-control" value=${state.obj.a.b.c}/>
                  <p>${state.msg}</p>
                  <p>${state.a + state.a}</p>
                  <button type="button" onClick=${useChange}>Change</button>
                  <button type="button" onClick=${usePush}>Push</button>
                  <div onGetTit=${getTit} class="component1">
                    ${Component1(state.msg)}
                  </div>
              </div >
          `;
        }

        function getTit(event) {
            updateView(() => {
                state.msg = event.detail.title;
            });
        }

        function useChange() {
            updateView(() => {
                state.arr.splice(1, 1, {
                    id: "0",
                    txt: "0"
                });
            });
        }

        let count = 4;
        function usePush() {
            updateView(() => {
                let a = count++;
                state.arr.push({
                    id: a,
                    txt: a
                });
                // state.obj.a.b.c = 3;
                // state.style.color = 'blue';
                // state.arr.length = 2;
                // state.arr[1] = {
                //     id: '4',
                //     txt: '4'
                // }
                // state.msg = 'world';

                // state.arr.pop();
                // state.arr.unshift({
                //     id: a,
                //     txt: a
                // });
                // state.arr.shift();
            });
            // 'useFkey'
        }

        Strve("#app", App);

    </script>
</body>

</html>
```

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWOmyLW" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOmyLW">
  Strve.js-示例</a> by Vam (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component>