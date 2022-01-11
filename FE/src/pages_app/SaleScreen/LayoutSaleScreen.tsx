import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Row } from '../../components/AutoLayout';
import TextBase from '../../components/TextBase';
import {AllInfoView, GiftView} from "./ChildrentComponents";
import {Center, Container, ScrollView} from "native-base";
import {useNavigation} from "@react-navigation/native";



export type LayoutHome = {
    GiftView: JSX.Element,
    AllInfoView : JSX.Element,
}

function LayoutSaleScreen (props:LayoutHome) {

    return (
        <ScrollView
            bg={"white"}
            showsVerticalScrollIndicator={false}
        >
            <Center>
                <Center  width={"95%"}>
                    {props.GiftView}
                    {props.AllInfoView}
                </Center>
            </Center>
        </ScrollView>
    );
}
LayoutSaleScreen.defaultProps ={
    GiftView :<GiftView />,
    AllInfoView : <AllInfoView />
}

export default LayoutSaleScreen;
