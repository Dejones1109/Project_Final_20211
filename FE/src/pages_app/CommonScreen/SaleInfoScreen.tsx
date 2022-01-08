import React from 'react';
import {Box, Center, Divider, Heading, Image, Pressable, Text} from "native-base";
import FrameBase from "../../components/FrameBase";
import TextBase from "../../components/TextBase";

import { Col } from '../../components/AutoLayout';
import Layout from '../../constants/Layout';
import LoadingScreen from "../../helps/LoadingScreen";
const InfoSaleScreen = (props:{navigation ?:any})=>{
    return(
        <LoadingScreen data={[]}>
            <ShowInfoSaleScreen navigation={props.navigation}/>
        </LoadingScreen>
    )
}
const ShowInfoSaleScreen = (props:{navigation ?:any}) => {
    return (
        <Box w="100%"  p={3} justifyContent="flex-start" height={"100%"} bg={"white"} >
            <Heading
                fontSize="16"
                color="gray.500"
                _dark={{
                    color: "gray.300",
                }}
            >
                Mua 9 thùng Trà Xanh Không đọ vị chanh chai tặng 1 thùng ....
            </Heading>
            <Divider my={3} />
            <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                    color: "gray.300",
                }}
            >
                Sản phẩm áp dụng
            </Text>
            <Pressable  onPress={()=>props.navigation.navigate("addProductScreen")} >
                <FrameBase
                    default
                    styled={{
                        height:110,
                        borderWidth:1,
                        borderColor:"light.400",
                        borderRadius:10,
                        my:3,
                    }}
                    viewOptions={{
                        leftElement: <>
                            <Image
                                rounded={10}
                                size={110}
                                resizeMode={"contain"}
                                source={{
                                    uri: "https://wallpaperaccess.com/full/317501.jpg",
                                }}
                                alt="Product"
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
            </Pressable>
            <Text
                fontSize="16"
            >
                Mô tả ..........................................
            </Text>
           <Center  width={"100%"}  >
               <FrameBase
                   default
                   viewOptions={{
                       leftElement:"abc",
                       colElement:"abc",
                       rightElement:"abcasdsadsadàdsaf",
                   }}
                   styled={{height:8}}
               />
               <FrameBase
                   default
                   viewOptions={{
                       leftElement:"abc",
                       colElement:"abc",
                       rightElement:"abc",
                   }}
                   styled={{height:8}}
               />
               <FrameBase
                   default
                   viewOptions={{
                       leftElement:"abc",
                       colElement:"abc",
                       rightElement:"abc",
                   }}
                   styled={{height:8}}
               />
           </Center>
        </Box>
    );
};

export default InfoSaleScreen;
