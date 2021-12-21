
import React, {useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery} from "../../../app/selectors";
import {FlatList} from "native-base";

const DataFollowRow = (props:{item:any})=>{
    const {data} = useGetListToCartToOrderIdForAdminQuery(props.item.id);
    const dataCp = Object.assign([],Object.assign({},data).data);
    const item = Object.assign({},dataCp[0]);
    const {quantity,price,product} = item;
    const {productName} = Object.assign({},product);
    return(
        <DataTable.Row>
            <DataTable.Cell>{productName}</DataTable.Cell>
            <DataTable.Cell numeric>{quantity}</DataTable.Cell>
            <DataTable.Cell numeric>{price}</DataTable.Cell>
        </DataTable.Row>
    )
}
const ProductDataTableView =  (props:{data:any})=> {
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Sản phẩm</DataTable.Title>
                <DataTable.Title numeric>Số lượng</DataTable.Title>
                <DataTable.Title numeric>Giá</DataTable.Title>
            </DataTable.Header>
            <FlatList
                renderItem = {({item})=><DataFollowRow item={item} />}
                data={props.data}
                keyExtractor={({index}) => index}
            />

        </DataTable>
    );
}
export default ProductDataTableView;
