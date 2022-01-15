import React, {useContext, useState} from 'react';
import {Avatar, Box, Button, Center, Divider, FlatList, Pressable, ScrollView, View} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import FrameBase from '../../components/FrameBase';
import Layout from "../../constants/Layout";
import {
    useGetAllCartWaitingForAdminQuery,
    useGetOrderQuantityByStatusOfAdminQuery
} from '../../app/selectors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import ButtonBase from "../../components/ButtonBase";
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {useNavigation} from "@react-navigation/native";
import {getData, storeData} from "../../helps/localStorage";

const CardForCartWaiting = (props:{item:any, navigation ?:any})=>{
    const {partner,id} = props.item;

    return(
        <Pressable my={2} onPress={() =>props.navigation.navigate("billScreen", {item: partner, id:id})}>
            <Center>
                <Center width={"90%"}>
                    <FrameBase
                        default
                        styled={{
                            borderWidth:1,
                            borderColor:"light.300",
                            borderRadius:10,
                            px:2,
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
                                <TextBase color={"red.400"} alignItems={"flex-end"}>{partner.nameStore.slice(0,20)}</TextBase>
                                <TextBase>{partner.name}</TextBase>
                            </Col>,
                            rightElement:<Col  alignItems={"flex-end"}>
                                <TextBase color={"blue.400"} fontSize={10} alignItems={"flex-end"}>Xem chi tiết</TextBase>
                                <TextBase>{partner.updatedDate.split(" ")[1]}</TextBase>
                            </Col>,
                        }}
                    />
                </Center>
            </Center>
        </Pressable>
    )
}
const HomeScreen = (props:{navigation?:any})=>{
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event:any, selectedDate :any) => {

        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const dispatch = useDispatch();
    const showMode = (currentMode:any) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    let a =date.getUTCMonth()+1 <10 ? '0':'';
    let b =  date.getUTCDate() <10 ? '0':'';
    // @ts-ignore
    const payload = {
        status: 301 ,
        date:`${date.getUTCFullYear()}-${a}${date.getUTCMonth()+1}-${b}${date.getUTCDate()-1}` ,
    }

    const dataCartWaiting = useGetAllCartWaitingForAdminQuery(payload);
    // @ts-ignore
    const getQuantity = useGetOrderQuantityByStatusOfAdminQuery();
    return (
        <LoadingScreen data={[dataCartWaiting, getQuantity]}>
            <ScrollView bg={"white"}>

                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            timeZoneOffsetInMinutes={60}
                            is24Hour={true}
                            display="default"
                            maximumDate={new Date()}
                            onChange={onChange}
                        />
                    )}
                </View>
                <Center  width={"100%"} height={50} my={2}  >
                    <Box width={["100%","100%"]}   overflow={"hidden"}   >
                       <ShowNumberOrder/>
                    </Box>

                </Center>
                <Box>
                    <Row justifyContent={"flex-end"}  mr={3} space={2}>
                        <TextBase bg={"success.500"} p={3} rounded={4} >
                            {payload.date}
                        </TextBase>
                        <ButtonBase onPress={showDatepicker} >
                            <MainIcon name={"calendar"} />
                        </ButtonBase>
                    </Row>
                </Box>
                <Center >
                    <ShowListStoreHavingCartWaiting />
                </Center>
            </ScrollView>
        </LoadingScreen>
    )
}
const ShowListStoreHavingCartWaiting =()=>{
    const navigation = useNavigation();
    const {context}:any = useContext(LoadingContext);

    const data = context[0].data.data || [];
    // const orderQuantity = context[1].data.data;
    // console.log(orderQuantity);
    // storeData(`orderQuantityAdmin`, JSON.stringify(orderQuantity)).then(r =>console.log(r));
    return(
        <FlatList
            contentContainerStyle={{
                width:Layout.window.width,
                justifyContent:"center"
            }}
            renderItem = {({item})=><CardForCartWaiting item={item} navigation={navigation} />}
            data={data}
            keyExtractor={(item) => item.id}
        />
    )
}

const ShowNumberOrder = () =>{
    const {context}:any = useContext(LoadingContext);
    const data = context[1].data.data;
    return (
        <>
            <TouchableOpacity>
                <Box
                >
                    <Row  justifyContent={"space-between"} alignContent ={"space-between"}>
                        <Col width={"33%"} alignItems={"center"}>
                            <TextBase fontSize={16} color={"red.500"}>{data.orderWaiting }</TextBase>
                            <TextBase fontSize={14} textAlign={"center"} color={"light.400"}>Đơn đang chờ</TextBase>
                        </Col>
                        <Divider orientation={"vertical"}/>
                        <Col width={"33%"} alignItems={"center"} >
                            <TextBase fontSize={16} color={"red.500"}>{data.orderShip}</TextBase>
                            <TextBase  fontSize={14} textAlign={"center"} color={"light.400"}>Đơn vận chuyển</TextBase>
                        </Col>
                        <Divider  orientation={"vertical"}/>
                        <Col width={"33%"} alignItems={"center"}>
                            <TextBase fontSize={16} color={"red.500"}>{data.orderDone}</TextBase>
                            <TextBase  fontSize={14} textAlign={"center"} color={"light.400"} >Đơn hoàn thành</TextBase>
                        </Col>
                    </Row>
                </Box>
            </TouchableOpacity>
        </>
    )
}


export default HomeScreen  ;
