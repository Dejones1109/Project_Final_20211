import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {ColorSchemeName, Platform, } from 'react-native';
import {AuthTabParamList, RootStackParamList } from '../constants/Routes';
import SignInScreen from '../pages_app/AuthScreen/SignInScreen';
import BottomTabUserNavigator from './user/BottomTabUserNavigator';
import RegisterScreen from "../pages_app/AuthScreen/RegisterScreen";
import LinkingConfigurationForAdmin from "./admin/LinkingConfigurationForAdmin";
import BottomTabAdminNavigator from './admin/BottomTabAdminNavigator';
import {getData} from "../helps/localStorage";
import {createContext, useContext, useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from "../components/common/SplashScreen";
import {checkLogin, getStatusLogin, getUser} from "../helps/authenticate";
import {useDispatch} from "react-redux";
export const NavigationContext = createContext({});


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    const [user,setUser] = useState(null);
    const [admin,setAdmin] = useState(null);
    const [isConnected,setIsConnected] = useState(false);


    const dispatch = useDispatch();
    useEffect(async ()=>{
        let userCheck:any = await getUser();
        await NetInfo.addEventListener(networkState => {
            setTimeout(()=>{
                    if(networkState.isConnected){
                        setIsConnected(networkState.isConnected)
                    }
            },2000)
        });
        await checkLogin(userCheck, dispatch,data.auth);
    })

    const data = {
        auth:{
            user:user,
            admin:admin,
            // @ts-ignore
            setUser:(user:string)=>setUser(user),
            // @ts-ignore
            setAdmin:(admin:string )=>setAdmin(admin),
        }
    }

    return (
        <NavigationContainer
            linking ={LinkingConfigurationForAdmin}
        >
            <NavigationContext.Provider value={data}>
                {isConnected ? <RootNavigator  /> : <SplashScreen />}
            </NavigationContext.Provider>
        </NavigationContainer>
    );
}


const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
    const {auth} : any= useContext(NavigationContext);
    const user = auth.user;
    const admin = auth.admin ;
    const statusLogin = getStatusLogin();

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false,  }}
        >
            <Stack.Screen name="Root" component={(typeof admin === 'string' && statusLogin ===2) ? BottomTabAdminNavigator :((typeof user === 'string' && statusLogin ===1) ? BottomTabUserNavigator :AuthenticationNavigator) } />
        </Stack.Navigator>
    );
}

const AuthStack = createStackNavigator<AuthTabParamList>();
function AuthenticationNavigator() {
    return(
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="login" component={SignInScreen} />
            <AuthStack.Screen name="register" component={RegisterScreen} />
        </AuthStack.Navigator>
    )
}
