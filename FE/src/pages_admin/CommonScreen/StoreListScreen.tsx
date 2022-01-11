import React, {useContext, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {
    Actionsheet,
    Avatar, Badge,
    Box,
    Button,
    Center, Circle,
    FlatList,
    Icon,
    Input,
    Pressable, Row, ScrollView, Spacer, StatusBar, useDisclose,
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
import {TouchableOpacity} from "react-native";
import {filterSomething, nonAccentVietnamese} from "../../helps";

const CardStoreView = (props:{item:any,navigation ?: any})=>{
    const item = props.item;
    const styled={
            borderWidth:1,
            borderColor:"light.300",
            borderRadius:10,
            px:2,
    }
    return(
        <TouchableOpacity onPress={()=>props.navigation.navigate("storeDetailInfo",{item:item})}>
            <Center my={1}>
                <Center width={"95%"}>
                    <Center  width={"100%"}  {...styled} >
                        <Box width={"100%"}  overflow={"hidden"}>
                            <Box>
                                <Box
                                >
                                    <Row  space={2} alignContent ={"space-between"}>
                                        <Col alignContent={"center"}>
                                            <>
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
                                                <Circle // bg="red.400"
                                                    bg={item.status===201 ? "success.500" :"danger.500"}
                                                    position='absolute'
                                                    mb={6}
                                                    mr={0}
                                                    alignSelf="flex-end"
                                                    zIndex={1}
                                                    size={2}
                                                >
                                                </Circle>
                                            </>
                                        </Col>
                                        <Col alignContent={"center"} >
                                            <Col >
                                                <TextBase alignItems={"flex-end"}>{item.nameStore.slice(0,18)}</TextBase>
                                                <TextBase>{item.name}</TextBase>
                                            </Col>
                                        </Col>
                                        <Spacer />
                                        <Col justifyContent={"space-around"} alignItems={"flex-end"}>
                                            <TextBase color={"red.500"}></TextBase>
                                            <TextBase color={"blue.200"}>Xem chi tiết</TextBase>
                                        </Col>
                                    </Row>
                                </Box>
                            </Box>
                        </Box>
                    </Center>
                </Center>
            </Center>
        </TouchableOpacity>
    )
}
const  LayoutStoreListScreen = (props:{navigation:any}) =>{
    // @ts-ignore
    const {context } = useContext(LoadingContext);
    const data = context[0].data;
    const { isOpen, onOpen, onClose } = useDisclose();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [nameStore,setNameStore]= useState('');
    const [address,setAddress]= useState('');
    const [search,setSearch]= useState('');
    const dispatch = useDispatch();
    const dataUser= {
        phone:phone,
        name:name,
        nameStore:  nameStore,
        address: address,
    }
    const [listShow, setListShow] = useState(data.data);
    const [searching, setSearching] = useState(false);
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
    const searchSomething = ()=>{
        let value = filterSomething(data.data,search,'nameStore');
        setListShow(value);
    }
    const recoverData = ()=>{
        setListShow(data.data);
    }
    return (
        <>
            <ScrollView  minHeight={'100%'}  bg={"white"}
                showsVerticalScrollIndicator={false}
            >
                <Center w={"100%"} >
                    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                        <Actionsheet.Content>
                            <Box w="100%"  px={4}  justifyContent="center">
                                <Input
                                    isInvalid
                                    value={name}
                                    my={2}
                                    placeholder="Tên của partner"
                                    onChangeText={(text)=>setName(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={phone}
                                    keyboardType={'numeric'}
                                    placeholder="số điện thoại"
                                    onChangeText={(text)=>setPhone(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={nameStore}
                                    placeholder="Tên cửa hàng"
                                    onChangeText={(text)=>setNameStore(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={address}
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
                    {/*<StatusBar backgroundColor="white" barStyle="light-content"  />*/}
                    <Center>
                        <Input
                            placeholder="Search Store"
                            bg="#fff"
                            width="95%"
                            borderRadius="4"
                            py="3"
                            px="1"
                            m={2}
                            value={search}
                            onChangeText={(text)=>{
                                setSearch(text);
                                if(text === null || text === ''){
                                    recoverData();
                                }
                            }}
                            onSubmitEditing={()=>{
                                if(search !== '' || search !== null){
                                    searchSomething();
                                }
                            }}
                            returnKeyType='search'
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
                    initialNumToRender={10}
                    numColumns={1}
                    renderItem = {({item})=><CardStoreView item={item} navigation={props.navigation} />}
                    data={listShow}
                    keyExtractor={({index}) => index}
                />
            </ScrollView>
            <View flex={1} zIndex={3}>
                <Button
                    bg={"blue.400"}
                    position="absolute"
                    right={3}
                    bottom={100}
                    size="sm"
                    borderRadius={"full"}
                    onPress={onOpen}
                >
                    <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
                </Button>
            </View>
        </>
    );
}
const StoreListScreen = (props:{navigation:any}) => {
    // @ts-ignore
    const allStore = useGetAllStoreQuery();
    return(
        <LoadingScreen data={[allStore]}>
            <LayoutStoreListScreen  navigation={props.navigation}/>
        </LoadingScreen>
    )
};

export default StoreListScreen;
