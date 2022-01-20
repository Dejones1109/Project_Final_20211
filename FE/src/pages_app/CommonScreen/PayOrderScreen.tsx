import React, {useEffect, useState} from 'react';
import {Box, Center, Divider, FlatList, Modal, ScrollView, Spacer} from "native-base";
import FrameBase from "../../components/FrameBase";
import MainIcon from "../../assets/icon/Icon";
import {TouchableOpacity} from "react-native";
import {Col, Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import {useDispatch, useSelector} from "react-redux";
import {updateOrderStatus} from "../../app/service/order/orderSlice";
import {store} from "../../app/store";
import {useNavigation} from "@react-navigation/native";
import {cartApi} from "../../app/controller";
import TextBase from "../../components/TextBase";
import {DataTable} from "react-native-paper";
import {useGetListToCartToOrderIdForAdminQuery, useGetOrderByCodeQuery} from "../../app/selectors";
import {WaitingScreen} from "../../helps/LoadingScreen";
import {showMessage} from "react-native-flash-message";
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
const PayOrderScreen = (props:{route:any}) => {
    let {item} = props.route.params;
    let auth:any =store.getState().auth.currentUser;


    const navigation = useNavigation();
    const dispatch = useDispatch();

    let data:any = useGetOrderByCodeQuery(item.orderCode);
    let order =data.data?.data;
    let {isSuccess} = data;
    let tabelBill = useGetListToCartToOrderIdForAdminQuery(item.idOrder);


    const cancel = async ()=>{
        let payload = {
            id: item.idOrder,
            status: 304,
        }
        // @ts-ignore
        await dispatch(updateOrderStatus(payload));
        if(store.getState().orders.code === 200){
            showMessage({
                message: "Hủy thành công !!!",
                description: ``,
                type: "success",
            });
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            await Database.push(
                `notification/notify/${auth.partCode}`,
                {
                    title:'Đơn hàng đã hủy thành công',
                    description: `Papashop rất tiếc đơn hàng ${item.orderCode} vừa bị hủy , chúng tôi sẽ cải thiện nhiều hơn chất lượng sản phẩm trong thời gian tới.`,
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
        navigation.goBack();
    }
    const pay = async ()=>{
        let payload = {
            id: item.idOrder,
            status: 306,
        }
        // @ts-ignore
        await dispatch(updateOrderStatus(payload));
        if(store.getState().orders.code === 200){
            showMessage({
                message: "Thanh toán thành công !!!",
                description: `Thành công`,
                type: "success",
            });
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            await Database.push(
                `notification/notify/${auth.partCode}`,
                {
                    title:'Đơn hàng đã thanh toán thành công',
                    description: `Papashop rất vui vì có sự ủng hộ của anh chị. Chúc anh chị năm mới nhiều sức khỏe, thành công trong cuộc sống !!! `,
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
        navigation.goBack();
    }
    const dataUser = useSelector(state=>state.auth.currentUser);
    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    console.log(tabelBill.data?.data);
    return (
        <ScrollView
            bg={"white"}
            showsVerticalScrollIndicator={false}
        >
            {
                isSuccess ?
                <>
                    <Center my={1}>
                        <Box  w={"95%"}>
                            <FrameBase
                                default
                                viewOptions={{
                                    leftElement:<TextBase bold fontSize={16}>Mã đơn hàng</TextBase>,
                                    colElement: <TextBase bold fontSize={16}>{order.orderCode}</TextBase>,
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
                                    leftElement:<TextBase color={"light.400"} >Tổng {order.totalQuantity} g</TextBase>,
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
                                    rightElement: <TextBase bold color={"red.500"}>{order.totalPrice} vnđ</TextBase>,
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
                            <TextBase color={"light.400"}> <TextBase color={"blue.400"}>{dataUser.name}</TextBase></TextBase>
                            <TextBase color={"light.400"}>Số điện thoại : <TextBase color={"blue.400"}>{dataUser.phone}</TextBase></TextBase>
                            <TextBase color={"light.400"}>Địa chỉ : <TextBase color={"blue.400"}>{dataUser.address}</TextBase></TextBase>
                        </Box>

                    </Center>
                    <Divider height={2} color={"light.100"}/>
                    <Divider height={2} color={"light.100"}/>
                    {tabelBill.data?.data
                    &&
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Sản phẩm</DataTable.Title>
                            <DataTable.Title numeric>Số lượng</DataTable.Title>
                            <DataTable.Title numeric>Giá</DataTable.Title>
                        </DataTable.Header>
                        <FlatList
                            renderItem={({item}) => <DataFollowRow item={item}/>}
                            data={tabelBill.data?.data}
                            keyExtractor={({index}) => index}
                        />
                    </DataTable>
                    }
                    {item.status ===301 &&
                    <>
                        <Row justifyContent={"space-around"}>
                            <ButtonBase m={3} onPress={()=>setShowModal1(true)}   height={10} bg={"blue.400"} >Hủy đơn</ButtonBase>
                            {/*<ButtonBase m={3} onPress={()=>setShowModal(true)}   height={10} bg={"blue.400"} >Thanh toán</ButtonBase>*/}
                        </Row>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                            <Modal.Content maxWidth="350">
                                <Modal.CloseButton />
                                <Modal.Header>Thanh toán</Modal.Header>
                                <Modal.Body>
                                    <Col space={3}>
                                        <Row alignItems="center" justifyContent="space-between">
                                            <TextBase fontWeight="medium">Tổng tiền</TextBase>
                                            <TextBase color="blueGray.400">{order.totalPrice} vnđ</TextBase>
                                        </Row>
                                        <Row alignItems="center" justifyContent="space-between">
                                            <TextBase fontWeight="medium">Tổng số lượng</TextBase>
                                            <TextBase color="green.500">{order.totalQuantity} g</TextBase>
                                        </Row>
                                    </Col>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonBase
                                        flex="1"
                                        onPress={() => {
                                            pay();
                                            setShowModal(false);
                                        }}
                                    >
                                        Đồng ý
                                    </ButtonBase>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                        <Modal isOpen={showModal1} onClose={() => setShowModal1(false)} size="lg">
                            <Modal.Content maxWidth="350">
                                <Modal.CloseButton />
                                <Modal.Header>Hủy đơn</Modal.Header>
                                <Modal.Body>

                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonBase
                                        flex="1"
                                        onPress={() => {
                                            cancel();
                                            setShowModal1(false);
                                        }}
                                    >
                                        Đồng ý
                                    </ButtonBase>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </>

                    }
                </> :<WaitingScreen/>
            }
        </ScrollView>
    );
};

export default PayOrderScreen;
