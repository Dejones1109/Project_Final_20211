import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import AuthService from "./userAPI"
import base64url from "base64url";
import {storeData} from "../../../helps/localStorage";


let  initialState = {
    code: 404,
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (params ,{rejectWithValue})=>{
        const response = await AuthService.login(params,rejectWithValue);
        const {phone, password,partCode} = response.data;
        const encode = base64url(`${partCode}.${phone}.${password}.${new Date()}`);
        await storeData(`user`,encode);
        return response.data;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (params ,{rejectWithValue})=>{
        await AuthService.register(params,rejectWithValue);
    }
);


export const userSlice = createSlice({
    initialState:initialState,
    name:'auth',
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending,(state)=>{
                state.code  = 404;
            })
            .addCase(userLogin.fulfilled,(state )=>{
                state.code  = 201;
            })
            .addCase(userLogin.rejected, (state )=>{
                state.code  = 500;
            });
        builder
            .addCase(register.pending,(state )=>{
                state.code  = 404;
            })
            .addCase(register.fulfilled,(state )=>{
                state.code  = 201;
            })
            .addCase(register.rejected, (state )=>{
                state.code  = 500;
            })
    }
})


