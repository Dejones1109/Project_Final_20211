import React, {useEffect, useRef, useState} from 'react';
import Database from "../../firebase/database";
import {Box, Center, FlatList} from "native-base";
import TextBase from "../../components/TextBase";
import {TouchableOpacity} from "react-native";
import {store} from "../../app/store";
import Layout from "../../constants/Layout";
import {useNavigation} from "@react-navigation/native";
const NotificationScreen = (props:{route?:any}) => {
    let auth:any =store.getState().auth.currentUser;
    let {notify, notifyNoSeen, refetch}= props.route.params.item;
    useEffect(async () => {
        // await Database.listen(
        //     `notification/notify/${auth.partCode}`,
        //     'value',
        //     async (snap:any)=>{
        //         // numChildren()
        //         let data :any = Object.values(snap.val());
        //         setData(data);
        //         let promises :any = [];
        //         data.forEach((item:any)=>{
        //             promises.push( Database.update_pro(
        //                 `notification/notify/${auth.partCode}/${item.key}`,
        //                 1
        //             ))
        //         })
        //         await Promise.all(promises);
        //     }
        // );
        if(notifyNoSeen.length>0){
            notifyNoSeen.forEach((item:any)=>{
                console.log(item.key);
                try{
                    Database.update(
                        `notification/notify/${auth.partCode}/${item.key}`,
                        'see',
                        1
                    )
                }
                catch (e){}
            })
        }
        refetch(true);
    }, []);
    const yourRef:any = useRef(null);
    const navigation = useNavigation();
    const Item = (props:{item:any})=>{
        let item = props.item;
        return (
            <Center width={'100%'} >
                <Center width={'95%'}>
                    <TextBase color={'light.300'}>{item.time}</TextBase>
                    <TouchableOpacity onPress={() =>navigation.navigate('payOrderScreen',{item:{idOrder:item.dataOrder.id, orderCode:item.dataOrder.orderCode, status:item.dataOrder.status}})} >
                        <Box
                            bg={"white"}
                            maxW="80"
                            rounded="lg"
                            overflow="hidden"
                            borderColor="coolGray.200"
                            borderWidth="1"
                            px={2}
                        >
                            <TextBase bold fontSize={'xl'} >{item.title}</TextBase>
                            <TextBase light fontSize="xl">
                                {item.description}
                            </TextBase>
                            <TextBase fontSize={18} color={'light.300'}>
                                {item.time}
                            </TextBase>
                        </Box>
                    </TouchableOpacity>
                </Center>
            </Center>
            )
    }
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                minHeight:Layout.window.height,
            }}
            ref={yourRef}
            onContentSizeChange={() =>  yourRef.current._listRef._scrollRef.scrollTo({x:0,y:0, animated:true})}
            data={notify }
            scrollEnabled={true}
            onLayout={()=>yourRef.current.scrollToEnd({ animated: true })}
            renderItem={({item})=><Item item={item} />}
            keyExtractor={(index)=>index}
            maxToRenderPerBatch={10}
        />
    );
};

export default NotificationScreen;
