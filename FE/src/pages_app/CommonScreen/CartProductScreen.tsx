import React, {memo, useContext, useEffect, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {Box, Center, Checkbox, Divider, FlatList, ScrollView, Spacer} from "native-base";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import {Col, Row} from "../../components/AutoLayout";
import { useDispatch } from 'react-redux';
import {useNavigation} from "@react-navigation/native";
import {useGetCartListByPartnerQuery} from "../../app/selectors";
import LoadingScreen , {LoadingContext} from "../../helps/LoadingScreen";
import {TouchableOpacity} from "react-native";
import MainIcon from "../../assets/icon/Icon";
import { useIsFocused } from '@react-navigation/native';
import {getIdUser} from "../../helps/authenticate";
const LoadingCartProductScreen = (props:{route:any}) => {
    // @ts-ignore
    const {context}= useContext(LoadingContext);
    const dataCp = context[0].data.data;
    const navigation = useNavigation();
    const [groupValueCart, setGroupValueCart ] = useState([]);
    const [totalMoney,setTotalMoney]= useState(0);
    const [totalQuantity,setTotalQuantity]= useState(0);
    const [saleValue, setSaleValue]= useState(props.route.params !== undefined ? props.route.params.item?.saleValue  : 0);
    const [saleId, setSaleId]= useState(props.route.params !== undefined ? props.route.params.item?.id  : 0);
    const [isBill,setIsBill] = useState(0);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(()=>{
        setSaleValue(props.route.params !== undefined ? props.route.params.sale.saleValue  : 0)
        setSaleId(props.route.params !== undefined ? props.route.params.sale.id  : 0)
    }, [isFocused])
    const styled={height:12 ,w:0.95 *Layout.window.width}
    const allInfo = {
        totalQuantity:totalQuantity,
        totalMoney:totalMoney ,
        saleValue:saleValue,
        groupValueCart:groupValueCart,
        saleId:saleId,
    }
    return (
        <>
            <ScrollView  bg={"white"}
                         showsVerticalScrollIndicator={false}

            >
                {dataCp ? <></> :
                    <Center mt={"90%"}>
                        <ButtonBase m={3} onPress={()=>navigation.goBack()}  height={10} bg={"blue.400"} >Mua h??ng</ButtonBase>
                    </Center>
                }
                <Center>
                    <Center w={"95%"} >
                        <Col mt={500}>
                            {dataCp &&
                            <>
                                <FrameBase
                                    default
                                    styled={{my:3,height:8}}
                                    viewOptions={{
                                        leftElement:<TextBase bold color={'red.500'}>Th??ng tin</TextBase>,
                                    }}
                                />
                                <Divider  />
                                <TouchableOpacity onPress={()=>navigation.navigate('selectSaleScreen', {item:totalMoney, routeName:'cartProductScreen'})}>
                                    <Center  width={"100%"}  {...styled} >
                                        <Box width={"100%"}  overflow={"hidden"}>
                                            <Box>
                                                <Box
                                                >
                                                    <Row  space={2} alignContent ={"space-between"}>
                                                        <Col alignContent={"center"}>
                                                            <TextBase color={'blue.500'}>Voucher</TextBase>
                                                        </Col>
                                                        <Col alignContent={"center"} >
                                                            <TextBase color={'light.300'}>{ saleValue > 0 ? saleValue+"%" :"Ch???n ??p d???ng"}</TextBase>
                                                        </Col>
                                                        <Spacer />
                                                        <MainIcon name={'arrow-right'}/>
                                                    </Row>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Center>
                                </TouchableOpacity>
                                <Divider />
                                <Center  width={"100%"}  {...styled} >
                                    <Box width={"100%"}  overflow={"hidden"}>
                                        <Box>
                                            <Box
                                            >
                                                <Row  space={2} alignContent ={"space-between"}>
                                                    <Col alignContent={"center"}>
                                                        <TextBase color={'blue.500'}>???????c gi???m</TextBase>
                                                    </Col>
                                                    <Col alignContent={"center"} >
                                                    </Col>
                                                    <Spacer />
                                                    <TextBase color={"red.500"}>{saleValue/100  * totalMoney} vn??</TextBase>
                                                </Row>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Center>
                            </>
                            }

                        </Col>
                        <Checkbox.Group
                            colorScheme="green"
                            defaultValue={groupValueCart}
                            accessibilityLabel="pick an item"
                            onChange={(values) => {
                                setGroupValueCart(values);
                                let totalMoney :number =0;
                                let totalQuantity :number =0;
                                values.forEach((item:any)=>{
                                    totalMoney = totalMoney + parseInt(item.split(" ")[1]);
                                    totalQuantity = totalQuantity + parseInt(item.split(" ")[2]);
                                });
                                setTotalMoney(totalMoney);
                                setTotalQuantity(totalQuantity)
                            }}
                        >
                            <FlatList
                                contentContainerStyle={{
                                    width:0.95*Layout.window.width,

                                }}
                                numColumns={1}
                                data={dataCp}
                                renderItem={({item})=><>
                                    <FrameBase cart={item}  navigation={navigation} />
                                </>
                                }
                                ItemSeparatorComponent={()=><Divider  />}
                                keyExtractor={({index})=>index}
                            />
                        </Checkbox.Group>


                    </Center>
                </Center>
            </ScrollView>
            {dataCp && <Center bg={"info.200"} position={"absolute"} bottom={0} left={0} right={0} height={100}  py={2}  >
                <Box width={["95%","95%"]}  overflow={"hidden"}>
                    <Box>
                        <Box>
                            <TextBase>T???ng ti???n : <TextBase color={"red.500"}>{totalMoney - saleValue/100 * totalMoney} vn??</TextBase></TextBase>
                            <ButtonBase m={3} onPress={()=>navigation.navigate('authOrder', {item:allInfo})} isDisabled={totalMoney !== 0 ? false : true}  height={10} bg={"blue.400"} >X??c nh???n ????n</ButtonBase>
                        </Box>
                    </Box>
                </Box>
            </Center>}
        </>
    );
};
const CartProductScreen = (props:{route?:any})=>{
    // @ts-ignore
    let partnerId = getIdUser();
    const data = useGetCartListByPartnerQuery(partnerId);
    return(
        <LoadingScreen data={[data]}>
            <LoadingCartProductScreen route={props.route}/>
        </LoadingScreen>
    )
}
export default CartProductScreen;
