import React, {createContext, useEffect, useState} from 'react';
import TextBase from "../components/TextBase";
import {check} from "./check";
import {useIsFocused, useNavigation ,useFocusEffect } from "@react-navigation/native";
import {useGetAllStoreQuery} from "../app/selectors";
export const LoadingContext = createContext({});
export const WaitingScreen = ()=>{
    return (<TextBase>loading</TextBase>)
}
const LoadingScreen = (props:{data?:Array<any>,children?: JSX.Element}) => {
    const isFocused = useIsFocused();
    useFocusEffect(
        React.useCallback(() => {
            // @ts-ignore

        }, [])
    );

    useEffect(()=>{
    }, [])
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

export default LoadingScreen;
