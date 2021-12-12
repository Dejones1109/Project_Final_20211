import React from 'react';
import {AllProductTypeView, BannerView, CategoryTypeView, HotProductView, SearchView} from "./ChildrentComponent";
import {SafeAreaView} from "react-native";
import {Container, Heading, ScrollView} from "native-base";
import { Col } from '../../components/AutoLayout';
import AllProductView from "./ChildrentComponent/AllProductView";



export type LayoutHome  = {
    SearchView: JSX.Element,
    BannerView:JSX.Element,
    AllProductTypeView : JSX.Element,
    HotProductView : JSX.Element,
    CategoryTypeView: JSX.Element,
    AllProductView : JSX.Element,
}



const LayoutHomeScreen = (props:LayoutHome) => {
    return (
        <ScrollView
        >
            <Col space={5} >
                {props.SearchView}
                {props.BannerView}
                {props.AllProductTypeView}
                <Heading  mx={{base:"2.5%",lg:"1%"}} size={"md"}>Sản phẩm hot</Heading>
                {props.HotProductView}
                <Heading  mx={{base:"2.5%",lg:"1%"}} size={"md"}>Tìm kiếm phổ biến</Heading>
                {props.CategoryTypeView}
                <Heading  mx={{base:"2.5%",lg:"1%"}} size={"md"}>Tất cả sản phẩm</Heading>
                {props.AllProductView}
            </Col>
        </ScrollView>
    );
};
LayoutHomeScreen.defaultProps ={
    SearchView: <SearchView display={{md:"none"}}/>,
    BannerView: <BannerView />,
    AllProductTypeView:<AllProductTypeView />,
    HotProductView:<HotProductView />,
    CategoryTypeView:<CategoryTypeView />,
    AllProductView:<AllProductView/>
}
export default LayoutHomeScreen;
