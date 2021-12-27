import React from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery} from "../../../app/selectors";
import {FlatList} from "native-base";
import {TouchableOpacity} from "react-native";

const DataFollowRow = (props:{item:any})=>{
    const item = props.item;
    return(
        <TouchableOpacity onPress={()=>alert('oke')}>
            <DataTable.Row>
                <DataTable.Cell>{item[1]}</DataTable.Cell>
                <DataTable.Cell numeric>{item[2]}</DataTable.Cell>
                <DataTable.Cell numeric>{item[3]}</DataTable.Cell>
            </DataTable.Row>
        </TouchableOpacity>
    )
}

const RankTableMoneyView = (props:{data:any})=> {
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Cửa hàng</DataTable.Title>
                <DataTable.Title numeric>Số lượng (g)</DataTable.Title>
                <DataTable.Title numeric>Giá (vnđ)</DataTable.Title>
            </DataTable.Header>
            <FlatList
                renderItem = {({item})=><DataFollowRow item={item} />}
                data={props.data}
                keyExtractor={({index}) => index}
            />

        </DataTable>
    );
}

export default RankTableMoneyView;
