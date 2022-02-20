# Started

The easiest way to try Strve.js is to use direct ingest CDN links. You can open it in your browser and follow the example to learn some basic usage.

It should be noted that the source code of Strve.js is managed by ES Modules, so when using it directly in the browser, you need to add a `type="module"` attribute to the `script` tag to indicate that this file is used as a `module' ` way to run.

If you want to learn more about Strve.js in depth, you can read on.

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