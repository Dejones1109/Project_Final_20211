import React, {createContext, useContext, useState} from 'react';
import TextBase from "../../components/TextBase";
import {
    Avatar,
    Box,
    Center,
    Divider,
    FlatList,
    Pressable,
    ScrollView,
    Image,
    Button,
    Icon,
    Actionsheet, Input, Heading, Select, CheckIcon
} from "native-base";
import {Col, Row} from "../../components/AutoLayout";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import ButtonBase from "../../components/ButtonBase";
import MainIcon from "../../assets/icon/Icon";
import {status} from "../../helps/Status";
import {
    useUpdateStatusSaleMutation
} from "../../app/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {store} from "../../app/store";
const ShowDetailInfoScreenSection = (props:{item:any})=>{
    const [item,setItem]= useState(props.item);
    const [updateStatusSale] = useUpdateStatusSaleMutation();
    // @ts-ignore
    const listData = [
        {
            leftElement:  <TextBase
                fontSize="16"
                color={"#60A5FA"}
            >
                Mô tả :
            </TextBase>,
            colElement:<TextBase> {item.saleRemark.charAt(0).toUpperCase()+item.saleRemark.slice(1) }</TextBase>,
        },
        {
            leftElement: <TextBase
                fontSize="16"
                color={"#60A5FA"}
            >
                Điều kiện:
            </TextBase>,
            colElement:<TextBase>{item.conditions} vnđ</TextBase>,
        },

        {
            leftElement:  <TextBase
                fontSize="16"
                color={"#60A5FA"}
            >
                Mã code :
            </TextBase>,
            colElement:<TextBase> {item.saleCode.toUpperCase()}</TextBase>,
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
            colElement:<TextBase color={item.status === 501 ? "success.500" : "danger.500"}>{status(item.status)}</TextBase>,
        },
    ]
    let [statusSale, setStatusSale] = React.useState(`${item.status}`)
    // @ts-ignore
    const navigation = useNavigation();
    const changeStatus = (status: number)=>{
        if(parseInt(String(status)) !== item.status){
            let payload = {
                id:item.id,
                status:status,
            }
            updateStatusSale(payload).then(res=>{
                // @ts-ignore
                if(res.data.code === "200"){
                    alert('Thay đổi trạng thái thành công');
                }else{
                    alert('Thay đổi thất bại');
                }
            });
            navigation.goBack();
        }
        else{
            alert("Vui lòng chọn trạng thái mới")
        }
    }
    return(
        <ScrollView bg={"white"}>
            <Box w="100%"  p={3} justifyContent="flex-start" height={"100%"} bg={"white"} >
                <Heading
                    fontSize="16"
                    color="red.500"
                >
                    {item.saleName.toUpperCase()} - KHUYẾN MÃI {item.saleValue} %
                </Heading>
                <Divider my={3} />
                <Center  width={"100%"}  >
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
                    {store.getState().auth.code === 200 ? null :
                        <Row justifyContent={"space-around"} my={3}>
                            <Select
                                selectedValue={statusSale}
                                minWidth="200"
                                accessibilityLabel="Choose status"
                                placeholder="Choose Service"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setStatusSale(itemValue)}
                            >
                                <Select.Item label={status(501)} value="501" />
                                <Select.Item label={status(502)}  value="502" />
                            </Select>
                            <ButtonBase isDisabled={statusSale === `${item.status}` ? true : false } bg={item.status === 501 ? "success.500" : "danger.500"} onPress={()=>changeStatus(parseInt(statusSale))}>Update</ButtonBase>
                        </Row>
                    }
                </Center>
            </Box>
        </ScrollView>
    )
}
const InfoSaleScreen = (props:{route:any}) => {
    const {sale} = props.route.params;
    return (
        <ShowDetailInfoScreenSection item={sale} />
    );
};

export default InfoSaleScreen;
