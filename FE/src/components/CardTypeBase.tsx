import React, {Component} from 'react';
import {Box, Image, View, Heading, Pressable, Avatar, Spacer, VStack, Center} from 'native-base';
import TextBase from "./TextBase";
import ButtonBase from "./ButtonBase";
import {Col, Row} from './AutoLayout';

export type CardProps  = {
    default?:any  | JSX.Element,
    category?: object | JSX.Element,
    infoSale?: any | JSX.Element,
    product?: any | JSX.Element,
    productType ?: any | JSX.Element,
    viewOptions?:object,
}



const CardProductType = (props:any) =>{
    const item = props.item;
    return(
        <ButtonBase  >
            <Box
                width={[70,90,100 ]}
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
            </Box>
        </ButtonBase>
    )
}

const CardProduct = (props:any) =>{
    const item = props.item;
    return(
        <ButtonBase
            borderColor={"light.300"}
            borderWidth={1}
            rounded={5}
            ml={2}
            my={2}
        >
            <Box
                width={130}
            >
                <Image
                    source={{
                        uri: `${item.img}`,
                    }}
                    alt="thư mục sản phẩm"
                    size={130}
                />
                <TextBase  color={"red.400"}>{item.price}</TextBase>
                <TextBase  >{item.product_name}</TextBase>
            </Box>
        </ButtonBase>
    )
}

const CardDefault = (props:{viewOptions:any})=>{
    return (
        <Center  width={"95%"} height={50}>
            <Box width={["100%","100%"]}  overflow={"hidden"}>
                <Pressable  onPress={() => console.log('You touched me')}  >
                    <Box
                    >
                        <Row  space={2} alignItems ={"space-between"}>
                            <Col>
                                {props.viewOptions.leftElement}
                            </Col>
                            <Col  >
                                {props.viewOptions.colElement}
                            </Col>
                            <Spacer />
                            {props.viewOptions.rightElement}
                        </Row>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    )
}

const CardCategory = (props:any) =>{
    const item = props.item;
    return(
        <ButtonBase
            height={50}
            px={0}
            ml={2}
            my={2}
        >
            <Row  alignItems={"center"} >
                <Image
                    roundedLeft={5}
                    width={30}
                    height={50}
                    resizeMode={"stretch"}
                    source={{
                        uri:  `${item.img}`,
                    }}
                    alt="category type"
                />
                 <Col
                     height={50}
                     pl={1}
                     bg={"light.200"}
                     roundedRight={5}
                    justifyContent={"space-between"}
                 >
                     <Heading fontSize={"xs"} my={1} >{item.type}</Heading>
                     <TextBase my={1} >{item.view}</TextBase>
                 </Col>
            </Row>
        </ButtonBase>
    )
}

const CardInfoSale = (props:any)=>{
    const item = props.item;
    return (
        <Box width={["100%","100%"]} my={2} overflow={"hidden"}>
            <Pressable borderRadius={10} onPress={() => console.log('You touched me')} bg="white" >
                <Box
                >
                    <Row  space={2} justifyContent={"flex-start"} alignItems ={"space-between"}>
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
            </Pressable>
        </Box>
    )
}



class CardTypeBase extends Component<CardProps> {

    elementList : CardProps = {
        default:<CardDefault viewOptions={this.props.viewOptions} />,
        category: <CardCategory item={this.props.category} />,
        infoSale: <CardInfoSale item={this.props.infoSale} />,
        product: <CardProduct item={this.props.product}/>,
        productType:<CardProductType item={this.props.productType} />,
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


export default CardTypeBase


