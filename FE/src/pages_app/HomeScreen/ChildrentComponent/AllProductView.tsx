import React from 'react';
import {FlatList, HStack, Row, ScrollView,} from "native-base";
import CardTypeBase from "../../../components/CardTypeBase";

const AllProductView = () => {
    const data =[
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            price:"100000 đ",
            product_name:"Cháo PAPA"
        }
    ]

    return (
        <FlatList
            contentContainerStyle={{
                flex:1,
                justifyContent: "center"
            }}
            data={data}
            numColumns ={2}
            renderItem = {({item})=><CardTypeBase product={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

export default AllProductView;
