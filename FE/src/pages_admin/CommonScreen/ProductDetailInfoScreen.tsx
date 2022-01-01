import React from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, FlatList, Image, ScrollView} from "native-base";
import {status} from "../../helps/Status";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";

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
                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductDetailInfoScreen;
