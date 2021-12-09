import React, {Component} from 'react';
import {connect} from 'react-redux';
import LayoutHomeScreen from './LayoutHomeScreen';


class HomeScreen extends Component {
    render() {
        return (
            <LayoutHomeScreen />
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(HomeScreen);
