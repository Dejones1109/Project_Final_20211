import React, {useState} from 'react';
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import FrameBase from '../../components/FrameBase';
import DatePicker from 'react-native-datepicker';
import Layout from "../../constants/Layout";
import { useGetAllCartWaitingForAdminQuery } from '../../app/selectors';

const CardForCartWaiting = (props:{item:any, navigation ?:any})=>{
    const {partner} = props.item;
    return(
        <Pressable onPress={() =>props.navigation.navigate("billScreen", {item: partner})}>
            <Center width={"100%"}>
                <FrameBase
                    default
                    styled={{
                        borderWidth:1,
                        borderColor:"light.300",
                        borderRadius:10,
                        my:2,
                        p:3,
                        height:70,
                        shadow:5
                    }}
                    viewOptions={{
                        leftElement:<>
                            <Avatar
                                bg="pink.600"
                                alignSelf="center"
                                size={50}
                                source={{
                                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                                }}
                            >
                                GG
                            </Avatar>
                        </>,
                        colElement:<Col>
                            <TextBase alignItems={"flex-end"}>{partner.nameStore.slice(0,20)}</TextBase>
                            <TextBase>{partner.name}</TextBase>
                        </Col>,
                        rightElement:<Col justifyContent={"space-around"} alignItems={"flex-end"}>
                            <MainIcon name={"arrow-right"} />
                            <TextBase>{partner.updatedDate.split(" ")[1]}</TextBase>
                        </Col>,
                    }}
                />
            </Center>
        </Pressable>
    )
}
const HomeScreen = (props:{navigation?:any}) => {
    const [date, setDate] = useState("2021-12-19");
    // @ts-ignore
    const payload = {
        status: 301 ,
        date:date ,
    }
    const {data} = useGetAllCartWaitingForAdminQuery(payload);
    const dataCp = Object.assign([],Object.assign({},data).data);
    return (
        <ScrollView bg={"white"}>
            <Center  width={"100%"} height={50} my={2}  >
                <Box width={["100%","100%"]}   overflow={"hidden"}   >
                    <Pressable   >
                        <Box
                        >
                            <Row  justifyContent={"space-between"} alignItems ={"space-between"}>
                                <Col width={"33%"} alignItems={"center"}>
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase fontSize={14} textAlign={"center"} color={"light.400"}>Đơn đang chờ</TextBase>
                                </Col>
                                <Divider orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"} >
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase  fontSize={14} textAlign={"center"} color={"light.400"}>Đơn vận chuyển</TextBase>
                                </Col>
                                <Divider  orientation={"vertical"}/>
                                <Col width={"33%"} alignItems={"center"}>
                                    <TextBase fontSize={16} color={"red.500"}>10</TextBase>
                                    <TextBase  fontSize={14} textAlign={"center"} color={"light.400"} >Đơn hoàn thành</TextBase>
                                </Col>
                            </Row>
                        </Box>
                    </Pressable>
                </Box>

            </Center>
            <Center >
                <DatePicker
                    style={{width: 200 , marginVertical: 10}}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2022-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {setDate(date)}}
                />
                <FlatList
                    contentContainerStyle={{
                        width:Layout.window.width
                    }}
                    renderItem = {({item})=><CardForCartWaiting item={item} navigation={props.navigation} />}
                    data={dataCp}
                    keyExtractor={(item) => item.id}
                />

            </Center>

        </ScrollView>
    );
};

export default HomeScreen  ;
