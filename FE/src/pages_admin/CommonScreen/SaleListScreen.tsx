import React, {useContext, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {
    Actionsheet,
    Avatar,
    Box,
    Button,
    Center, Divider,
    FlatList, Heading,
    Icon,
    Input,
    Pressable, Row, ScrollView, Spacer, StatusBar, TextArea, useDisclose,
    View
} from "native-base";
import {Col} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {useCreateSaleMutation, useGetAllSaleQuery} from "../../app/selectors";
import ButtonBase from "../../components/ButtonBase";
import Layout from "../../constants/Layout";
import LoadingScreen from "../../helps/LoadingScreen";
import {LoadingContext} from "../../helps/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {createPartner} from "../../app/service/store/storeSlice";
import {storeApi} from "../../app/controller";
import {TouchableOpacity} from "react-native";
import {filterSomething, timeStamp} from "../../helps";

const SaleCardView = (props:{item:any,navigation ?: any})=>{
    const item = props.item;
    return(
            <TouchableOpacity onPress={()=>props.navigation.navigate('saleDetailInfo',{item:item})}>
                <Row alignItems={"flex-start"} w={'100%'}  space={3} px={'2.5%'} py={2} bg={'info.100'}>
                    <Col justifyContent={'flex-start'} py={2}>
                        <MaterialCommunityIcons name="sale" size={50} color="#60A5FA" />
                    </Col>
                    <Col maxWidth={'70%'}>
                        <TextBase light fontSize={15} color={'red.500'}> {item.saleName.toUpperCase()} - KHUYẾN MÃI {item.saleValue} <MaterialCommunityIcons name="sale" size={15} color="#60A5FA" /></TextBase>
                        <TextBase color={'light.400'} fontSize={12}>{item.saleRemark.charAt(0).toUpperCase()+item.saleRemark.slice(1) }</TextBase>
                        <Row>
                            <MainIcon name={'time'} />
                            <TextBase color={'light.400'} fontSize={13}>{item.endDate.split(" ")[1]} / {item.endDate.split(" ")[0]}</TextBase>
                        </Row>
                    </Col>
                    <Spacer/>
                </Row>
            </TouchableOpacity>
    )
}
const  ShowSaleListScreen = (props:{navigation:any}) =>{
    // @ts-ignore

    const {context } = useContext(LoadingContext);
    const data = context[0].data;
    const { isOpen, onOpen, onClose } = useDisclose();
    const [saleCode,setSaleCode]= useState('');
    const [saleName,setSaleName]= useState('');
    const [saleValue,setSaleValue]= useState('');
    const [conditions,setConditions]= useState('');
    const [saleRemark,setSaleRemark]= useState('');
    const dataSale= {
        "saleCode":saleCode,
        "saleName":saleName,
        "saleValue":saleValue,
        "conditions":conditions,
        "saleRemark":saleRemark,
        "startDate":timeStamp(new Date()),
        "endDate":timeStamp(new Date())
    }
    const [createSale] = useCreateSaleMutation();
    const notification = (payload:any)=>{
        console.log(payload);
        if(payload.code === "201" ){
            alert("Tạo thành công");
        }
        else {
            alert("Tạo thất bại");
        };
    }
    const pushSale = async() => {
        // @ts-ignore
        createSale(dataSale).then((res) =>notification(res.data));
        setSaleValue('');
        setSaleCode('');
        setSaleName('');
        setConditions('');
        setSaleRemark('');
        onClose;
    }
    const [search,setSearch]= useState('');
    const [listShow, setListShow] = useState(data.data);
    const searchSomething = ()=>{
        let value = filterSomething(data.data,search,['saleName','saleValue']);
        setListShow(value);
    }
    const recoverData = ()=>{
        setListShow(data.data);
    }
    return (
        <>
            <ScrollView minHeight={'100%'} bg={"white"}>
                <Center >
                    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                        <Actionsheet.Content>
                            <Box w="100%"  px={4}  justifyContent="center">
                                <Input
                                    isInvalid
                                    value={saleName}
                                    my={2}
                                    placeholder="Tiêu đề"
                                    onChangeText={(text)=>setSaleName(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={saleCode}
                                    placeholder="Mã khuyến mãi"
                                    onChangeText={(text)=>setSaleCode(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={saleValue}
                                    keyboardType={'numeric'}
                                    placeholder="Phần trăm khuyến mãi"
                                    onChangeText={(text)=>setSaleValue(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={conditions}
                                    keyboardType={'numeric'}
                                    placeholder="Điều kiện khuyến mãi"
                                    onChangeText={(text)=>setConditions(text)}
                                />
                                <TextArea
                                    value={saleRemark}
                                    h={20}
                                    my={2}
                                    isInvalid
                                    placeholder="Nội dung"
                                    onChangeText={(text)=>setSaleRemark(text)}
                                />
                                <Row justifyContent={"space-around"} my={2}>
                                    <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                    <ButtonBase bg={"danger.400"} onPress={()=>pushSale()}>Đăng</ButtonBase>
                                </Row>
                            </Box>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>
                <>
                    <StatusBar backgroundColor="white" barStyle="light-content"  />
                    <Center>
                        <Input
                            placeholder="Search Store"
                            bg="#fff"
                            width="95%"
                            borderRadius="4"
                            py="3"
                            px="1"
                            m={2}
                            fontSize="14"
                            _web={{
                                _focus: { borderColor: 'muted.300',  },
                            }}
                            value={search}
                            onChangeText={(text)=>{
                                setSearch(text);
                                if(text === null || text === ''){
                                    recoverData();
                                }
                            }}
                            onSubmitEditing={()=>{
                                if(search !== '' || search !== null){
                                    searchSomething();
                                }
                            }}
                            returnKeyType='search'
                            InputLeftElement={
                                <MainIcon name={"search"} />
                            }

                        />
                    </Center>
                </>

                <FlatList
                    initialNumToRender={10}
                    contentContainerStyle={{
                        width:Layout.window.width,
                        justifyContent: 'center'
                    }}
                    numColumns={1}
                    renderItem = {({item})=><View>
                        <SaleCardView item={item} navigation={props.navigation} />
                        <Divider />
                    </View> }
                    data={listShow.length %2 === 0 ?listShow : listShow.slice(0,listShow.length-1)}
                    keyExtractor={({index}) => index}
                />
                {
                    listShow.length %2 !== 0 &&  <SaleCardView item={listShow[listShow.length-1]} navigation={props.navigation} />
                }

            </ScrollView>
            <View flex={1} zIndex={3}>
                <Button
                    bg={"blue.400"}
                    position="fixed"
                    right={3}
                    bottom={100}
                    size="sm"
                    borderRadius={"full"}
                    onPress={onOpen}
                >
                    <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
                </Button>
            </View>
        </>
    );
}
const SaleListScreen = (props:{navigation:any}) => {
    // @ts-ignore
    const allSale = useGetAllSaleQuery();
    return(
        <LoadingScreen data={[allSale]}>
            <ShowSaleListScreen  navigation={props.navigation}/>
        </LoadingScreen>
    )
};

export default SaleListScreen;
