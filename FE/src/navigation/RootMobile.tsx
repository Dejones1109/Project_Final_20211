import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import {AuthTabParamList, RootStackParamList } from '../constants/Routes';
import SignInScreen from '../pages_app/AuthScreen/SignInScreen';
import BottomTabUserNavigator from './user/BottomTabUserNavigator';
import RegisterScreen from "../pages_app/AuthScreen/RegisterScreen";
import LinkingConfigurationForAdmin from "./admin/LinkingConfigurationForAdmin";
import BottomTabAdminNavigator from './admin/BottomTabAdminNavigator';
import { AsyncStorage } from 'react-native';
import {getData} from "../helps/localStorage";
import base64url from "base64url";
import {createContext, useContext, useState} from "react";

export const NavigationContext = createContext({});

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    const [user,setUser] = useState(null);
    const [admin,setAdmin] = useState(null);
    getData("user").then(r =>{
        // @ts-ignore
        setUser(r);
        console.log("user",r);
    });

    getData("admin").then(r=>{
        // @ts-ignore
        setAdmin(r);
        console.log("admin",r);
    });

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
                <RootNavigator  />
            </NavigationContext.Provider>
        </NavigationContainer>
    );
}


const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
    const {auth} : any= useContext(NavigationContext);
    const user = auth.user;
    const admin = auth.admin ;
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false,  }}
        >
            <Stack.Screen name="Root" component={typeof admin === 'string' ? BottomTabAdminNavigator :(typeof user === 'string' ? BottomTabUserNavigator :AuthenticationNavigator) } />
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
