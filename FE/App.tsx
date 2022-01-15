import 'react-native-gesture-handler';
import React, {useEffect} from "react"
import {
    Avatar,
    Box,
    extendTheme, IconButton, Input, NativeBaseProvider, ScrollView, Spacer, StatusBar,
} from "native-base"
import { enableScreens } from 'react-native-screens';
import useColorScheme from "./src/hooks/useColorScheme";
import {Provider} from "react-redux";
import { store } from "./src/app/store";
import {TextConfig} from "./src/helps/TextStyles";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Button, LogBox, TouchableOpacity, YellowBox} from 'react-native';
import Navigation from './src/navigation/RootMobile';
import ButtonBase from "./src/components/ButtonBase";
import Database from './src/firebase/database'
import {Col, Row} from "./src/components/AutoLayout";
import MainIcon from "./src/assets/icon/Icon";
import TextBase from "./src/components/TextBase";
import TestScreen from "./src/TestScreen";
import {checkLogin} from "./src/helps/authenticate";
import TestScreen1 from "./src/TestScreen1";
export default function App () {
    const new_theme = extendTheme({TextConfig })
    const colorScheme = useColorScheme();
    checkLogin();
    LogBox.ignoreAllLogs();
    LogBox.ignoreLogs([
        'Require cycle:'
    ]);
    console.disableYellowBox = true;
    enableScreens(false)
    return (
        //

            <NativeBaseProvider  theme={new_theme}>
                <Provider store={store}>
                    <SafeAreaProvider >
                        <Navigation  colorScheme={colorScheme}/>
                    </SafeAreaProvider>
                    {/*<TestScreen1 />*/}
                </Provider>
            </NativeBaseProvider>


    )
}


