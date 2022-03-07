import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import AuthService from "./userAPI"
import base64 from 'react-native-base64'
import {storeData} from "../../../helps/localStorage";
import {store} from "../../store";


let  initialState = {
    code: 404,
    currentUser:null,
    message:""
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (params ,{rejectWithValue})=>{
        const response = await AuthService.login(params,rejectWithValue);
        if(response.data){
            const {phone, password,partCode,id} = response.data;

            const encode = base64.encode(`${partCode}.${phone}.${password}.${new Date()}`);
            await storeData(`user`,String(encode));
            await storeData(`id`,String(id));
        }
        if(response.message.includes('Tài khoản đã bị khóa vui lòng liên hệ lại với quản trị viên')){
            alert(response.message);
        }

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
            .addCase(userLogin.fulfilled,(state,action )=>{
                if(action.payload){
                    state.code  = 200;
                }


                state.currentUser = action.payload;

            })
            .addCase(userLogin.rejected, (state )=>{
                state.code  = 500;
            });
        builder
            .addCase(register.pending,(state )=>{
                state.code  = 404;
            })
            .addCase(register.fulfilled,(state )=>{
                state.code  = 200;
                state.currentUser = {};
            })
            .addCase(register.rejected, (state )=>{
                state.code  = 500;
            })
    }
})


