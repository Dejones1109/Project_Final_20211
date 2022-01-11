import React, {Component} from 'react';
import {Box, Center, Checkbox, Heading, Image, Spacer} from 'native-base';
import TextBase from "./TextBase";
import ButtonBase from "./ButtonBase";
import {Col, Row} from './AutoLayout';
import Layout from "../constants/Layout";
import {createOrder} from "../app/service/order/orderSlice";
import {store} from "../app/store";
import {connect, useDispatch} from "react-redux";
import {cartApi} from "../app/controller";
import {removeProductOnCart} from "../app/service/cart/cartSlice";
import { TouchableOpacity } from 'react-native';
import {backgroundColor} from "styled-system";

export type CardProps  = {
    default?:any  | JSX.Element,
    category?: object | JSX.Element,
    infoSale?: any | JSX.Element,
    product?: any | JSX.Element,
    productType ?: any | JSX.Element,
    cart ?: any | JSX.Element,
    viewOptions?:any,
    styled?:any,
    navigation ?:any,
    dispatch?:any
}


const CardDefault = (props:{viewOptions?:{leftElement ?:any, colElement?:any, rightElement ?:any},styled :any})=>{
    const {colElement,leftElement,rightElement}:any = props.viewOptions;
    return (
        <Center  width={"100%"}  {...props.styled} >
            <Box width={"100%"}  overflow={"hidden"}>
                <Box>
                    <Box
                    >
                        <Row  space={2} alignContent ={"space-between"}>
                            <Col alignContent={"center"}>
                                {leftElement}
                            </Col>
                            <Col alignContent={"center"} >
                                {colElement}
                            </Col>
                            <Spacer />
                            {rightElement}
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
            width={[0.4*Layout.window.width,0.45*Layout.window.width]}
            onPress={() => props.navigation.navigate("productTypeScreen",{type: item.type})}
        >
            <Row   >
                <Image
                    roundedLeft={5}
                    resizeMode={"contain"}
                    height={50}
                    width={[50,0.15*Layout.window.width]}
                    source={{
                        uri:  "https://wallpaperaccess.com/full/317501.jpg"
                    }}
                    alt="category type"
                />
                 <Col
                     height={50}
                     pl={1}
                     bg={"light.200"}
                     roundedRight={5}
                     width={[79,0.25*Layout.window.width]}
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
                    <Row  space={2} justifyContent={"flex-start"} alignContent ={"space-between"}>
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
const CartInfo = (props:{styled:object, item:any,  dispatch?:any, navigation ?:any})=>{
    const removeOrder =async () =>{
        // @ts-ignore
        await props.dispatch(removeProductOnCart({id:item.id}));
        await props.dispatch(cartApi.util.invalidateTags(['cartApi']));
    }
    const item= props.item;
    return(
       <Box my={3}>
           <FrameBase
               default
               viewOptions={{
                   leftElement:<Checkbox value={item.id+" "+ item.price+" "+item.quantity} >
                       {item.product.productName}
                   </Checkbox>,
               }}
               styled={{height:8, bg:'info.100',pl:1}}

           />
           <TouchableOpacity onPress={() => props.navigation.navigate('productDetailInfoScreen',{item:item})}>
               <Center bg={'info.100'} px={1} width={"100%"}  {...props.styled}  >
                   <FrameBase
                       default
                       viewOptions={{
                           leftElement:<TextBase >Giá</TextBase>,
                           rightElement:<TextBase color={'blue.500'} >{item.product.price} đ</TextBase>,
                       }}
                       styled={{height:8}}

                   />
                   <FrameBase
                       default
                       viewOptions={{
                           leftElement:<TextBase >Thành tiền</TextBase>,
                           rightElement:<TextBase color={'blue.500'} >{item.product.price *item.quantity} đ</TextBase>,
                       }}
                       styled={{height:8}}

                   />
                   <FrameBase
                       default
                       viewOptions={{
                           leftElement:<TextBase>Số lượng</TextBase>,
                           rightElement:<TextBase color={'blue.500'} textAlign={"flex-end"}>{item.quantity}</TextBase>,
                       }}
                       styled={{height:8}}
                   />
                   <FrameBase
                       default
                       viewOptions={{
                           leftElement:<TouchableOpacity onPress={() =>removeOrder()}><TextBase color={"light.400"}>Xóa</TextBase></TouchableOpacity>,
                       }}
                       styled={{height:8}}
                   />
               </Center>
           </TouchableOpacity>
       </Box>
    )
}



class FrameBase extends Component<CardProps> {

    elementList : CardProps = {
        default:<CardDefault viewOptions={this.props.viewOptions} styled={this.props.styled} />,
        category: <CardCategory item={this.props.category} navigation={this.props.navigation} />,
        infoSale: <CardInfoSale item={this.props.infoSale}  />,
        product: <CardProduct item={this.props.product} navigation={this.props.navigation}  />,
        productType:<CardProductType item={this.props.productType} navigation={this.props.navigation}  />,
        cart:<CartInfo styled={this.props.styled} item={this.props.cart} dispatch={this.props.dispatch} navigation={this.props.navigation}   />,
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


export default connect()( FrameBase);


