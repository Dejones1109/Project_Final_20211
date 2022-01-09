import React from 'react';
import {WaitingScreen} from "../../helps/LoadingScreen";
import {Flow, Fold} from "react-native-animated-spinkit";
import {StyleSheet, View} from "react-native";
import TextBase from "../TextBase";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Fold size={80} color="#CCFFCC" animating={true} />
            <TextBase my={5} bold color={"info.500"}>PAPA DASHI</TextBase>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default SplashScreen;
