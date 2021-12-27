import React, {createContext} from 'react';
import TextBase from "../components/TextBase";
import {check} from "./check"

export const LoadingContext = createContext({});
export const WaitingScreen = ()=>{
    return (<TextBase>loading</TextBase>)
}
const LoadingScreen = (props:{data?:Array<any>,children?: JSX.Element}) => {
    // @ts-ignore
    let checked:number = check(props.data);
    const data = {context : props.data};
    return (
        <>
            {  checked === -1 ?<>
                <WaitingScreen />
            </> :(checked === 0 ?<TextBase>Lỗi máy chủ</TextBase> : <LoadingContext.Provider value={data}>{props.children}</LoadingContext.Provider>)
            }
        </>
    );
};

export default LoadingScreen;
