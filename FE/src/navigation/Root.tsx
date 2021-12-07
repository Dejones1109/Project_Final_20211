
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {AuthTabParamList, RootStackParamList} from "../constants/Routes";
import SignInScreen from "../pages_app/AuthScreen/SignInScreen";
import RegisterScreen from "../pages_app/AuthScreen/RegisterScreen";
import LayoutScreenTable from "../components/common/LayoutScreenTable";
import Layout from '../constants/Layout';
import {useEffect, useState } from 'react';
import {useBreakpointValue} from "native-base";


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking ={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator  />
        </NavigationContainer>
    );
}


const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
    const user = true;
    const NextLogin = useBreakpointValue({
        base:BottomTabNavigator,
        sm:BottomTabNavigator,
        md:LayoutScreenTable,
    })
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false,  }}
        >
            <Stack.Screen name="Root" component={user ? NextLogin : AuthenticationNavigator} />
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
