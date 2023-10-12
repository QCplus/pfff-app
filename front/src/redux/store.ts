import { configureStore } from "@reduxjs/toolkit";
import apiOptionsReducer from "./reducers/apiOptions";

const store = configureStore({
    reducer: {
        apiOptions: apiOptionsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
