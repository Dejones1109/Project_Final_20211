import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

class StoreScreen extends Component {
    render() {
        return (
            <Text>

            </Text>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(StoreScreen);
