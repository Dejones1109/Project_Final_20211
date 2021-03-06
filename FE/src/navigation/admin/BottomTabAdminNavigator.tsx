import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import {
    BottomTabAdminParamList,
    CartTabAdminParamList,
    HomeTabAdminParamList,
    InfoTabAdminParamList, StatisticsTabAdminParamList,
} from "../../constants/Routes";
import useColorScheme from "../../hooks/useColorScheme";
import {IconGood, IconHome, IconInfo, IconStatistics,} from '../../helps/TabNavigator';
import {CartScreen, HomeScreen, InfoScreen, StatisticsScreen} from '../../pages_admin';
import {
    BillScreen,
    StoreDetailInfoScreen,
    StoreListScreen,
    ProductListScreen,
    ProductDetailInfoScreen
} from "../../pages_admin/CommonScreen";
import ListMessageScreen from "../../pages_admin/CommonScreen/ListMessageScreen";
import MessageScreen from "../../components/common/MesageScreen";
import SaleListScreen from "../../pages_admin/CommonScreen/SaleListScreen";
import SaleDetailInfoScreen from "../../pages_admin/CommonScreen/SaleDetailInfoScreen";
import InfoOrderScreen from "../../pages_admin/CommonScreen/InfoOrderScreen";

const BottomTab = createBottomTabNavigator<BottomTabAdminParamList>();

export default function BottomTabAdminNavigator() {

    const colorScheme = useColorScheme();
    const getTabBarVisibility = (props:any) => {
        let {route}= props;
        const indexRoute = route.state
            ? route.state.index
            : 0;
        if (indexRoute >0 ) {
            return false;
        }
        return true;
    }
    return (
        <BottomTab.Navigator
            initialRouteName="home"
            screenOptions={(props:any)=>{
                return {
                    tabBarActiveTintColor: Colors[colorScheme].tint,
                    tabBarStyle: {height: 50},
                    headerStyle:{height:50},
                    tabBarVisible:getTabBarVisibility(props),
                }
            }}
            >
            <BottomTab.Screen
                name ="home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconHome color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Trang ch???",
                }}
            />
            <BottomTab.Screen
                name ="carts"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconGood color={color}/>,
                    headerShown: false,
                    tabBarLabel:"????n h??ng",
                }}
            />
            <BottomTab.Screen
                name ="statistics"
                component={StatisticsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconInfo color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Th???ng k??",
                }}
            />

            <BottomTab.Screen
                name ="info"
                component={InfoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconStatistics color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Th??ng tin kh??c",
                }}
            />

        </BottomTab.Navigator>
    );
}

const HomeStack = createStackNavigator<HomeTabAdminParamList>();

function HomeNavigator() {
    return (
        <HomeStack.Navigator
            initialRouteName="homeScreen"

        >
            <HomeStack.Screen
                name="homeScreen"
                component={HomeScreen}
                options={{
                    headerTitle: 'Trang ch???',
                }}
            />
            <HomeStack.Screen
                name="billScreen"
                component={BillScreen}
                options={{
                    headerTitle: 'Ho?? ????n',
                }}
            />
            <HomeStack.Screen
                name="infoOrderScreen"
                component={InfoOrderScreen}
                options={{
                    headerTitle: 'Ho?? ????n',
                }}
            />
        </HomeStack.Navigator>
    );
}

const CartStack = createStackNavigator<CartTabAdminParamList>()
function CartNavigator(){
    return (
        <CartStack.Navigator
            initialRouteName="cartScreen"
        >
            <CartStack.Screen
                name="cartScreen"
                component={CartScreen}
                options={{
                    headerTitle: '????n h??ng',
                    headerShown: false
                }}
            />
            <CartStack.Screen
                name="billScreen"
                component={BillScreen}
                options={{
                    headerTitle: 'Ho?? ????n',
                }}
            />
            <CartStack.Screen
                name="infoOrderScreen"
                component={InfoOrderScreen}
                options={{
                    headerTitle: 'Th??ng tin order',
                }}
            />
        </CartStack.Navigator>
    );
}

const InfoStack = createStackNavigator<InfoTabAdminParamList>()
function InfoNavigator(){
    return (
        <InfoStack.Navigator
            initialRouteName="infoScreen"
            screenOptions={{
                headerTitleAlign:"left"
            }}
        >
            <InfoStack.Screen
                name="infoScreen"
                component={InfoScreen}
                options={{
                    headerTitle:"Th??ng tin kh??c",
                }}
            />
            <InfoStack.Screen
                name="storeList"
                component={StoreListScreen}
                options={{
                    headerTitle: 'Danh s??ch c???a h??ng',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="storeDetailInfo"
                component={StoreDetailInfoScreen}
                options={{
                    headerTitle: 'chi ti???t c???a h??ng',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="productList"
                component={ProductListScreen}
                options={{
                    headerTitle: 'Danh s??ch s???n ph???m',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="productDetailInfo"
                component={ProductDetailInfoScreen}
                options={{
                    headerTitle: 'Danh s??ch s???n ph???m',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="saleList"
                component={SaleListScreen}
                options={{
                    headerTitle: 'Danh s??ch khuy???n m??i',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="saleDetailInfo"
                component={SaleDetailInfoScreen}
                options={{
                    headerTitle: 'Chi ti???t khuy???n m??i',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="listMessageStore"
                component={ListMessageScreen}
                options={{
                    headerTitle: 'Danh s??ch ng?????i tham gia',
                    headerShown:true
                }}
            />
            <InfoStack.Screen
                name="message"
                component={MessageScreen}
                options={{
                    headerTitle: '',
                    headerShown:false
                }}
            />
        </InfoStack.Navigator>
    );
}

const StatisticsStack = createStackNavigator<StatisticsTabAdminParamList>()
function StatisticsNavigator(){
    return (
        <StatisticsStack.Navigator
            initialRouteName="statisticsScreen"
            screenOptions={{
            }}
        >
            <StatisticsStack.Screen
                name="statisticsScreen"
                component={StatisticsScreen}
                options={{
                    headerTitle: 'Th???ng k??',
                    headerShown:true
                }}
            />
            <StatisticsStack.Screen
                name="storeDetailInfo"
                component={StoreDetailInfoScreen}
                options={{
                    headerTitle: 'chi ti???t c???a h??ng',
                    headerShown:false
                }}
            />

        </StatisticsStack.Navigator>
    );
}
