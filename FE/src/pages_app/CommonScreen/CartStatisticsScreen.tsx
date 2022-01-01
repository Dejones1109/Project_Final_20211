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
    <CommonRoute status={305} />
);
const SecondRoute = () => (
    <CommonRoute status={306} />
);




const renderScene = SceneMap({
    second: SecondRoute,
    first: FirstRoute,

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
const CartStatisticsScreen = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Chưa thanh toán' },
        { key: 'second', title: 'Đã thanh toán' },
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
                    tabStyle={{ width: Layout.window.width/2  }}
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
export default CartStatisticsScreen;
