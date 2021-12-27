import React, { createContext,} from 'react';
import {connect} from 'react-redux';
import LayoutHomeScreen from './LayoutHomeScreen';
import {userDispatchToProps} from "../../app/controller/AuthAction";
import {useGetProductByViewQuery, useGetTotalViewProductByTypeQuery} from "../../app/selectors";
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView>
            <HomeContext.Provider value={{
                productByView: productByViewCp.data,
                totalViewByType:totalViewByTypeCp.data,
            }}>
                <LayoutHomeScreen />
            </HomeContext.Provider>
        </SafeAreaView>
    );
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps, userDispatchToProps
)(HomeScreen);
