import React, {createContext, useContext, useState} from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView, Image, Select, CheckIcon} from "native-base";
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
import {updateStatusPartner} from "../../app/service/store/storeSlice";
import {storeApi} from "../../app/controller";
import {useNavigation} from "@react-navigation/native";
const StoreDetailInfoScreenSection = (props:{item:any})=>{
    const [item,setItem]= useState(props.item);
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const dataTable = context[0].data;
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
    const changeStatus = (status: number)=>{
        if(parseInt(status) !== item.status){
            let payload = {
                id:item.id,
                params:{
                    query:'status',
                    status:status,
                }
            }
            // @ts-ignore
            dispatch(updateStatusPartner(payload));
            dispatch(storeApi.util.invalidateTags(['storeApi']));
            alert('Thay đổi trạng thái thành công')
            navigation.goBack();
        }
        else{
            alert("Vui lòng chọn trạng thái mới")
        }
    }
    let [statusStore, setStatusStore] = React.useState(`${item.status}`)
    return(
        <ScrollView bg={"white"}>
            {

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
                        <TextBase mt={2} color={  "blue.400"} width={"95%"} >Thay đổi trạng thái người dùng</TextBase>
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
                            <ButtonBase isDisabled={statusStore === `${item.status}` ? true : false } bg={item.status === (203 || 204) ? "red.400" : "blue.400"} onPress={()=>changeStatus(statusUser)}>Update</ButtonBase>
                        </Row>
                    </Center>
                </Center>
            }
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
