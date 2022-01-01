import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
let  initialState = {
    code: 404
}

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async (params ,{rejectWithValue})=>{

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

    }
})


