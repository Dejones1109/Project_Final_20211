import React from 'react';
import FrameBase from "../../components/FrameBase";
import {FlatList} from "native-base";
import Layout from '../../constants/Layout';
import {useNavigation} from "@react-navigation/native";
import {Row} from "../../components/AutoLayout";

const ProductListView = (props:{data:Array<object>}) => {
    const navigation = useNavigation();
    const data = props.data;
    console.log(data);
    return (
        <>
            <FlatList
                contentContainerStyle={{
                    width: Layout.window.width,
                }}
                columnWrapperStyle={{
                    justifyContent:"space-around",
                }}
                data={data.length % 2 === 0  ? data : data.slice(0,data.length-1)}
                numColumns ={2}
                renderItem = {({item})=><FrameBase product={item} navigation={navigation} />}
                keyExtractor={({index}) => index}
            />
            {
                data.length % 2 === 0 ?null :
                    <Row ml={1}  justifyContent="flex-start" >
                        <FrameBase product={data[length]} navigation={navigation} />
                    </Row>

            }
        </>
    );
};

export default ProductListView;
