import React, {Component} from 'react';
import {Box, Image, View, Heading} from 'native-base';
import TextBase from "./TextBase";
import ButtonBase from "./ButtonBase";
import {Col, Row} from './AutoLayout';

export type CardProps  = {
    default?:any  | JSX.Element,
    category?: object | JSX.Element,
    infoSale?: any | JSX.Element,
    product?: any | JSX.Element,
    productType ?: any | JSX.Element,

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


const CardCategory = (props:any) =>{
    const item = props.item;
    return(
        <ButtonBase
            height={50}
            px={0}
        >
            <Row  alignItems={"center"} >
                <Image
                    roundedLeft={5}
                    width={90}
                    height={50}
                    resizeMode={"stretch"}
                    source={{
                        uri:  `${item.img}`,
                    }}
                    alt="category type"
                />
                 <Col
                     width={100}
                     height={50}
                     pl={1}
                     bg={"light.200"}
                     roundedRight={5}
                 >
                     <Heading fontSize={"md"}  >{item.type}</Heading>
                     <TextBase fontSize={"xs"} color={"light.400"}>{item.view}</TextBase>
                 </Col>
            </Row>
        </ButtonBase>
    )
}

//     Default: <CardProductType/>,
//     CardCategory: <CardProductType/>,
//     CardInfoSale: <CardProductType/>,
//     CardProduct: <CardProductType/>,
//     CardProductType: <CardProductType/>,

class CardTypeBase extends Component<CardProps> {

    elementList : CardProps = {
        default:<CardProductType />,
        category: <CardCategory item={this.props.category} />,
        infoSale: <CardProductType />,
        product: <CardProduct item={this.props.product}/>,
        productType:<CardProductType item={this.props.productType} />,
    }

    render() {
        console.log({...this.props.category});
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
            <View my={2}>
                {RenderElement}
            </View>
        )

    }
}


export default CardTypeBase


