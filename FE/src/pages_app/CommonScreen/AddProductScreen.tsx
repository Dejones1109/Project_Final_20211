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
import { useCheckExistProductOnCartQuery } from '../../app/selectors';
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";

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
                            leftElement:<TextBase  >{item.key}</TextBase>,
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
    let dataCp = context[0].data.data;
    const {quantity,id} = dataCp;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [quantities,setQuantities] = useState(quantity );
    useEffect(()=>{
        setQuantities(quantity ||1);
    },dataCp)

    async function addProduct() {
        let cart = {
            "productId":item.id,
            "partnerId":localStorage.getItem("partnerId"),
            "quantity" : quantities
        };
        let update_quantity = {
            "id" : id,
            "quantity" : quantities
        };
        // @ts-ignore
        await dispatch(updateQuantity(update_quantity));
        navigation.goBack();
    }

    return (
        <>
            <ScrollView mb={60}>
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
                   <Button onPress={() =>setQuantities(quantities-1)} >Minu</Button>
                   <Box  borderColor={"light.300"} borderWidth={1} borderRadius={5} px={10}>
                       <TextBase color={"light.500"} >Số lượng <TextBase light color={"red.500"}>{quantities}</TextBase></TextBase>
                   </Box>
                   <Button onPress={() =>setQuantities(quantities+1)}>Add</Button>

               </Row>
               <ButtonBase onPress={()=>{
                   addProduct()}
               } my={3} bg={"blue.400"} width={"95%"}>Thêm hàng</ButtonBase>
           </Col>
        </>
    );
};
const AddProductScreen = (props:{route:any})=>{
    const item = props.route.params.data;
    const data = useCheckExistProductOnCartQuery(item.productCode);
    return(
        <LoadingScreen data={[data]}>
            <LoadingProductScreen route={props.route} />
        </LoadingScreen>
    )
}

export default AddProductScreen;

