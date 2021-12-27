import React, {useContext, useEffect, useState} from 'react';
import {
    PieChart,
} from "react-native-chart-kit";
import Layout from "../../constants/Layout";
import FrameBase from "../../components/FrameBase";
import TextBase from '../../components/TextBase';
import {Box, Button, Center, CheckIcon, Divider, Heading, Progress, Row, ScrollView, Select, View} from "native-base";
import RankTableQuantityView from "./ChildrentComponent/RankTableQuantityView";
import ButtonBase from "../../components/ButtonBase";
import {Platform} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    useGetPartnerByQuantityQuery, useGetPartnerByTotalPriceQuery,
    useGetTotalPriceAndTotalQuantityQuery
} from "../../app/selectors";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import LayoutStatisticScreen from "./LayoutStatisticScreen";


function StatisticsScreen () {

    // @ts-ignore
    // get total of quantity and money
    const total =  useGetTotalPriceAndTotalQuantityQuery();
    // @ts-ignore
    // get data for table about quantity
    const quantity = useGetPartnerByQuantityQuery();
    // @ts-ignore
    // get data for table about price
    const totalPrice = useGetPartnerByTotalPriceQuery();

    return(
        <LoadingScreen data={[total, quantity, totalPrice]}>
            <LayoutStatisticScreen/>
        </LoadingScreen>
    )
}

export default StatisticsScreen;
