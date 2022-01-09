import React, {createContext, useEffect, useState} from 'react';
import TextBase from "../components/TextBase";
import {check} from "./check";
import {useIsFocused, useNavigation ,useFocusEffect } from "@react-navigation/native";
import {useGetAllStoreQuery} from "../app/selectors";
import {StyleSheet, View} from "react-native";
import {Fold, Flow} from "react-native-animated-spinkit";
export const LoadingContext = createContext({});
export const WaitingScreen = ()=>{
    return (
        <View style={styles.container}>
            <Flow size={80} color="#FFFFFF" animating={true} />
        </View>
    )
}
const LoadingScreen = (props:{data?:Array<any>,children?: JSX.Element}) => {

    // @ts-ignore
    let checked:number = check(props.data);
    const data = {context : props.data};
    return (
        <>
            {  checked === -1 ?<>
                <WaitingScreen />
            </> :(checked !== 1 ?  <WaitingScreen /> : <LoadingContext.Provider value={data}>{props.children}</LoadingContext.Provider>)
            }
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingScreen;
