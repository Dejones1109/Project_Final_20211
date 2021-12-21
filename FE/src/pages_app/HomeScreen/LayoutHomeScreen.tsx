import React from 'react';
import {AllProductTypeView, BannerView, CategorySearchView, HotProductView, SearchView} from "./ChildrentComponent";
import {Box, Center, Heading, ScrollView} from "native-base";
import { Col } from '../../components/AutoLayout';
import AllProductView from "./ChildrentComponent/AllProductView";
import { useGetAllProductsQuery} from "../../app/selectors";


export type LayoutHome  = {
    SearchView?: JSX.Element,
    BannerView?:JSX.Element,
    AllProductTypeView ?: JSX.Element,
    HotProductView ?: JSX.Element,
    CategoryTypeView ?: JSX.Element,
    AllProductView ?: JSX.Element,
}


const LayoutHomeScreen = (props:LayoutHome) => {
    // @ts-ignore
    const products = useGetAllProductsQuery();
    const productsCp = Object.assign({},products.data);
    props = {
        SearchView: <SearchView />,
        BannerView: <BannerView />,
        AllProductTypeView:<AllProductTypeView />,
        HotProductView:<HotProductView />,
        CategoryTypeView:<CategorySearchView />,
        AllProductView:<AllProductView data={productsCp.data}/>
    }
    return (
        <>
            {props.SearchView}
            <ScrollView zIndex={0} bg={"white"}>
                <Col space={5}  >
                    <Box>

                        {props.BannerView}
                        {props.AllProductTypeView}
                    </Box>
                    <Heading  mx={{base:"2.5%",lg:"1%"}} size={"md"}>Sản phẩm hot</Heading>
                    {props.HotProductView}
                </Col>
                <Center>
                    <Center width={"95%"} >
                        <Heading width={"100%"} mx={{base:"2.5%",lg:"1%"}} size={"md"}>Tìm kiếm phổ biến</Heading>
                        {props.CategoryTypeView}
                        <Heading width={"100%"} mx={{base:"2.5%",lg:"1%"}} size={"md"}>Tất cả sản phẩm</Heading>
                        {props.AllProductView}
                    </Center>
                </Center>
            </ScrollView>
        </>
    );
};

export default LayoutHomeScreen;
