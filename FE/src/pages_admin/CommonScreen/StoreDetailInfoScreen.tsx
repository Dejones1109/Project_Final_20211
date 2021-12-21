import React from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import {ProductDataTableView} from "../CartScreen/ChildrentComponent";
import ButtonBase from "../../components/ButtonBase";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";

const StoreDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const data = [
        {
            leftElement: <Avatar
                my={2}
                bg="pink.600"
                alignSelf="center"
                size={50}
                source={{
                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                }}
            >
                GG
            </Avatar>,
            colElement:<TextBase>{item.name}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <MainIcon name={"arrow-right"} />,
            colElement:<TextBase>{item.phone}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <MainIcon name={"arrow-right"} />,
            colElement:<TextBase>{item.address}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <MainIcon name={"arrow-right"} />,
            colElement:<TextBase>{item.createdDate}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <MainIcon name={"arrow-right"} />,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
            rightElement:"",
        },
        {
            leftElement: <MainIcon name={"arrow-right"} />,
            colElement:<TextBase>{status(item.status)}</TextBase>,
            rightElement:"",
        },
    ]
    console.log(item);
    return (
        <ScrollView bg={"white"}>
            <Center >
                <Center>
                    <FrameBase
                        default
                        styled={{
                            height:50,
                        }}
                        viewOptions={{
                            leftElement:data[0].leftElement,
                            colElement:data[0].colElement,
                            rightElement:data[0].rightElement,
                        }}
                    />
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
                    <ProductDataTableView />
                    <Row justifyContent={"space-around"} my={3}>
                        <ButtonBase bg={"blue.400"}>Tạm khóa</ButtonBase>
                        <ButtonBase bg={"red.400"}>Khóa vĩnh viễn</ButtonBase>
                    </Row>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default StoreDetailInfoScreen;
