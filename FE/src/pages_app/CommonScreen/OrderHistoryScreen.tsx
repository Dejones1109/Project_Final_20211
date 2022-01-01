import React from 'react';
import TextBase from "../../components/TextBase";
import {StatusBar, StyleSheet, useWindowDimensions} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FrameBase from "../../components/FrameBase";
import {Box, Center, FlatList, View} from 'native-base';
import {status} from "../../helps/Status";
import {useGetOrderListByStatusQuery} from "../../app/selectors";
import Layout from "../../constants/Layout";

const CommonRoute = (props:{status:number}) => {
    const {data} = useGetOrderListByStatusQuery(props.status);
    const dataCp = Object.assign([],Object.assign({},data).data);
    return(
        <View flex={1} bg={"white"}>
            <FlatList
                renderItem = {({item})=>{
                    return(
                        <>
                            <Center borderWidth={1} pb={2}   m={2} borderColor={"light.400"} bg={"white"} borderRadius={5}>
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement:  <TextBase color={"light.400"}>Mã Order : </TextBase>,
                                        colElement:<TextBase >{item.orderCode}</TextBase>,
                                    }}
                                    styled={{height:12}}
                                />
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement:<TextBase color={"light.400"}>Trạng thái</TextBase>,
                                        rightElement:<TextBase color={"light.400"}>{status(item.status)}</TextBase>,
                                    }}
                                    styled={{height:6}}
                                />
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement:<TextBase color={"light.400"}>Sản phẩm</TextBase>,
                                        rightElement:<TextBase color={"light.400"}>Cháo gà x 1 , Cháo thịt x2</TextBase>,
                                    }}
                                    styled={{height:6}}
                                />
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement:<TextBase color={"light.400"}>Thành tiền</TextBase>,
                                        rightElement:<TextBase color={"red.500"}>185.000đ</TextBase>,
                                    }}
                                    styled={{height:6}}
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
    <CommonRoute status={0} />

);
const SecondRoute = () => (
    <CommonRoute status={301} />
);
const ThirdRoute = () => (
    <CommonRoute status={302} />
);
const FourRoute = () => (
    <CommonRoute status={303} />
);
const FiveRoute = () => (
    <CommonRoute status={304} />
);



const renderScene = SceneMap({
    second: SecondRoute,
    first: FirstRoute,
    third:ThirdRoute,
    four:FourRoute,
    five:FiveRoute,
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
const OrderHistoryScreen = () => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Tất cả' },
        { key: 'second', title: 'Đang xử lý' },
        { key: 'third', title: 'Đang giao hàng' },
        { key: 'four', title: 'Hoàn tất' },
        { key: 'five', title: 'Đã hủy' },
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
        backgroundColor :"#FFFFFF",
    },
    scene: {
        flex: 1,
    },
});
export default OrderHistoryScreen;
