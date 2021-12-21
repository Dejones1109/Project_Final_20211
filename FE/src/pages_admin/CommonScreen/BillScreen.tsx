import React from 'react';
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import FrameBase from "../../components/FrameBase";
import ButtonBase from '../../components/ButtonBase';
import {width} from "styled-system";
import Layout from '../../constants/Layout';
import {ProductDataTableView} from "../CartScreen/ChildrentComponent";
import {status} from "../../helps/Status";
import {useGetOrderListByStatusOfUserForAdminQuery} from "../../app/selectors";


const BillScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const payload = {
        status:301,
        id:6
    }
    const {data} = useGetOrderListByStatusOfUserForAdminQuery(payload);
    const dataCp = Object.assign([],Object.assign({},data).data);
    console.log(item);
    const dataCpp = [
        {
            leftElement: <Avatar
                my={2}
                bg="pink.600"
                alignSelf="center"
                size={30}
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
    return (
        <ScrollView bg={"white"}>
            <Center  width={"100%"} height={50} my={2}  >
                <Box width={["100%","100%"]}   overflow={"hidden"}   >
                    <Pressable   >
                        <Box
                        >
                            <Row  justifyContent={"space-between"} alignItems ={"space-between"}>
                                <Col width={"33%"} alignItems={"center"}>
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase fontSize={14} textAlign={"center"} color={"light.400"}>Đơn đang chờ</TextBase>
                                </Col>
                                <Divider orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"} >
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase  fontSize={14} textAlign={"center"} color={"light.400"}>Đơn vận chuyển</TextBase>
                                </Col>
                                <Divider  orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"}>
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase  fontSize={14} textAlign={"center"} color={"light.400"} >Đơn hoàn thành</TextBase>
                                </Col>
                            </Row>
                        </Box>
                    </Pressable>
                </Box>
            </Center>
            <Center >
                <TextBase fontSize={16} color={"red.500"}>{item.nameStore}</TextBase>
                <Center width={"100%"}>
                    <FlatList
                        data={dataCpp}
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
                    <ProductDataTableView  data={dataCp} />
                    <Row justifyContent={"space-around"} my={3}>
                        <ButtonBase bg={"blue.400"}>Xác nhận</ButtonBase>
                        <ButtonBase bg={"red.400"}>Hủy đơn</ButtonBase>
                    </Row>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default BillScreen;
