import React from 'react';
import { DataTable } from 'react-native-paper';
import {useGetListToCartToOrderIdForAdminQuery, useGetPartnerByCodeQuery} from "../../../app/selectors";
import {FlatList} from "native-base";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

const DataFollowRow = (props:{item:any})=>{
    const item = props.item;
    const navigation = useNavigation();
    const {data, isSuccess}:any = useGetPartnerByCodeQuery (`P00${item[0]}`);
    return(
        <>
            {
                isSuccess &&
                <TouchableOpacity onPress={()=>navigation.navigate('storeDetailInfo',{item:data.data})}>
                    <DataTable.Row>
                        <DataTable.Cell>{item[1]}</DataTable.Cell>
                        <DataTable.Cell numeric>{item[2]}</DataTable.Cell>
                        <DataTable.Cell numeric>{item[3]}</DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
            }
        </>
 
    )
}

const RankTableMoneyView = (props:{data:any})=> {
    return (
       <>
           {props.data &&
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
           }
       </>
    );
}

export default RankTableMoneyView;
