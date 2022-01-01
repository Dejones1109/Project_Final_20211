import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import AdminClient from "../admin/adminClient";
import base64url from "base64url";
import { storeData} from "../../../helps/localStorage";
let  initialState = {
    code: 404
};
export const adminLogin = createAsyncThunk(
    'admin/login',
    async (params ,{rejectWithValue})=>{
    const response = await AdminClient.login(params,rejectWithValue).catch(error =>  rejectWithValue(error.json()));
        const {phone, password,adminCode} = response.data;
        // const encode = base64url(`${adminCode}.${phone}.${password}.${new Date()}`);
        await storeData(`admin`,"admin");
    return response.data;
    }
)



export const adminSlice = createSlice({
    initialState:initialState,
    name:'admin',
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(adminLogin.fulfilled,(state )=>{
                state.code  = 201;
            })
            .addCase(adminLogin.rejected, (state )=>{
                state.code  = 500;
            });
    }
})

