// 创建一个 icecream 的 slice，用于ice-cream数量的修改 （*2.1）
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
        // 实现 reset 的 case reducer （*3.4）
        resetIcecream: (state) => {
            state.value = 0;
        },
    },
})

export const { increment, resetIcecream } = icecreamSlice.actions;
export default icecreamSlice.reducer;