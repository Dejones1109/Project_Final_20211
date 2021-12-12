import React from 'react';
import CardTypeBase from "../../../components/CardTypeBase";
import {FlatList, useBreakpointValue} from "native-base";

const AllInfoView = () => {
    const data =[
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            title:"Mua ",
            time:"30/12/2021"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            title:"Mua 50 goi tang 100000 d",
            time:"30/12/2021"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            title:"Mua 50 goi tang 100000 d",
            time:"30/12/2021"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            title:"Mua 50 goi tang 100000 d",
            time:"30/12/2021"
        },
        {
            img:"https://wallpaperaccess.com/full/317501.jpg",
            title:"Mua 50 goi tang 100000 d",
            time:"30/12/2021"
        }
    ]

    return (
        <FlatList
            contentContainerStyle={{  flex: 1,justifyContent: "center"}}
            numColumns ={1}
            renderItem = {({item})=><CardTypeBase infoSale={item} />}
            data={data}
            keyExtractor={(item) => item.id}
        />

    );
};

export default AllInfoView;
