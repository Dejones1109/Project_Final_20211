import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {StoreClient} from './storeClient';
let  initialState = {
    code: 404
}



export const storeSlice = createSlice({
    initialState:initialState,
    name:'store',
    reducers: {},
    extraReducers: (builder) => {

    }
})


