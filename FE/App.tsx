import 'react-native-gesture-handler';
import React from "react"
import {
    extendTheme, NativeBaseProvider,
} from "native-base"

import useColorScheme from "./src/hooks/useColorScheme";
import {Provider} from "react-redux";
import { store } from "./src/app/store";
import {TextConfig} from "./src/helps/TextStyles";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import Navigation from './src/navigation/RootMobile';

export default function App () {
    const new_theme = extendTheme({TextConfig })
    const colorScheme = useColorScheme();
    LogBox.ignoreAllLogs();
    return (

        <Provider store={store}>
            <NativeBaseProvider  theme={new_theme}>
                <SafeAreaProvider >
                    <Navigation  colorScheme={colorScheme}/>
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    )
}


