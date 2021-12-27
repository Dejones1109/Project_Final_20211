
import React, {useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery} from "../../../app/selectors";
import {Checkbox, FlatList, Modal, Pressable} from "native-base";
import Layout from "../../../constants/Layout";
import ButtonBase from "../../../components/ButtonBase";
import {Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import { TouchableOpacity } from 'react-native';

const DataFollowRow = (props:{item:any})=>{
    // const {data} = useGetListToCartToOrderIdForAdminQuery(props.item.id);
    // const dataCp = Object.assign([],Object.assign({},data).data);
    // const item = Object.assign({},dataCp[0]);
    // const {quantity,price,product} = item;
    // const {productName} = Object.assign({},product);
    const item = props.item;
    return(
            <DataTable.Row>
                <DataTable.Cell>{item[0]}</DataTable.Cell>
                <DataTable.Cell numeric>{item[2]}</DataTable.Cell>
            </DataTable.Row>
    )
}
const ProductDataTableFinish =  (props:{data?:any })=> {

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Sản phẩm</DataTable.Title>
                <DataTable.Title numeric>Số lượng</DataTable.Title>

            </DataTable.Header>

            <FlatList
                renderItem = {({item})=><DataFollowRow item={item} />}
                data={props.data}
                keyExtractor={({index}) => index}
            />
        </DataTable>
    );
}
export default ProductDataTableFinish;
