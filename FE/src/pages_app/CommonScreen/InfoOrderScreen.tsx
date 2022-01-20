import React from 'react';
import {Box, Center, Divider, FlatList, Modal, ScrollView} from "native-base";
import FrameBase from "../../components/FrameBase";
import TextBase from "../../components/TextBase";
import MainIcon from "../../assets/icon/Icon";
import {Col, Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import {WaitingScreen} from "../../helps/LoadingScreen";
import {useGetListToCartToOrderIdForAdminQuery, useGetOrderByCodeQuery} from "../../app/selectors";
import {DataTable} from "react-native-paper";
const DataFollowRow = (props:{item:any})=>{
    let item = props.item;
    return(
        <DataTable.Row>
            <DataTable.Cell>{item.product.productName}</DataTable.Cell>
            <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
            <DataTable.Cell numeric>{item.price}</DataTable.Cell>
        </DataTable.Row>
    )
}
const InfoOrderScreen = (props:{route?:any}) => {
    let {item} = props.route.params;
    let data:any = useGetOrderByCodeQuery(item.orderCode);
    let {isSuccess} = data;
    let tabelBill = useGetListToCartToOrderIdForAdminQuery(item.idOrder);
    return (
        <ScrollView
            bg={isSuccess?"white":"light.100"}
            showsVerticalScrollIndicator={false}
        >
            {isSuccess ?
            <>
                <Center my={1}>
                    <Box  w={"95%"}>
                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<TextBase bold fontSize={16}>Mã đơn hàng</TextBase>,
                                colElement: <TextBase bold fontSize={16}>{data.data.data.orderCode}</TextBase>,
                            }}
                        />
                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<MainIcon name={'notification'} />,
                                colElement: <TextBase bold fontSize={16}>Thông tin đơn hàng</TextBase>,
                            }}
                        />

                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<TextBase color={"light.400"} >Tổng {data.data.data.totalQuantity} g</TextBase>,
                            }}
                        />
                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<TextBase color={"light.400"} >Phụ phí giao hàng</TextBase>,
                                rightElement: <TextBase color={"light.400"}>0 vnđ</TextBase>,
                            }}
                        />
                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<TextBase  bold>Tổng tiền <TextBase color={"light.500"}>(Đã bao gôm cả VAT)</TextBase></TextBase>,
                                rightElement: <TextBase bold color={"red.500"}>{data.data.data.totalPrice} vnđ</TextBase>,
                            }}
                        />
                    </Box>
                </Center>
                <Divider height={2} color={"light.100"}/>
                <Center my={1}>
                    <Box  w={"95%"}>

                        <FrameBase
                            default
                            viewOptions={{
                                leftElement:<MainIcon name={'address'} />,
                                colElement: <TextBase bold fontSize={16} >Địa chỉ nhận hàng</TextBase>,
                            }}
                        />
                        <TextBase color={"light.400"}> <TextBase color={"blue.400"}>{data.data.data.partner.name}</TextBase></TextBase>
                        <TextBase color={"light.400"}>Số điện thoại : <TextBase color={"blue.400"}>{data.data.data.partner.phone}</TextBase></TextBase>
                        <TextBase color={"light.400"}>Địa chỉ : <TextBase color={"blue.400"}>{data.data.data.partner.address}</TextBase></TextBase>
                    </Box>

                </Center>
                <Divider height={2} color={"light.100"}/>
                {tabelBill.isSuccess
                    &&
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Sản phẩm</DataTable.Title>
                        <DataTable.Title numeric>Số lượng</DataTable.Title>
                        <DataTable.Title numeric>Giá</DataTable.Title>

                    </DataTable.Header>
                    <FlatList
                        renderItem = {({item})=><DataFollowRow item={item} />}
                        data={tabelBill.data.data}
                        keyExtractor={({index}) => index}
                    />
                </DataTable>
                }
            </>
                : <WaitingScreen />

            }
        </ScrollView>
    );
};

export default InfoOrderScreen ;
