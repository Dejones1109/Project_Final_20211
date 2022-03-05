import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import StoreClient from './storeClient';
let  initialState = {
    code: 404,
    currentPartner :{}
}
export const createPartner = createAsyncThunk(
    'store/create',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.createPartner(params).catch(e=>rejectWithValue(e));
        return response;
    }
)
export const updateStatusPartner = createAsyncThunk(
    'store/updateStatusPartner',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.updateStatusPartner(params).catch(e=>rejectWithValue(e));
        console.log(response);
        return response;
    }
)

export const createBill = createAsyncThunk(
    'store/createBill',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.createBill(params).catch(e=>rejectWithValue(e));
        console.log(response);
        return response;
    }
)

export const updatePassword = createAsyncThunk(
    'store/updatePassword',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.updatePassword(params).catch(e=>rejectWithValue(e));
        return response;
    }
)

export const updatePartner = createAsyncThunk(
    'store/updatePartner',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.updatePartner(params).catch(e=>rejectWithValue(e));
        return response;
    }
)

export const updateBill = createAsyncThunk(
    'store/updateBill',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.updateBill(params).catch(e=>rejectWithValue(e));
        return response;
    }
)
export const storeSlice = createSlice({
    initialState:initialState,
    name:'store',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPartner.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(createPartner.fulfilled,(state )=>{
                state.code = 201;
            })
            .addCase(createPartner.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(updateStatusPartner.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(updateStatusPartner.fulfilled,(state ,action)=>{
                state.code = 201;
                state.currentPartner =action.payload.data;
                console.log(state.currentPartner);
            })
            .addCase(updateStatusPartner.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(createBill.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(createBill.fulfilled,(state ,action)=>{
                state.code = 201;
            })
            .addCase(createBill.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(updatePassword.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(updatePassword.fulfilled,(state ,action)=>{
                state.code = 200;
            })
            .addCase(updatePassword.rejected, (state )=>{
                state.status = 500;
            });
        builder
            .addCase(updatePartner.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(updatePartner.fulfilled,(state ,action)=>{
                state.code = 200;
            })
            .addCase(updatePartner.rejected, (state )=>{
                state.status = 500;
            });
    }
})


