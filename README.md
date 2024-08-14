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
