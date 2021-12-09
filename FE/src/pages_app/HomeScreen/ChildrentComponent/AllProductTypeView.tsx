import React from 'react';
import {FlatList, HStack, ScrollView, Text, VStack} from "native-base";
import CardTypeBase from "../../../components/CardTypeBase";

const AllProductTypeView = () => {
    const data = [
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            heading:"Combo uu dai"
        },
    ]
    return (
        <ScrollView
            horizontal
            _contentContainerStyle={{
                mx: "auto",
                mb: "4",
                minW: "72",
                flexWrap:"wrap",
            }}
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={data}
                renderItem = {({item})=><CardTypeBase productType={item}/>}
                numColumns ={5}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default AllProductTypeView;
