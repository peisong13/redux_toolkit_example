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
            state.value -= 5;
        },
    },
})

// 导出每个case reducer对应的action creator（*1.4.4）
export const { increment, decrement } = moneySlice.actions;

// 导出整个reducer（*1.4.4）
export default moneySlice.reducer;