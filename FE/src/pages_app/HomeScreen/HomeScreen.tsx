import React, { createContext,} from 'react';
import {connect} from 'react-redux';
import LayoutHomeScreen from './LayoutHomeScreen';
import {userDispatchToProps} from "../../app/controller/AuthAction";
import {useGetProductByViewQuery, useGetTotalViewProductByTypeQuery} from "../../app/selectors";

export const HomeContext = createContext({});

function HomeScreen(props:any) {

    // @ts-ignore
    const productByView = useGetProductByViewQuery();
    const productByViewCp = Object.assign({}, productByView);
    // @ts-ignore
    const totalViewByType = useGetTotalViewProductByTypeQuery();
    const totalViewByTypeCp = Object.assign({}, totalViewByType);
    // @ts-ignore
    return (
        <HomeContext.Provider value={{
            productByView: productByViewCp.data,
            totalViewByType:totalViewByTypeCp.data,
        }}>
            <LayoutHomeScreen />
        </HomeContext.Provider>
    );
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps, userDispatchToProps
)(HomeScreen);
