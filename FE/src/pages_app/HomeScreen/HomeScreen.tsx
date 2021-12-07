import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

class HomeScreen extends Component {
    render() {
        console.log("home");
        return (
            <Text>
               Home
            </Text>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(HomeScreen);
