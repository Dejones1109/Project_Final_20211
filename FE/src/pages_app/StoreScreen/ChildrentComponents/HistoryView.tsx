import {Box, Center, Divider, Pressable, Spacer} from 'native-base';
import React from 'react';
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import MainIcon from "../../../assets/icon/Icon";
import {useNavigation} from "@react-navigation/native";



export const HistoryViewNavigate = (props:{item:{iconLeft?:any, textLeft?:any,textRight?:any,iconRight?:any}}) => {
    const item:any  = props.item;
    const navigation = useNavigation();
    return (
        <Center  width={"95%"} height={50}>
            <Box width={["100%","100%"]}   overflow={"hidden"}>
                <Pressable  onPress={() => navigation.navigate(item.routeName)}  >
                    <Box
                    >
                        <Row  space={2} alignContent ={"space-between"}>
                            <Col>
                                {item.iconLeft}
                            </Col>
                            <Col  >
                                <TextBase fontSize={"md"}>{item.textLeft}</TextBase>
                            </Col>
                            <Spacer />
                           <TextBase  alignSelf={"center"} color={"light.300"} >{item.textRight}</TextBase>
                           <Col>
                               {item.iconRight}
                           </Col>
                        </Row>
                    </Box>
                </Pressable>
            </Box>
        </Center>
    );
};

const HistoryView = () => {
    const data = [
        {
            iconLeft:<MainIcon name={"time"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Lịch sử nhập hàng",
            textRight:"xem chi tiết",
            routeName:"orderHistoryScreen",
        },
        {
            iconLeft:<MainIcon name={"stats-chart"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Thống kê đơn hàng",
            routeName:"cartStatisticsScreen",
        },
    ]
    return(
        <>
            <HistoryViewNavigate item={data[0]}  />
            <Divider my={1} />

            <Center  width={"95%"} height={50} my={2} >
                <Box width={["100%","100%"]}   overflow={"hidden"}>
                    <Pressable   >
                        <Box
                        >
                            <Row  justifyContent={"space-between"} alignContent={"space-between"}>
                                <Col width={"33%"} alignItems={"center"}>
                                    <MainIcon name={"ampproject"} />
                                    <TextBase fontSize={12}>Đang xử lý</TextBase>
                                </Col>
                                <Divider orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"} >
                                    <MainIcon name={"md-car-sport"} />
                                    <TextBase fontSize={12}>Đang giao hàng</TextBase>
                                </Col>
                                <Divider  orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"}>
                                    <MainIcon name={"vote"} />
                                    <TextBase  fontSize={12} >Đánh giá</TextBase>
                                </Col>
                            </Row>
                        </Box>
                    </Pressable>
                </Box>
            </Center>
            <Divider my={1} />
            <HistoryViewNavigate item={data[1]}  />
        </>
    )
}

export default HistoryView;
