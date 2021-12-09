import * as React from "react";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import { Icon} from "native-base";
// https://icons.expo.fyi/
const IconBase = (props:any)=>{
    return(
        <Icon
            {...props}
            as={ <Ionicons size={25} style={{ marginVertical: 3, marginHorizontal:10 }}  {...props} />}
        />
    )
}

const IconCart = <IconBase name={"cart"} size={35} color={"red"} />
const IconSearch = <IconBase name={"search"}   mx={3} color="red" />
const MainIcon = (props:{name :string}) => {
    switch (props.name) {
        case "cart":
            return IconCart;
        case "search":
            return IconSearch;
        default:
            return null;
    }
};

export default MainIcon;
