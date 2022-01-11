import {TouchableOpacity} from "react-native";
import {Row, Spacer} from "native-base";
import {Col} from "../AutoLayout";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import TextBase from "../TextBase";
import MainIcon from "../../assets/icon/Icon";
import React from "react";

export const SaleCardView = (props:{item:any,navigation ?: any, routeName?:string, disabled?:boolean})=>{
    const item = props.item;
    return(
        <TouchableOpacity disabled={props.disabled} onPress={()=>props.navigation.navigate(props.routeName,{sale:item})}>
            <Row alignItems={"flex-start"} w={'100%'}  space={3} px={'2.5%'} py={2} bg={'info.100'}>
                <Col justifyContent={'flex-start'} py={2}>
                    <MaterialCommunityIcons name="sale" size={50} color="#60A5FA" />
                </Col>
                <Col maxWidth={'70%'}>
                    <TextBase light fontSize={15} color={'red.500'}> {item.saleName.toUpperCase()} - KHUYẾN MÃI {item.saleValue} <MaterialCommunityIcons name="sale" size={15} color="#60A5FA" /></TextBase>
                    <TextBase color={'light.400'} fontSize={12}>{item.saleRemark.charAt(0).toUpperCase()+item.saleRemark.slice(1) }</TextBase>
                    <Row>
                        <MainIcon name={'time'} />
                        <TextBase color={'light.400'} fontSize={13}>{item.endDate.split(" ")[1]} / {item.endDate.split(" ")[0]}</TextBase>
                    </Row>
                </Col>
                <Spacer/>
            </Row>
        </TouchableOpacity>
    )
}
