
import React, {useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import {Checkbox, FlatList, Modal, Pressable} from "native-base";


const DataFollowRow = (props:{item:any})=>{

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
