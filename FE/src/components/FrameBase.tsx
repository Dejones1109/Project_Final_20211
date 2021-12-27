import React, {Component} from 'react';
import {Box, Image, View, Heading, Pressable, Avatar, Spacer, VStack, Center, ScrollView, Checkbox} from 'native-base';
import TextBase from "./TextBase";
import ButtonBase from "./ButtonBase";
import {Col, Row} from './AutoLayout';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Layout from "../constants/Layout";
import {HomeTabUserParamList} from "../constants/Routes";

export type CardProps  = {
    default?:any  | JSX.Element,
    category?: object | JSX.Element,
    infoSale?: any | JSX.Element,
    product?: any | JSX.Element,
    productType ?: any | JSX.Element,
    cart ?: any | JSX.Element,
    viewOptions?:object,
    styled?:any,
    navigation ?:any,
}


const CardDefault = (props:{viewOptions:{leftElement ?:any, colElement?:any, rightElement ?:any},styled :any})=>{
    return (
        <Center  width={"100%"}  {...props.styled} >
            <Box width={"100%"}  overflow={"hidden"}>
                <Box>
                    <Box
                    >
                        <Row  space={2} alignContent ={"space-between"}>
                            <Col alignContent={"center"}>
                                {props.viewOptions.leftElement}
                            </Col>
                            <Col alignContent={"center"} >
                                {props.viewOptions.colElement}
                            </Col>
                            <Spacer />
                            {props.viewOptions.rightElement}
                        </Row>
                    </Box>
                </Box>
            </Box>
        </Center>
    )
}

const CardProductType = (props:{item:any, navigation ?:any}) =>{
    const item = props.item;
    return(
        <ButtonBase onPress={() => props.navigation.navigate("productTypeScreen",{type: item.type})}>
            <Col
                width={[70,90,100 ]}
                justifyContent={"flex-start"}
            >
                <Image
                    rounded={20}
                    source={{
                        uri: `${item.img}`,
                    }}
                    alt="thư mục sản phẩm"
                    size={[70,90,100]}
                />
                <TextBase textAlign={"center"} >{item.heading}</TextBase>
            </Col>
        </ButtonBase>
    )
}

const CardProduct = (props:{ item:any,navigation?:any}) =>{
    const item = props.item;
    return(
        <ButtonBase
            borderColor={"light.300"}
            borderWidth={1}
            rounded={5}
            my={1}
            shadow={2}
            onPress={()=>props.navigation.navigate("addProductScreen", {data: item })}
        >
            <Box
                width={0.4 * Layout.window.width}
            >
                <Image
                    source={{
                        uri: `${item.image}`,
                    }}
                    alt="thư mục sản phẩm"
                    size={0.4 * Layout.window.width}
                />
                <TextBase  >Mã : {item.productCode}</TextBase>
                <TextBase  >{item.productName}</TextBase>
                <TextBase  color={"blue.400"}>Giá : {item.price} đ</TextBase>
            </Box>
        </ButtonBase>
    )
}


const CardCategory = (props:{item:any,navigation ?:any}) =>{
    const item = props.item;
    return(
        <ButtonBase
            height={50}
            my={2}
            width={0.45*Layout.window.width}
            onPress={() => props.navigation.navigate("productTypeScreen",{type: item.type})}
        >
            <Row  alignItems={"center"} >
                <Image
                    roundedLeft={5}
                    width={0.2*Layout.window.width}
                    height={50}
                    resizeMode={"stretch"}
                    source={{
                        uri:  `${item.image}`,
                    }}
                    alt="category type"
                />
                 <Col
                     height={50}
                     pl={1}
                     bg={"light.200"}
                     roundedRight={5}
                     width={0.25*Layout.window.width}
                    justifyContent={"space-between"}
                 >
                     <Heading fontSize={"xs"} my={1} >{item.type}</Heading>
                     <TextBase my={1} >{item.view}</TextBase>
                 </Col>
            </Row>
        </ButtonBase>
    )
}

const CardInfoSale = (props:{item:any})=>{
    const item = props.item;
    return (
        <Box width={["100%","100%"]} my={2} overflow={"hidden"}>
            <Box borderRadius={10} bg="white" >
                <Box
                >
                    <Row  space={2} justifyContent={"flex-start"} alignItems ={"baseline"}>
                        <Image rounded={10} size={["140","100"]}  source={{uri:`${item.img}`}} />
                        <Col width={["50%","60%","65%"]} height={["140","100"]} py={2}   >
                            <Box width={"100%"}>
                                <Heading fontSize="lg"  width={"100%"}>{item.title}</Heading>
                            </Box>
                            <Spacer />
                            <TextBase color={"light.400"} alignSelf={"flex-start"}>Đến {item.time }</TextBase>
                        </Col>
                    </Row>
                </Box>
            </Box>
        </Box>
    )
}
const CartInfo = (props:{styled:object, item:any})=>{
    const item= props.item;
    return(
        <Center width={"100%"}  {...props.styled}  >
            <FrameBase
                default
                viewOptions={{
                    leftElement:<Checkbox value={item.id} my={2}>
                        {item.product.productName}
                    </Checkbox>,
                    colElement:"",
                    rightElement:"",
                }}
                styled={{height:8}}

            />
            <FrameBase
                default
                viewOptions={{
                    leftElement:<TextBase>Thành tiền</TextBase>,
                    colElement:"",
                    rightElement:<TextBase >{item.product.price} đ</TextBase>,
                }}
                styled={{height:8}}

            />
            <FrameBase
                default
                viewOptions={{
                    leftElement:<TextBase>Số lượng</TextBase>,
                    colElement:"",
                    rightElement:<TextBase textAlign={"flex-end"}>{item.quantity}</TextBase>,
                }}
                styled={{height:8}}
            />
            <FrameBase
                default
                viewOptions={{
                    leftElement:<TextBase color={"light.400"}>Xóa</TextBase>,
                    colElement:"",
                    rightElement:"",
                }}
                styled={{height:8}}
            />
        </Center>
    )
}



class FrameBase extends Component<CardProps> {

    elementList : CardProps = {
        default:<CardDefault viewOptions={this.props.viewOptions} styled={this.props.styled} />,
        category: <CardCategory item={this.props.category} navigation={this.props.navigation} />,
        infoSale: <CardInfoSale item={this.props.infoSale}  />,
        product: <CardProduct item={this.props.product} navigation={this.props.navigation}  />,
        productType:<CardProductType item={this.props.productType} navigation={this.props.navigation}  />,
        cart:<CartInfo styled={this.props.styled} item={this.props.cart}  />,
    }

    render() {
        const getType = () => {
            try{
                const keyCardProps = Object.keys(this.props);
                const keyElementList = Object.keys(this.elementList);
                for(const index in keyCardProps){
                    if(keyElementList.includes(keyCardProps[index])){
                        return keyCardProps[index];
                    }
                    else {
                        return "default";
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        const type = getType();
        // @ts-ignore
        const RenderElement = this.elementList[`${type}`]
        return (
            <>
                {RenderElement}
            </>
        )

    }
}


export default FrameBase


