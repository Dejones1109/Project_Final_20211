import {useGetListSaleNoUseQuery} from "../../app/selectors";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {Divider, FlatList, ScrollView, useDisclose, View} from "native-base";
import React, {useContext} from "react";
import Layout from "../../constants/Layout";
import {SaleCardView} from "../../components/common/SaleCardView";
import TextBase from "../../components/TextBase";


const SelectSaleScreen = (props:{route?:any})=> {
    // @ts-ignore
    let {item} = props.route.params;
    // @ts-ignore
    const allSale = useGetListSaleNoUseQuery(item);
    console.log(allSale);
    return (
        <LoadingScreen data={[allSale]}>
            <ShowInfoView route={props.route}/>
        </LoadingScreen>
    );
}

const ShowInfoView = (props:{navigation ?:any,route?:any}) => {
    const navigation = useNavigation();
    const {context }:any = useContext(LoadingContext);
    const data = context[0].data.data;
    return (
        <ScrollView bg={"white"} minHeight={"100%"}>
            <TextBase bold fontsize={18} ml={'2.5%'} color={"yellow.500"}>Voucher chỉ áp dụng cho các đơn trên 0 đồng và đủ điều kiện áp dụng</TextBase>
            {
                data.listSaleCondition &&
                    <>
                        <TextBase  ml={'2.5%'} my={2} bg={'white'} color={'yellow.500'}>Voucher đã đủ điều kiện</TextBase>
                        <FlatList
                            initialNumToRender={10}
                            contentContainerStyle={{
                                width:Layout.window.width,
                                justifyContent: 'center'
                            }}
                            numColumns={1}
                            renderItem = {({item})=>
                                <SaleCardView item={item} navigation={navigation} routeName={'cartProductScreen'}  />
                            }
                            data={data.listSaleCondition}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <Divider bg={"light.300"} />}
                        />
                    </>
            }
            {
                data.listSaleNoCondition &&
                <>
                    <TextBase  ml={'2.5%'} my={2} bg={'white'} color={'yellow.500'}>Voucher không đủ điều kiện</TextBase>
                    <FlatList
                        initialNumToRender={10}
                        contentContainerStyle={{
                            width:Layout.window.width,
                            justifyContent: 'center'
                        }}
                        numColumns={1}
                        renderItem = {({item})=>
                            <SaleCardView item={item} navigation={navigation} routeName={'cartProductScreen'} disabled={true} />
                        }
                        data={data.listSaleNoCondition}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <Divider bg={"light.300"} />}
                    />
                </>
            }
        </ScrollView>
    );
};


export default SelectSaleScreen;
