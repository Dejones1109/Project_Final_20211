import React, {Component,useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {useDispatch, useSelector} from "react-redux";
import LayoutSaleScreen from "./LayoutSaleScreen";
import LoadingScreen from "../../helps/LoadingScreen";
import {useGetAllSaleQuery} from "../../app/selectors";

const SaleScreen = ()=> {
    // @ts-ignore
    const dataUser = useSelector(state=>state.auth.currentUser);
    const allSale = useGetAllSaleQuery(dataUser.id);
    let count = 0;
    
    return (
        <LoadingScreen data={[allSale]}>
            <LayoutSaleScreen />
        </LoadingScreen>
    );
}



export default SaleScreen;
