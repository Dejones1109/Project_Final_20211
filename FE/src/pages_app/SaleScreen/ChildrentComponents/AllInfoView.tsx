import React, {useContext,useEffect} from 'react';
import FrameBase from "../../../components/FrameBase";
import {
    FlatList,
    useBreakpointValue,
    Button,
    Actionsheet,
    useDisclose,
    Box,
    Text,
    Pressable,
    Divider,
    Heading,
    Image
} from "native-base";
import TextBase from "../../../components/TextBase";
import {borderWidth} from "styled-system";
import {useNavigation} from "@react-navigation/native";
import {SaleCardView} from "../../../components/common/SaleCardView";
import {LoadingContext} from "../../../helps/LoadingScreen";
import Layout from "../../../constants/Layout";




const AllInfoView = (props:{navigation ?:any}) => {
    const navigation = useNavigation();
    // const data =[
    //     {
    //         img:"https://wallpaperaccess.com/full/317501.jpg",
    //         title:"Mua ",
    //         time:"30/12/2021"
    //     },
    //     {
    //         img:"https://wallpaperaccess.com/full/317501.jpg",
    //         title:"Mua 50 goi tang 100000 d",
    //         time:"30/12/2021"
    //     },
    //     {
    //         img:"https://wallpaperaccess.com/full/317501.jpg",
    //         title:"Mua 50 goi tang 100000 d",
    //         time:"30/12/2021"
    //     },
    //     {
    //         img:"https://wallpaperaccess.com/full/317501.jpg",
    //         title:"Mua 50 goi tang 100000 d",
    //         time:"30/12/2021"
    //     },
    //     {
    //         img:"https://wallpaperaccess.com/full/317501.jpg",
    //         title:"Mua 50 goi tang 100000 d",
    //         time:"30/12/2021"
    //     }
    // ]
    const { isOpen, onOpen, onClose } = useDisclose();
    const {context }:any = useContext(LoadingContext);
    const {data}= context[0].data;
    return (
        <>
            <FlatList
                initialNumToRender={10}
                contentContainerStyle={{
                    width:Layout.window.width,
                    justifyContent: 'center'
                }}
                numColumns={1}
                renderItem = {({item})=>
                    <SaleCardView item={item} navigation={navigation} routeName={'saleInfoScreen'} />
                }
                data={data}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Divider bg={"light.300"} />}
            />

        </>
    );
};

export default AllInfoView;
