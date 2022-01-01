import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {ProductClient} from "./productClient";
let  initialState = {
    code: 404
}

export const createCart = createAsyncThunk(
    'cart/add',
    async (params ,{rejectWithValue})=>{
        const response = await ProductClient.create(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);
export const updateQuantity = createAsyncThunk(
    'cart/updateCart ',
    async (params ,{rejectWithValue})=>{
        const response = await ProductClient.updateQuantity(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);

export const createOrder = createAsyncThunk(
    'cart/order',
    async (params ,{rejectWithValue})=>{
        const response = await ProductClient.order(params).catch(error =>  rejectWithValue(error.json()));
        return response.data;
    }
);


export const productSlice = createSlice({
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


