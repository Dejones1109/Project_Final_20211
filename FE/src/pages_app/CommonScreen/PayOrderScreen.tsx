import React, {useState} from 'react';
import {Box, Center, Divider, Modal, ScrollView, Spacer} from "native-base";
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

const PayOrderScreen = (props:{route:any}) => {
    const {order, status} = props.route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cancel = async ()=>{
        let payload = {
            id: order.id,
            status: 304,
        }
        // @ts-ignore
        await dispatch(updateOrderStatus(payload));
        if(store.getState().orders.code === 200){
            alert("Hủy thành công !!!");
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
        }
        navigation.goBack();
    }
    const pay = async ()=>{
        let payload = {
            id: order.id,
            status: 306,
        }
        // @ts-ignore
        await dispatch(updateOrderStatus(payload));
        if(store.getState().orders.code === 200){
            alert("Thanh toán thành công !!!");
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
        }
        navigation.goBack();
    }
    const dataUser = useSelector(state=>state.auth.currentUser);
    const [showModal, setShowModal] = useState(false)
    const [showModal1, setShowModal1] = useState(false)

    return (
        <ScrollView
            bg={"white"}
            showsVerticalScrollIndicator={false}
        >
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
            {status ===301 &&
            <>
                <Row justifyContent={"space-around"}>
                    <ButtonBase m={3} onPress={()=>setShowModal1(true)}   height={10} bg={"blue.400"} >Hủy đơn</ButtonBase>
                    <ButtonBase m={3} onPress={()=>setShowModal(true)}   height={10} bg={"blue.400"} >Thanh toán</ButtonBase>
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
        </ScrollView>
    );
};

export default PayOrderScreen;
