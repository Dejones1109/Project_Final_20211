import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import ProductClient from "./productClient";
let  initialState = {
    code: 404,
}

export const createProduct = createAsyncThunk(
    'product/add',
    async (params ,{rejectWithValue,})=>{
        console.log(params);
        const response = await ProductClient.createProduct(params).catch(error =>  rejectWithValue(error.json()));
        return response;
    }
);




export const productSlice = createSlice({
    initialState:initialState,
    name:'product',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(createProduct.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(createProduct.rejected, (state )=>{
                state.status = 500;
            });
    }
})


