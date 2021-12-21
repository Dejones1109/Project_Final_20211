import React ,{useContext} from 'react';
import {FlatList, HStack, Row, ScrollView,} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {HomeContext} from "../HomeScreen";
import {useNavigation} from "@react-navigation/native";

const HotProductView = () => {
    const navigation = useNavigation();
    // @ts-ignore
    const {productByView} = useContext(HomeContext);
    // @ts-ignore
    const value = Object.assign([], Object.assign({}, productByView).data);

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
                data={value.slice(0,-10)}
                inverted
                horizontal={true}
                renderItem = {({item})=><FrameBase product={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
            />

        </ScrollView>
    );
};

export default HotProductView;
