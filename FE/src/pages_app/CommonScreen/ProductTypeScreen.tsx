import React, {useContext} from 'react';
import {ProductListView} from "./index";
import {useGetProductByTypeQuery} from "../../app/selectors";
import {Center, ScrollView, View} from "native-base";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
const ProductTypeScreen = (props:{route:any})=>{
    const {type} = props.route.params;
    const  data= useGetProductByTypeQuery(type);
    return(
        <LoadingScreen data={[data]}>
            <ShowProductTypeScreen />
        </LoadingScreen>
    )
}
const ShowProductTypeScreen = () => {
   const {context}:any = useContext(LoadingContext);
   const data = context[0].data.data;
    return (
        <ScrollView bg={"white"}>
            <Center>
                <Center  width={"100%"}>
                    <ProductListView data={data}/>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductTypeScreen;
