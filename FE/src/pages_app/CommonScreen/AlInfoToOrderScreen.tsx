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
import {cartApi, orderApi,systemApi} from "../../app/controller";
import {TouchableOpacity} from "react-native";
import {Col, Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import {createBill} from "../../app/service/store/storeSlice";
import {updateQuantity} from "../../app/service/cart/cartSlice";
import {showMessage} from "react-native-flash-message";
import Database from "../../firebase/database";
import { getIdUser } from '../../helps/authenticate';

const AllInfoToOrderScreen = (props:{route:any}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    let {totalQuantity,totalMoney,saleValue,groupValueCart,saleId}:any= props.route.params.item;
    let auth:any =store.getState().auth.currentUser;
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
            let allOrderId: any[] = [];
            if(typeof groupValueCart[0] === 'string'){
                groupValueCart.forEach((item:any)=>{
                    allOrderId.push(parseInt(item.split(" ")[0]));
                });
            }else{
                allOrderId =groupValueCart;
            }
            let data = {
                "partnerId" : getIdUser(),
                "adminId":1,
                "cartId" :allOrderId,
                "isBill" : isBill,
                "saleId":saleId
            };

            // @ts-ignore
            let orderCode ="";
            let idOrder= null;
            await dispatch(createOrder(data)).then(res=>{
                console.log(res);
                orderCode = res.payload.orderCode;
                idOrder  = res.payload.id;
            });
            await dispatch(orderApi.util.invalidateTags(['orderApi']))
            if(store.getState().orders.code === 201){
                showMessage({
                    message: "Đặt hàng thành công",
                    description: ``,
                    type: "success",
                });
                await Database.push(
                    `notification/notify/${auth.partCode}`,
                    {
                        title:'Đặt một đơn hàng thành công"',
                        description: `Bạn vừa đặt Đơn hàng giá trị ${totalMoney} vnđ có mã là ${orderCode} từ Papashop. Papashop sẽ sớm liên hệ lại với anh  chị!!!`,
                        time:Database.timeStamp(new Date()),
                        dataOrder:{
                            idOrder:idOrder,
                            orderCode:orderCode,
                            status:301,
                        },
                        see:0,
                    },
                )
            }

            if(isBill ===1 && props.route.params.bill ){
                // @ts-ignore
                let payload = {
                    partnerId:getIdUser(),
                    data:props.route.params?.bill
                }
                await dispatch(createBill(payload));
            }
            await dispatch(cartApi.util.invalidateTags(['cartApi']));
            await dispatch(systemApi.util.invalidateTags(['systemApi']));
            await  navigation.navigate('cartProductScreen');
        }
    }
    const [isBill,setIsBill] = useState(props.route.params !== undefined ? (props.route.params?.bill ? 1:0)  : 0);
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
                            rightElement: <Col>
                                {saleValue>0 && <TextBase bold  strikeThrough >{totalMoney} vnđ</TextBase>}
                                <TextBase bold color={"red.500"}  >{totalMoney-saleValue/100*totalMoney} vnđ</TextBase>
                            </Col>,
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
            <Divider height={2} mb={3} color={"light.100"}/>
            <TouchableOpacity onPress={()=>navigation.navigate('isBillScreen',{item:props.route.params.item})}>
                <Center  width={"100%"}  height={12} >
                    <Box width={"95%"}  overflow={"hidden"}>
                        <Box>
                            <Box
                            >
                                <Row  space={2} alignContent ={"space-between"}>
                                    <Col alignContent={"center"}>
                                        <TextBase fontSize={'xl'} my={1} light >Nhận hóa đơn VAT</TextBase>
                                        <TextBase color={'blue.500'} >{isBill ===0 ?"Bấm vào để xác nhận thông tin" : "Đã chọn xác nhận"}</TextBase>
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
            <Divider mt={3} height={2} color={"light.100"}/>
            <ButtonBase m={3} onPress={()=>order()} isDisabled={totalMoney !== 0 ? false : true}  height={10} bg={"blue.400"} >Đặt hàng</ButtonBase>
        </ScrollView>
    );
};

export default AllInfoToOrderScreen;
