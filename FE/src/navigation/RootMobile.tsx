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
    localStorage.setItem("partnerId","6");
    localStorage.setItem("partnerId","1");
    const user = localStorage.getItem("partnerId");
    const admin = localStorage.getItem("admin");

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false,  }}
        >
            <Stack.Screen name="Root" component={admin ? BottomTabAdminNavigator : AuthenticationNavigator} />
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
