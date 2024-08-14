import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 引入 useSelector 和 useDispatch （*1.6.1）
import { increment, decrement } from './store/reducers/money'; // 引入 increment 和 decrement action （*1.6.4）
import { increment as buyIcecream } from './store/reducers/icecream'; // 引入 increment action （*2.3）

const App = () => {
  const money = useSelector((state) => state.money.value); // 从store中获取money的值 （*1.6.2）
  const dispatch = useDispatch(); // 获取dispatch方法 （*1.6.3）

  const icecream = useSelector((state) => state.icecream.value); // 从store中获取icecream的值 （*2.3）

  return (
    <div className="App">
      Money: {money}$
      {/* 使用useDispatch在对应Button按下时触发对应的action （*1.6.3）*/}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button> <br />

      {/* 在页面上显示icecream的值，并处理button的点击 （*2.3）*/}
      IceCream Count: {icecream}
      <button onClick={() => dispatch(buyIcecream())}>Buy IceCream</button> <br />
      <button>Reset</button>
    </div>
  );
}

export default App;
