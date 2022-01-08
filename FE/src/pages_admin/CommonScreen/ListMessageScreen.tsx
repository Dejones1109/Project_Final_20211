import React, {useContext, useEffect, useState} from 'react';
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
import Database from "../../firebase/database";

const CardStoreView = (props:{item:any,navigation ?: any})=>{
    const item = props.item.info;
    return(
        <Pressable my={1} onPress={()=>props.navigation.navigate("message",{item:props.item})}>
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
                                <MainIcon name={"arrow-right"}/>
                            </Col>,
                        }}
                    />
                </Center>
            </Center>
        </Pressable>
    )
}
const  ShowListMessageScreen = (props:{navigation:any}) =>{
    // @ts-ignore
    const {context } = useContext(LoadingContext);
    const data = context[0].data;


    const [list,setList] = useState([]);
    useEffect(async () =>{
        await Database.listen(
            `message`,
            'value',
            (snap:any) => {
                // console.log(snap.val());
                let message = Object.values(snap.val())
                const key :any= Object.keys(snap.val());
                let list:any = []
                data.data.forEach((i:any)=>{
                    if(key.includes(i.partCode)){
                        list.push({info:i,message:message[key.indexOf(i.partCode)]});
                        setList(list);
                    }
                });
            }
        );
    },[])
    return (
        <View flex={1} bg={"white"}>
            <FlatList
                contentContainerStyle={{
                    width:Layout.window.width,
                    justifyContent: 'center'
                }}
                numColumns={1}
                renderItem = {({item})=><CardStoreView item={item} navigation={props.navigation} />}
                data={list}
                keyExtractor={({index}) => index}
            />
        </View>
    );
}
const ListMessageScreen = (props:{navigation:any}) => {
    // @ts-ignore
    const allStore = useGetAllStoreQuery();
    return(
        <LoadingScreen data={[allStore]}>
            <ShowListMessageScreen  navigation={props.navigation}/>
        </LoadingScreen>
    )
};

export default ListMessageScreen;
