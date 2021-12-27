import React, {createContext, useContext} from 'react';
import TextBase from "../../components/TextBase";
import {Avatar, Box, Center, Divider, FlatList, Pressable, ScrollView,Image} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import ButtonBase from "../../components/ButtonBase";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";
import {ProductDataTableFinish, ProductDataTableWaiting } from '../CartScreen/ChildrentComponent';
import LoadingScreen, {LoadingContext} from '../../helps/LoadingScreen';
import {useGetListCartToPartnerIdQuery} from "../../app/selectors";
const StoreDetailInfoScreenSection = (props:{item:any})=>{
    const item= props.item;
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const dataTable = context[0].data;
    const data = [
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
            colElement:<TextBase>{status(item.status)}</TextBase>,
        },
    ]
    return(
        <ScrollView bg={"white"}>
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
                    <Row justifyContent={"space-around"} my={3}>
                        <ButtonBase bg={"blue.400"}>Tạm khóa</ButtonBase>
                        <ButtonBase bg={"red.400"}>Khóa vĩnh viễn</ButtonBase>
                    </Row>
                    <FlatList
                        data={data}
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
                </Center>
            </Center>
        </ScrollView>
    )
}
const StoreDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    // get the number of cart finished by partner
    // @ts-ignore
    const listCartFinish = useGetListCartToPartnerIdQuery()
    // @ts-ignore
    return (
        <LoadingScreen data={[listCartFinish]}>
            <StoreDetailInfoScreenSection item={item} />
        </LoadingScreen>
    );
};

export default StoreDetailInfoScreen;
