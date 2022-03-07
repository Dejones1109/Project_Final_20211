import React, {useContext} from 'react';
import {AllProductTypeView, BannerView, CategorySearchView, HotProductView, SearchView} from "./ChildrentComponent";
import {Box, Center, Heading, ScrollView} from "native-base";
import { Col } from '../../components/AutoLayout';
import AllProductView from "./ChildrentComponent/AllProductView";
import {useNavigation} from "@react-navigation/native";
import {HomeContext} from "./HomeScreen";

export type LayoutHome  = {
    SearchView?: JSX.Element,
    BannerView?:JSX.Element,
    AllProductTypeView ?: JSX.Element,
    HotProductView ?: JSX.Element,
    CategoryTypeView ?: JSX.Element,
    AllProductView ?: JSX.Element,
    navigation ?: any,
}



const LayoutHomeScreen = (props:LayoutHome) => {
    const navigation = useNavigation();
    // @ts-ignore
    const {allProducts,totalViewByType,productByView} = useContext(HomeContext);
    props = {
        SearchView: <SearchView navigation={navigation} />,
        BannerView: <BannerView />,
        AllProductTypeView:<AllProductTypeView navigation={navigation}/>,
        HotProductView:<HotProductView navigation={navigation} data={productByView.data} />,
        CategoryTypeView:<CategorySearchView navigation={navigation} data={totalViewByType} />,
        AllProductView:<AllProductView data={allProducts.data}/>
    }
    return (
        <>
            {props.SearchView}
            <ScrollView zIndex={0} bg={"white"} showsVerticalScrollIndicator={false}>
                <Col space={3}  >
                    <Box>
                        {props.BannerView}
                        {props.AllProductTypeView}
                    </Box>
                    <Heading  mx={{base:"5%",lg:"1%"}} size={"md"}>Sản phẩm hot</Heading>
                    {props.HotProductView}
                </Col>
                <Center>
                    <Center width={"100%"} >
                        <Heading width={"100%"} mx={{base:"5%",lg:"1%"}} size={"md"}>Tìm kiếm phổ biến</Heading>
                        {props.CategoryTypeView}
                        <Heading width={"100%"} mx={{base:"5%",lg:"1%"}} size={"md"}>Tất cả sản phẩm</Heading>
                        {props.AllProductView}
                    </Center>
                </Center>
            </ScrollView>
        </>
    );
};

export default LayoutHomeScreen;
