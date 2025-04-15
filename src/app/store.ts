import { configureStore } from "@reduxjs/toolkit";
import openModalReducer from '../features/ui/modalSlice'
import pageReducer from '../features/pagination/pageSlice'
import limitReducer from '../features/pagination/limitSlice'
import openModalConfirmReducer from "../features/ui/modalConfirmSlice";

export const store =  configureStore({
    reducer: {
        //Modales
        openModal: openModalReducer,
        openModalConfirm: openModalConfirmReducer,

        //Paginador
        page: pageReducer,
        limit: limitReducer

        //

    },
})

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

