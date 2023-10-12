import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import ApiOptionsModel from '../../api/models/ApiOptionsModel';

export type ApiOptionsState = {
    wasSet: boolean;
} & ApiOptionsModel;

const initialState: ApiOptionsState = {
    wasSet: false,
    firstRun: true,
    plugins: []
};

const apiOptionsSlice = createSlice({
    name: 'apiOptions',
    initialState: initialState,
    reducers: {
        setOptions: (state, action: PayloadAction<ApiOptionsModel>) => {
            state.wasSet = true;
            state.firstRun = action.payload.firstRun;
            state.plugins = action.payload.plugins;
        }
    }
})

export const { setOptions } = apiOptionsSlice.actions;

export default apiOptionsSlice.reducer;