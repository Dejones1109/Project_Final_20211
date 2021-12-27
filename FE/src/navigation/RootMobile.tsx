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
import {useState} from "react";


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking ={LinkingConfigurationForAdmin}
        >
            <RootNavigator  />
        </NavigationContainer>
    );
}


const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {


    const [user,setUser] = useState(null);
    const [admin,setAdmin] = useState(null);
    getData("user").then(r =>setUser(r));
    getData("admin").then(r=>setAdmin(r));
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
