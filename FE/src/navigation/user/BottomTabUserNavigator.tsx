import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../../constants/Colors';
import {BottomTabUserParamList, HomeTabUserParamList, SaleTabUserParamList, StoreTabUserParamList} from "../../constants/Routes";
import useColorScheme from "../../hooks/useColorScheme";
import AddProductScreen from "../../pages_app/CommonScreen/AddProductScreen";
import {HomeScreen, NotifyScreen, SaleScreen, StoreScreen} from "../../pages_app";
import CartProductScreen from "../../pages_app/CommonScreen/CartProductScreen";
import ProductDetailInfoScreen from "../../pages_app/CommonScreen/ProductDetailInfoScreen";
import {OrderHistoryScreen, ProductTypeScreen, SaleInfoScreen} from '../../pages_app/CommonScreen';
import  {IconHome, IconNotify, IconSale, IconStore} from '../../helps/TabNavigator';
import CartStatisticsScreen from "../../pages_app/CommonScreen/CartStatisticsScreen";

const BottomTab = createBottomTabNavigator<BottomTabUserParamList>();

export default function BottomTabUserNavigator() {

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
            name ="sale"
            component={SaleNavigator}
            options={{
                tabBarIcon: ({ color }) => <IconSale color={color}/>,
                headerShown: false,
            }}
        />
        <BottomTab.Screen
            name ="notify"
            component={NotifyScreen}
            options={{
                tabBarIcon: ({ color }) => <IconNotify color={color}/>,
                headerTitle:"Hộp thư",
                headerTitleAlign:"center",
            }}
        />
        <BottomTab.Screen
            name ="store"
            component={StoreNavigator}
            options={{
                tabBarIcon: ({ color }) => <IconStore color={color}/>,
                headerTitle:"Tạp hóa PAPA",
                headerShown: false,
            }}
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
        </StoreStack.Navigator>
    )
}

const SaleStack = createStackNavigator<SaleTabUserParamList>();

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
                    headerTitle:"Thông tin sản phẩm ưu đãi"
                }}
            />
            <SaleStack.Screen
                name={"addProductScreen"}
                component={AddProductScreen}
                options={{
                    headerTitle: 'Thêm hàng',
                }}
            />
        </SaleStack.Navigator>
    )
}
