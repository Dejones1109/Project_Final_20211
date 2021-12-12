import {Box, Center, Divider, Pressable, Spacer} from 'native-base';
import React from 'react';
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import MainIcon from "../../../assets/icon/Icon";



export const HistoryViewNavigate = (props:any) => {
    const item = props.item;
    return (
        <Center  width={"95%"} height={50}>
            <Box width={["100%","100%"]}  overflow={"hidden"}>
                <Pressable  onPress={() => console.log('You touched me')}  >
                    <Box
                    >
                        <Row  space={2} alignItems ={"space-between"}>
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
            iconLeft:<MainIcon name={"arrow-right"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Lịch sử nhập hàng",
            textRight:"xem tất cả",
        },
        {
            iconLeft:<MainIcon name={"arrow-right"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Thống kê đơn hàng",
            textRight:"",
        }
    ]
    return(
        <>
            <HistoryViewNavigate item={data[0]} />
            <Divider my={1} />
            <HistoryViewNavigate item={data[1]} />
        </>
    )
}

export default HistoryView;
