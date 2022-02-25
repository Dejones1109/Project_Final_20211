import React, { useContext } from 'react';
import {Box, Center, FlatList, HStack, Image, ScrollView, Text, VStack} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {useNavigation} from "@react-navigation/native";

import {TouchableOpacity} from "react-native";
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";


const AllProductTypeView = (props:{navigation?:any}) => {
    const data = [
        {
            type:"Cháo hải sản",
            img: '../../../assets/icon/chaohaisan.png',
            heading:"Cháo hải sản"
        },
        {
            type:"Cháo thịt",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo thịt",
        },
        {
            type:"Cháo tim cận",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo tim cận"
        },
        {
            type:"Cháo cá",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo cá"
        },
        {
            type:"Cháo lươn",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo lươn"
        },
        {
            type:"Cháo ếch",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo ếch"
        },
        {
            type:"Cháo chim",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo chim"
        },
        {
            type:"Cháo cua",
            img:'../../../assets/icon/chaohaisan.png',
            heading:"Cháo cua"
        },
    ]
    const navigation = useNavigation();
    return (
        <ScrollView
            horizontal
            _contentContainerStyle={{
                mx: "auto",
                my: "4",
                minW: "72",

            }}
            showsHorizontalScrollIndicator={false}
        >
            <Col>
                <Row>
                    <TouchableOpacity key={1} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo hải sản"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaohaisan.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo hải sản</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity key={2} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo thịt"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaothit.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo thịt</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity key={3} onPress={() => navigation.navigate("productTypeScreen",{type:"Cháo tim cận"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaotimcan.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo tim cận</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity key={4} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo cá"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaoca.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo cá</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                </Row>
                <Row>
                    <TouchableOpacity key={5} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo ếch"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaoech.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo ếch</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity key={6} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo chim"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaochim.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo chim</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                    <TouchableOpacity key={7} onPress={() => navigation.navigate("productTypeScreen",{type: "Cháo cua"})}>
                        <Col
                            width={[70,80,90 ]}
                            justifyContent={"center"}
                            alignContent={"center"}
                            mx={2}
                        >
                            <Center width={70} height={70} borderRadius={20} bg={'info.400'}  >
                                <Image
                                    source={require('../../../assets/icon/chaocua.png')}
                                    alt="thư mục sản phẩm"
                                    size={[50,60,70]}
                                />
                            </Center>
                            <Box height={20} width={79}>
                                <TextBase mt={5} textAlign={"center"} >Cháo cua</TextBase>
                            </Box>
                        </Col>
                    </TouchableOpacity>
                </Row>
            </Col>
        </ScrollView>
    );
};

export default AllProductTypeView;
