import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {
    Avatar,
    Box,

    Heading,
    IconButton,
    Input,
    NativeBaseProvider,
    Row,
    ScrollView, Spacer,
    StatusBar
} from "native-base";

import {TouchableOpacity} from "react-native";
import Database from '../../firebase/database'
import {useSelector} from "react-redux";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../TextBase";
import {Col} from "../AutoLayout";
import {useNavigation} from "@react-navigation/native";
import ButtonBase from "../ButtonBase";
import {store} from "../../app/store";
import {WaitingScreen} from "../../helps/LoadingScreen";
type message =  {
    name: string,
    image: string,
    mes:string,
    time:string;
}
const Message = (props:{item:message, nameUser:any})=>{
    let {name,image,mes,time} = props.item;
    return(
        <Row my={2} space={1}  direction={name === props.nameUser ? "row-reverse" :"row"}  justifyContent={"flex-start"} alignItems={"flex-start"}>
            <Avatar
                display={name === props.nameUser ? "none" :"flex"}
                bg="amber.500"
                source={{
                    uri: `${image}`,
                }}
            >
                `${name.slice(0,2)}`
            </Avatar>
            <Box bg={'blue.500'} borderRadius={5} p={2} maxWidth={'70%'}>
                <TextBase color={'#FFFFFF'}>{mes}</TextBase>
                <TextBase color={'light.300'} textAlign={'right'}>{time.split('|')[0]}</TextBase>
            </Box>
        </Row>
    )
}
const ListMessage = React.memo((props:{data:any,nameUser:any})=>{
    const yourRef:any = useRef(null);

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical:42
                }}
                ref={yourRef}
                onContentSizeChange={() =>  yourRef.current._listRef._scrollRef.scrollToEnd({ animated:true})}
                data={props.data}
                scrollEnabled={true}
                onLayout={()=>yourRef.current.scrollToEnd({ animated: true })}
                renderItem={({item})=><Message item={item} nameUser={props.nameUser}/>}
                keyExtractor={(index)=>index}
                maxToRenderPerBatch={10}
            />
        </>
    )
})
const MessageScreen = (props:{route?:any}) => {
    let currentUser:any = props.route.params.item.hasOwnProperty('item') ?props.route.params.item.item :props.route.params.item;
    let {info, message} = currentUser;

    let getSomeDataWhenRunning:any = [];
    const [loading,setLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const navigation = useNavigation();
    const auth = useSelector((state:any)=>state.auth)
    let sender = auth.code === 200 ? info.name : 'admin';
    async function sendMessage() {
        if (inputMessage === '') {
            return setInputMessage('');
        }
        else{
            await Database.push(
                `message/${info.partCode}`,
                {
                    name: sender,
                    image: 'https://randomuser.me/api/portraits/men/0.jpg',
                    mes:inputMessage,
                    time:Database.timeStamp(new Date())
                }
            );
            setInputMessage('');
            await Database.listenLast(
                `message/${info.partCode}`,
                'child_added',
                (snap:any) => {
                    // console.log(snap.val());
                    messages.push(snap.val());
                    // @ts-ignore
                    setMessages([...messages]);
                }
            );
        }
    }
    // @ts-ignore
    useEffect(async () =>{
        setLoading(!loading);

        await Database.listen(
            `message/${info.partCode}`,
            'child_added',
            (snap:any) => {
                // console.log(snap.val());
                getSomeDataWhenRunning.push(snap.val());
                // @ts-ignore
                setMessages([...getSomeDataWhenRunning]);
            }
        )
        setLoading(!loading);

    },[])
    return (
        <>
            <Row bg={"white"} px={2} zIndex={2} justifyContent={"center"} alignItems={'center'}  space={2} position={'absolute'} py={2} top={0} left={0} right={0}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <MainIcon name={"arrow-left"} />
                </TouchableOpacity>
                <TextBase>{sender !=='admin' ? 'Tư vấn viên':info.name}</TextBase>
                <Spacer/>

            </Row>
            {loading ? <ListMessage data={messages} nameUser={sender} /> :<WaitingScreen/>}
            <Row bg={"white"} px={2} justifyContent={"center"} alignItems={'center'} height={50} space={2} position={'absolute'} py={2} bottom={0} left={0} right={0}>
                <Input
                    variant="rounded"
                    minWidth={'80%'}
                    placeholder="Nhập tin nhắn"
                    value={inputMessage}
                    onChangeText={(text)=>setInputMessage(text)}
                    onSubmitEditing={()=>sendMessage()}
                />
                <TouchableOpacity onPress={()=>sendMessage()}>
                    <MainIcon name={"send"} />
                </TouchableOpacity>
            </Row>
        </>
    );
};

export default MessageScreen;
