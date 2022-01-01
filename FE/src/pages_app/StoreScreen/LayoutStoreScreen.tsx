import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row } from '../../components/AutoLayout';
import TextBase from '../../components/TextBase';
import {Center, Container, ScrollView} from "native-base";
import {HistoryView, SettingView} from "./ChildrentComponents";

export type LayoutHome = {
    HistoryView: JSX.Element,
    SettingView : JSX.Element,
}

function LayoutStoreScreen (props:LayoutHome) {

    return (
        <ScrollView bg={"white"}>
            <Center>
                <Center width={"95%"} >
                    {props.HistoryView}
                    {props.SettingView}
                </Center>
            </Center>
        </ScrollView>
    );
}
LayoutStoreScreen.defaultProps ={
    HistoryView :<HistoryView />,
    SettingView : <SettingView/>
}
export default LayoutStoreScreen
