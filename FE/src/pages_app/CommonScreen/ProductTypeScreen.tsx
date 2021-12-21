import React from 'react';
import {ProductListView} from "./index";
import {useGetProductByTypeQuery} from "../../app/selectors";
import {Center, ScrollView, View} from "native-base";

const ProductTypeScreen = (props:{route:any}) => {

    const {type} = props.route.params;
    const  {data}= useGetProductByTypeQuery(type);
    const data_Cp = {};
    const value = Object.assign(data_Cp,data);
    return (
        <ScrollView bg={"white"}>
            <Center>
                <Center  width={"100%"}>
                    <ProductListView data={value.data}/>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductTypeScreen;
