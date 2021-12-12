import React from 'react';
import MainIcon from "../../../assets/icon/Icon";
import {Box, Divider, FlatList} from "native-base";
import Layout from "../../../constants/Layout";
import { NotifyViewNavigate } from './NotifyElementsView';

const ContactView = () => {
    const data = [
        {
            iconRight:<MainIcon name={"arrow-right"} />,
            iconLeft:<MainIcon name={"arrow-right"} />,
            textTop:"Liên hệ tư vấn",
            textBottom:"Trò chuyện đặt hàng ngay",
        },
    ]
    return (
        <>
            <Divider bg={"light.200"} width={Layout.window.width} height={3} my={3}/>
            <FlatList
                contentContainerStyle={{
                    width:0.95*Layout.window.width,
                }}

                renderItem = {({item})=>
                    <>
                        <NotifyViewNavigate item={item} />
                        <Divider my={1} />
                    </>
                }
                numColumns ={1}
                data={data.slice(0,-1)}
                keyExtractor={(item) => item.id}
            />
            <NotifyViewNavigate item={data[data.length-1]} />
        </>
    );
};

export default ContactView;