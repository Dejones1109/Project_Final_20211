import * as React from "react";
import {Ionicons, MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import { Icon,} from "native-base";
// https://icons.expo.fyi/


const IconCart = <Ionicons name={"cart"} size={35} style={{ marginBottom: -3 }} color={"red"} />
const IconSearch = <Ionicons name={"search"} size={24} style={{ marginBottom: -3 }}  mx={3} color="red" />
const IconArrowRight = <SimpleLineIcons name="arrow-right" size={15} style={{ marginBottom: -3 }} color="black" />
const MainIcon = (props:{name :string}) => {
    switch (props.name) {
        case "cart":
            return IconCart;
        case "search":
            return IconSearch;
        case "arrow-right":
            return IconArrowRight;
        default:
            return null;
    }
};

export default MainIcon;
