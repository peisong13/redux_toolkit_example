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
    },
})

export const { increment } = icecreamSlice.actions;
export default icecreamSlice.reducer;