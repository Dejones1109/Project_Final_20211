import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import AuthService from "./userAPI"



let  initialState = {
    token_current :'',
    status_login:false,
    status_register: false,
    message: '',
}

export const login = createAsyncThunk(
    'auth/login',
    async (params ,{rejectWithValue})=>{
        const response = await AuthService.login(params,rejectWithValue);
        // Save access token to storage
        // @ts-ignore
        const { access_token, token_type,expires_at } = response;
        const accessToken = `${token_type} ${access_token}`;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('expired_at', expires_at); // expired_at is a timestamp
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (params ,{rejectWithValue})=>{
        await AuthService.register(params,rejectWithValue);
    }
);

export const userReducer = createSlice({
    initialState:initialState,
    name:'user',
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending,(state)=>{
                state.status_login  = 'loading';
            })
            .addCase(login.fulfilled,(state )=>{
                state.status_login = 'true';
                state.token_current =localStorage.getItem('access_token');
            })
            .addCase(login.rejected, (state )=>{
                state.status = false;
            });
        builder
            .addCase(register.pending,(state )=>{
                state.status_register = 'loading';
            })
            .addCase(register.fulfilled,(state )=>{
                state.status_register = 'true';
                state.message = "Đăng ký thành công ! Vui lòng xác nhận email của bạn."
            })
            .addCase(register.rejected, (state )=>{
                state.status_register = false;
                state.message = "Đăng ký thất bại ! Tài khoản này đã tồn tại."
            })
    }
})


export const {actions,reducers } = userReducer;
export default reducers;
