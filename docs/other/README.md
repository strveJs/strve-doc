# Other

## IDE support

### Visual Studio Code 

- template string auto-completion tags

Open `settings.json` under Settings and add the following code:

```json
"emmet.triggerExpansionOnTab": true,
"emmet.showAbbreviationSuggestions": true,
"emmet.showExpandedAbbreviation": "always",
"emmet.includeLanguages": {
    "javascript": "html"
}
```

- Support HTML template string highlighting

Download the **comment-tagged-templates** plugin. Put `/* html */` in the middle of the ` render`` ` method.

```js
function App() {
    return render/* html */`
        <div class='inner'>
            <p>${state.msg}</p>
        </div >
    `;
}
```

## UI framework

- Bootstrap5

[https://getbootstrap.com/](https://getbootstrap.com/)

- Tailwindcss

[https://tailwindcss.com/](https://tailwindcss.com/)

## Change Log

### v2.2.0

- Support SVG elements;
- Optimize internal diff algorithm;
- Add necessary error prompt;
### v2.1.0

- Fixed the problem that the DOM attribute property could not be assigned;
- Improve the logical problem of converting strings to virtual DOM;
### v2.0.0

- Inserting data into the head of the list needs to bind the `useFkey` field to avoid repeated rendering of the `DOM` node;

- Hide the `DOM` node event method after rendering;
   
- Bind the `Style` style (object);
   
- The binding properties are uniformly bound using the `${}` symbol;
   
- Support HTML template string highlighting (VSCode editor needs to install `comment-tagged-templates` plugin);
   
- Support parent and child components to pass values to each other;

- Adapt to Bootstrap5、Tailwindcss UI framework;

## About the author

- Name:**Vam**
- ID:**maomincoding**
- Github:[https://github.com/maomincoding](https://github.com/maomincoding)
- Twitter:[https://twitter.com/maomincoding](https://twitter.com/maomincoding)
