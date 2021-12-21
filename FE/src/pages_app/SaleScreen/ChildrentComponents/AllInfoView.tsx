import React from 'react';
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




const AllInfoView = (props:{navigation ?:any}) => {
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
    const { isOpen, onOpen, onClose } = useDisclose();
    return (
        <>
            <FlatList
                contentContainerStyle={{  flex: 1,justifyContent: "center"}}
                numColumns ={1}
                renderItem = {({item})=>
                    <>
                        <Pressable onPress={()=>props.navigation.navigate("saleInfoScreen")}>
                            <FrameBase infoSale={item}   />
                        </Pressable>
                    </>
                }
                data={data}
                keyExtractor={(item) => item.id}
            />

        </>
    );
};

export default AllInfoView;
