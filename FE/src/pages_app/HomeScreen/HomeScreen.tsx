import React, { createContext,} from 'react';
import LayoutHomeScreen from './LayoutHomeScreen';
import {useGetProductByViewQuery, useGetTotalViewProductByTypeQuery} from "../../app/selectors";
import LoadingScreen from '../../helps/LoadingScreen';
import {useGetAllProductsQuery} from "../../app/selectors";

export const HomeContext = createContext({});

function HomeScreen() {

    // @ts-ignore
    const productByView = useGetProductByViewQuery();
    // @ts-ignore
    const totalViewByType = useGetTotalViewProductByTypeQuery();
    // @ts-ignore
    const allProducts = useGetAllProductsQuery();
    return (
        <LoadingScreen data={[totalViewByType,productByView, allProducts]}>
            <HomeContext.Provider value={{
                productByView: productByView.data,
                totalViewByType:totalViewByType.data,
                allProducts :allProducts.data,
            }}>
                <LayoutHomeScreen />
            </HomeContext.Provider>
        </LoadingScreen>
    );
}

export default HomeScreen;


