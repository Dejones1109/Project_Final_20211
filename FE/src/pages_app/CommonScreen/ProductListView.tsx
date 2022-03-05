import React from 'react';
import FrameBase from "../../components/FrameBase";
import {Box, FlatList} from "native-base";
import Layout from '../../constants/Layout';
import {useNavigation} from "@react-navigation/native";
import {Row} from "../../components/AutoLayout";

const ProductListView = (props:{data:Array<object>}) => {
    const navigation = useNavigation();
    const data = props.data;
    let dataCp = data[0];
    return (
        <>

            <FlatList
                contentContainerStyle={{
                    width: Layout.window.width,

                }}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                    justifyContent:"space-around",
                }}
                data={data.length % 2 === 0  ? data : data.slice(1,data.length)}
                numColumns ={2}
                renderItem = {({item})=><FrameBase product={item} navigation={navigation} />}
                keyExtractor={({index}) => index}
            />
            {data.length %2 !== 0 &&
                <Row justifyContent={'flex-start'} >
                    <FrameBase product={dataCp} navigation={navigation} />
                </Row>
            }
        </>
    );
};

export default ProductListView;
