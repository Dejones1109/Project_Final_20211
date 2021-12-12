import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import LayoutNotifyScreen from "./LayoutNotifyScreen";

class NotifyScreen extends Component {
    render() {
        return (
            <LayoutNotifyScreen/>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(NotifyScreen);
