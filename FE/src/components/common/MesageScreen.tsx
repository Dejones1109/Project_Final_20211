import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Avatar, Box, FlatList, IconButton, Input, NativeBaseProvider, Row, ScrollView} from "native-base";

import {TouchableOpacity} from "react-native";
import Database from '../../firebase/database'
import {useSelector} from "react-redux";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../TextBase";
import {Col} from "../AutoLayout";
import {useNavigation} from "@react-navigation/native";
import ButtonBase from "../ButtonBase";
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
                display={name === props.nameUser ? "none" :"block"}
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
        <FlatList
            ref={yourRef}
            data={props.data}
            onContentSizeChange={() => yourRef.current.scrollToEnd() }
            onLayout={() => yourRef.current.scrollToEnd() }
            renderItem={({item})=><Message item={item} nameUser={props.nameUser}/>}
            keyExtractor={(index)=>index}
        />
    )
})
const MessageScreen = (props:{route?:any}) => {
    let currentUser:any = props.route.params.item;
    let {info, message} = currentUser;
    let getSomeDataWhenRunning:any = [];
    const [messages, setMessages] = useState(Object.values(message));
    const [inputMessage, setInputMessage] = useState('');
    const navigation = useNavigation();
    async function sendMessage() {
        if (inputMessage === '') {
            return setInputMessage('');
        }
        else{
            await Database.push(
                `message/${info.partCode}`,
                {
                    name: "admin",
                    image: 'https://randomuser.me/api/portraits/men/0.jpg',
                    mes:inputMessage,
                    time:Database.timeStamp(new Date())
                }
            )
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
    // useEffect(async () =>{
    //     await Database.listen(
    //         `message/${currentUser}`,
    //         'child_added',
    //         (snap:any) => {
    //             // console.log(snap.val());
    //             getSomeDataWhenRunning.push(snap.val());
    //             // @ts-ignore
    //             setMessages([...getSomeDataWhenRunning]);
    //         }
    //     );
    // },[])
    return (
        <>
            <>
                <Row h={50} bg='#FFFFFF' space={3} alignItems='center'>
                    <ButtonBase onPress={()=>navigation.goBack()} startIcon={<MainIcon name={'arrow-left'}/>} />
                    <TextBase >{info.name}</TextBase>
                </Row>
            </>
            <ScrollView  px={2}  mb={12}>
                <ListMessage data={messages} nameUser={'admin'}/>
            </ScrollView>
            <Row px={2} justifyContent={"center"}  space={2} position={'absolute'} bottom={2} left={0} right={0}>
                <Input
                    variant="rounded"
                    minWidth={'80%'}
                    placeholder="Round"
                    value={inputMessage}
                    onChangeText={(text)=>setInputMessage(text)}
                />
                <TouchableOpacity onPress={()=>sendMessage()}>
                    <MainIcon name={"send"} />
                </TouchableOpacity>
            </Row>
        </>
    );
};

export default MessageScreen;
