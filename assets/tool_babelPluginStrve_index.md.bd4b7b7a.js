import{_ as s,c as a,o as e,a as n}from"./app.24161ae2.js";const D=JSON.parse('{"title":"babelPluginStrve","description":"","frontmatter":{},"headers":[{"level":2,"title":"Install","slug":"install"},{"level":2,"title":"Usage","slug":"usage"},{"level":2,"title":"Options","slug":"options"},{"level":3,"title":"tag=html","slug":"tag-html"},{"level":2,"title":"Expression Pattern","slug":"expression-pattern"}],"relativePath":"tool/babelPluginStrve/index.md"}'),l={name:"tool/babelPluginStrve/index.md"},o=n(`<h1 id="babelpluginstrve" tabindex="-1">babelPluginStrve <a class="header-anchor" href="#babelpluginstrve" aria-hidden="true">#</a></h1><p><a href="https://www.npmjs.com/package/babel-plugin-strve" target="_blank" rel="noopener noreferrer">babel-plugin-strve</a> is a babel plugin that converts HTML template strings into Virtual Dom. Dramatically improved rendering performance by moving from previous runtime to compile time.</p><h2 id="install" tabindex="-1">Install <a class="header-anchor" href="#install" aria-hidden="true">#</a></h2><div class="language-bash"><span class="copy"></span><pre><code><span class="line"><span style="color:#EEFFFF;">npm install babel-plugin-strve</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><a href="/strve-doc/tool/createStrveApp/">CreateStrveApp</a> The project scaffolding tool is installed by default.</p></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><p>In your Babel configuration (<code>.babelrc</code>, <code>babel.config.js</code>, <code>babel</code> field in <code>package.json</code>, etc.), add the plugin:</p><div class="language-json"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> </span><span style="color:#89DDFF;">[[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">babel-plugin-strve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h2><h3 id="tag-html" tabindex="-1">tag=html <a class="header-anchor" href="#tag-html" aria-hidden="true">#</a></h3><p>By default, <a href="https://www.npmjs.com/package/babel-plugin-strve" target="_blank" rel="noopener noreferrer">babel-plugin-strve</a> will process all markup templates with a markup function named <code>html</code>. To use a different name, use the <code>tag</code> option in your <code>Babel</code> configuration:</p><div class="language-json"><span class="copy"></span><pre><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">plugins</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#EEFFFF;">    </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#EEFFFF;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">babel-plugin-strve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#EEFFFF;">      </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#EEFFFF;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">tag</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#EEFFFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">html</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#EEFFFF;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#EEFFFF;">    </span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#EEFFFF;">  </span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="expression-pattern" tabindex="-1">Expression Pattern <a class="header-anchor" href="#expression-pattern" aria-hidden="true">#</a></h2><p>By default, <code>html\`\`</code> will be used as a tag template mode. If there are other scenarios, you can choose to call the expression mode, there are two.</p><ul><li>The function name is <code>tem_h</code>, and the parameter is a template string.</li></ul><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">tem_h</span><span style="color:#EEFFFF;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">&lt;p&gt;hello&lt;/p&gt;</span><span style="color:#89DDFF;">\`</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><ul><li>The function name is <code>str_h</code>, and the parameters are ordinary strings.</li></ul><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">str_h</span><span style="color:#EEFFFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">&lt;p&gt;hello&lt;/p&gt;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#EEFFFF;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Regardless of whether you choose the default mode or call the expression mode, the final output structure is the same. In addition, we can use these modes at the same time.</p></div>`,19),p=[o];function t(r,c,i,F,d,u){return e(),a("div",null,p)}var y=s(l,[["render",t]]);export{D as __pageData,y as default};