import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

class NotifyScreen extends Component {
    render() {
        return (
            <Text>
                Notify Screen
            </Text>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(NotifyScreen);
