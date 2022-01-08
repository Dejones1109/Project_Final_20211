import React, {useContext} from 'react';
import {Center, Divider, Pressable, ScrollView} from "native-base";
import FrameBase from "../../components/FrameBase";
import TextBase from "../../components/TextBase";
import Layout from "../../constants/Layout";
import {Col} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import {LoadingContext} from "../../helps/LoadingScreen";
import {deleteData} from "../../helps/localStorage";
import {NavigationContext} from "../../navigation/RootMobile";

const LayoutInfoScreen = (props:{navigation:any}) => {
    const {auth}:any = useContext(NavigationContext);
    const data = [
        {
            leftElement:<Col>
                <TextBase color={"blue.500"}>Tổng sản lượng</TextBase>
                <TextBase color={"blue.500"}>Tổng doanh thu</TextBase>
            </Col>,
            rightElement:<Col>
                <TextBase color={"blue.500"}>1000 KG</TextBase>
                <TextBase color={"blue.500"}>1 M$</TextBase>
            </Col>,
        },
        {
            leftElement:<Col><MainIcon name={"list"} /></Col> ,
            colElement: <Col>
                <TextBase>Danh sách cửa hàng</TextBase>
            </Col>,
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col><MainIcon name={"list"} /></Col> ,
            colElement:<Col>
                <TextBase>Danh sách sản phẩm</TextBase>
            </Col>,
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col><MainIcon name={"sale"} /></Col> ,
            colElement:<Col>
                <TextBase>Danh sách khuyến mãi</TextBase>
            </Col>,
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col>
                <MainIcon name={"contacts"} />
            </Col>,
            colElement: <TextBase>Liên hệ</TextBase>,
            rightElement:<Col justifyContent={"center"}>
                <MainIcon name={"arrow-right"} />
            </Col>,
        },
        {
            leftElement:<Col>
                <MainIcon name={"logout"} />
            </Col>,
            colElement: <TextBase>Đăng xuất</TextBase>,
        }
    ]
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const total = context[0].data;
    return (
        <ScrollView bg={"white"} >
            <Center borderWidth={1} p={2}   m={2} borderColor={"light.200"} bg={"primary.100"} borderRadius={5}>

                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"blue.500"} >Sản lượng</TextBase>,
                        rightElement: <TextBase color={"red.500"}>{total.data[1]} g</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    viewOptions={{
                        leftElement:<TextBase color={"blue.500"}>Doanh thu</TextBase>,
                        rightElement: <TextBase color={"red.500"}> {total.data[0]} đ</TextBase>,
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
                            leftElement:data[3].leftElement,
                            colElement:data[3].colElement,
                            rightElement:data[3].rightElement,
                        }}
                    />
                </Pressable>

                <Divider bg={"light.200"} width={Layout.window.width} height={3}/>
                <Pressable width={"100%"} onPress={()=>props.navigation.navigate("listMessageStore")}>
                    <FrameBase
                        default
                        styled={{
                            height:50,
                            my:1,
                            p:3,
                        }}
                        viewOptions={{
                            leftElement:data[4].leftElement,
                            colElement:data[4].colElement,
                            rightElement:data[4].rightElement,
                        }}
                    />
                </Pressable>
                <Pressable width={"100%"} onPress={async ()=>{
                    await deleteData("admin").then(r => auth.setAdmin(null));
                    await deleteData("user").then(r=>auth.setUser(null));

                }}>
                    <FrameBase
                        default
                        styled={{
                            height:50,
                            my:1,
                            p:3,
                        }}
                        viewOptions={{
                            leftElement:data[5].leftElement,
                            colElement:data[5].colElement,
                        }}
                    />
                </Pressable>
            </Center>
        </ScrollView>
    );
};

export default LayoutInfoScreen;
