import {Button, Pressable, View} from 'native-base';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class ToolNavigate extends Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(ToolNavigate);
