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
import {Platform, TouchableOpacity} from "react-native";
import {filterSomething} from "../../helps";
import {SaleCardView} from "../../components/common/SaleCardView";
import {showMessage} from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const onChange1 = (event:any, selectedDate :any) => {

        const currentDate = selectedDate || date1;
        setShow1(Platform.OS === 'ios');
        setDate1(currentDate);
    };
    const onChange2 = (event:any, selectedDate :any) => {

        const currentDate = selectedDate || date2;
        setShow2(Platform.OS === 'ios');
        setDate2(currentDate);
    };
    const showMode1 = (currentMode:any) => {
        setShow1(true);
    };
    const showMode2 = (currentMode:any) => {
        setShow2(true);
    };
    const show1Datepicker = () => {
        showMode1('date');
    };
    const show2Datepicker = () => {
        showMode2('date');
    };
    let startDate =`${date1.getUTCFullYear()}-${date1.getUTCMonth()+1}-${date1.getUTCDate()}`;
    // let startDate =`2021-12-13`;
    let endDate = `${date2.getUTCFullYear()}-${date2.getUTCMonth()+1}-${date2.getUTCDate()}`;
    function timeStamp (date:any){
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var strTime = hours + ':' + minutes + ':'+seconds;
        let a =  date.getMonth()+1 <10 ? '0':'';
        let b =  date.getDate() <10 ? '0':'';
        return date.getFullYear() +'-'+`${a}${date.getMonth()+ 1}`+'-'+ `${b}${date.getDate()}`+ " " + strTime ;
    }
    const dataSale= {
        "saleCode":saleCode,
        "saleName":saleName,
        "saleValue":saleValue,
        "conditions":conditions,
        "saleRemark":saleRemark,
        "startDate":timeStamp(date1),
        "endDate":timeStamp(date2)
    }


    const [createSale] = useCreateSaleMutation();
    const notification = (payload:any)=>{
        if(payload.code === "201" ){
            showMessage({
                message: "T???o khuy???n m??i",
                description: "Th??nh c??ng",
                type: "success",
            });
        }
        else {
            showMessage({
                message: "T???o khuy???n m??i",
                description: "Th???t b???i",
                type: "warning",
            });
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
                                    placeholder="Ti??u ?????"
                                    onChangeText={(text)=>setSaleName(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={saleCode}
                                    placeholder="M?? khuy???n m??i"
                                    onChangeText={(text)=>setSaleCode(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={saleValue}
                                    keyboardType={'numeric'}
                                    placeholder="Ph???n tr??m khuy???n m??i"
                                    onChangeText={(text)=>setSaleValue(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={conditions}
                                    keyboardType={'numeric'}
                                    placeholder="??i???u ki???n khuy???n m??i"
                                    onChangeText={(text)=>setConditions(text)}
                                />
                                <TextArea
                                    value={saleRemark}
                                    h={20}
                                    my={2}
                                    isInvalid
                                    placeholder="N???i dung"
                                    onChangeText={(text)=>setSaleRemark(text)}
                                />

                                <View>
                                    {show1 && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date1}
                                            mode={"date"}
                                            timeZoneOffsetInMinutes={60}
                                            is24Hour={true}
                                            display="default"
                                            minimumDate={new Date()}
                                            onChange={onChange1}
                                        />
                                    )}
                                </View>
                                <View>
                                    {show2 && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date2}
                                            mode={"date"}
                                            timeZoneOffsetInMinutes={60}
                                            is24Hour={true}
                                            minimumDate={new Date()}
                                            display="default"
                                            onChange={onChange2}
                                        />
                                    )}
                                </View>
                                <Row justifyContent={"space-around"} my={2} >
                                    <Pressable bg={'blue.400'} onPress={show1Datepicker} ><TextBase  mx={2}>{startDate}</TextBase></Pressable>
                                    <Pressable bg={'blue.400'}  onPress={show2Datepicker} ><TextBase mx={2}>{endDate}</TextBase></Pressable>
                                </Row>
                                <Row justifyContent={"space-around"} my={2}>
                                    <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                    <ButtonBase bg={"danger.400"} isDisabled={Object.values(dataSale).includes('')} onPress={()=>pushSale()}>????ng</ButtonBase>
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
                        <SaleCardView item={item} navigation={props.navigation} routeName={'saleDetailInfo'} />
                        <Divider />
                    </View> }
                    data={listShow}
                    keyExtractor={({index}) => index}
                    ItemSeparatorComponent={() => <Divider bg={"light.300"} />}
                />
            </ScrollView>
            <Button
                bg={"blue.400"}
                position="absolute"
                right={3}
                bottom={10}
                size="sm"
                borderRadius={"full"}
                onPress={onOpen}
            >
                <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
            </Button>
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
