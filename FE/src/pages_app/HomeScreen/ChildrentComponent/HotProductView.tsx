import React ,{useContext} from 'react';
import {FlatList, HStack, Row, ScrollView,} from "native-base";
import FrameBase from "../../../components/FrameBase";
const HotProductView = (props:{navigation?:any, data?:any}) => {

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
                data={props.data.slice(0,-10)}
                inverted
                horizontal={true}
                renderItem = {({item})=><FrameBase product={item} navigation={props.navigation} />}
                keyExtractor={(item) => item.id}
            />

        </ScrollView>
    );
};

export default HotProductView;
