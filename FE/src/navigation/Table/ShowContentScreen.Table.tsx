import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import HomeScreen from "../../pages_app/HomeScreen/HomeScreen";

class ShowContentScreen extends Component {
    render() {
        return (
            <HomeScreen/>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(ShowContentScreen);
