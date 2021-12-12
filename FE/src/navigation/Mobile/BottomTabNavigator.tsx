import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {BottomTabParamList, HomeTabParamList} from "../../constants/Routes";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import HomeScreen from "../../pages_app/HomeScreen/HomeScreen";
import TabBarIcon from '../../helps/TabNavigator';
import NotifyScreen from "../../pages_app/NotifyScreen/NotifyScreen";
import SaleScreen from "../../pages_app/SaleScreen/SaleScreen";
import StoreScreen from "../../pages_app/StoreScreen/StoreScreen";
import AddProductScreen from "../../pages_app/CommonScreen/AddProductScreen";




const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

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
          tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,
            headerShown: false,
        }}
      />
        <BottomTab.Screen
            name ="notify"
            component={NotifyScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,
                headerTitle:"Hộp thư",
                headerTitleAlign:"center",
            }}
        />
        <BottomTab.Screen
            name ="sale"
            component={SaleScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,
                headerTitle:"Khám phá ưu đãi"
            }}
        />
        <BottomTab.Screen
            name ="store"
            component={StoreScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,
                headerTitle:"Tạp hóa PAPA"
            }}
        />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeTabParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      {/*<HomeStack.Screen*/}
      {/*  name="homeScreen"*/}
      {/*  component={HomeScreen}*/}
      {/*  options={{*/}
      {/*      headerTitle: 'HomeScreen',*/}
      {/*  }}*/}
      {/*/>*/}
      <HomeStack.Screen
          name={"addProductScreen"}
          component={AddProductScreen}
          options={{
              headerTitle: 'Thêm hàng',
          }}
      />

    </HomeStack.Navigator>
  );
}

