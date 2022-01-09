import React, {useState} from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, CheckIcon, FlatList, Image, ScrollView, Select} from "native-base";
import {status} from "../../helps/Status";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import {Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {productApi} from "../../app/controller";
import {updateByStatusProduct} from "../../app/service/product/productSlice";

const ProductDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const data = [
        {
            leftElement: <TextBase color={"blue.500"}>Tên sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productName}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Mã sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productCode} </TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Loại sản phẩm :</TextBase>,
            colElement:<TextBase>{item.type}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Giá sản phẩm :</TextBase>,
            colElement:<TextBase>{item.price} đ</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Mô tả :</TextBase>,
            colElement:<TextBase>{item.remark}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Trạng thái :</TextBase>,
            colElement:<TextBase>{status(item.status)}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Được tạo :</TextBase>,
            colElement:<TextBase>{item.createdDate}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Tạo thành công :</TextBase>,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
        },
    ]
    const dispatch = useDispatch();
    let [statusUser, setStatusUser] = React.useState(`${item.status}`);
    // @ts-ignore
    const navigation = useNavigation();
    const changeStatus = (status: number)=>{
        if(parseInt(status) !== item.status){
            let payload = {
                id:item.id,
                status:status,
            }
            // @ts-ignore
            dispatch(updateByStatusProduct(payload));
            dispatch(productApi.util.invalidateTags(['productApi']));
            alert('Thay đổi trạng thái thành công');
            navigation.goBack();
        } else{
            alert("Vui lòng chọn trạng thái mới")
        }

    }
    return (
        <ScrollView bg={"white"}>
            <Center >
                <Center>
                    <Box bg={"white"} mb={3}>
                        <Image
                            height={500}
                            width={Layout.window.width}
                            resizeMode={"cover"}
                            source={{
                                uri: `${item.image}`,
                            }}
                            alt="Image product"
                        />
                    </Box>
                </Center>
                <Center width={"100%"}>
                    <FlatList
                        data={data.slice(1,data.length)}
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
                    <TextBase mt={2} color={  "blue.400"} width={"95%"} >Thay đổi trạng thái người dùng</TextBase>
                    <Row justifyContent={"space-around"} my={3}>
                        <Select
                            selectedValue={statusUser}
                            minWidth="200"
                            accessibilityLabel="Choose Service"
                            placeholder="Choose Service"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => {
                                setStatusUser(itemValue);
                            }}
                        >
                            <Select.Item label={status(401)} value="401" />
                            <Select.Item label={status(402)}  value="402" />
                        </Select>
                        <ButtonBase isDisabled={statusUser === `${item.status}` ? true : false } bg={item.status === 401 ? "red.400" : "blue.400"} onPress={()=>changeStatus(statusUser)}>Update</ButtonBase>
                    </Row>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductDetailInfoScreen;
