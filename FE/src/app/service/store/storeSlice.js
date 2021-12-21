import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {StoreClient} from './storeClient';
let  initialState = {
    code: 404
}



export const storeReducer = createSlice({
    initialState:initialState,
    name:'cart',
    reducers: {},
    extraReducers: (builder) => {

    }
})


export const {actions,reducers } = storeReducer;
export default reducers;
