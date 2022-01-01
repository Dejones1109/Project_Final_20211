import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import LayoutSaleScreen from "./LayoutSaleScreen";
import LoadingScreen from "../../helps/LoadingScreen";

class SaleScreen extends Component {
    render() {
        return (
            <LoadingScreen data={[]}>
                <LayoutSaleScreen />
            </LoadingScreen>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(SaleScreen);
