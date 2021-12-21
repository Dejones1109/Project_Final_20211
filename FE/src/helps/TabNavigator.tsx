import * as React from "react";
import {Entypo, FontAwesome, Foundation, Ionicons} from "@expo/vector-icons";

// https://icons.expo.fyi/
const IconHome = (props:{color:any}) => <Ionicons name={"home"} size={24} color={props.color} style={{ marginBottom: -3 }} />
const IconNotify  = (props:{color:any}) => <Entypo name="message" size={24} color={props.color}  style={{ marginBottom: -3 }} />
const IconSale  = (props:{color:any}) =><Foundation name="burst-sale" size={24} color={props.color}  style={{ marginBottom: -3 }} />
const IconStore  = (props:{color:any}) => <FontAwesome name="user" size={24}color={props.color}  style={{ marginBottom: -3 }}  />

export {IconHome,IconSale,IconNotify,IconStore}
