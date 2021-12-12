import React, {Component} from 'react';
import {connect, useDispatch} from 'react-redux';
import LayoutHomeScreen from './LayoutHomeScreen';
import {userDispatchToProps} from "../../app/controller/AuthAction";
import {useGetProductByTypeQuery} from "../../app/service/product/productAPI";

function HomeScreen() {
    // @ts-ignore
    return (
        <LayoutHomeScreen />
    );
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps, userDispatchToProps
)(HomeScreen);
