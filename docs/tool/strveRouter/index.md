# strveRouter

::: tip
For a better reading experience, the following code examples are written using JSX syntax.
:::

StrveRouter is the official routing manager of Strve. It is deeply integrated with Strve’s core to easily build single-page applications.

## Started

We can start learning based on the following steps.

**1. Create home page**

```jsx
// home.jsx
import { defineComponent } from 'strve-js';
import { linkTo } from 'strve-router';
import logo from '../assets/logo.png';

const home = () =>
  defineComponent(({ setData }) => {
    const state = {
      msg: 'hello',
      arr: [1, 2],
      count: 3,
    };

    function goAbout() {
      linkTo({
        path: '/about',
        query: {
          id: 1,
          name: 'maomin',
        },
      });
    }

    function useChange() {
      setData(() => {
        state.msg = 'world';
        state.count++;
        state.arr.unshift(state.count);
      });
    }

    return () => (
      <fragment>
        <button onClick={goAbout}>goAbout</button>
        <h1>Home</h1>
        <div class='logo-inner'>
          <img src={logo} class='logo' />
        </div>
        <p onClick={useChange}>{state.msg}</p>
        <ul>
          {state.arr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </fragment>
    );
  });

export default home;
```

**2. Create about page**

```jsx
// about.jsx
import { defineComponent } from 'strve-js';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    function getOption() {
      console.log(toParse());
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
      </fragment>
    );
  });

export default about;
```

**3. Configure routing information**

```js
// router/index.js
import { resetView } from 'strve-js';
import { initRouter } from 'strve-router';

import home from '../template/home';
import about from '../template/about';

const router = initRouter(
  [
    {
      path: '/',
      template: home,
    },
    {
      path: '/about',
      template: about,
    },
  ],
  resetView
);

export default router;
```

**4. Mount page**

```jsx
// main.js
import { defineComponent } from 'strve-js';
import router from './router/index';
import './styles/app.css';

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => <component $is={router.view()}></component>;
  }
);
```

## Install

```bash
npm install strve-router
```

## Usage

You can use [CreateStrveApp](/tool/createStrveApp/) and choose the **strve-apps** or **strve-jsx-apps** template.

## API

### initRouter()

The first parameter is an array object, which is the routing component that needs to be registered. The `path` attribute represents the path of the component, and the `template` attribute is the imported component.

The second parameter needs to be passed to the `resetView` API, and the page matching the corresponding path will be updated accordingly. For example, create an `index.js` file in the router folder here.

```js
// router/index.js
import { resetView } from 'strve-js';
import { initRouter } from 'strve-router';

import home from '../template/home';
import about from '../template/about';

const router = initRouter(
  [
    {
      path: '/',
      template: home,
    },
    {
      path: '/about',
      template: about,
    },
  ],
  resetView
);

export default router;
```

Components matching the route will be rendered to where the `view()` method is located, usually placed under the main page entry file (such as `main.js`).

```jsx
// main.js
import { defineComponent } from 'strve-js';
import router from './router/index';
import './styles/app.css';

defineComponent(
  {
    mount: '#app',
  },
  () => {
    return () => <component $is={router.view()}></component>;
  }
);
```

### linkTo()

If you need to jump to the corresponding page, use the `linkTo()` method. You can pass the corresponding path and parameters to be passed, or you can pass the path string directly.

```jsx
import { defineComponent } from 'strve-js';
import { linkTo } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
      </fragment>
    );
  });

export default about;
```

### forward()

Skip forward 1 page.

### back()

Jump back 1 page.

### go(n)

Jump n pages within the page.

### toParse

If you perform the operation of routing parameters, you need to obtain the parameter object. Directly executing the `toParse()` method can obtain object information.

```jsx
import { defineComponent } from 'strve-js';
import { linkTo, toParse } from 'strve-router';

const about = () =>
  defineComponent(() => {
    function goHome() {
      linkTo({
        path: '/',
      });
    }

    function getOption() {
      console.log(toParse());
    }

    return () => (
      <fragment>
        <button onClick={goHome}>goHome</button>
        <h1 onClick={getOption}>About</h1>
      </fragment>
    );
  });

export default about;
```

### routerVersion

You can get the version information of StrveRouter.
