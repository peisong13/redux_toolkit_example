import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from "./reducers/money"; // 引入moneyReducer （*1.5）

// 创建Redux Store （*1.2）
export default configureStore({
  reducer: {
    money: moneyReducer, // 将moneyReducer加入到store中 （*1.5）
  },
});