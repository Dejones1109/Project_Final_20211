import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import {StoreClient} from './storeClient';
let  initialState = {
    code: 404
}
export const createPartner = createAsyncThunk(
    'store/create',
    async (params,rejectWithValue)=>{
        const response = await StoreClient.createPartner(payload).catch(e=>appbarElevation(e));
        return response.data;
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
    }
})


