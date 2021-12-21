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
import  {IconHome,} from '../../helps/TabNavigator';
import {CartScreen, HomeScreen, InfoScreen, StatisticsScreen} from '../../pages_admin';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import ProductListScreen from "../../pages_admin/CommonScreen/ProductListScreen";
import StoreListScreen from '../../pages_admin/CommonScreen/StoreListScreen';
import StoreDetailInfoScreen from "../../pages_admin/CommonScreen/StoreDetailInfoScreen";
import ProductDetailInfoScreen from '../../pages_admin/CommonScreen/ProductDetailInfoScreen';
import {BillScreen} from "../../pages_admin/CommonScreen";

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
                }}
            />
            <BottomTab.Screen
                name ="carts"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconHome color={color}/>,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name ="info"
                component={InfoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconHome color={color}/>,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name ="statistics"
                component={StatisticsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <IconHome color={color}/>,
                    headerShown: false,
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
            screenOptions={{
                headerStyle:{
                    height:50,
                }
            }}
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
            screenOptions={{
                headerStyle:{
                    height:50,
                }
            }}
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
                headerStyle:{
                    height:50,
                },
                headerTitleAlign:"center"
            }}
        >
            <InfoStack.Screen
                name="infoScreen"
                component={InfoScreen}
                options={{
                    headerTitle: 'Trang chủ',
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
                    headerTitle: 'Trang chủ',
                }}
            />
        </StatisticsStack.Navigator>
    );
}
