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

const BottomTab = createBottomTabNavigator<BottomTabAdminParamList>();

export default function BottomTabAdminNavigator() {

    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarStyle: {height: 50},
                headerStyle:{height:50},
            }}>
            <BottomTab.Screen
                name ="home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconHome color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Trang chủ",
                }}
            />
            <BottomTab.Screen
                name ="carts"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconGood color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Đơn hàng",
                }}
            />
            <BottomTab.Screen
                name ="statistics"
                component={StatisticsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconInfo color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Thống kê",
                }}
            />

            <BottomTab.Screen
                name ="info"
                component={InfoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconStatistics color={color}/>,
                    headerShown: false,
                    tabBarLabel:"Thông tin khác",
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
                    headerTitle: 'Trang chủ',
                }}
            />
            <HomeStack.Screen
                name="billScreen"
                component={BillScreen}
                options={{
                    headerTitle: 'Hoá đơn',
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
                    headerTitle: 'Đơn hàng',
                    headerShown: false
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
                headerTitleAlign:"center"
            }}
        >
            <InfoStack.Screen
                name="infoScreen"
                component={InfoScreen}
                options={{
                    headerTitle:"Thông tin",
                }}
            />
            <InfoStack.Screen
                name="storeList"
                component={StoreListScreen}
                options={{
                    headerTitle: 'Danh sách cửa hàng',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="storeDetailInfo"
                component={StoreDetailInfoScreen}
                options={{
                    headerTitle: 'Danh sách cửa hàng',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="productList"
                component={ProductListScreen}
                options={{
                    headerTitle: 'Danh sách sản phẩm',
                    headerShown:false
                }}
            />
            <InfoStack.Screen
                name="productDetailInfo"
                component={ProductDetailInfoScreen}
                options={{
                    headerTitle: 'Danh sách cửa hàng',
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
                    headerTitle: 'Thống kê',
                    headerShown:false
                }}
            />

        </StatisticsStack.Navigator>
    );
}
