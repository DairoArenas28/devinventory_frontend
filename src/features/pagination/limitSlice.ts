import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const limitRegisterSlice = createSlice({
    name: 'limit',
    initialState: {
        value: 10
    },
    reducers: {
        limitRegister: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { limitRegister } = limitRegisterSlice.actions
export default limitRegisterSlice.reducer