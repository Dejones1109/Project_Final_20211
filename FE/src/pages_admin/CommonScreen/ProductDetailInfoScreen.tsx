import React from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, FlatList, Image, ScrollView} from "native-base";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import {ProductDataTableView} from "../CartScreen/ChildrentComponent";
import {Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";

const ProductDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const data = [
        {
            leftElement: <TextBase>Tên sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productName}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Mã sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productCode}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Loại sản phẩm :</TextBase>,
            colElement:<TextBase>{item.type}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Giá sản phẩm :</TextBase>,
            colElement:<TextBase>{item.price}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Mô tả :</TextBase>,
            colElement:<TextBase>{item.remark}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Trạng thái :</TextBase>,
            colElement:<TextBase>{status(item.status)}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Được tạo :</TextBase>,
            colElement:<TextBase>{item.createdDate}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <TextBase>Tạo thành công :</TextBase>,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
            rightElement:"",
        },
    ]
    return (
        <ScrollView bg={"white"}>
            <Center >
                <Center>
                    <Box bg={"white"} my={3}>
                        <Image
                            size={200}
                            resizeMode={"contain"}
                            source={{
                                uri: `${item.image}`,
                            }}
                            alt="Alternate Text"
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
