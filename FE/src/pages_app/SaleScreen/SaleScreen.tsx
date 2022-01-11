import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import LayoutSaleScreen from "./LayoutSaleScreen";
import LoadingScreen from "../../helps/LoadingScreen";
import {useGetAllSaleQuery} from "../../app/selectors";

const SaleScreen = ()=> {
    // @ts-ignore
    const allSale = useGetAllSaleQuery();
    return (
        <LoadingScreen data={[allSale]}>
            <LayoutSaleScreen />
        </LoadingScreen>
    );
}



export default SaleScreen;
