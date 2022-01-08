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
import {adminApi} from "../../app/controller";
import {useNavigation} from "@react-navigation/native";
const CommonRoute = (props:{payload:any}) =>{
    const data= useGetOrderListByStatusForAdminQuery(props.payload);

    return(
        <LoadingScreen data={[data]}>
            <ShowCommonRoute payload={props.payload}/>
        </LoadingScreen>
    )
}
const RenderItem = (props:{payload:any, item :any})=>{
    const item = props.item;
    const st= props.payload.status;
    const [showModal1, setShowModal1] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const dispatch = useDispatch();
    const confirm = async (item:any)=>{

        let payload = {
            id: item.id,
            status: st === 302 ? 303 : (st ===303 ? 306 : st+1) ,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload));
        dispatch(adminApi.util.invalidateTags(['adminApi']));
        setShowModal1(false);
        setShowModal2(false);
    }
    const cancel= async (item:any)=>{
        let payload = {
            id: item.id,
            status:304,
        };
        // @ts-ignore
        dispatch(updateOrderStatus(payload));
        setShowModal1(false);
        setShowModal2(false);
    }
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('billScreen',{item:item.partner})}>
            <Center borderWidth={1}  px={2}  m={2} borderColor={"light.400"} bg={"white"} borderRadius={5}>
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:  <TextBase color={"light.400"}>Mã Order : </TextBase>,
                        colElement:<TextBase >{item.orderCode}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>Trạng thái</TextBase>,
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
                        leftElement:<TextBase color={"light.400"}>Sản phẩm</TextBase>,
                        rightElement:<TextBase color={"light.400"}>{item.productName}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>Thành tiền</TextBase>,
                        rightElement:<TextBase color={"red.500"}>185.000đ</TextBase>,
                    }}
                    styled={{height:8}}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"light.400"}>Được tạo ngày</TextBase>,
                        rightElement:<TextBase color={"red.500"}>{item.updatedDate}</TextBase>,
                    }}
                    styled={{height:8}}
                />
                {
                    // st === 301 ||st === 302 ||st === 305 || st === 306
                    (st !==304 &&  st !== 306) ?
                        <>
                            <Row justifyContent={(st ===303 || st===302  ) ? "flex-end":"space-around"} my={3}>
                                <ButtonBase bg={"blue.400"}  onPress={() => setShowModal1(true)} >{st ===303 ? "Thanh toán ": "Xác nhận"}</ButtonBase>
                                {st !==303 && st !==302 ?  <ButtonBase bg={"red.400"}  onPress={() => setShowModal2(true)} >Hủy đơn hàng</ButtonBase> : null}
                            </Row>
                            <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Xác nhận lại</Modal.Header>

                                    <Modal.Footer>
                                        <ButtonBase bg={"blue.400"}  onPress={()=>confirm(item)} >Đồng ý</ButtonBase>
                                    </Modal.Footer>

                                </Modal.Content>
                            </Modal>
                            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Xác nhận lại</Modal.Header>

                                </Modal.Content>
                            </Modal>
                        </>
                        :null
                }
            </Center>
        </TouchableOpacity>
    )
}
const ShowCommonRoute = (props:{payload:any}) => {
    const {context}:any = useContext(LoadingContext);
    const data= context[0].data.data;
    return(
        <View flex={1} bg={"white"}>
            <FlatList
                renderItem = {({item})=>{
                    return(
                        <RenderItem payload={props.payload } item ={item} />
                    )
                }}
                numColumns ={1}
                data={data}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
};

const FirstRoute = () => (
    <CommonRoute payload={{
        status:301,
    }} />
);

const SecondRoute = () => (
    <CommonRoute payload={{
        status:302,

    }} />
);
const ThirdRoute = () => (
    <CommonRoute payload={{
        status:303,

    }} />
);
const FourRoute = () => (
    <CommonRoute payload={{
        status:304,

    }} />
);

const SixRoute = () => (
    <CommonRoute payload={{
        status:306,

    }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    six:SixRoute,
    four: FourRoute,
});

const renderLabel = (props:{ route:any, focused:any, color:any }) => {
    return (
        <View>
            <TextBase
                color={"dark"}
            >
                {props.route.title}
            </TextBase>
        </View>
    )
}
const CartScreen = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Đang xử lý' },
        { key: 'second', title: 'Đang giao hàng' },
        { key: 'third', title: 'Hoàn tất' },

        { key: 'six', title: 'Đã thanh toán' },
        { key: 'four', title: 'Đã hủy' },
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
        marginTop: StatusBar.currentHeight,
        backgroundColor :"#FFFFFF",
    },
    scene: {
        flex: 1,
    },
});
export default CartScreen;
