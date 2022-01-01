import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {CartClient} from "./cartClient";

let  initialState = {
    code: 404
}

export const createCart = createAsyncThunk(
    'cart/add',
    async (params ,{rejectWithValue})=>{
        const response = await CartClient.createCart(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);
export const updateQuantity = createAsyncThunk(
    'cart/updateCart ',
    async (params ,{rejectWithValue})=>{
        const response = await  CartClient.updateQuantity(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);




export const cartSlice = createSlice({
    initialState:initialState,
    name:'cart',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCart.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(createCart.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(createCart.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(updateQuantity.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(updateQuantity.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(updateQuantity.rejected, (state )=>{
                state.status = 500;
            });

    }
})