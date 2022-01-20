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
    Actionsheet, Input, useDisclose
} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import ButtonBase from "../../components/ButtonBase";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";
import {useDispatch, useSelector} from "react-redux";
import {createPartner, updatePartner, updateStatusPartner} from "../../app/service/store/storeSlice";
import {storeApi} from "../../app/controller";
import {useNavigation} from "@react-navigation/native";
import {showMessage} from "react-native-flash-message";
import {getIdUser} from "../../helps/authenticate";
import {store} from "../../app/store";
const StoreDetailInfoScreenSection = (props:{item:any})=>{
    const [item,setItem]= useState(props.item);
    // @ts-ignore
    const { isOpen, onOpen, onClose } = useDisclose();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [nameStore,setNameStore]= useState('');
    const [address,setAddress]= useState('');
    const [search,setSearch]= useState('');

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
    const changePassword = (password:string)=>{

    }
    const dataUser= {
        phone:phone,
        name:name,
        nameStore:  nameStore,
        address: address,
    }
    async function updateUser() {
        if(phone === item.phone){
            alert('Số điện thoại đã tồn tại');
        }else{
            let payload = {
                partnerId: getIdUser(),
                data: dataUser
            }
            // @ts-ignore
            dispatch(updatePartner(payload)).then(res=>{
                if(res.payload.data){
                    showMessage({
                        message: "Cập nhật người dùng",
                        description: `Thành công`,
                        type: "success",
                    });
                }
                else {
                    showMessage({
                        message: "Có lỗi xảy ra",
                        description: `Cập nhật thất bại`,
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

    function onOpenSheet() {
        setPhone(item.phone);
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
                                <ButtonBase bg={"danger.400"} isDisabled={Object.values(dataUser).includes('')} onPress={()=>updateUser()}>Đăng</ButtonBase>
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
                    <TextBase w={'95%'} color={'blue.500'} fontSize={'xl'}>Thay đổi mật khẩu</TextBase>
                    <TextBase w={'95%'} color={'blue.500'} fontSize={'xl'} onPress={()=>onOpenSheet()}>Thay đổi thông tin cá nhân</TextBase>
                </Center>
            </Center>
        </ScrollView>
    )
}
const ChangeInfoScreen = () => {
    let partner= store.getState().auth.currentUser;
    return (
        // <LoadingScreen data={[listCartFinish]}>
            <StoreDetailInfoScreenSection item={partner} />
        // </LoadingScreen>
    );
};

export default ChangeInfoScreen;
function onOpenSheet() {
    throw new Error('Function not implemented.');
}

