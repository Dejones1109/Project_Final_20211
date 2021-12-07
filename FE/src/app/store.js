import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from "./service/user/userSlice";
import{token_current} from "./service/user/token";

export const store = configureStore({
    reducer : {
        user:userReducer,
        [token_current.reducerPath] : token_current.reducer,
    },
})
