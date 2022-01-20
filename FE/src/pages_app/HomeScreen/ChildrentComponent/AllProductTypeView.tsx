import React, { useContext } from 'react';
import {FlatList, HStack, ScrollView, Text, VStack} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {useNavigation} from "@react-navigation/native";
// @ts-ignore
import Chaohaisan from '../../../assets/icon/chaohaisan.png';
// @ts-ignore
import Chaochim from '../../../assets/icon/chaochim.png';
// @ts-ignore
import Chaocua from '../../../assets/icon/chaocua.png';
// @ts-ignore
import Chaoech from '../../../assets/icon/chaoech.png';
// @ts-ignore
import Chaoca from '../../../assets/icon/chaoca.png';
// @ts-ignore
import Chaothit from '../../../assets/icon/chaothit.png';
// @ts-ignore
import Chaotimcan from '../../../assets/icon/chaotimcan.png';
// @ts-ignore
import Chaoluon from '../../../assets/icon/chaoluon.png';
const AllProductTypeView = (props:{navigation?:any}) => {
    const data = [
        {
            type:"Cháo hái sản",
            img: Chaohaisan,
            heading:"Cháo hái sản"
        },
        {
            type:"Cháo thịt",
            img:Chaothit,
            heading:"Cháo thịt",
        },
        {
            type:"Cháo tim cận",
            img:Chaotimcan,
            heading:"Cháo tim cận"
        },
        {
            type:"Cháo cá",
            img:Chaoca,
            heading:"Cháo cá"
        },
        {
            type:"Cháo lươn",
            img:Chaoluon,
            heading:"Cháo lươn"
        },
        {
            type:"Cháo ếch",
            img:Chaoech,
            heading:"Cháo ếch"
        },
        {
            type:"Cháo chim",
            img:Chaochim,
            heading:"Cháo chim"
        },
        {
            type:"Cháo cua",
            img:Chaocua,
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
