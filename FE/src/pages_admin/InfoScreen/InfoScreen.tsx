import {Avatar, Center, Divider, Pressable, ScrollView} from 'native-base';
import React from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import { Col } from '../../components/AutoLayout';
import Layout from "../../constants/Layout";
import MainIcon from "../../assets/icon/Icon";
import {useGetTotalPriceAndTotalQuantityQuery} from "../../app/selectors";
import LoadingScreen from "../../helps/LoadingScreen";
import LayoutInfoScreen from "./LayoutInfoScreen";

const InfoScreen = (props:{navigation:any}) => {

    //get quantity and money
    // @ts-ignore
    const total =  useGetTotalPriceAndTotalQuantityQuery();


    return (
        <LoadingScreen data={[total]}>
            <LayoutInfoScreen navigation={props.navigation}/>
        </LoadingScreen>
    );
};

export default InfoScreen;
