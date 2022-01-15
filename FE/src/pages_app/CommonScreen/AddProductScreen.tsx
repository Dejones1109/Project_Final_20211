import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Box, Button, Center, Divider, Image, ScrollView,} from 'native-base';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import ButtonBase from "../../components/ButtonBase";
import {Col, Row } from '../../components/AutoLayout';
import MainIcon from "../../assets/icon/Icon";
import {useDispatch} from "react-redux";
import {updateQuantity,createCart} from '../../app/service/cart/cartSlice'
import { useNavigation } from '@react-navigation/native';
import { useGetCartListByPartnerQuery} from '../../app/selectors';
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {cartApi, productApi} from "../../app/controller";
import {store} from "../../app/store";
import {partnerId} from "../../app/service/store/storeAPI";

const note = [
    {
        key:"Mua tối đa/tối thiểu",
        value:"1 sản phẩm/ đơn hàng",
    },
    {
        key:"Xuất sứ",
        value:"Việt Nam",
    },
    {
        key:"Khối lượng",
        value:"80g",
    },
    {
        key:"Hạn sử dụng ",
        value:"Hạn sử dụng ",
    },
    {
        key:"Bảo quản",
        value:"Bảo quản nơi khô ráo ",
    },

]
export const NoteAboutProduct =()=>{
    return(
        <>
            {note.map((item)=>{
                return(
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<TextBase bold>{item.key}</TextBase>,
                            rightElement:<TextBase color={"light.400"}>{item.value}</TextBase>,
                        }}
                    />
                )
            })}
        </>
    )
}

const LoadingProductScreen = (props:{route:any}) => {
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const item = props.route.params.data;
    const dataCp:any = []
    try{
        context[0].data.data.forEach((i:any)=>{
            if(i.product.id === item.id){
                dataCp.push(i);
            }
        })  ;
    }catch(e){}
    const {quantity,id} =  dataCp[0] || {quantity:1,id: 1} ;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [quantities,setQuantities] = useState(quantity );
    useEffect(()=>{
        setQuantities(quantity ||1);
    },dataCp)
    async function addProduct() {
        let cart = {
            "productId":item.id,
            "partnerId":partnerId,
            "quantity" : quantities
        };
        let update_quantity = {
            "id" : id,
            "quantity" : quantities
        };
        console.log(update_quantity);
        if(quantity === 1){
            // @ts-ignore
            await dispatch(createCart(cart));
            if(store.getState().cart.code === 200){
                navigation.goBack();
            }
            else{
                alert("Đã có lỗi xả .Vui lòng kiểm tra lại đường truyền")
            }
        }else{
            // @ts-ignore
            await dispatch(updateQuantity(update_quantity));
            if(store.getState().cart.code === 200){
                alert("Đã cập nhật số lượng trên giỏ hàng");
            }
        }
        // @ts-ignore
        await dispatch(cartApi.util.invalidateTags(['cartApi']));
        // await dispatch(productApi.util.invalidateTags(['productApi']));
        navigation.goBack();
    }

    return (
        <>
            <ScrollView mb={110}>
                <Center  width={"100%"} bg={"white"}>
                    <Image
                        source={{
                            uri: `${item.image}`,
                        }}
                        height={500}
                        alt="Alternate Text"
                        resizeMode={"cover"}
                        rounded={10}
                    />
                    <Box width={"95%"}>
                        <TextBase bold  fontSize={18} >Tên sản phẩm : {item.productName}</TextBase>
                        <TextBase color={"yellow.500"} fontSize={16} >Price : {item.price} đ / gói</TextBase>
                        <TextBase light fontSize={16} >Mô tả chi tiết : </TextBase>
                        <TextBase light  fontSize={16} ml={2}  >{item.remark}</TextBase>
                    </Box>
                    <Divider bg={"light.200"} width ={Layout.window.width} height={1} my={3}/>
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<Avatar
                                bg="pink.600"
                                alignSelf="center"
                                size="30"
                                source={{
                                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                                }}
                            >
                                GG
                            </Avatar>,
                            colElement: <>
                                <TextBase light color={"light.300"}>Phân phối bởi</TextBase>
                                <TextBase>Thuận Vinh</TextBase>
                            </>,
                            rightElement:<Col>
                                <MainIcon name={"arrow-right"} />
                            </Col>,
                        }}
                    />
                    <Divider bg={"light.200"} width={Layout.window.width} height={1} my={3}/>
                    <FrameBase
                        default
                        viewOptions={{
                            leftElement:<MainIcon name={"sale"} />,
                            colElement:<>
                                <TextBase light color={"light.300"}>Chọn Voucher</TextBase>
                                <TextBase>Khuyến mãi 10%</TextBase>
                            </>,
                        }}
                    />
                    <Divider bg={"light.200"} width={Layout.window.width} height={1} my={3}/>
                    <NoteAboutProduct />

                </Center>

            </ScrollView>
           <Col  position={"absolute"} zIndex={1} bottom={0} left={0} right={0} width={Layout.window.width} bg={"white"} shadow={-4} borderTopWidth={1} borderColor={"light.300"}>
               <Row
                   justifyContent={"space-around"} my={1}
               >
                   <Button onPress={() =>{
                       if(quantities >=2){
                           setQuantities(quantities-1)
                       }
                   }} >Minu</Button>
                   <Box  borderColor={"light.300"} borderWidth={1} borderRadius={5} px={10}>
                       <TextBase color={"light.500"} >Số lượng <TextBase light color={"red.500"}>{quantities}</TextBase></TextBase>
                   </Box>
                   <Button onPress={() =>setQuantities(quantities+1)}>Add</Button>

               </Row>
               <ButtonBase onPress={()=>{
                   addProduct()}
               } my={3} bg={"blue.400"} width={"95%"} isDisabled={(quantities === quantity && quantity !== 1) ? true : false}>Thêm hàng</ButtonBase>
           </Col>
        </>
    );
};
const AddProductScreen = (props:{route:any})=>{
    const item = props.route.params.data;
    // @ts-ignore
    const data =useGetCartListByPartnerQuery();
    return(
        <LoadingScreen data={[data]}>
            <LoadingProductScreen route={props.route} />
        </LoadingScreen>
    )
}

export default AddProductScreen;

