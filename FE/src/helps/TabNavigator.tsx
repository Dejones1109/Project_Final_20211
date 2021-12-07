import * as React from "react";
import NavigationConstants from "../navigation/NavigationConstants";
import {Ionicons} from "@expo/vector-icons";

// https://icons.expo.fyi/
const IconBottomTab = (props:{ name: React.ComponentProps<typeof Ionicons>['name']; color: string })=>{
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />
}

const IconHome = <IconBottomTab name={"home"} color={"black"} />
const IconNotify = <IconBottomTab name={"home"} color={"black"} />
const TabBarIcon = (props:{routeName :string}) => {
  switch (props.routeName) {
    case NavigationConstants.user.home.main:
      return IconHome;
    case NavigationConstants.user.notify.main:
      return IconNotify;
    default:
      return null;
  }
};

export default TabBarIcon;
