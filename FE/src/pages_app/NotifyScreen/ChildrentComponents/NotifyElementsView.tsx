import {Box, FlatList, Divider, Pressable, Spacer, Center} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
import MainIcon from "../../../assets/icon/Icon";
import Layout from "../../../constants/Layout";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Database from "../../../firebase/database";
import {store} from "../../../app/store";
import {showMessage} from "react-native-flash-message";

export const NotifyViewNavigate = (props:{item:any})=>{
    const item = props.item;
    const navigation = useNavigation();
    return(
        <Center width={"95%"} height={50} my={1}>
            <Box width={["100%","100%"]}  overflow={"hidden"}>
                <TouchableOpacity  onPress={() =>navigation.navigate(item.routeName, {item:item.data})}  >
                    <Box
                    >
                        <Row  space={2}  alignContent ={"space-between"}>
                            <Col  >
                                {item.iconLeft}
                            </Col>
                            <Col>
                                <TextBase fontSize={"md"}>{item.textTop}</TextBase>
                                <TextBase color={"light.300"}>{item.textBottom}</TextBase>
                            </Col>
                            <Spacer />
                            <TextBase  alignSelf={"center"} color={"light.300"} >{item.textRight}</TextBase>
                            <Col  >
                                {item.iconRight}
                            </Col>
                        </Row>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Center>
    )
}

const NotifyElementsView = () => {
    let auth:any =store.getState().auth.currentUser;
    const [notify, setNotify] =useState([]);
    const [notifyNoSeen, setNotifyNoSeen] =useState([]);
    const [refetch,setRefetch] = useState(false);
    useEffect(async ()=>{
        setRefetch(false);
        await Database.listen(
            `notification/notify/${auth.partCode}`,
            'value',
            async (snap:any)=>{
                // numChildren()
                let data :any = Object.values(snap.val());
                let notifyNoSeen = [];
                setNotify(data);
                notifyNoSeen = data.filter((item:any)=>item.see ===0);
                setNotifyNoSeen(notifyNoSeen);
                if(notifyNoSeen.length>0){
                    showMessage({
                        message:`Bạn đang có ${notifyNoSeen.length} thông báo chưa đọc `,
                        description:'',
                        type:'info'
                    })
                }

            }
        );
    } ,[refetch])
    const data = [
        {
            iconLeft:<MainIcon name={"newspaper-o"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Tin tức",
            textBottom:"Tính năng mới, bảo trì",
        },
        {
            iconLeft:<MainIcon name={"notification"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:`Thông báo ${notifyNoSeen.length !== 0 ?notifyNoSeen.length :''}`,
            textBottom:"Đơn hàng, thông tin giao dich",
            routeName:"notificationScreen",
            data:{
                notify:notify,
                notifyNoSeen:notifyNoSeen,
                refetch :(r:any)=>setRefetch(r),
            }
        },
        {
            iconLeft:<MainIcon name={"sale"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Khuyến mãi",
            textBottom:"Khuyến mãi, quà tặng",
            routeName:"saleScreen"
        },
        {
            iconLeft:<MainIcon name={"appstore-o"} />,
            iconRight:<MainIcon name={"arrow-right"} />,
            textTop:"Trưng bày",
            textBottom:"Thông tin",
        }
    ]
    return (
        <>
            {/*<NotifyViewNavigate  item={data[0]} />*/}
            {/*<Divider my={1} />*/}
            <NotifyViewNavigate  item={data[1]} />
            <Divider my={1} />
            <NotifyViewNavigate  item={data[2]} />
            <Divider my={1} />
            {/*<NotifyViewNavigate  item={data[3]} />*/}
            {/*<Divider my={1} />*/}
        </>
    );
};

export default NotifyElementsView;
