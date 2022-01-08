import React, {useContext} from 'react';
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView, Text} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import FrameBase from "../../components/FrameBase";
import ButtonBase from '../../components/ButtonBase';
import {Linking} from 'react-native'
import Layout from '../../constants/Layout';
import {ProductDataTableFinish, ProductDataTableWaiting} from "../CartScreen/ChildrentComponent";
import {status} from "../../helps/Status";
import {
    useGetOrderListByStatusOfUserForAdminQuery,
    useGetOrderQuantityByStatusOfPartnerQuery
} from "../../app/selectors";
import {useDispatch} from "react-redux";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {updateOrderStatus} from "../../app/service/order/orderSlice";
import {orderApi} from "../../app/controller";

const BillScreen = (props:{route:any})=>{
    const {item} = props.route.params;
    console.log("item",item);
    const payload = {
        status:301,
        id:item.id
    }
    const orderList = useGetOrderListByStatusOfUserForAdminQuery(payload);
    const quantity = useGetOrderQuantityByStatusOfPartnerQuery(item.id);
    return(
        <LoadingScreen data={[orderList,quantity]}>
            <ShowBillScreen route={props.route}/>
        </LoadingScreen>
    )
}
const ShowBillScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const {context}:any= useContext(LoadingContext);
    const orderList = context[0].data.data;
    const quantity = context[1].data.data;
    const dispatch = useDispatch();

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
                {item.name.slice(0,2)}
            </Avatar>,
            colElement:<TextBase fontSize={20} color={"blue.400"}>{item.name}</TextBase>,
            rightElement:<TextBase></TextBase>,
        },
        {
            leftElement: <Pressable onPress={()=>Linking.openURL(`tel:${item.phone}`)}><MainIcon name={"phone"} /></Pressable>,
            colElement:<Pressable onPress={()=>Linking.openURL(`tel:${item.phone}`)} ><TextBase>{item.phone.toString()}</TextBase></Pressable>,
        },
        {
            leftElement: <MainIcon name={"address"} />,
            colElement:<TextBase>{item.address}</TextBase>,
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
            colElement:<TextBase>{status(item.status)}</TextBase>,
        },
    ]

    return (
        <ScrollView bg={"white"}>
            <>
                <Center  width={"100%"} height={50} my={2}  >
                    <Box width={["100%","100%"]}   overflow={"hidden"}   >
                        <Pressable   >
                            <Box
                            >
                                <Row  justifyContent={"space-between"} alignContent ={"space-between"}>
                                    <Col width={"33%"} alignItems={"center"}>
                                        <TextBase fontSize={16} color={"red.500"}>{quantity.orderWaiting}</TextBase>
                                        <TextBase fontSize={14} textAlign={"center"} color={"light.400"}>Đơn đang chờ</TextBase>
                                    </Col>
                                    <Divider orientation={"vertical"}/>
                                    <Col width={"33%"} alignItems={"center"} >
                                        <TextBase fontSize={16} color={"red.500"}>{quantity.orderShip}</TextBase>
                                        <TextBase  fontSize={14} textAlign={"center"} color={"light.400"}>Đơn vận chuyển</TextBase>
                                    </Col>
                                    <Divider  orientation={"vertical"}/>
                                    <Col width={"33%"} alignItems={"center"}>
                                        <TextBase fontSize={16} color={"red.500"}>{quantity.orderDone}</TextBase>
                                        <TextBase  fontSize={14} textAlign={"center"} color={"light.400"} >Đơn hoàn thành</TextBase>
                                    </Col>
                                </Row>
                            </Box>
                        </Pressable>
                    </Box>
                </Center>
                <Center >
                    <TextBase width={"90%"} textAlign={"center"} fontSize={24} color={"primary.500"}>{item.nameStore}</TextBase>
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
                                justifyContent:"center"
                            }}
                        />
                        <ProductDataTableWaiting  data={orderList} dispatch={dispatch} />
                    </Center>
                </Center>
            </>
        </ScrollView>
    );
};

export default BillScreen;
