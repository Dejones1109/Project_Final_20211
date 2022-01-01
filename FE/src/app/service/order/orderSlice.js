import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import orderClient from "./orderClient";
let  initialState = {
    code: 404
}

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async (params ,{rejectWithValue})=>{

    }
);
export const createOrder = createAsyncThunk(
    'cart/order',
    async (params ,{rejectWithValue})=>{
        const response = await orderClient.createOrder(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);


export const orderSlice = createSlice({
    initialState:initialState,
    name:'orders',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateOrderStatus.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(updateOrderStatus.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(updateOrderStatus.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(createOrder.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(createOrder.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(createOrder.rejected, (state )=>{
                state.status = 500;
            });

    }
})


