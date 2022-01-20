import React, {useRef} from 'react';
import FlashMessage, {showMessage} from "react-native-flash-message";
import {Text, TouchableOpacity, View} from "react-native";

const Notification = ({ref}:any) => {


    return (
            <FlashMessage position="top" ref={ref}  />
    );
};

export default Notification;
