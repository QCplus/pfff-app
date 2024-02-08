import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CookiesManager from "../../services/CookiesManager";
import SetTokenPayload from "../payloads/authentication/SetTokenPayload";

export type AuthenticationState = {
    token: string;
};

const cookiesManager = new CookiesManager();

const initialState: AuthenticationState = {
    token: cookiesManager.get("auth"),
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<SetTokenPayload>) => {
            state.token = `${action.payload.tokenType} ${action.payload.token}`;

            cookiesManager.set("auth", state.token, {
                expires: action.payload.expires,
                sameSite: "strict",
            });
        },
    },
});

export const { setToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
