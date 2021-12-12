
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {AuthTabParamList, RootStackParamList} from "../../constants/Routes";
import SignInScreen from "../../pages_app/AuthScreen/SignInScreen";
import RegisterScreen from "../../pages_app/AuthScreen/RegisterScreen";
import {useBreakpointValue} from "native-base";
import RootTable from "../Table/Root.Table";



export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking ={LinkingConfiguration}
            >
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
        md:RootTable,
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
