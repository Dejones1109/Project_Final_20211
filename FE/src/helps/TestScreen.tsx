import React, {useContext} from 'react';
import {LoadingContext} from "./LoadingScreen";

const TestScreen = () => {
    const data = useContext(LoadingContext);
    console.log(data);
    return (
        <div>

        </div>
    );
};

export default TestScreen;
