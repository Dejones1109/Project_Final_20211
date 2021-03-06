import React, {createContext, useContext, useState} from 'react';
import TextBase from "../../components/TextBase";
import {
    Avatar,
    Box,
    Center,
    Divider,
    FlatList,
    Pressable,
    ScrollView,
    Image,
    Select,
    CheckIcon,
    useDisclose, Actionsheet, Input
} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import ButtonBase from "../../components/ButtonBase";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";
import {ProductDataTableFinish, ProductDataTableWaiting } from '../CartScreen/ChildrentComponent';
import LoadingScreen, {LoadingContext} from '../../helps/LoadingScreen';
import {useGetListCartToPartnerIdQuery, useGetPartnerByCodeQuery} from "../../app/selectors";
import {useDispatch, useSelector} from "react-redux";
import {createPartner, updatePartner, updateStatusPartner} from "../../app/service/store/storeSlice";
import {storeApi} from "../../app/controller";
import {useNavigation} from "@react-navigation/native";
import {showMessage} from "react-native-flash-message";
import {getIdUser} from "../../helps/authenticate";
import {TouchableOpacity} from "react-native";
const StoreDetailInfoScreenSection = (props:{item:any})=>{
    const [item,setItem]= useState(props.item);
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const dataTable = context[0].data;
    const { isOpen, onOpen, onClose } = useDisclose();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [nameStore,setNameStore]= useState('');
    const [address,setAddress]= useState('');
    const [search,setSearch]= useState('');
    // const {data,isFetching,isSuccess} = useGetPartnerByCodeQuery(item.partCode);
    const listData = [
        {
            leftElement: <MainIcon name={"user"} />,
            colElement:<TextBase>{item.name}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"phone"} />,
            colElement:<TextBase>{item.phone}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"address"} />,
            colElement:<TextBase>{item.address}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"start-active"} />,
            colElement:<TextBase>{item.createdDate}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"active"} />,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"status"} />,
            colElement:<TextBase color={item.status === (203 || 204) ? "red.400" : "blue.400"}>{status(item.status)}</TextBase>,
        },
    ]
    const dispatch = useDispatch();
    // @ts-ignore
    const navigation = useNavigation();
    const changeStatus = (st: number)=>{
        if(parseInt(st) !== item.status){
            let payload = {
                id:item.id,
                params:{
                    query:'status',
                    status:st,
                }
            }
            // @ts-ignore
            dispatch(updateStatusPartner(payload));
            dispatch(storeApi.util.invalidateTags(['storeApi']));
            showMessage({
                message: "Thay ?????i tr???ng th??i",
                description: `Th??nh c??ng`,
                type: "success",
            });
            navigation.goBack();
        }
        else{
            showMessage({
                message: "Vui l??ng tr???ng th??i m???i",
                description: `Tr???ng th??i ${status(st)} ???? t???n t???i`,
                type: "info",
            });
        }
    }
    let [statusStore, setStatusStore] = React.useState(`${item.status}`)

    async function updateUser() {
        if(phone === item.phone){
            alert('S??? ??i???n tho???i ???? t???n t???i');
        }else{
            let payload = {
                partnerId: item.id,
                data: dataUser
            }
            // @ts-ignore
            dispatch(updatePartner(payload)).then(res=>{
                if(res.payload.data ){
                    showMessage({
                        message: "C???p nh???t ng?????i d??ng",
                        description: `Th??nh c??ng`,
                        type: "success",
                    });
                }
                else {
                    showMessage({
                        message: "C?? l???i x???y ra",
                        description: `C???p nh???t th???t b???i`,
                        type: "danger",
                    });
                };
            });
            await dispatch(storeApi.util.invalidateTags(['storeApi']));
            setPhone('');
            setName('');
            setNameStore('');
            setAddress('');
            onClose;
            navigation.goBack();
        }
    }

    const dataUser= {
        // phone:phone,
        name:name,
        nameStore:  nameStore,
        address: address,
    }
    function onOpenSheet() {
        // setPhone(item.phone);
        setName(item.name);
        setNameStore(item.nameStore);
        setAddress(item.address);

        onOpen();
    }
    return(
        <ScrollView bg={"white"}>
            <Center w={"100%"} >
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>
                        <Box w="100%"  px={4}  justifyContent="center">
                            <Input
                                isInvalid
                                value={name}
                                my={2}
                                placeholder="T??n c???a partner"
                                onChangeText={(text)=>setName(text)}
                            />
                            {/*<Input*/}
                            {/*    isInvalid*/}
                            {/*    my={2}*/}
                            {/*    value={phone}*/}
                            {/*    keyboardType={'numeric'}*/}
                            {/*    placeholder="s??? ??i???n tho???i"*/}
                            {/*    onChangeText={(text)=>setPhone(text)}*/}
                            {/*/>*/}
                            <Input
                                isInvalid
                                my={2}
                                value={nameStore}
                                placeholder="T??n c???a h??ng"
                                onChangeText={(text)=>setNameStore(text)}
                            />
                            <Input
                                isInvalid
                                my={2}
                                value={address}
                                placeholder="?????a ch???"
                                onChangeText={(text)=>setAddress(text)}
                            />
                            <Row justifyContent={"space-around"} my={2}>
                                <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                <ButtonBase bg={"danger.400"} isDisabled={Object.values(dataUser).includes('')} onPress={()=>updateUser()}>????ng</ButtonBase>
                            </Row>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
            <Center  >
                <Center width={"100%"} >
                    <Image
                        height={100}
                        width={"100%"}
                        resizeMode={"cover"}
                        source={{
                            uri: "https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg?size=626&ext=jpg",
                        }}
                        alt="Cover"
                    />
                    <Box position={"absolute"}  top={25}>
                        <Avatar
                            bg="pink.600"
                            alignSelf="center"
                            size={150}
                            source={{
                                uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                            }}
                        >
                            {item.name.slice(0,2)}
                        </Avatar>
                    </Box>
                </Center>

                <Center width={"100%"} mt={100}>

                    <FlatList
                        data={listData}
                        renderItem={({item})=><FrameBase
                            default
                            styled={{
                                height:10,
                            }}
                            viewOptions={{
                                leftElement:item.leftElement,
                                colElement:item.colElement,
                                rightElement:item.rightElement,
                            }}
                        />}
                        keyExtractor={({index})=>index}
                        contentContainerStyle={{
                            width:0.95*Layout.window.width,
                        }}
                    />

                    <ProductDataTableFinish data={dataTable.data}  />
                    <TextBase mt={2} color={  "blue.400"} width={"95%"} fontSize={'xl'} >Thay ?????i tr???ng th??i ng?????i d??ng</TextBase>

                    <Row justifyContent={"space-around"} my={3}>
                        <Select
                            selectedValue={statusStore}
                            minWidth="200"
                            accessibilityLabel="Choose status"
                            placeholder="Choose Service"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setStatusStore(itemValue)}
                        >
                            <Select.Item label={status(201)} value="201" />
                            <Select.Item label={status(202)}  value="202" />
                            <Select.Item label={status(203)}  value="203" />
                            <Select.Item label={status(204)}  value="204" />
                        </Select>
                        <ButtonBase isDisabled={statusStore === `${item.status}` ? true : false } bg={item.status === (203 || 204) ? "red.400" : "blue.400"} onPress={()=>changeStatus(statusStore)}>Update</ButtonBase>
                    </Row>
                    <TextBase mt={2} color={  "blue.400"} width={"95%"} fontSize={'xl'} onPress={()=>onOpenSheet()} >Thay ?????i th??ng tin ng?????i d??ng</TextBase>
                </Center>
            </Center>
        </ScrollView>
    )
}
const StoreDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    // @ts-ignore
    const listCartFinish = useGetListCartToPartnerIdQuery(item.id)
    // @ts-ignore
    return (
        <LoadingScreen data={[listCartFinish]}>
            <StoreDetailInfoScreenSection item={item} />
        </LoadingScreen>
    );
};

export default StoreDetailInfoScreen;
