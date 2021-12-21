import * as React from "react";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons
} from "@expo/vector-icons";
import { Icon,} from "native-base";
// https://icons.expo.fyi/


const IconCart = <Ionicons name={"cart"} size={35} style={{ marginBottom: -3 }} color={"#A8A29E"} />
const IconSearch = <Ionicons name={"search"} size={24} style={{ marginBottom: -3, paddingHorizontal:3 }}  color="#A8A29E" />
const IconArrowRight = <SimpleLineIcons name="arrow-right" size={18} style={{ marginBottom: -3 }} color="black" />
const IconNotify = <Entypo name="notification" size={30} color="#60A5FA" style={{ marginBottom: -3 }} />;
const IconNews = <FontAwesome name="newspaper-o" size={30} color="#60A5FA" />
const IconSale = <MaterialCommunityIcons name="sale" size={30} color="#60A5FA" />
const IconDisplay = <AntDesign name="appstore-o" size={30} color="#60A5FA" />
const IconContact = <AntDesign name="contacts" size={30} color="#4ADE80" />

const IconOrderHistory =<Ionicons name="time" size={30} color="#4ADE80" />
const IconStatistics = <Ionicons name="stats-chart" size={30} color="#60A5FA" />;
const IconSetting = <Ionicons name="settings" size={30} color="#A8A29E" />
const IconPolicy = <MaterialIcons name="policy" size={30} color="#A8A29E" />
const IconFeedback = <MaterialIcons name="feedback" size={30} color="#A8A29E" />;

const IconCar = <Ionicons name="md-car-sport" size={30} color="#3b82f6" />;
const IconWating = <Fontisto name="ampproject" size={30} color="#3b82f6" />
const IconVote = <MaterialCommunityIcons name="vote" size={30} color="#3b82f6" />;
const MainIcon = (props:{name :string}) => {
    switch (props.name) {
        case "cart":
            return IconCart;
        case "search":
            return IconSearch;
        case "arrow-right":
            return IconArrowRight;
        case "notification":
            return IconNotify;
        case "newspaper-o":
            return IconNews;
        case "sale":
            return IconSale;
        case "appstore-o":
            return IconDisplay;
        case "contacts":
            return IconContact;
        case "time":
            return  IconOrderHistory;
        case "stats-chart":
            return IconStatistics;
        case "settings":
            return IconSetting;
        case "policy":
            return IconPolicy;
        case "feedback":
            return IconFeedback;
        case "md-car-sport":
            return IconCar;
        case "ampproject":
            return IconWating;
        case "vote":
            return IconVote ;
        default:
            return null;
    }
};

export default MainIcon;
