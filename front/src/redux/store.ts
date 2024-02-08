import { configureStore } from "@reduxjs/toolkit";
import apiOptionsReducer from "./reducers/apiOptions";
import authentication from "./reducers/authentication";

const store = configureStore({
    reducer: {
        apiOptions: apiOptionsReducer,
        authentication: authentication,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
