import React from 'react';
import MainIcon from "../../../assets/icon/Icon";
import { HistoryViewNavigate } from './HistoryView';
import {Divider} from "native-base";
import Layout from "../../../constants/Layout";



const SettingView = () => {
    const data = [
        {
            iconLeft:<MainIcon name={"arrow-right"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Cài đặt",
            textRight:"thông tin,bảo mật",
        },
        {
            iconLeft:<MainIcon name={"arrow-right"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Điều khoản và chính sách",
            textRight:"",
        },
        {
            iconLeft:<MainIcon name={"arrow-right"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textLeft:"Gửi phản hồi",
            textRight:"",
        }
    ]
    return (
        <>
            <Divider bg={"light.200"} width={Layout.window.width} height={3} my={3} />
            <HistoryViewNavigate item={data[0]} />
            <Divider my={1} />
            <HistoryViewNavigate item={data[1]} />
            <Divider my={1} />
            <HistoryViewNavigate item={data[2]} />

        </>
    );
};

export default SettingView;
