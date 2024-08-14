# Redux Toolkit Example

Redux Toolkit 极简示例：Let's buy some ice-cream!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 0. 在开始前

## 0.1 项目说明

本项目将以案例的方式介绍 Redux Toolkit 的使用方法，包括：

- 创建和使用 Redux store、Redux state slice；
- 编写 reducer 函数；
- 使用 useSelector 和 useDispatch 钩子函数在 React 组件中使用 Redux 进行状态管理；
- 以及在 reducer 函数中使用复杂更新逻辑。

### 0.2 项目介绍

本项目将实现一个非常简单的 React 单页应用。应用的页面将显示：
- 用户所拥有的金钱和冰激凌的数量；
- 两个能让用户增加或者减少金钱的按钮；
- 一个购买冰激凌的按钮；
- 以及一个重置按钮。

在按下任意按钮时，页面上显示的信息将及时更新。如图所示：

![project preview](src/assets/images/project_preview.png)

**本项目将从添加了页面信息和按钮的模版代码开始**，模版代码可以拉取本项目 ChapterZero 分支获取。

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

以上内容的完整代码在本项目的 ChapterTwo 分支。

## 3. 买冰激凌是要付钱的！处理数据之间的关系

在上一章，在页面上点击 `BuyIceCream` 按钮后，冰激凌的数量增加了，但是钱却没有减少。本章将处理这个问题，同时实现页面上重置按钮的功能。

### 3.1 按下购买按钮后，发生了什么？

首先明确，按下购买按钮后，按钮对应的 `onClick={() => dispatch(buyIcecream())}` 增加了冰激凌的数量，却没有减少钱的数量。买冰激凌不付钱，这可是不允许滴。

因此，这个按钮需要实现两件事情：
1. 增加冰激凌的数量；
2. 减少钱的数量。假设一个冰激凌的价格是 1.5$, 我们需要一个 reducer 函数去对应减少 `money` 的数值。

而我们目前并没有能实现这一操作的 reducer 函数。

回顾一下，第一章 `money.js` 中定义了两个 reducer 函数，分别是将 `money` 的数值增加5或者减少5。

因此我们需要新的 reducer 函数来处理购买时钱的变化。同时，我们希望这个新的 reducer 函数能够接受冰激凌的价格作为参数。

### 3.2 在 `money.js` 中新增一个能接受参数的 reducer 函数

事实上，在定义 reducer 函数时，可以通过 `action.payload` 来获取传入的参数。

在 `money.js` 中定义一个 `decreaseByAmount` 的 reducer 函数，和之前不同的是，它的参数是 `(state, action)`，以此让我们获取传入参数的情况。

```
// src/store/reducers/money.js

// ...

export const moneySlice = createSlice({
    // ...
    reducers: {
        // ...
        // 可以通过action.payload来获取传入的参数
        decrementByAmount: (state, action) => {
            state.value -= action.payload;
        },
    }
})

```

修改完成后，别忘了导出：

```
// src/store/reducers/money.js

// ...
export const { increment, decrement, decrementByAmount } = moneySlice.actions; // 别忘记导出 decrementByAmount
export default moneySlice.reducer;
```

### 3.3 修改购买按钮的逻辑

接下来，就可以修改购买按钮的逻辑，实现冰激凌数量增加和钱的减少。

首先在 `App.js` 中引入 `decreaseByAmount`：

```
// src/App.js

// ...
import { increment, decrement, decrementByAmount } from './store/reducers/money';
// ...
```

然后，在 `const App` 中新增一个函数 `HandleBuyIcecream`，用以实现冰激凌数量增加和钱的减少这两个动作，并将其传给购买按钮的 `onClick` 属性。
```
// src/App.js

// ...
const App = () => {
    // ...
    const HandleBuyIcecream = () => {
    // 创建一个函数，用以实现冰激凌数量增加和钱的减少这两个动作
        dispatch(buyIcecream());
        dispatch(decrementByAmount(1.5));
    }
    return (
        {/* ... */}
        <button onClick={HandleBuyIcecream}>Buy IceCream</button> <br />
        {/* ... */}
    )
}

// ...
```
这样一来，就能在点击购买按钮时观察到冰激凌和钱同时变化了！

