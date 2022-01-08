import React, {useContext, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {
    Actionsheet,
    Avatar,
    Box,
    Button,
    Center,
    FlatList,
    Icon,
    Input,
    Pressable, Row, StatusBar, useDisclose,
    View
} from "native-base";
import {Col} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import {AntDesign} from "@expo/vector-icons";
import {useGetAllStoreQuery} from "../../app/selectors";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import LoadingScreen from "../../helps/LoadingScreen";
import {LoadingContext} from "../../helps/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {createPartner} from "../../app/service/store/storeSlice";
import {storeApi} from "../../app/controller";

const CardStoreView = (props:{item:any,navigation ?: any})=>{
    const item = props.item;
    return(
        <Pressable my={1} onPress={()=>props.navigation.navigate("storeDetailInfo",{item:item})}>
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
                                        uri: `${item.image}`,
                                    }}
                                >
                                    {item.name.slice(0,2)}
                                </Avatar>
                            </>,
                            colElement:<Col>
                                <TextBase alignItems={"flex-end"}>{item.nameStore.slice(0,20)}</TextBase>
                                <TextBase>{item.name}</TextBase>
                            </Col>,
                            rightElement:<Col justifyContent={"space-around"} alignItems={"flex-end"}>
                                <TextBase color={"red.500"}></TextBase>
                                <TextBase color={"blue.200"}>Xem chi tiết</TextBase>
                            </Col>,
                        }}
                    />
                </Center>
            </Center>
        </Pressable>
    )
}
const  ShowSaleListScreen = (props:{navigation:any}) =>{
    // @ts-ignore
    const {context } = useContext(LoadingContext);
    const data = context[0].data;
    const { isOpen, onOpen, onClose } = useDisclose();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [nameStore,setNameStore]= useState('');
    const [address,setAddress]= useState('');
    const dispatch = useDispatch();
    const dataUser= {
        phone:phone,
        name:name,
        nameStore:  nameStore,
        address: address,
    }
    const notification = (payload:any)=>{
        console.log(payload);
        if(payload.code === "201" ){
            alert("Tạo thành công");
        }
        else if(payload.code === "200"){
            alert("Tài khoản đã tồn tại");
        }
        else {
            alert("Tạo thất bại");
        };
    }
    const createUser = async() => {
        // @ts-ignore
        await dispatch(createPartner(dataUser)).then(({payload}) => {notification(payload)});
        await dispatch(storeApi.util.invalidateTags(['storeApi']));
        setPhone('');
        setName('');
        setNameStore('');
        setAddress('');
        onClose;
    }

    return (
        <View flex={1} bg={"white"}>
            <Button
                bg={"blue.400"}
                position="absolute"
                right={3}
                bottom={10}
                size="sm"
                borderRadius={"full"}
                zIndex={3}
                onPress={onOpen}
            >
                <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
            </Button>
            <Center >
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>
                        <Box w="100%"  px={4}  justifyContent="center">
                            <Input
                                value={name}
                                my={2}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Tên của partner"
                                onChangeText={(text)=>setName(text)}
                            />
                            <Input
                                my={2}
                                value={phone}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                type={"number"}
                                placeholder="số điện thoại"
                                onChangeText={(text)=>setPhone(text)}
                            />
                            <Input
                                my={2}
                                value={nameStore}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="Tên cửa hàng"
                                onChangeText={(text)=>setNameStore(text)}
                            />
                            <Input
                                my={2}
                                value={address}
                                InputLeftElement={<MainIcon name={"arrow-right"} />}
                                placeholder="địa chỉ"
                                onChangeText={(text)=>setAddress(text)}
                            />
                            <Row justifyContent={"space-around"} my={2}>
                                <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                <ButtonBase bg={"danger.400"} onPress={()=>createUser()}>Đăng</ButtonBase>
                            </Row>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
            <>
                <StatusBar backgroundColor="white" barStyle="light-content"  />
                <Center>
                    <Input
                        placeholder="Search Store"
                        bg="#fff"
                        width="95%"
                        borderRadius="4"
                        py="3"
                        px="1"

                        fontSize="14"
                        _web={{
                            _focus: { borderColor: 'muted.300',  },
                        }}
                        InputLeftElement={
                            <MainIcon name={"search"} />
                        }
                    />
                </Center>
            </>

            <FlatList
                contentContainerStyle={{
                    width:Layout.window.width,
                    justifyContent: 'center'
                }}
                numColumns={1}
                renderItem = {({item})=><CardStoreView item={item} navigation={props.navigation} />}
                data={data.data}
                keyExtractor={({index}) => index}
            />
        </View>
    );
}
const SaleListScreen = (props:{navigation:any}) => {
    // @ts-ignore
    const allStore = useGetAllStoreQuery();
    return(
        <LoadingScreen data={[allStore]}>
            <ShowSaleListScreen  navigation={props.navigation}/>
        </LoadingScreen>
    )
};

export default SaleListScreen;
