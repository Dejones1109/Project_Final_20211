import React, {useEffect, useState} from 'react';
import TextBase from './components/TextBase';
import ButtonBase from "./components/ButtonBase";
import {
    useCreateCartMutation, useCreateSaleMutation, useGetAllSaleQuery,
    useGetCartListByPartnerQuery,
    useGetPartnerByCodeQuery
} from "./app/selectors";
import Database from "./firebase/database";
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import {
    Actionsheet,
    Box, Button,
    Center,
    CheckIcon,
    Divider,
    FlatList,
    Heading, Icon,
    Image, Input,
    Pressable,
    Select,
    Spacer, useDisclose
} from 'native-base';
import { FadeLoading } from 'react-native-fade-loading';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import { Plane,Fold } from 'react-native-animated-spinkit'
import {Col, Row} from "./components/AutoLayout";
import MainIcon from "./assets/icon/Icon";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import FrameBase from "./components/FrameBase";
import {status} from "./helps/Status";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateStatusPartner} from "./app/service/store/storeSlice";
import Layout from "./constants/Layout";
const TestScreen1 = ()=> {
    let [statusSale, setStatusSale] = React.useState(`501`)
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclose();
    const [productName,setProductName] = useState('');
    const [image,setImage] = useState('');
    const [price,setPrice] = useState('');
    const [type,setType] = useState('');
    const [remark,setRemark] = useState('');

    const item ={
            "id": 1,
            "saleCode": "TETDONGDAY",
            "saleName": "tết đong đầy",
            "saleValue": 10,
            "conditions": 1000000,
            "saleRemark": "Tất cả các đơn hàng trên 1 triệu",
            "startDate": "2022-01-01 10:25:00",
            "endDate": "2022-01-15 10:26:00",
            "status": 502,
            "createdDate": "01/01/2022 10:25:00",
            "updatedDate": "2022-01-08 16:05:29"
        }
    const listData = [
        {
            leftElement: <MainIcon name={"user"} />,
            colElement:<TextBase>{item.saleName}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"phone"} />,
            colElement:<TextBase>{item.conditions}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"address"} />,
            colElement:<TextBase>{item.saleRemark}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"start-active"} />,
            colElement:<TextBase>{item.createdDate}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"active"} />,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"status"} />,
            colElement:<TextBase color={item.status === 501 ? "red.400" : "blue.400"}>{status(item.status)}</TextBase>,
        },
    ]
    // @ts-ignore
    // const navigation = useNavigation();
    const changeStatus = (status: number)=>{
        // let payload = {
        //     id:item.id,
        //     params:{
        //         query:'status',
        //         status:status,
        //     }
        // }
        // @ts-ignore
        // dispatch(updateStatusPartner(payload));
        // dispatch(storeApi.util.invalidateTags(['storeApi']));
        // createSale({
        //     "saleCode":"TAILOC",
        //     "saleName":"Chúc năm năm mới 2022",
        //     "saleValue":"10",
        //     "conditions":2000000,
        //     "saleRemark":"tất cả các các đơn hàng trên 2 triệu",
        //     "startDate":"2022-01-03 10:25:00",
        //     "endDate":"2022-01-15 10:25:00"
        // }).then((res) =>console.log(res));
        console.log(data);
        alert('Thay đổi trạng thái thành công')
        // navigation.goBack();
    }
    return (

        <Box w="100%"  p={3} justifyContent="flex-start" height={"100%"} bg={"white"} >
            <Button
                bg={"blue.400"}
                position="absolute"
                right={3}
                bottom={60}
                size="sm"
                borderRadius={"full"}
                zIndex={3}
                onPress={onOpen}
            >
                <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
            </Button>
            <Center >
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>
                        <Box w="100%"  px={4}  justifyContent="center">
                            <Input
                                my={2}
                                value={productName}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Tên sản phẩm"
                                onChangeText={(text)=>setProductName(text)}
                            />
                            <Input
                                my={2}
                                value={image}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Địa chỉ hình ảnh"
                                onChangeText={(text)=>setImage(text)}
                            />
                            <Input
                                my={2}
                                value={price}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Giá sản phẩm "
                                type ="number"
                                onChangeText={(text)=>setPrice(text)}
                            />
                            <Input
                                my={2}
                                value={type}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Loại sản phẩm"
                                onChangeText={(text)=>setType(text)}
                            />
                            <Input
                                my={2}
                                value={remark}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Mô tả sản phẩm"
                                onChangeText={(text)=>setRemark(text)}
                            />
                            <Row justifyContent={"space-around"} my={2}>
                                <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                <ButtonBase bg={"danger.400"} onPress={()=>createPro()}>Đăng</ButtonBase>
                            </Row>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
            <Heading
                fontSize="16"
                color="gray.500"
                _dark={{
                    color: "gray.300",
                }}
            >
                Tết đong đầy  khuyến mãi 10 %
            </Heading>
            <Divider my={3} />
            <Text
                fontSize="16"
            >
                Điều kiện: ..........................................
            </Text>

            <Text
                fontSize="16"
            >
                Mô tả ..........................................
            </Text>
            <Center  width={"100%"}  >
                <FlatList
                    data={listData}
                    renderItem={({item})=><FrameBase
                        default
                        styled={{
                            height:10,
                        }}
                        viewOptions={{
                            leftElement:item.leftElement,
                            colElement:item.colElement,
                            rightElement:item.rightElement,
                        }}
                    />}
                    keyExtractor={({index})=>index}
                    contentContainerStyle={{
                        width:0.95*Layout.window.width,
                    }}
                />

                <Row justifyContent={"space-around"} my={3}>
                    <Select
                        selectedValue={statusSale}
                        minWidth="200"
                        accessibilityLabel="Choose status"
                        placeholder="Choose Service"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        onValueChange={(itemValue) => setStatusSale(itemValue)}
                    >
                        <Select.Item label={status(201)} value="201" />
                        <Select.Item label={status(202)}  value="202" />
                    </Select>
                    <ButtonBase bg={"red.500"} onPress={()=>changeStatus(statusSale)}>Update</ButtonBase>
                </Row>
            </Center>
        </Box>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
    },

    spinner: {
        marginBottom: 50
    },

    btn: {
        marginTop: 20
    },

    text: {
        color: "white"
    }
});

export default TestScreen1;
