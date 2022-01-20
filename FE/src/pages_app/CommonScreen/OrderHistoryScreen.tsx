import React, {useContext} from 'react';
import TextBase from "../../components/TextBase";
import {StatusBar, StyleSheet, TouchableOpacity, useWindowDimensions} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FrameBase from "../../components/FrameBase";
import {Box, Center, FlatList, View} from 'native-base';
import {status} from "../../helps/Status";
import {useGetOrderListByStatusQuery} from "../../app/selectors";
import Layout from "../../constants/Layout";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {getIdUser} from "../../helps/authenticate";

const CommonRoute = (props:{status:number,jumpTo?:any}) =>{
    let payload = {
        status:props.status,
        partnerId:getIdUser()
    }
    const data = useGetOrderListByStatusQuery(payload);
    return(
        <LoadingScreen data={[data]}>
            <ShowCommonRoute status={props.status}/>
        </LoadingScreen>
    )
}
const ShowCommonRoute = (props:{status:number}) => {
    const navigation = useNavigation();
    const {context }:any = useContext(LoadingContext);
    const data= context[0].data.data;
    return(
        <View flex={1} bg={"white"}>
            <FlatList
                renderItem = {({item})=>{
                    return(
                        // @ts-ignore
                        <TouchableOpacity onPress={()=>navigation.navigate('payOrderScreen',{item:{idOrder:item.id, orderCode:item.orderCode, status:props.status}})}>
                            <Center borderWidth={1} p={2}   m={2} borderColor={"light.400"} bg={"white"} borderRadius={5}>
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
                                        leftElement:<TextBase color={"light.400"}>Sản lượng</TextBase>,
                                        rightElement:<TextBase color={"light.400"}>{item.totalQuantity}</TextBase>,
                                    }}
                                    styled={{height:6}}
                                />
                                <FrameBase
                                    default
                                    viewOptions={{
                                        leftElement:<TextBase color={"light.400"}>Thành tiền</TextBase>,
                                        rightElement:<TextBase color={"red.500"}>{item.totalPrice} vnđ</TextBase>,
                                    }}
                                    styled={{height:6}}
                                />
                            </Center>
                        </TouchableOpacity>
                    )
                }}
                numColumns ={1}
                data={data}
                keyExtractor={({index}) => index}
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
                height: 0,
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
