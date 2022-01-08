import React, {useEffect, useMemo, useState} from 'react';
import {Avatar, Box, FlatList, Input, NativeBaseProvider, ScrollView} from "native-base";
import {Row} from "./components/AutoLayout";
import TextBase from "./components/TextBase";
import {TouchableOpacity} from "react-native";
import MainIcon from "./assets/icon/Icon";
import Database from '../src/firebase/database'
import {adminLogin} from "./app/service/admin/adminSlice";
import {useSelector} from "react-redux";
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
    return (
        <FlatList
            data={props.data}
            renderItem={({item})=><Message item={item} nameUser={props.nameUser}/>}
            keyExtractor={(index)=>index}
        />
    )
})
const TestScreen = (props:{currentUser:any}) => {
    let currentUser:any = props.currentUser;
    let getSomeDataWhenRunning:any = [];
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    async function sendMessage() {
        if (inputMessage === '') {
            return setInputMessage('');
        }
        else{
            await Database.push(
                `message/${currentUser}`,
                {
                    name: 'Robert Henry',
                    image: 'https://randomuser.me/api/portraits/men/0.jpg',
                    mes:inputMessage,
                    time:Database.timeStamp(new Date())
                }
            )
            setInputMessage('');
        }
    }

    // @ts-ignore
    useEffect(async () =>{
        await Database.listen(
            `message/${currentUser}`,
            'child_added',
            (snap:any) => {
                // console.log(snap.val());
                getSomeDataWhenRunning.push(snap.val());
                // @ts-ignore
                setMessages([...getSomeDataWhenRunning]);
            }
        );
    },[])
    return (
        <>
            <ScrollView  px={2}>
                <ListMessage data={messages} nameUser={'Robert Henry'}/>
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

export default TestScreen;
