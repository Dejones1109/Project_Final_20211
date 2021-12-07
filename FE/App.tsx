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

import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import Navigation from "./src/navigation/Root";
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
                <Navigation colorScheme={colorScheme}/>
            </NativeBaseProvider>
        </Provider>
    )
}


