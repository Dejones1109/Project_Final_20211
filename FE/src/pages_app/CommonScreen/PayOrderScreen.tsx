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
                message: "H???y th??nh c??ng !!!",
                description: ``,
                type: "success",
            });
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            await Database.push(
                `notification/notify/${auth.partCode}`,
                {
                    title:'????n h??ng ???? h???y th??nh c??ng',
                    description: `Papashop r???t ti???c ????n h??ng ${item.orderCode} v???a b??? h???y , ch??ng t??i s??? c???i thi???n nhi???u h??n ch???t l?????ng s???n ph???m trong th???i gian t???i.`,
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
                message: "Thanh to??n th??nh c??ng !!!",
                description: `Th??nh c??ng`,
                type: "success",
            });
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            await Database.push(
                `notification/notify/${auth.partCode}`,
                {
                    title:'????n h??ng ???? thanh to??n th??nh c??ng',
                    description: `Papashop r???t vui v?? c?? s??? ???ng h??? c???a anh ch???. Ch??c anh ch??? n??m m???i nhi???u s???c kh???e, th??nh c??ng trong cu???c s???ng !!! `,
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
                                    leftElement:<TextBase bold fontSize={16}>M?? ????n h??ng</TextBase>,
                                    colElement: <TextBase bold fontSize={16}>{order.orderCode}</TextBase>,
                                }}
                            />
                            <FrameBase
                                default
                                viewOptions={{
                                    leftElement:<MainIcon name={'notification'} />,
                                    colElement: <TextBase bold fontSize={16}>Th??ng tin ????n h??ng</TextBase>,
                                }}
                            />

                            <FrameBase
                                default
                                viewOptions={{
                                    leftElement:<TextBase color={"light.400"} >T???ng {order.totalQuantity} g</TextBase>,
                                }}
                            />
                            <FrameBase
                                default
                                viewOptions={{
                                    leftElement:<TextBase color={"light.400"} >Ph??? ph?? giao h??ng</TextBase>,
                                    rightElement: <TextBase color={"light.400"}>0 vn??</TextBase>,
                                }}
                            />
                            <FrameBase
                                default
                                viewOptions={{
                                    leftElement:<TextBase  bold>T???ng ti???n <TextBase color={"light.500"}>(???? bao g??m c??? VAT)</TextBase></TextBase>,
                                    rightElement: <TextBase bold color={"red.500"}>{order.totalPrice} vn??</TextBase>,
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
                                    colElement: <TextBase bold fontSize={16} >?????a ch??? nh???n h??ng</TextBase>,
                                }}
                            />
                            <TextBase color={"light.400"}> <TextBase color={"blue.400"}>{dataUser.name}</TextBase></TextBase>
                            <TextBase color={"light.400"}>S??? ??i???n tho???i : <TextBase color={"blue.400"}>{dataUser.phone}</TextBase></TextBase>
                            <TextBase color={"light.400"}>?????a ch??? : <TextBase color={"blue.400"}>{dataUser.address}</TextBase></TextBase>
                        </Box>

                    </Center>
                    <Divider height={2} color={"light.100"}/>
                    <Divider height={2} color={"light.100"}/>
                    {tabelBill.data?.data
                    &&
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>S???n ph???m</DataTable.Title>
                            <DataTable.Title numeric>S??? l?????ng</DataTable.Title>
                            <DataTable.Title numeric>Gi??</DataTable.Title>
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
                            <ButtonBase m={3} onPress={()=>setShowModal1(true)}   height={10} bg={"blue.400"} >H???y ????n</ButtonBase>
                            {/*<ButtonBase m={3} onPress={()=>setShowModal(true)}   height={10} bg={"blue.400"} >Thanh to??n</ButtonBase>*/}
                        </Row>
                        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                            <Modal.Content maxWidth="350">
                                <Modal.CloseButton />
                                <Modal.Header>Thanh to??n</Modal.Header>
                                <Modal.Body>
                                    <Col space={3}>
                                        <Row alignItems="center" justifyContent="space-between">
                                            <TextBase fontWeight="medium">T???ng ti???n</TextBase>
                                            <TextBase color="blueGray.400">{order.totalPrice} vn??</TextBase>
                                        </Row>
                                        <Row alignItems="center" justifyContent="space-between">
                                            <TextBase fontWeight="medium">T???ng s??? l?????ng</TextBase>
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
                                        ?????ng ??
                                    </ButtonBase>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                        <Modal isOpen={showModal1} onClose={() => setShowModal1(false)} size="lg">
                            <Modal.Content maxWidth="350">
                                <Modal.CloseButton />
                                <Modal.Header>H???y ????n</Modal.Header>
                                <Modal.Body>

                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonBase
                                        bg={'blue.400'}
                                        flex="1"
                                        onPress={() => {
                                            cancel();
                                            setShowModal1(false);
                                        }}
                                    >
                                        ?????ng ??
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
