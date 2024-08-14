# Redux Toolkit Example

Redux Toolkit 极简示例：Let's buy some ice-cream!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. Redux Toolkit 基本使用步骤

### 1.1 安装Redux Toolkit和 React-Redux

```npm install @reduxjs/toolkit react-redux```

### 1.2 创建 Redux Store

创建 `src/store/index.js` 文件。从 `Redux Toolkit` 引入 `configureStore` API。

```
// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
```

### 1.3 为 React 提供 Redux Store

创建 store 后，便可以在 React 组件中使用它。 在 `src/index.js` 中引入我们刚刚创建的 store , 通过 React-Redux 的 `<Provider>` 将 `<App>` 包裹起来,并将 store 作为 prop 传入。

```
// src/index.js
// ...
import store from './store';
import { Provider } from 'react-redux';

// ...
    <Provider store={store}>
        <App />
    </Provider>
// ...
```

### 1.4 创建 Redux State Slice

创建 `src/store/reducers` 文件夹。并在该文件夹下根据业务逻辑创建不同的 Redux State Slice。

在本案例中，我们将在该文件夹下创建 `money.js` 和 `icecream.js` 两个 Slice 文件。以下内容以 `money.js` 为例：

#### 1.4.1 引入 `createSlice`

```
// src/store/reducers/money.js

import { createSlice } from "@reduxjs/toolkit";
```

#### 1.4.2 创建 Slice

创建 slice 需要一个字符串名称 `name` 来标识切片、一个初始 state `initialState` 以及一个或多个定义了该如何更新 state 的 reducer 函数。

这里，我们将 `name` 设置为 `"money"`, 并在 `initialState` 中设置 `value: 0`。

记得在 `const moneySlice` 前添加 `export` 关键字以暴露这个slice。 

```
// src/store/reducers/money.js

import { createSlice } from "@reduxjs/toolkit";

export const moneySlice = createSlice({
    name: "money",
    initialState: {
        value: 0
    },
    reducers:{
        // ...
    },
})
```

#### 1.4.3 编写 case reducer 函数
在 `money.js` 中，我们需要两个 case：`increment` 和 `decrement` ，分别用于增加和减少 `value` 的值：

```
// src/store/reducers/money.js

// ...
    // ...
    reducers:{
        increment: (state) => {
            state.value += 5;
        },
        decrement: (state) => {
            state.value -= 5;
        },
    },
```

#### 1.4.4 导出 Action Creaters 和 reducer

每个 case reducer 函数会生成对应的 Action creators。最后，导出Action Creaters 和 reducer，语法如下：

```
// src/store/reducers/money.js

//...
export const { increment, decrement } = moneySlice.actions;
export default moneySlice.reducer;
```

### 1.5 将 Slice Reducers 添加到 Store 中

在 `src/store/index.js` 中引入 Slice Reducers。然后，将其添加到 Store中：

```
// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from "./reducers/money"; // 引入moneyReducer （*1.5）

export default configureStore({
  reducer: {
    money: moneyReducer, // 将moneyReducer加入到store中
  },
});
```

### 1.6 在 React 组件中使用 Redux 状态操作

使用 `useSelector` 从 store 中读取数据，使用 `useDispatch` 来 dispatch actions。

#### 1.6.1 引入 `useSelector` 和 `useDispatch`
在 `App.js` 中，从 `react-redux` 中引入 `useSelector` 和 `useDispatch`。

```
// src/App.js

import { useSelector, useDispatch } from 'react-redux';

// ...
```

#### 1.6.2 从 store 中读取数据

在 `const App` 中，使用 `useSelector` 读取 store 中 `money` 的值，并将其放在对应的位置。

```
// src/App.js

// ...
const App = () => {
  const money = useSelector((state) => state.money.value); // 从store中获取money的值
  return (
    <div className="App">
      Money: {money}$ 
      <button>+</button> <button>-</button> <br />
      {/* ... */}
    </div>
  );
}
// ...
```

