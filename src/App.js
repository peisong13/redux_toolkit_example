import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 引入 useSelector 和 useDispatch （*1.6.1）
import { increment, decrement, decrementByAmount, resetMoney } from './store/reducers/money'; // 引入 increment 和 decrement action （*1.6.4）
import { increment as buyIcecream, resetIcecream } from './store/reducers/icecream'; // 引入 increment action （*2.3）

const App = () => {
  const money = useSelector((state) => state.money.value); // 从store中获取money的值 （*1.6.2）
  const dispatch = useDispatch(); // 获取dispatch方法 （*1.6.3）

  const icecream = useSelector((state) => state.icecream.value); // 从store中获取icecream的值 （*2.3）

  const HandleBuyIcecream = () => {
    // 为了防止用户购买冰激凌时没有足够的钱，在这里添加一个判断条件 （*4.2）
    if (money < 1.5) {
      alert("没有足够的钱，冰激凌每个1.5刀!");
      return;
    }
    // 创建一个函数，用以实现冰激凌数量增加和钱的减少这两个动作 （*3.3）
    dispatch(buyIcecream());
    dispatch(decrementByAmount(1.5));
  }

  const HandleReset = () => {
    // 创建一个函数，用以实现重置的动作 (*3.4)
    dispatch(resetMoney());
    dispatch(resetIcecream());
  }

  return (
    <div className="App">
      Money: {money}$
      {/* 使用useDispatch在对应Button按下时触发对应的action （*1.6.3）*/}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button> <br />

      {/* 在页面上显示icecream的值，并处理button的点击 （*2.3）*/}
      IceCream Count: {icecream}
      <button onClick={HandleBuyIcecream}>Buy IceCream</button> <br />
      {/* 处理reset button的点击 （*3.4）*/}
      <button onClick={HandleReset}>Reset</button>
    </div>
  );
}

export default App;
