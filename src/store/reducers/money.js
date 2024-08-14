import { createSlice } from "@reduxjs/toolkit"; // 引入createSlice函数 （*1.4.1）

// 创建一个slice （*1.4.2）
export const moneySlice = createSlice({
    name: "money",
    initialState: {
        value: 0
    },
    // 实现加法和减法的case reducers (*1.4.3)
    reducers: {
        increment: (state) => {
            state.value += 5;
        },
        decrement: (state) => {
            // 为了防止用户减少钱时没有足够的钱，在这里添加一个判断条件 (*4.1)
            if (state.value < 5) {
                alert("没有足够的钱，每次减少5刀!");
                return;
            }
            state.value -= 5;
        },
        // 可以通过action.payload来获取传入的参数 (*3.2)
        decrementByAmount: (state, action) => {
            state.value -= action.payload;
        },
        // 实现 reset 的 case reducer （*3.4）
        resetMoney: (state) => {
            state.value = 0;
        },
    },
})

// 导出每个case reducer对应的action creator（*1.4.4）
export const { increment, decrement, decrementByAmount, resetMoney } = moneySlice.actions;

// 导出整个reducer（*1.4.4）
export default moneySlice.reducer;