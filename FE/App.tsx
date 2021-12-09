import 'react-native-gesture-handler';
import React from "react"
import {
    Button,
    Actionsheet,
    useDisclose,
    Text,
    Box,
    Center,
    NativeBaseProvider,
    extendTheme,
    Container,
    Input,
    Icon,
    HStack,
    VStack,
    Badge,
    Image,
    Heading,
    ScrollView,
    View
} from "native-base"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from "./src/navigation/Mobile/RootMobile";
import useColorScheme from "./src/hooks/useColorScheme";
import {Provider} from "react-redux";
import { store } from "./src/app/store";
import {TextConfig} from "./src/helps/TextStyles";

export default function App () {
    const new_theme = extendTheme({TextConfig })
    const colorScheme = useColorScheme();
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={new_theme}>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                </SafeAreaProvider>
            </NativeBaseProvider>
        </Provider>
    )
}