### 3.4 实现 Reset 按钮

页面上的 Reset 按钮用于将钱和冰激凌的数量都重置为 `0`。同样地，我们也需要在 `money.js` 和 `icecream.js` 中实现相应的 reducer 函数。

```
// src/store/reducers/money.js

// ...

export const moneySlice = createSlice({
    // ...
    reducers: {
        // ...
        // 实现 reset 的 case reducer
        resetMoney: (state) => {
            state.value = 0;
        },
    }
})

// 记得导出 resetMoney
export const { increment, decrement, decrementByAmount, resetMoney } = moneySlice.actions;
// ...
```

```
// src/store/reducers/icecream.js

// ...

export const icecreamSlice = createSlice({
    // ...
    reducers: {
        // ...
        // 实现 reset 的 case reducer
        resetIcecream: (state) => {
            state.value = 0;
        },
    }
})

// 记得导出 resetIcecream
export const { increment, resetIcecream } = icecreamSlice.actions;
// ...
```

接下来，修改 `App.js`：

```
// src/app.js

// ...
import { increment, decrement, decrementByAmount, resetMoney } from './store/reducers/money'; // 引入 resetMoney
import { increment as buyIcecream, resetIcecream } from './store/reducers/icecream'; // 引入 resetIcecream

const App = () => {
  // ...
  const HandleReset = () => {
    // 创建一个函数，用以实现重置的动作 (*3.4)
    dispatch(resetMoney());
    dispatch(resetIcecream());
  }

  return (
    // ...
      {/* 处理reset button的点击 （*3.4）*/}
      <button onClick={HandleReset}>Reset</button>
    // ...
  );
}

// ...
```
这样一来，Reset 按钮正常工作了！

以上内容的完整代码在本项目的 ChapterThree 分支。

## 4. 不可以透支！为数据添加验证

### 4.1 为“-”按钮添加数据验证

Reducer 函数支持更加复杂的更新逻辑。当前，“-”按钮允许将钱的金额减至负数。为了避免这一情况，我们可以在其对应的 reducer 函数中添加数据验证：

```
// src/store/reducers/money.js

export const moneySlice = createSlice({
    // ...
    reducers: {
        // ...
        decrement: (state) => {
            // 为了防止用户减少钱时没有足够的钱，在这里添加一个判断条件
            if (state.value < 5) {
                alert("没有足够的钱，每次减少5刀!");
                return;
            }
            state.value -= 5;
        },
        // ...
    },
})

// ...

```
此时再点击“-”按钮，当金额不足5刀时会弹出一个 alert 框并阻止用户的操作。

### 4.2 为购买按钮添加数据验证

最后，为购买按钮添加数据验证，当金额不足 1.5$ 时，阻止用户的购买行为。直接修改 `const App` 中的 `handleBuyIcecream` 函数即可。

```
// src/App.js

// ...

const App = () => {
    // ...
    const HandleBuyIcecream = () => {
        // 为了防止用户购买冰激凌时没有足够的钱，在这里添加一个判断条件
        if (money < 1.5) {
            alert("没有足够的钱，冰激凌每个1.5刀!");
            return;
        }
        dispatch(buyIcecream());
        dispatch(decrementByAmount(1.5));
  }
}
```

大功告成！炎炎夏日，快去买些冰激凌吧！

以上内容的完整代码在本项目的 ChapterFour 分支。

## 参考资料
https://www.redux.org.cn/introduction/why-rtk-is-redux-today.html
https://www.redux.org.cn/tutorials/quick-start.html
https://www.redux.org.cn/tutorials/essentials/part-2-app-structure.html
https://www.redux.org.cn/tutorials/fundamentals/part-8-modern-redux.html