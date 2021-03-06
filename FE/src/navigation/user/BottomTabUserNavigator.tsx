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
import {
    ChangeInfoScreen,
    CreateBillScreen,
    OrderHistoryScreen,
    PrivateScreen,
    ProductTypeScreen,
    SaleInfoScreen
} from '../../pages_app/CommonScreen';
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
import NotificationScreen from "../../pages_app/CommonScreen/NotificationInfoScreen";


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
                tabBarLabel:"Trang ch???",
            }
        }}
      />

        <BottomTab.Screen
            name ="sale"
            component={SaleNavigator}
            options={{
                tabBarIcon: ({ color }) => <IconSale color={color}/>,
                headerShown: false,
                tabBarLabel:"??u ????i",
            }}
        />
        <BottomTab.Screen
            name ="notify"
            component={NotifyNavigator}
            options={{
                tabBarIcon: ({ color }:any) => <IconNotify color={color}/>,
                headerTitle:"H???p th??",
                headerTitleAlign:"center",
                tabBarLabel:"H???p th??",
            }}
        />
        <BottomTab.Screen
            options={(props:any) =>{
                return {
                    tabBarIcon: (props:{ color:any }) => <IconStore color={props.color}/>,
                    headerTitle:"T???p h??a PAPA",
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
              headerTitle: 'Th??m h??ng',
          }}
      />
    <HomeStack.Screen
        name={"cartProductScreen"}
        component={CartProductScreen}
        options={{
            headerTitle: 'Gi??? h??ng',
        }}
    />
        <HomeStack.Screen
            name={"productDetailInfoScreen"}
            component={ProductDetailInfoScreen}
            options={{
                headerTitle: 'Gi??? h??ng',
            }}
        />
        <HomeStack.Screen
            name={"productTypeScreen"}
            component={ProductTypeScreen}
            options={{
                headerTitle: 'Lo???i  h??ng',
            }}
        />
        <HomeStack.Screen
            name={"selectSaleScreen"}
            component={SelectSaleScreen}
            options={{
                headerTitle: 'Ch???n Voucher',
            }}
        />
        <HomeStack.Screen
            name={"isBillScreen"}
            component={isBillScreen}
            options={{
                headerTitle: 'X??c th???c h??a ????n',
            }}
        />
        <HomeStack.Screen
            name={"authOrder"}
            component={AllInfoToOrderScreen}
            options={{
                headerTitle: 'X??c th???c th??ng tin ?????t h??ng',
            }}
        />
        <HomeStack.Screen
            name={"searchScreen"}
            component={SearchScreen}
            options={{
                headerTitle: 'K???t qu??? t??m ki???m',
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
                    headerTitle: "C???a h??ng PAPA",
                    headerStyle:{
                        height: 50
                    }
                }}
            />
            <StoreStack.Screen
                name ="orderHistoryScreen"
                component={OrderHistoryScreen}
                options={{
                    headerTitle: "L???ch s??? nh???p h??ng",
                }}
            />
            <StoreStack.Screen
                name ="cartStatisticsScreen"
                component={CartStatisticsScreen}
                options={{
                    headerTitle: "Th???ng k?? ????n h??ng",
                }}
            />
            <StoreStack.Screen
                name ="payOrderScreen"
                component={PayOrderScreen}
                options={{
                    headerTitle: "Chi ti???t ????n h??ng",
                }}
            />
            <StoreStack.Screen
                name ="infoOrderScreen"
                component={InfoOrderScreen}
                options={{
                    headerTitle: "Chi ti???t ????n h??ng",
                }}
            />
            <StoreStack.Screen
                name ="createBillScreen"
                component={CreateBillScreen}
                options={{
                    headerTitle: "T???o chi ti???t h??a ????n",
                }}
            />
            <StoreStack.Screen
                name ="changeInfoScreen"
                component={ChangeInfoScreen}
                options={{
                    headerTitle: "Th??ng tin c?? nh??n ",
                }}
            />
            <StoreStack.Screen
                name ="privateScreen"
                component={PrivateScreen}
                options={{
                    headerTitle: "??i???u kho???n v?? ch??nh s??ch ",
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
                    headerTitle: "Th??ng b??o",
                }}
            />
            <NotifyStack.Screen
                name={"message"}
                component={MessageScreen}
                options={{
                    headerShown: false,
                    headerTitle:"Message"
                }}
            />

            <NotifyStack.Screen
                name={"notificationScreen"}
                component={NotificationScreen}
                options={{
                    headerShown: true,
                    headerTitle:"Th??ng tin giao dich"
                }}
            />
            <NotifyStack.Screen
                name={"saleScreen"}
                component={SaleScreen}
                options={{
                    headerShown: true,
                    headerTitle:"C??c khuy???n m??i"
                }}
            />
            <StoreStack.Screen
                name ="payOrderScreen"
                component={PayOrderScreen}
                options={{
                    headerTitle: "Chi ti???t ????n h??ng",
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
                    headerTitle: "Kh??m ph?? ??u ????i",
                }}
            />
            <SaleStack.Screen
                name={"saleInfoScreen"}
                component={SaleInfoScreen}
                options={{
                    headerTitle:"Th??ng tin s???n ph???m ??u ????i",
                    headerShown: false,
                }}
            />

        </SaleStack.Navigator>
    )
}
