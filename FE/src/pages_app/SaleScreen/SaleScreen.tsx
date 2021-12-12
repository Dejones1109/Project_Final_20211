import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import LayoutSaleScreen from "./LayoutSaleScreen";

class SaleScreen extends Component {
    render() {
        return (
            <LayoutSaleScreen />
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(SaleScreen);
