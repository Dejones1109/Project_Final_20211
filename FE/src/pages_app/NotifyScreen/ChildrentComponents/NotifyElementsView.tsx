import {Box, FlatList, Divider, Pressable, Spacer, Center} from 'native-base';
import React from 'react';
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import MainIcon from "../../../assets/icon/Icon";
import Layout from "../../../constants/Layout";

export const NotifyViewNavigate = (props:any)=>{
    const item = props.item;
    return(
        <Center width={"95%"} height={50} my={1}>
            <Box width={["100%","100%"]}  overflow={"hidden"}>
                <Pressable  onPress={() => console.log('You touched me')}  >
                    <Box
                    >
                        <Row  space={2}  alignItems ={"space-between"} alignSelf={"center"}>
                            <Col mx={3} justifyContent={"center"}>
                                {item.iconLeft}
                            </Col>
                            <Col   py={2}   >
                                <TextBase fontSize={"md"}>{item.textTop}</TextBase>
                                <TextBase color={"light.300"}>{item.textBottom}</TextBase>
                            </Col>
                            <Spacer />
                            <Col justifyContent={"center"} >
                                {item.iconRight}
                            </Col>
                        </Row>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    )
}

const NotifyElementsView = () => {
    const data = [
        {
            iconRight:<MainIcon name={"arrow-right"} />,
            iconLeft:<MainIcon name={"arrow-right"} />,
            textTop:"Tin tức",
            textBottom:"Tính năng mới, bảo trì",
        },
        {
            iconRight:<MainIcon name={"arrow-right"} />,
            iconLeft:<MainIcon name={"arrow-right"} />,
            textTop:"Thông báo",
            textBottom:"Đơn hàng, thông tin giao dich",
        },
        {
            iconRight:<MainIcon name={"arrow-right"} />,
            iconLeft:<MainIcon name={"arrow-right"} />,
            textTop:"Khuyến mãi",
            textBottom:"Khuyến mãi, quà tặng",
        },
        {
            iconRight:<MainIcon name={"arrow-right"} />,
            iconLeft:<MainIcon name={"arrow-right"} />,
            textTop:"Trưng bày",
            textBottom:"Thông tin",
        }
    ]
    return (
        <>
            <FlatList
                contentContainerStyle={{
                    width:0.95*Layout.window.width,
                }}
                scrollEnabled={false}
                renderItem = {({item})=>
                    <>
                        <NotifyViewNavigate item={item} />
                        <Divider my={1} />
                    </>
                }

                numColumns ={1}
                data={data.slice(0,-1)}
                keyExtractor={(item) => item.id}
            />
            <NotifyViewNavigate item={data[data.length-1]} />

        </>
    );
};

export default NotifyElementsView;
