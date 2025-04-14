import { createSlice } from "@reduxjs/toolkit";

export const openModalConfirm = createSlice({
    name: 'openModalConfirm',
    initialState: {
        value: false
    },
    reducers: {
        openConfirm: (state) => {
            state.value = true
        },
        closeConfirm: (state) => {
            state.value = false
        }
    }
}) 

export const { openConfirm, closeConfirm } = openModalConfirm.actions

export default openModalConfirm.reducer