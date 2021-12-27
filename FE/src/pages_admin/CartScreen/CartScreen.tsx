import React from 'react';
import TextBase from "../../components/TextBase";
import { StyleSheet,  StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FrameBase from "../../components/FrameBase";
import {Box, Center, FlatList, View} from 'native-base';
import {status} from "../../helps/Status";
import {useGetOrderListByStatusForAdminQuery, useGetOrderListByStatusQuery} from "../../app/selectors";
import Layout from "../../constants/Layout";
import {backgroundColor} from "styled-system";

const CommonRoute = (props:{payload:any}) => {
    const {data} = useGetOrderListByStatusForAdminQuery(props.payload);
    const dataCp = Object.assign([],Object.assign({},data).data);
    return(
        <View flex={1} bg={"white"}>
            <FlatList
                renderItem = {({item})=>{
                    return(
                        <>
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
                                        leftElement:<TextBase color={"light.400"}>Sản phẩm</TextBase>,
                                        rightElement:<TextBase color={"light.400"}>Cháo gà x 1 , Cháo thịt x2</TextBase>,
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
                            </Center>
                        </>
                    )
                }}
                numColumns ={1}
                data={dataCp}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
};

const FirstRoute = () => (
    <CommonRoute payload={{
        status:301,
        date: "2021-12-19"
    }} />
);

const SecondRoute = () => (
    <CommonRoute payload={{
        status:302,
        date: "2021-12-19"
    }} />
);
const ThirdRoute = () => (
    <CommonRoute payload={{
        status:303,
        date: "2021-12-19"
    }} />
);
const FourRoute = () => (
    <CommonRoute payload={{
        status:304,
        date: "2021-12-19"
    }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
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
        { key: 'four', title: 'Đã hủy' },
    ]);

    // @ts-ignore
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
