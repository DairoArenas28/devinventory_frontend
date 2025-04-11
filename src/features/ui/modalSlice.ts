import { createSlice } from "@reduxjs/toolkit";

export const openModal = createSlice({
    name: 'openModal',
    initialState: {
        value: false,
    },
    reducers: {
        open: (state) => {
            state.value = true
        },
        close: (state) => {
            state.value = false
        }
    }
})

export const { open, close } = openModal.actions

export default openModal.reducer
