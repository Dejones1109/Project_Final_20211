import React, {Component} from 'react';

import {connect} from 'react-redux';
import LayoutStoreScreen from "./LayoutStoreScreen";

class StoreScreen extends Component {
    render() {
        return (
            <LayoutStoreScreen />
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(StoreScreen);
