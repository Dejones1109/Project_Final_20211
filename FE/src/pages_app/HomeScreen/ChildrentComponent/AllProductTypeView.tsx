import React, { useContext } from 'react';
import {FlatList, HStack, ScrollView, Text, VStack} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {useNavigation} from "@react-navigation/native";

const AllProductTypeView = (props:{navigation?:any}) => {
    const data = [
        {
            type:"Cháo hái sản",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo hái sản"
        },
        {
            type:"Cháo thịt",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo thịt",
        },
        {
            type:"Cháo tim cận",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo tim cận"
        },
        {
            type:"Cháo cá",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo cá"
        },
        {
            type:"Cháo lươn",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo lươn"
        },
        {
            type:"Cháo ếch",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo ếch"
        },
        {
            type:"Cháo chim",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo chim"
        },
        {
            type:"Cháo cua",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Cháo cua"
        },
    ]
    return (
        <ScrollView
            horizontal
            _contentContainerStyle={{
                mx: "auto",
                my: "4",
                minW: "72",

            }}
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={data}
                renderItem = {({item})=><FrameBase productType={item} navigation={props.navigation}/>}
                numColumns ={4}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default AllProductTypeView;
