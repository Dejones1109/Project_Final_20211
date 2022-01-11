import React, {useEffect, useState} from 'react';
import {Box, Center, Divider, ScrollView, Spacer} from "native-base";
import FrameBase from "../../components/FrameBase";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import {partnerId} from "../../app/service/store/storeAPI";
import {createOrder} from "../../app/service/order/orderSlice";
import {store} from "../../app/store";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {cartApi, orderApi} from "../../app/controller";
import {TouchableOpacity} from "react-native";
import {Col, Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import {createBill} from "../../app/service/store/storeSlice";
import {updateQuantity} from "../../app/service/cart/cartSlice";

const AllInfoToOrderScreen = (props:{route:any}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let {totalQuantity,totalMoney,saleValue,groupValueCart,saleId}:any= props.route.params.item;
    console.log(props.route.params);
    const order = async ()=>{
        if( props.route.params.item.hasOwnProperty('new_quantity')){
            let update_quantity = {
                "id" : groupValueCart[0],
                "quantity" : props.route.params.item.new_quantity
            };
            // @ts-ignore
            await dispatch(updateQuantity(update_quantity));
        }
        if(isFocused){

            let data = {
                "partnerId" : partnerId,
                "adminId":1,
                "cartId" :groupValueCart,
                "isBill" : isBill,
                "saleId":saleId
            };

            // @ts-ignore
            await dispatch(createOrder(data));
            await dispatch(orderApi.util.invalidateTags(['orderApi']))
            if(store.getState().orders.code === 201){
                await alert("đặt hàng thành công");
            }

            if(isBill ===1 && props.route.params.bill ){
                // @ts-ignore
                await dispatch(createBill(props.route.params.bill));
            }
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            // await dispatch(productApi.util.invalidateTags(['productApi']));
            await  navigation.navigate('cartProductScreen');
        }
    }
    const [isBill,setIsBill] = useState(props.route.params !== undefined ? (props.route.params.bill ? 1:0)  : 0);
    const styled={height:12 ,w:0.95 *Layout.window.width}
    const isFocused = useIsFocused();
    useEffect(()=>{
        setIsBill(props.route.params.hasOwnProperty('bill')? (props.route.params.bill ? 1:0)  : 0)
    }, [isFocused])
    const dataUser = useSelector(state=>state.auth.currentUser);
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
                            leftElement:<MainIcon name={'notification'} />,
                            colElement: <TextBase bold fontSize={16}>Thông tin đơn hàng</TextBase>,
                        }}
                    />

                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase color={"light.400"} >Tổng {totalQuantity} sản phẩm</TextBase>,
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
                            leftElement:<TextBase color={"light.400"} >Ưu đã đơn hàng</TextBase>,
                            rightElement: <TextBase color={"light.400"}>{saleValue}%</TextBase>,
                        }}
                    />
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase  bold>Tổng tiền <TextBase color={"light.500"}>(Đã bao gôm cả VAT)</TextBase></TextBase>,
                            rightElement: <TextBase bold color={"red.500"}>{totalMoney} vnđ</TextBase>,
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
            <Divider my={1}/>
            <TouchableOpacity onPress={()=>navigation.navigate('isBillScreen')}>
                <Center  width={"100%"} py={1} {...styled} >
                    <Box width={"95%"}  overflow={"hidden"}>
                        <Box>
                            <Box
                            >
                                <Row  space={2} alignContent ={"space-between"}>
                                    <Col alignContent={"center"}>
                                        <TextBase fontSize={16} light >Nhận hóa đơn VAT</TextBase>
                                        <TextBase color={'blue.500'} fontSize={12}>{isBill ===0 ?"Vui lòng bổ sung thông tin để được hỗ trợ" : "Đã chọn xác nhận"}</TextBase>
                                    </Col>
                                    <Col alignContent={"center"} >
                                    </Col>
                                    <Spacer />
                                    <MainIcon name={'arrow-right'}/>
                                </Row>
                            </Box>
                        </Box>
                    </Box>
                </Center>
            </TouchableOpacity>
            <Divider my={1} />
            <ButtonBase m={3} onPress={()=>order()} isDisabled={totalMoney !== 0 ? false : true}  height={10} bg={"blue.400"} >Đặt hàng</ButtonBase>
        </ScrollView>
    );
};

export default AllInfoToOrderScreen;
