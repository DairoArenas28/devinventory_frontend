import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: 1
    },
    reducers: {
        newPage: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { newPage } = pageSlice.actions
export default pageSlice.reducer