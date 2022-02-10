# 介绍

Strve.js的读音/str'vi/，是字符串（String）与视图（View）的拼接。Strve.js是一个可以将字符串转换为视图的JS库。这里的字符串指的是模板字符串，所以你仅需要在JavaScript中开发视图。这里的视图指的就是我们平时写的HTML页面，也就是视图层。

Strve.js不仅易于上手，还便于灵活拆装不同的代码块。使用模板字符串开发视图主要是利用了原生JavaScript的能力，可以更加灵活地分离代码块，你仅仅只关注JavaScript文件。

Strve.js又是一款轻量级的MVVM框架，你只需要关心数据以及如何操作它，其他工作交给Strve.js内部处理。Strve.js首先会将模板字符串转化为虚拟DOM，然后进行Diff算法通过比较前后两次的状态差异更新真实DOM。这也是很多框架为了提升浏览器性能采用的方案，但是Strve.js更加轻量。

如果你想上手项目，那么请看下面怎么安装它吧！

<!-- <p class="codepen" data-theme-id="light" data-height="300" data-default-tab="js,result" data-slug-hash="MWOmyLW" data-preview="true" data-editable="true" data-user="maomincoding" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/maomincoding/pen/MWOmyLW">
  Strve.js</a> by maomincoding (<a href="https://codepen.io/maomincoding">@maomincoding</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<component :is="'script'" async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></component> -->