import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import {BottomTabParamList, HomeTabParamList} from "../constants/Routes";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import HomeScreen from "../pages_app/HomeScreen/HomeScreen";
import TabBarIcon from '../helps/TabNavigator';
import NotifyScreen from "../pages_app/NotifyScreen/NotifyScreen";




const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {

    const colorScheme = useColorScheme();
    return (
    <BottomTab.Navigator
      initialRouteName="home"
      screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme].tint,
          tabBarStyle: {height: 50},
          headerStyle:{height:50}
      }}>
      <BottomTab.Screen
        name ="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,

        }}
      />
        <BottomTab.Screen
            name ="notify"
            component={NotifyScreen}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon routeName ="home" />,
            }}
        />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeTabParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'HomeScreen', }}
      />
    </HomeStack.Navigator>
  );
}

