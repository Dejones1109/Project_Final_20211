import React, {useContext} from 'react';
import MainIcon from "../../../assets/icon/Icon";
import { HistoryViewNavigate } from './HistoryView';
import {Box, Center, Divider, Pressable, Spacer} from "native-base";
import Layout from "../../../constants/Layout";
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import {deleteData} from "../../../helps/localStorage";
import {NavigationContext} from "../../../navigation/RootMobile";



const SettingView = () => {
    const data = [
        {
            iconLeft:<MainIcon name={"settings"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Cài đặt",
            textRight:"thông tin,bảo mật",
        },
        {
            iconLeft:<MainIcon name={"policy"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Điều khoản và chính sách",
        },
        {
            iconLeft:<MainIcon name={"feedback"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Gửi phản hồi",
        },

    ]
    const {auth}:any = useContext(NavigationContext);
    return (
        <>
            <Divider bg={"light.200"} width={Layout.window.width} height={3} my={3} />
            <HistoryViewNavigate item={data[0]} />
            <Divider my={1} />
            <HistoryViewNavigate item={data[1]} />
            <Divider my={1} />
            <HistoryViewNavigate item={data[2]} />
            <Divider my={1} />
            <Center  width={"95%"} height={50}>
                <Box width={["100%","100%"]}   overflow={"hidden"}>
                    <Pressable  onPress={async ()=>{
                        await deleteData("admin").then(r => auth.setAdmin(null));
                        await deleteData("user").then(r=>auth.setUser(null));

                    }}  >
                        <Box
                        >
                            <Row  space={2} alignContent ={"space-between"}>
                                <Col>
                                    <MainIcon name={"logout"} />
                                </Col>
                                <Col  >
                                    <TextBase fontSize={"md"}>Đăng xuất</TextBase>
                                </Col>
                                <Spacer />
                                <TextBase  alignSelf={"center"} color={"light.300"} ></TextBase>
                                <Col>
                                </Col>
                            </Row>
                        </Box>
                    </Pressable>
                </Box>
            </Center>
        </>
    );
};

export default SettingView;