#### 1.6.3 Dispatch Actions

使用 `useDispatch` 在对应 `Button` 按下时增加或减少 Money 的值。

```
// src/App.js

// ...
import { increment, decrement } from './store/reducers/money'; // 引入 increment 和 decrement action
// ...

const App = () => {
    // ...
    const dispatch = useDispatch(); // 获取dispatch方法 
    return (
        <div className="App">
            Money: {money}$
            {/* 使用useDispatch在对应Button按下时触发对应的action */}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button> <br />

            {/* ... */}
        </div>
  );
}
```

现在，你可以在页面上点击“+”、“-”按钮时看到Money的值在变化了！

以上内容的完整代码在本项目的 ChapterOne 分支。

## 2. 买点 IceCream 吧！

根据上一章的内容实现页面上 `BuyIceCream` 的功能。

### 2.1 创建 ice-cream 的 Slice

与 1.4.2 章类似，在 `src/store/reducers/` 文件夹下创建一个 `icecream.js` 文件用于处理 ice-cream 数量的记录和修改，并导出 Action Creaters 和 reducer。

这里，先暂时只创建 `increment` 这一 reducer，让购买按钮按下时增加冰激凌的数量。

```
// src/store/reducers/icecream.js

// 创建一个 icecream 的 slice，用于ice-cream数量的修改
import { createSlice } from "@reduxjs/toolkit";

export const icecreamSlice = createSlice({
    name: "icecream",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
})

export const { increment } = icecreamSlice.actions;
export default icecreamSlice.reducer;
```

### 2.2 将 ice-cream 的 Slice Reducer 添加到 Store 中

与 1.5章类似，引入上一节写好的 reducer，此时的 `src/store/index.js` 文件变成：

```
// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from "./reducers/money";
import icecreamReducer from "./reducers/icecream"; // 引入icecreamReducer

export default configureStore({
  reducer: {
    money: moneyReducer,
    icecream: icecreamReducer, // 将icecreamReducer加入到store中
  },
});
```

### 2.3 在 React 组件中使用 Redux 操作 ice-cream 的数量

与上一章处理 Money 的方法类似，需要在 `App.js` 中引入之前写好的 Action，然后使用 `useSelector` 获取 store 中 `icecream` 的值，并且在页面上将它正确的显示出来。最后在对应 `<button>` 的 `onClick` 属性传入正确的方法来更新它。

首先，引入对应的 Action：

```
// src/App.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/reducers/money';
import { increment as buyIcecream } from './store/reducers/icecream'; // 引入 increment action

// ...
```
和第一章不同的是，引入时使用了 `increment as buyIcecream` 的写法，将 `icecream` 的 `increment` action 起了一个“别名”：`buyIcecream`。这是因为 `increment` 这个名字已经被 `money` 的 Action 占用了。
因此，在后续的代码中，将使用 `buyIcecream` 这个别名来操作 `icecream` 的增加。

继续完成 `App.js` 的修改：
```
// src/App.js

// ...
import { increment as buyIcecream } from './store/reducers/icecream'; // 引入 increment action

const App = () => {
    // ...
    const icecream = useSelector((state) => state.icecream.value); // 从store中获取icecream的值
    return (
        {/* ... */}
        {/* 在页面上显示icecream的值，并处理button的点击 */}
        IceCream Count: {icecream}
        <button onClick={() => dispatch(buyIcecream())}>Buy IceCream</button> <br />
        {/* ... */}
    )
}

// ...
```
此时在页面上点击 `BuyIceCream` 按钮就可以观察到冰激凌数量的变化了。

## 参考资料
https://www.redux.org.cn/introduction/why-rtk-is-redux-today.html
https://www.redux.org.cn/tutorials/quick-start.html
https://www.redux.org.cn/tutorials/essentials/part-2-app-structure.html
