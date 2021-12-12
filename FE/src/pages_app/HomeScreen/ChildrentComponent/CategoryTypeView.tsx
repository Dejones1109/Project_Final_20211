import React from 'react';
import {FlatList, ScrollView} from "native-base";
import CardTypeBase from "../../../components/CardTypeBase";
import { Row } from '../../../components/AutoLayout';

const CategoryTypeView = () => {
    const data = [
        {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        },
        {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        },
        {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        },
        {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        }, {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        },
        {
            type:"Cháo PAPA ",
            img:"https://wallpaperaccess.com/full/317501.jpg",
            view :"1000 view",
        },

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
                contentContainerStyle={{
                    marginVertical:2,
                }}
                numColumns={2}
                data={data}
                renderItem={({item})=><CardTypeBase category={item}/>}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default CategoryTypeView;
