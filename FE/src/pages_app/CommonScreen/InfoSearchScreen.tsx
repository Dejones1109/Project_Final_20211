import React from 'react';
import LoadingScreen from "../../helps/LoadingScreen";
const ShowInfoSearchScreen = ()=>{
    return(
        <></>
    )
}
const InfoSearchScreen = () => {
    return (
        <LoadingScreen data={[]}>
            <ShowInfoSearchScreen></ShowInfoSearchScreen>
        </LoadingScreen>
    );
};

export default InfoSearchScreen;
