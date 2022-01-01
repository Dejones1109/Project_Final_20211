import React, {memo, useContext, useEffect, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {Box, Center, Checkbox, Divider, FlatList, ScrollView, Spacer} from "native-base";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import {Col, Row} from "../../components/AutoLayout";
import { useDispatch } from 'react-redux';
import {createOrder} from "../../app/service/product/productSlice";
import {useNavigation} from "@react-navigation/native";
import {useGetCartListByPartnerQuery} from "../../app/selectors";
import LoadingScreen , {LoadingContext} from "../../helps/LoadingScreen";

const LoadingCartProductScreen = () => {

    // @ts-ignore
    const {context}= useContext(LoadingContext);
    const dataCp = context[0].data.data;
    const navigation = useNavigation();

    const [groupValueCart, setGroupValueCart ] = useState([]);
    const dispatch = useDispatch();
    const order = async ()=>{
        let data = {
            "adminId":1,
            "partnerId" : localStorage.getItem("partnerId"),
            "cartId" :groupValueCart,
            "isBill" : 1
        };
        // @ts-ignore
        await dispatch(createOrder(data));
        await  navigation.goBack();
        await alert("đặt hàng thành công");
    }

    return (
        <ScrollView bg={"white"}>

            <Center >
                <Checkbox.Group
                    colorScheme="green"
                    defaultValue={groupValueCart}
                    accessibilityLabel="pick an item"
                    onChange={(values) => {
                        setGroupValueCart(values);
                    }}
                >
                    <FlatList
                        contentContainerStyle={{
                            width:Layout.window.width
                        }}
                        numColumns={1}
                        data={dataCp}
                        renderItem={({item})=><>
                            <FrameBase cart={item} styled={{my:3}} />
                            <Divider bg={"light.200"}/>
                        </>
                        }
                        keyExtractor={({index})=>index}
                    />
                </Checkbox.Group>
                <Divider bg={"light.200"} width={Layout.window.width} height={1} my={3}/>
                <FrameBase
                    default
                    styled={{my:3,height:8}}
                    viewOptions={{
                        leftElement:<TextBase>Thông tin</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    styled={{height:8}}
                    viewOptions={{
                        leftElement:<TextBase>Voucher</TextBase>,
                        rightElement:<TextBase>10%</TextBase>,
                    }}
                />
                <FrameBase
                    default
                    styled={{height:8}}
                    viewOptions={{
                        leftElement:<TextBase>Tổng tiền</TextBase>,
                        rightElement:<TextBase>333.000đ</TextBase>,
                    }}
                />
                <Divider bg={"light.200"} width={Layout.window.width} height={1} my={3}/>
                <Center  width={"95%"} height={8} my={3}  >
                    <Box width={["100%","100%"]}  overflow={"hidden"}>
                        <Box>
                            <Box
                            >

                                <TextBase>Tổng tiền : <TextBase color={"red.500"}>185000 đ</TextBase></TextBase>
                                <ButtonBase m={3} onPress={()=>order()}  height={10} bg={"blue.400"} >Đặt hàng</ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                </Center>

            </Center>
        </ScrollView>
    );
};
const CartProductScreen = ()=>{
    // @ts-ignore
    const data = useGetCartListByPartnerQuery();
    return(
        <LoadingScreen data={[data]}>
            <LoadingCartProductScreen/>
        </LoadingScreen>
    )
}
export default CartProductScreen;
