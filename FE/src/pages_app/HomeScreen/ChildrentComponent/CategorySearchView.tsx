import React, {useContext} from 'react';
import {FlatList, ScrollView} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {HomeContext} from "../HomeScreen";
import {typeList} from "../../../constants/Product";
import {useNavigation} from "@react-navigation/native";

const CategorySearchView = () => {
    const navigation = useNavigation();
    // @ts-ignore
    const {totalViewByType} = useContext(HomeContext);
    // @ts-ignore
    const value = Object.assign([], Object.assign({}, totalViewByType).data);
    const getData = ()=>{
        let data = [];
        for (const property in value) {
            data.push(
                {
                    type:`${property}`,
                    img:"https://wallpaperaccess.com/full/317501.jpg",
                    view: value[property]
                }
            );
        }

        return data;
    }
    const data = getData();

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
                columnWrapperStyle ={{
                    justifyContent:"space-around"
                }}
                numColumns={2}
                data={data.slice(0,4)}
                renderItem={({item})=><FrameBase category={item} navigation={navigation}/>}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default CategorySearchView;
