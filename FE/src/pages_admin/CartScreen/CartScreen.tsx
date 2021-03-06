import React, {useContext} from 'react';
import TextBase from "../../components/TextBase";
import {StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FrameBase from "../../components/FrameBase";
import {Box, Center, FlatList, Modal, View} from 'native-base';
import {status} from "../../helps/Status";
import {useGetOrderListByStatusForAdminQuery, useGetOrderListByStatusQuery} from "../../app/selectors";
import Layout from "../../constants/Layout";
import {backgroundColor} from "styled-system";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import ButtonBase from "../../components/ButtonBase";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "../../app/service/order/orderSlice";
import {Row} from "../../components/AutoLayout";
import {adminApi, dashboardApi} from "../../app/controller";
import {useNavigation} from "@react-navigation/native";
import { TabActions } from '@react-navigation/native';
import {showMessage} from "react-native-flash-message";
import Database from "../../firebase/database";
const CommonRoute = (props:{payload:any , jumpTo?:any}) =>{
    const data= useGetOrderListByStatusForAdminQuery(props.payload);

    return(
        <LoadingScreen data={[data]}>
            <ShowCommonRoute payload={props.payload} jumpTo={props.jumpTo} />
        </LoadingScreen>
    )
}
const RenderItem = (props:{payload:any, item :any, jumpTo?:any})=>{
    const item = props.item;
    const st= props.payload.status;
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const confirm = async (item:any)=>{

        let payload = {
            id: item.id,
            status: st === 302 ? 303 : (st ===303 ? 306 : st+1) ,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message: "X??c nh???n",
                    description: "Th??nh c??ng",
                    type: "success",
                });
                let infoOrder = status(payload.status);

                Database.push(
                    `notification/notify/${item.partner.partCode}`,
                    {
                        title:'????n h??ng ??ang ???????c v???n chuy???n',
                        description: `Papadashi th??ng b??o,m?? ????n h??ng ${item.orderCode} ${infoOrder} `,
                        time:Database.timeStamp(new Date()),
                        dataOrder:{
                            idOrder:item.id,
                            orderCode:item.orderCode,
                            status:payload.status,
                        },
                        see:0,
                    },
                )
            }
        });
        dispatch(adminApi.util.invalidateTags(['adminApi']));
        dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));
        showMessage({
            message: "X??c nh???n",
            description: "Th??nh c??ng",
            type: "success",
        });
        setShowModal1(false);
        setShowModal2(false);
        props.jumpTo(st === 302 ? 303 : (st ===303 ? 306 : st+1));
    }
    const cancel= async (item:any)=>{
        let payload = {
            id: item.id,
            status:304,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message: "H???y ????n h??ng",
                    description: "Th??nh c??ng",
                    type: "success",
                });
                Database.push(
                    `notification/notify/${item.partner.partCode}`,
                    {
                        title:'????n h??ng ???? h???y th??nh c??ng',
                        description: `Papadashi r???t ti???c ????n h??ng ${item.orderCode} v???a b??? h???y , ch??ng t??i s??? c???i thi???n nhi???u h??n ch???t l?????ng s???n ph???m trong th???i gian t???i.`,
                        time:Database.timeStamp(new Date()),
                        dataOrder:{
                            idOrder:item.id,
                            orderCode:item.orderCode,
                            status:payload.status,
                        },
                        see:0,
                    },
                )
            }
        });
        dispatch(adminApi.util.invalidateTags(['adminApi']));
        dispatch(dashboardApi.util.invalidateTags(['dashboardApi']));
        showMessage({
            message: "H???y ????n h??ng",
            description: "Th??nh c??ng",
            type: "success",
        });
        setShowModal1(false);
        setShowModal2(false);
    }
    return (
        // @ts-ignore
        <TouchableOpacity onPress={()=>navigation.navigate('infoOrderScreen',{item:{idOrder:item.id, orderCode:item.orderCode, status:st}})}>
            <Center borderWidth={1}  px={2}  m={2} borderColor={"light.400"} bg={"white"} borderRadius={5}>
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:  <TextBase color={"light.400"}>M?? Order : </TextBase>,
                        colElement:<TextBase >{item.orderCode}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>Tr???ng th??i</TextBase>,
                        rightElement:<TextBase color={"light.400"}>{status(item.status)}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>ID</TextBase>,
                        rightElement:<TextBase color={"light.400"}>{item.id}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>S???n ph???m</TextBase>,
                        rightElement:<TextBase color={"light.400"}>{item.productName}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>Th??nh ti???n</TextBase>,
                        rightElement:<TextBase color={"red.500"}>185.000??</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>???????c t???o ng??y</TextBase>,
                        rightElement:<TextBase color={"red.500"}>{item.updatedDate}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                {
                    // st === 301 ||st === 302 ||st === 305 || st === 306
                    (st !==304 &&  st !== 306) ?
                        <>
                            <Row justifyContent={(st ===303 || st===302  ) ? "flex-end":"space-around"} my={3}>
                                <ButtonBase bg={"blue.400"}  onPress={() => setShowModal1(true)} >{st ===303 ? "Thanh to??n ": "X??c nh???n"}</ButtonBase>
                                {st !==303 && st !==302 ?  <ButtonBase bg={"red.400"}  onPress={() => setShowModal2(true)} >H???y ????n h??ng</ButtonBase> : null}
                            </Row>
                            <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>X??c nh???n l???i</Modal.Header>

                                    <Modal.Footer>
                                        <ButtonBase bg={"blue.400"}  onPress={()=>confirm(item)} >?????ng ??</ButtonBase>
                                    </Modal.Footer>

                                </Modal.Content>
                            </Modal>
                            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>X??c nh???n l???i</Modal.Header>
                                    <Modal.Footer>
                                        <ButtonBase bg={"blue.400"}  onPress={()=>cancel(item)} >?????ng ??</ButtonBase>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                        </>
                        :null
                }
            </Center>
        </TouchableOpacity>
    )
}
const ShowCommonRoute = (props:{payload:any , jumpTo?:any}) => {
    const {context}:any = useContext(LoadingContext);
    const data= context[0].data.data;
    return(
        <View flex={1} bg={"white"}>
            <FlatList
                renderItem = {({item})=>{
                    return(
                        <RenderItem payload={props.payload } item ={item} jumpTo={props.jumpTo} />
                    )
                }}
                numColumns ={1}
                data={data}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

const FirstRoute = (props:{jumpTo:any}) => (
    <CommonRoute payload={{
        status:301,
    }} jumpTo={props.jumpTo} />
);

const SecondRoute = (props:{jumpTo:any}) => (
    <CommonRoute payload={{
        status:302,

    }} jumpTo={props.jumpTo} />
);
const ThirdRoute = (props:{jumpTo:any}) => (
    <CommonRoute payload={{
        status:303,

    }} jumpTo={props.jumpTo}  />
);
const FourRoute = (props:{jumpTo:any}) => (
    <CommonRoute payload={{
        status:304,

    }} jumpTo={props.jumpTo}  />
);

const SixRoute = (props:{jumpTo:any}) => (
    <CommonRoute payload={{
        status:306,
    }} jumpTo={props.jumpTo} />
);

const renderScene = (props:{ route:any, jumpTo:any }) => {
    switch (props.route.key) {
        case 301:
            return <FirstRoute jumpTo={props.jumpTo} />;
        case 302:
            return <SecondRoute jumpTo={props.jumpTo} />;
        case 303:
            return <ThirdRoute jumpTo={props.jumpTo} />;
        case 304:
            return <FourRoute jumpTo={props.jumpTo} />;
        case 306:
            return <SixRoute jumpTo={props.jumpTo} />;
    }
};




const renderLabel = (props:{ route:any, focused:any, color:any }) => {

    return (
        <View>
            <TextBase
                color={props.focused ? "#0077e6":"dark"}
            >
                {props.route.title}
            </TextBase>
        </View>
    )
}
const CartScreen = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 301, title: '??ang x??? l??' },
        { key: 302, title: '??ang giao h??ng' },
        { key:303, title: 'Ho??n t???t' },

        { key: 306, title: '???? thanh to??n' },
        { key: 304, title: '???? h???y' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}

            renderScene={renderScene}
            onIndexChange={setIndex}
            tabBarPosition={"top"}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: "#0077e6",  }}
                    tabStyle={{ width: 150  }}
                    scrollEnabled={true}
                    activeColor={"#A8A29E"}
                    style={styles.container}
                    renderLabel={renderLabel}
                />
            )}
            initialLayout={{
                width: Layout.window.width,
                height: 100,
            }}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor :"#FFFFFF",
    },
    scene: {
        flex: 1,
    },
});
export default CartScreen;
