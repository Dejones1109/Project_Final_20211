import React from 'react';
import FrameBase from "../../components/FrameBase";
import {FlatList} from "native-base";
import Layout from '../../constants/Layout';
import {useNavigation} from "@react-navigation/native";

const ProductListView = (props:{data:Array<object>}) => {
    const navigation = useNavigation();
    const data = props.data;
    return (
        <FlatList
            contentContainerStyle={{
                width: Layout.window.width,
            }}
            columnWrapperStyle={{
                justifyContent:"space-around",
            }}
            data={data}
            numColumns ={2}
            renderItem = {({item})=><FrameBase product={item} navigation={navigation} />}
            keyExtractor={({index}) => index}
        />
    );
};

export default ProductListView;
