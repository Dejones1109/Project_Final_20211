import React from 'react';
import {FlatList, HStack, Row, ScrollView,} from "native-base";
import CardTypeBase from "../../../components/CardTypeBase";

const HotProductView = () => {
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
        <ScrollView
            horizontal
            _contentContainerStyle={{
                mx: "auto",
                mb: "4",
                minW: "72",
            }}
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={data}
                mx={2}
                horizontal={true}
                renderItem = {({item})=><CardTypeBase product={item} />}
                keyExtractor={(item) => item.id}
            />

        </ScrollView>
    );
};

export default HotProductView;
