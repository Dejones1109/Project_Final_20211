import React, {useEffect, useState} from 'react';
import TextBase from '../../components/TextBase';
import {Avatar, Box, Button, Center, Checkbox, Divider, Image, Pressable, ScrollView, Spacer} from "native-base";
import FrameBase from "../../components/FrameBase";
import ButtonBase from "../../components/ButtonBase";
import { NoteAboutProduct } from './AddProductScreen';
import {Col, Row} from "../../components/AutoLayout";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import LoadingScreen from "../../helps/LoadingScreen";
import MainIcon from "../../assets/icon/Icon";
import {TouchableOpacity} from "react-native";
import {removeProductOnCart} from "../../app/service/cart/cartSlice";
import {cartApi} from "../../app/controller";
import {useDispatch} from "react-redux";
import Layout from "../../constants/Layout";
const ProductDetailInfoScreen = (props:{route:any})=>{
    return(
        <ShowProductDetailInfoScreen route={props.route}/>
    )
}
const ShowProductDetailInfoScreen = (props:{route:any}) => {
    let data = props.route.params.item;
    const [quantities,setQuantities] =useState(data.quantity);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const removeOrder =async () =>{
        // @ts-ignore
        await dispatch(removeProductOnCart({id:data.id}));
        await dispatch(cartApi.util.invalidateTags(['cartApi']));
        navigation.goBack();
    }
    const [totalMoney,setTotalMoney]= useState(data.price);
    const styled={height:12 ,w:0.95 *Layout.window.width}
    const [saleValue, setSaleValue]= useState(props.route.params.hasOwnProperty('sale') ? props.route.params.sale.saleValue  : 0);
    const [saleId, setSaleId]= useState( props.route.params.hasOwnProperty('sale') ? props.route.params.sale.id  : 0);
    const isFocused = useIsFocused();
    useEffect(()=>{
        setSaleValue(props.route.params.hasOwnProperty('sale') ? props.route.params.sale.saleValue  : 0)
        setSaleId(props.route.params.hasOwnProperty('sale') ? props.route.params.sale.id  : 0)
    }, [isFocused])
    const allInfo = quantities ===data.quantity ?{
        totalQuantity:quantities,
        totalMoney:quantities * data.product.price - quantities*data.product.price* saleValue,
        saleValue:saleValue,
        groupValueCart:[data.id],
        saleId:saleId,
    } : {
        totalQuantity:quantities,
        totalMoney:quantities * data.product.price - quantities*data.product.price* saleValue,
        saleValue:saleValue,
        groupValueCart:[data.id],
        saleId:saleId,
        new_quantity:quantities,
    }
    return (
        <ScrollView bg={"white"}>
            <Center>
                <Center w={"95%"}>
                    <TouchableOpacity onPress={()=>navigation.navigate('selectSaleScreen', {data:totalMoney})}>
                        <Center  width={"100%"}  {...styled} >
                            <Box width={"100%"}  overflow={"hidden"}>
                                <Box>
                                    <Box
                                    >
                                        <Row  space={2} alignContent ={"space-between"}>
                                            <Col alignContent={"center"}>
                                                <TextBase color={'blue.500'}>Voucher</TextBase>
                                            </Col>
                                            <Col alignContent={"center"} >
                                                <TextBase color={'light.300'}>{ saleValue > 0 ? saleValue+"%" :"Chọn áp dụng"}</TextBase>
                                            </Col>
                                            <Spacer />
                                            <MainIcon name={'arrow-right'}/>
                                        </Row>
                                    </Box>
                                </Box>
                            </Box>
                        </Center>
                    </TouchableOpacity>
                    <Divider color={"light.200"} width={Layout.window.width} height={3} my={2}/>
                    <Center  width={"100%"}   >
                        <Box width={"100%"}  overflow={"hidden"}>
                            <Box>
                                <Box
                                >
                                    <Row  space={2} alignContent ={"space-between"}>
                                        <Col alignContent={"center"}>
                                            <TextBase color={"blue.500"}>Thành tiền</TextBase>
                                        </Col>
                                        <Col alignContent={"center"} >

                                        </Col>
                                        <Spacer />
                                        <TextBase textAlign={"center"} color={"red.500"}>{data.product.price * quantities} vnđ</TextBase>
                                    </Row>
                                </Box>
                            </Box>
                        </Box>
                    </Center>

                    <Center  width={"100%"}   >
                        <Box width={"100%"}  overflow={"hidden"}>
                            <Box>
                                <Box
                                >
                                    <Row  space={2} alignContent ={"space-between"}>
                                        <Col alignContent={"center"}>
                                            <Image
                                                size={150}
                                                resizeMode={"contain"}
                                                borderRadius={100}
                                                source={{
                                                    uri: `${data.product.image}`,
                                                }}
                                                alt="Alternate Text"
                                            />
                                        </Col>
                                        <Col alignContent={"center"} >
                                            <TextBase bold >{data.product.productName}</TextBase>
                                            <TextBase color={"blue.500"} >{data.product.price} vnđ/sản phẩm</TextBase>
                                            <TextBase bold color={'red.500'}>{data.product.price * quantities} vnđ</TextBase>
                                        </Col>
                                        <Spacer />
                                    </Row>
                                </Box>
                            </Box>
                        </Box>
                    </Center>
                    <Row
                        my={2}
                        justifyContent={"center"}
                    >
                        <Button onPress={()=>{
                            if(quantities >=2){
                                setQuantities(quantities-1)
                            }
                        }}>Minus</Button>
                        <Box   borderColor={"light.300"} borderWidth={1} borderRadius={5} px={10}>
                            <TextBase color={"light.300"} >Số lượng <TextBase>{quantities}</TextBase></TextBase>
                        </Box>
                        <Button onPress={()=>setQuantities(quantities+1)}>Add</Button>
                    </Row>
                    <Divider color={"light.200"} width={Layout.window.width} height={3} my={2}/>
                    <NoteAboutProduct />
                    <Divider color={"light.200"} width={Layout.window.width} height={3} my={2}/>
                    <Divider color={"light.200"}/>
                    <FrameBase
                        default
                        styled={{py:1 }}
                        viewOptions={{
                            leftElement: <MainIcon name={'delete'} /> ,
                            rightElement: <TouchableOpacity onPress={()=>{}}><TextBase bold >Xóa khỏi giỏ hàng</TextBase></TouchableOpacity>
                            ,
                        }}
                    />
                    <Divider color={"light.200"}/>
                    <Center  width={"100%"}  {...styled} >
                        <Box width={"100%"}  overflow={"hidden"}>
                            <Box>
                                <Box
                                >
                                    <Row  space={2} alignContent ={"space-between"}>
                                        <Col alignContent={"center"}>
                                        </Col>
                                        <Col alignContent={"center"} >
                                            <TextBase bold>Tạm tính (đã có VAT) </TextBase>
                                            <TextBase color={"red.500"}>{quantities*data.product.price - quantities*data.product.price* saleValue} vnđ</TextBase>
                                        </Col>
                                        <Spacer />
                                        <ButtonBase isDisabled={totalMoney !== 0 ? false : true} onPress={()=>navigation.navigate('authOrder', {item:allInfo})} alignSelf={"center"} height={10} bg={"blue.400"}>Xác nhận đơn</ButtonBase>
                                    </Row>
                                </Box>
                            </Box>
                        </Box>
                    </Center>

                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductDetailInfoScreen;
