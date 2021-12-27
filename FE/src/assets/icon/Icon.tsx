import * as React from "react";
import {
    AntDesign,
    Entypo, Feather,
    FontAwesome,
    Fontisto, Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons, Zocial
} from "@expo/vector-icons";
import { Icon,} from "native-base";
// https://icons.expo.fyi/


const IconCart = <Ionicons name={"cart"} size={35} style={{ marginBottom: -3 }} color={"#A8A29E"} />
const IconSearch = <Ionicons name={"search"} size={24} style={{ marginBottom: -3, paddingHorizontal:3 }}  color="#A8A29E" />
const IconArrowRight = <SimpleLineIcons name="arrow-right" size={15} style={{ marginBottom: -3 }} color="black" />
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

// profile partner

const IconPhone = <Feather name="phone" size={30} color="#60A5FA" />
const IconAddress = <Foundation name="address-book" size={30} color="#60A5FA" style={{  paddingHorizontal:4 }} />
const IconActive = <MaterialCommunityIcons name="chart-timeline-variant" size={30} color="#60A5FA" />
const IconStartActive = <MaterialCommunityIcons name="timer" size={30} color="#60A5FA"  />
const IconStatus = <Zocial name="statusnet" size={30} color="#60A5FA"  />
const IconUser = <FontAwesome name="user-o" size={30} color="#60A5FA" />


const IconGood = <FontAwesome name="th-list" size={30} color="#60A5FA"/>
const IconInfo = <Entypo name="info-with-circle" size={30} color="#60A5FA" />
const IconList = <MaterialCommunityIcons name="format-list-numbered" size={30} color="#60A5FA" />

const IconCalendar = <AntDesign name="calendar" size={30} color="black" />;

const IconLogOut = <MaterialIcons name="logout" size={30} color="#A8A29E"  />;
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
        case "phone":
            return IconPhone ;
        case "address":
            return IconAddress ;
        case "active":
            return IconActive ;
        case "start-active":
            return IconStartActive ;
        case "status":
            return IconStatus ;
        case "user":
            return IconUser ;
        case "good":
            return IconGood ;
        case "other-info":
            return IconInfo ;
        case "list":
            return IconList ;
        case "calendar":
            return IconCalendar ;
        case "logout":
            return IconLogOut ;
        default:
            return null;
    }
};

export default MainIcon;
