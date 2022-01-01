import React from 'react';
import TextBase from '../../components/TextBase';
import {Avatar, Box, Button, Center, Checkbox, Image, Pressable, ScrollView} from "native-base";
import FrameBase from "../../components/FrameBase";
import ButtonBase from "../../components/ButtonBase";
import { NoteAboutProduct } from './AddProductScreen';
import {Row} from "../../components/AutoLayout";
import {useNavigation} from "@react-navigation/native";
import LoadingScreen from "../../helps/LoadingScreen";
const ProductDetailInfoScreen = ()=>{
    return(
        <LoadingScreen data={[]}>
            <ShowProductDetailInfoScreen />
        </LoadingScreen>
    )
}
const ShowProductDetailInfoScreen = () => {
    return (
        <ScrollView bg={"white"}>
            <Center>
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:"icon",
                        colElement:<TextBase>Edit Voucher</TextBase>,
                    }}
                />
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
                            <TextBase>Thuận Vinh </TextBase>
                        </>,
                        rightElement:<TextBase textAlign={"center"}>abc</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement: <TextBase>Thành tiền</TextBase>,
                        rightElement:<TextBase textAlign={"center"}>abc</TextBase>,
                    }}
                />
                <>
                    <FrameBase
                        default
                        styled={{height:150}}
                        viewOptions={{
                            leftElement: <>
                                 <Image
                                       size={150}
                                       resizeMode={"contain"}
                                       borderRadius={100}
                                       source={{
                                         uri: "https://wallpaperaccess.com/full/317501.jpg",
                                       }}
                                       alt="Alternate Text"
                                     />
                            </>,
                            colElement: <>
                                <TextBase >Mì khoai tây xốt bò hầm Omachi túi 5 gói x80 g </TextBase>
                                <TextBase >Thùng 30 gói x80g</TextBase>
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement: <TextBase>185.000đ / Thùng</TextBase>,
                                        rightElement:<TextBase >185.000đ</TextBase>,
                                    }}
                                />
                            </>,
                            rightElement:<>
                            </>,
                        }}
                    />
                    <FrameBase
                        default
                        viewOptions={{
                            colElement: <TextBase>Xoá</TextBase>,
                            rightElement:<>
                                <Row
                                    width={"70%"}
                                    justifyContent={"space-around"}
                                >
                                    <Button>Minu</Button>
                                    <Box  borderColor={"light.300"} borderWidth={1} borderRadius={5} px={10}>
                                        <TextBase color={"light.300"} >Số lượng <TextBase>1</TextBase></TextBase>
                                    </Box>
                                    <Button>Add</Button>
                                </Row>
                            </>,
                        }}
                    />
                </>
                <NoteAboutProduct />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:  <TextBase>Ghé thăm shop Thuận Vinh</TextBase>,
                        rightElement:<TextBase textAlign={"center"}>icon</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement: <TextBase>icon</TextBase>,
                        colElement: <TextBase textAlign={"center"}>Chi tiết</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement: <TextBase>Giá</TextBase>,
                        rightElement:<TextBase textAlign={"center"}>185.000đ</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    styled={{height:8, my:3}}
                    viewOptions={{
                        colElement:<>
                            <TextBase>Tạm tính (đã có VAT) </TextBase>
                            <TextBase color={"red.500"}>185000 đ</TextBase>
                        </>,
                        rightElement:<ButtonBase alignSelf={"center"} height={10} bg={"blue.400"}>Đặt hàng</ButtonBase>,
                    }}
                />
            </Center>
        </ScrollView>
    );
};

export default ProductDetailInfoScreen;
