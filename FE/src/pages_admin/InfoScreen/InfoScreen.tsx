import {Avatar, Center, Divider, Pressable, ScrollView} from 'native-base';
import React from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import { Col } from '../../components/AutoLayout';
import Layout from "../../constants/Layout";
import MainIcon from "../../assets/icon/Icon";

const InfoScreen = (props:{navigation:any}) => {
    const data = [
        {
            leftElement:<Col>
                <TextBase>Tổng sản lượng</TextBase>
                <TextBase>Tổng doanh thu</TextBase>
            </Col>,
            colElement:"",
            rightElement:<Col>
                <TextBase>1000 KG</TextBase>
                <TextBase>1 M$</TextBase>
            </Col>,
        },
        {
            leftElement:<Col>
                <TextBase>Danh sách cửa hàng</TextBase>
                <TextBase>Số lượng : 20</TextBase>
            </Col>,
            colElement:"",
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col>
                <TextBase>Danh sách sản phẩm</TextBase>
                <TextBase>Số lượng : 50</TextBase>
            </Col>,
            colElement:"",
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col>
                <MainIcon name={"settings"} />
            </Col>,
            colElement: <TextBase>Cài đặt</TextBase>,
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        }
    ]
    return (
        <ScrollView bg={"white"} >
            <Center >
                <FrameBase
                    default
                    styled={{
                        borderWidth:1,
                        borderColor:"light.400",
                        bg:"light.300",
                        height:75,
                        my:3,
                        p:3,
                    }}
                    viewOptions={{
                        leftElement:data[0].leftElement,
                        colElement:data[0].colElement,
                        rightElement:data[0].rightElement,
                    }}
                />
            </Center>
            <Divider bg={"light.200"} width={Layout.window.width} height={3}/>
            <Center>
                <Pressable width={"100%"} onPress={()=>props.navigation.navigate("storeList")}>
                    <FrameBase
                        default
                        styled={{
                            height:75,
                            my:1,
                            p:3,
                        }}
                        viewOptions={{
                            leftElement:data[1].leftElement,
                            colElement:data[1].colElement,
                            rightElement:data[1].rightElement,
                        }}
                    />
                </Pressable>
                <Divider bg={"light.200"} width={0.95*Layout.window.width} />
                <Pressable width={"100%"} onPress={()=>props.navigation.navigate("productList")}>
                    <FrameBase
                        default
                        styled={{
                            height:75,
                            my:1,
                            p:3,
                        }}
                        viewOptions={{
                            leftElement:data[2].leftElement,
                            colElement:data[2].colElement,
                            rightElement:data[2].rightElement,
                        }}
                    />
                </Pressable>

                <Divider bg={"light.200"} width={Layout.window.width} height={3}/>
                <Pressable width={"100%"} onPress={()=>props.navigation.navigate("storeList")}>
                    <FrameBase
                        default
                        styled={{
                            height:75,
                            my:1,
                            p:3,
                        }}
                        viewOptions={{
                            leftElement:data[3].leftElement,
                            colElement:data[3].colElement,
                            rightElement:data[3].rightElement,
                        }}
                    />
                </Pressable>
            </Center>
        </ScrollView>
    );
};

export default InfoScreen;
