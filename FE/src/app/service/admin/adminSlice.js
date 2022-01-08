import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import AdminClient from "../admin/adminClient";
import base64 from 'react-native-base64'
import { storeData} from "../../../helps/localStorage";
let  initialState = {
    code: 404,
    currentUser:null
};
export const adminLogin = createAsyncThunk(
    'admin/login',
    async (params ,{rejectWithValue})=>{
    const response = await AdminClient.login(params,rejectWithValue).catch(error =>  rejectWithValue(error.json()));
        const {phone, password,adminCode} = response.data;
        const encode = base64.encode(`${adminCode}.${phone}.${password}.${new Date()}`);
        await storeData(`admin`,String(encode));
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
            .addCase(adminLogin.fulfilled,(state,action )=>{
                state.code  = 201;
                state.currentUser = action.payload;
            })
            .addCase(adminLogin.rejected, (state )=>{
                state.code  = 500;
            });
    }
})

