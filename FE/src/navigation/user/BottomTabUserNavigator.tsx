import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import {
    BottomTabUserParamList,
    HomeTabUserParamList,
    NotifyTabUserParamList,
    SaleTabUserParamList,
    StoreTabUserParamList
} from "../../constants/Routes";
import useColorScheme from "../../hooks/useColorScheme";
import AddProductScreen from "../../pages_app/CommonScreen/AddProductScreen";
import {HomeScreen, NotifyScreen, SaleScreen, StoreScreen} from "../../pages_app";
import CartProductScreen from "../../pages_app/CommonScreen/CartProductScreen";
import ProductDetailInfoScreen from "../../pages_app/CommonScreen/ProductDetailInfoScreen";
import {OrderHistoryScreen, ProductTypeScreen, SaleInfoScreen} from '../../pages_app/CommonScreen';
import  {IconHome, IconNotify, IconSale, IconStore} from '../../helps/TabNavigator';
import CartStatisticsScreen from "../../pages_app/CommonScreen/CartStatisticsScreen";
import SettingScreen from "../../components/common/SettingScreen";
import MessageScreen from "../../components/common/MesageScreen";
import SelectSaleScreen from "../../pages_app/CommonScreen/SelectSaleScreen";
import isBillScreen from "../../pages_app/CommonScreen/isBillScreen";
import AllInfoToOrderScreen from "../../pages_app/CommonScreen/AlInfoToOrderScreen";
import SearchScreen from "../../pages_app/CommonScreen/SearchScreen";
import PayOrderScreen from "../../pages_app/CommonScreen/PayOrderScreen";
import InfoOrderScreen from "../../pages_app/CommonScreen/InfoOrderScreen";


const BottomTab = createBottomTabNavigator<BottomTabUserParamList>();

export default function BottomTabUserNavigator() {
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
    const colorScheme = useColorScheme();
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
        options={(props:any) =>{
            return {
                tabBarIcon: (props:{ color:any }) => <IconHome color={props.color}/>,
                headerShown: false,
                tabBarLabel:"Trang chủ",
            }
        }}
      />

        <BottomTab.Screen
            name ="sale"
            component={SaleNavigator}
            options={{
                tabBarIcon: ({ color }) => <IconSale color={color}/>,
                headerShown: false,
                tabBarLabel:"Ưu đãi",
            }}
        />
        <BottomTab.Screen
            name ="notify"
            component={NotifyNavigator}
            options={{
                tabBarIcon: ({ color }:any) => <IconNotify color={color}/>,
                headerTitle:"Hộp thư",
                headerTitleAlign:"center",
                tabBarLabel:"Hộp thư",
            }}
        />
        <BottomTab.Screen
            options={(props:any) =>{
                return {
                    tabBarIcon: (props:{ color:any }) => <IconStore color={props.color}/>,
                    headerTitle:"Tạp hóa PAPA",
                    headerShown: false,
                }
            }}
            name ="store"
            component={StoreNavigator}
        />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeTabUserParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="homeScreen">
      <HomeStack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
            headerTitle: 'HomeScreen',
            headerShown:false,
        }}
      />
      <HomeStack.Screen
          name={"addProductScreen"}
          component={AddProductScreen}
          options={{
              headerTitle: 'Thêm hàng',
          }}
      />
    <HomeStack.Screen
        name={"cartProductScreen"}
        component={CartProductScreen}
        options={{
            headerTitle: 'Giỏ hàng',
        }}
    />
        <HomeStack.Screen
            name={"productDetailInfoScreen"}
            component={ProductDetailInfoScreen}
            options={{
                headerTitle: 'Giỏ hàng',
            }}
        />
        <HomeStack.Screen
            name={"productTypeScreen"}
            component={ProductTypeScreen}
            options={{
                headerTitle: 'Loại  hàng',
            }}
        />
        <HomeStack.Screen
            name={"selectSaleScreen"}
            component={SelectSaleScreen}
            options={{
                headerTitle: 'Chọn Voucher',
            }}
        />
        <HomeStack.Screen
            name={"isBillScreen"}
            component={isBillScreen}
            options={{
                headerTitle: 'Xác thực hóa đơn',
            }}
        />
        <HomeStack.Screen
            name={"authOrder"}
            component={AllInfoToOrderScreen}
            options={{
                headerTitle: 'Xác thực thông tin đặt hàng',
            }}
        />
        <HomeStack.Screen
            name={"searchScreen"}
            component={SearchScreen}
            options={{
                headerTitle: 'Kết quả tìm kiếm',
            }}
        />

    </HomeStack.Navigator>
  );
}
const StoreStack = createStackNavigator<StoreTabUserParamList>();
function StoreNavigator (){
    return(
        <StoreStack.Navigator>
            <StoreStack.Screen
                name ="storeScreen"
                component={StoreScreen}
                options={{
                    headerTitle: "Cửa hàng PAPA",
                    headerStyle:{
                        height: 50
                    }
                }}
            />
            <StoreStack.Screen
                name ="orderHistoryScreen"
                component={OrderHistoryScreen}
                options={{
                    headerTitle: "Lịch sử nhập hàng",
                }}
            />
            <StoreStack.Screen
                name ="cartStatisticsScreen"
                component={CartStatisticsScreen}
                options={{
                    headerTitle: "Thống kê đơn hàng",
                }}
            />
            <StoreStack.Screen
                name ="payOrderScreen"
                component={PayOrderScreen}
                options={{
                    headerTitle: "Chi tiết đơn hàng",
                }}
            />
            <StoreStack.Screen
                name ="infoOrderScreen"
                component={InfoOrderScreen}
                options={{
                    headerTitle: "Chi tiết đơn hàng",
                }}
            />
        </StoreStack.Navigator>
    )
}
const NotifyStack = createStackNavigator<NotifyTabUserParamList>();

const SaleStack = createStackNavigator<SaleTabUserParamList>();
function NotifyNavigator (){
    return(
        <NotifyStack.Navigator>
            <NotifyStack.Screen
                name ="notifyScreen"
                component={NotifyScreen}
                options={{
                    headerShow :false
                }}
            />
            <NotifyStack.Screen
                name={"message"}
                component={MessageScreen}
                options={{
                    headerShow :false
                }}
            />

        </NotifyStack.Navigator>
    )
}
function SaleNavigator (){
    return(
        <SaleStack.Navigator>
            <SaleStack.Screen
                name ="saleScreen"
                component={SaleScreen}
                options={{
                    headerTitle: "Khám phá ưu đãi",
                }}
            />
            <SaleStack.Screen
                name={"saleInfoScreen"}
                component={SaleInfoScreen}
                options={{
                    headerTitle:"Thông tin sản phẩm ưu đãi",
                    headerShown: false,
                }}
            />

        </SaleStack.Navigator>
    )
}
