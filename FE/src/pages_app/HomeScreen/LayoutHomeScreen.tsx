import React from 'react';
import {AllProductTypeView, BannerView, CategoryTypeView, HotProductView, SearchView} from "./ChildrentComponent";
import {SafeAreaView} from "react-native";
import {Container, Heading, ScrollView} from "native-base";
import { Col } from '../../components/AutoLayout';



export type LayoutHome  = {
    SearchView: any,
    BannerView:any,
    AllProductTypeView : any,
    HotProductView : any,
    CategoryTypeView: any,
}



const LayoutHomeScreen = (props:LayoutHome) => {
    return (
        <ScrollView
        >
            <Col space={5} >
                {props.SearchView}
                {props.BannerView}
                {props.AllProductTypeView}
                <Heading  size={"md"}>Sản phẩm hot</Heading>
                {props.HotProductView}
                <Heading size={"md"}>Tìm kiếm phổ biến</Heading>
                {props.CategoryTypeView}
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
}
export default LayoutHomeScreen;
