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
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateOrderStatus} from "../../app/service/order/orderSlice";
import {showMessage} from "react-native-flash-message";
import {adminApi, dashboardApi} from "../../app/controller";
import Database from "../../firebase/database";
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
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    let tabelBill = useGetListToCartToOrderIdForAdminQuery(item.idOrder);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let st = item.status;

    const confirm = async (item:any)=>{
        let payload = {
            id: item.idOrder,
            status: 302 ,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message: "Xác nhận",
                    description: "Thành công",
                    type: "success",
                });
                Database.push(
                    `notification/notify/${data.data.data.partner.partCode}`,
                    {
                        title:'Đơn hàng đang được vận chuyển',
                        description: `Papadashi thông báo,mã Đơn hàng ${item.orderCode} vừa đang được vận chuyển từ kho của Papadashi`,
                        time:Database.timeStamp(new Date()),
                        dataOrder:{
                            idOrder:item.idOrder,
                            orderCode:item.orderCode,
                            status:payload.status,

                        },
                        see:0,
                    },
                )
            }
        });
        dispatch(adminApi.util.invalidateTags(['adminApi']));
        dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));

        setShowModal1(false);
        setShowModal2(false);
        navigation.goBack();
    }
    const cancel= async (item:any)=>{
        let payload = {
            id: item.idOrder,
            status:304,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message: "Hủy đơn hàng",
                    description: "Thành công",
                    type: "success",
                });
                Database.push(
                    `notification/notify/${data.data.data.partner.partCode}`,
                    {
                        title:'Đơn hàng đã hủy thành công',
                        description: `Papadashi rất tiếc đơn hàng ${item.orderCode} vừa bị hủy , chúng tôi sẽ cải thiện nhiều hơn chất lượng sản phẩm trong thời gian tới.`,
                        time:Database.timeStamp(new Date()),
                        dataOrder:{
                            idOrder:item.idOrder,
                            orderCode:item.orderCode,
                            status:payload.status,
                        },
                        see:0,
                    },
                )
            }
        });
        dispatch(adminApi.util.invalidateTags(['adminApi']));
        dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));

        setShowModal1(false);
        setShowModal2(false);
        navigation.goBack();
    }
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
                {tabelBill.data?.data
                    &&
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Sản phẩm</DataTable.Title>
                        <DataTable.Title numeric>Số lượng</DataTable.Title>
                        <DataTable.Title numeric>Giá (vnđ)</DataTable.Title>

                    </DataTable.Header>
                    <FlatList
                        renderItem = {({item})=><DataFollowRow item={item} />}
                        data={tabelBill.data?.data}
                        keyExtractor={({index}) => index}
                    />
                </DataTable>
                }
                {
                    // st === 301 ||st === 302 ||st === 305 || st === 306
                    (st !==304 &&  st !== 306) ?
                        <>
                            <Row justifyContent={(st ===303 || st===302  ) ? "flex-end":"space-around"} my={3}>
                                <ButtonBase bg={"blue.400"}  onPress={() => setShowModal1(true)} >{st ===303 ? "Thanh toán ": "Xác nhận"}</ButtonBase>
                                {st !==303 && st !==302 ?  <ButtonBase bg={"red.400"}  onPress={() => setShowModal2(true)} >Hủy đơn hàng</ButtonBase> : null}
                            </Row>
                            <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Xác nhận lại</Modal.Header>

                                    <Modal.Footer>
                                        <ButtonBase bg={"blue.400"}  onPress={()=>confirm(item)} >Đồng ý</ButtonBase>
                                    </Modal.Footer>

                                </Modal.Content>
                            </Modal>
                            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Xác nhận lại</Modal.Header>
                                    <Modal.Footer>
                                        <ButtonBase bg={"blue.400"}  onPress={()=>cancel(item)} >Đồng ý</ButtonBase>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                        </>
                        :null
                }
            </>
                : <WaitingScreen />

            }
        </ScrollView>
    );
};

export default InfoOrderScreen ;
