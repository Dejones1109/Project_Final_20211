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

                        <Row  space={2}  alignItems ={"baseline"}>
                            <Col  >
                                {item.iconLeft}
                            </Col>
                            <Col>
                                <TextBase fontSize={"md"}>{item.textTop}</TextBase>
                                <TextBase color={"light.300"}>{item.textBottom}</TextBase>
                            </Col>
                            <Spacer />
                            <TextBase  alignSelf={"center"} color={"light.300"} >{item.textRight}</TextBase>
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
            iconLeft:<MainIcon name={"newspaper-o"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Tin tức",
            textBottom:"Tính năng mới, bảo trì",
        },
        {
            iconLeft:<MainIcon name={"notification"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Thông báo",
            textBottom:"Đơn hàng, thông tin giao dich",
        },
        {
            iconLeft:<MainIcon name={"sale"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Khuyến mãi",
            textBottom:"Khuyến mãi, quà tặng",
        },
        {
            iconLeft:<MainIcon name={"appstore-o"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Trưng bày",
            textBottom:"Thông tin",
        }
    ]
    return (
        <>
            <NotifyViewNavigate  item={data[0]} />
            <Divider my={1} />
            <NotifyViewNavigate  item={data[1]} />
            <Divider my={1} />
            <NotifyViewNavigate  item={data[2]} />
            <Divider my={1} />
            <NotifyViewNavigate  item={data[3]} />
            <Divider my={1} />
        </>
    );
};

export default NotifyElementsView;
