import React, {useState} from 'react';
import {Center, FlatList, Input, Row, View} from "native-base";
import ButtonBase from "../../components/ButtonBase";
import {useNavigation} from "@react-navigation/native";
import {Col} from "../../components/AutoLayout";
import {useGetBillPartnerQuery} from "../../app/selectors";
import {getIdUser} from "../../helps/authenticate";
import {WaitingScreen} from "../../helps/LoadingScreen";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import {status} from "../../helps/Status";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import {width} from "styled-system";
import {useDispatch} from "react-redux";
import {createBill, updateBill} from '../../app/service/store/storeSlice';
import {showMessage} from "react-native-flash-message";

const CreateBillScreen = (props:{route?:any}) => {
    let partnerId = getIdUser();
    const {data, isSuccess, refetch} = useGetBillPartnerQuery(partnerId);
    let item:any = data?.data ||{};
    const [vat,setVat]= useState(item?.vat || '');
    const [email,setEmail]= useState(item?.email||'');
    const [address,setAddress]= useState(item?.companyAddress||'');
    const [companyName,setCompanyName ]= useState(item?.companyName ||'');
    // @ts-ignore
    const [update,setUpdate] = useState(true);
    const navigation= useNavigation();

    const bill = {
        vat:  vat,
        email:email,
        address:address,
        company:companyName
    }
    const listData = [
        {
            leftElement: <MainIcon name={"user"} />,
            colElement:<TextBase light fontSize={'xl'}>Công ty</TextBase>,
            rightElement:<TextBase light fontSize={'xl'} overflow={"hidden"}>{item.companyName}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"email"} />,
            colElement:<TextBase light fontSize={'xl'}>Email</TextBase>,
            rightElement:<TextBase light fontSize={'xl'} overflow={"hidden"}>{item.email}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"address"} />,
            colElement:<TextBase light fontSize={'xl'}>Địa chỉ</TextBase>,
            rightElement:<TextBase light fontSize={'xl'} overflow={"hidden"}>{item.companyAddress}</TextBase>,
        },
        {
            leftElement: <MainIcon name={"bill"} />,
            colElement:<TextBase light fontSize={'xl'}>Mã VAT</TextBase>,
            rightElement:<TextBase light fontSize={'xl'} overflow={"hidden"}>{item.vat}</TextBase>,
        },
    ]
    const dispatch = useDispatch();
    function turnUpdate() {
        setUpdate(!update);
        setEmail(item.email);
        setVat(item.vat);
        setAddress(item.companyAddress);
        setCompanyName(item.companyName);
    }
    function updateBills() {
        let payload ={
            partnerId: getIdUser(),
            data:bill,
        }
        // @ts-ignore
        dispatch(updateBill(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message:'Cập nhật thông tin xuất hóa đơn thành công',
                    description: '',
                    type:'success'
                });
                navigation.goBack();
            }
        });
        setUpdate(!update);
        refetch();
    }

    function createBills() {
        setUpdate(true);
        let payload=bill;
        // @ts-ignore
        dispatch(createBill(payload)).then(res=>{
            if(res.payload){
                showMessage({
                    message:'Cập nhật thông tin xuất hóa đơn thành công',
                    description: '',
                    type:'success'
                });
                navigation.goBack();
            }
        });
        refetch();
    }


    return (
        <View flex={1} bg={"white"}>
            {
                isSuccess ?
                    <>
                        {data.data && update?
                            <Col space={10}>
                                <Col space={4} width={'100%'}  alignItems={'center'} >

                                    {listData.map((item,index)=>{
                                      return(
                                          <FrameBase
                                              default
                                              styled={{
                                                  height:10,
                                                  key:index,
                                                  width:'95%'
                                              }}
                                              viewOptions={{
                                                  leftElement:item.leftElement,
                                                  colElement:item.colElement,
                                                  rightElement:item.rightElement,
                                              }}
                                          />
                                      )
                                    })}
                                </Col>
                                <Center  width={'100%'}>
                                    <ButtonBase bg={"blue.400"}  onPress={()=>turnUpdate()}>Chỉnh sửa hóa đơn</ButtonBase>
                                </Center>
                            </Col>

                            : !update ?
                                <Col space={10}>
                                    <Col space={4} width={'100%'}  alignItems={'center'} >
                                        <Input
                                            isInvalid isRequired height={35} width={"95%"} variant="underlined" placeholder="Địa chỉ email"
                                            value={email}
                                            keyboardType={'email-address'}
                                            onChangeText={(text)=>setEmail(text)}
                                        />
                                        <Input  isInvalid isRequired height={35} value={companyName} width={"95%"} variant="underlined" placeholder="Tên công ty"
                                                onChangeText={(text)=>setCompanyName(text)}
                                        />
                                        <Input  isInvalid isRequired height={35 } value={address} width={"95%"} variant="underlined" placeholder="Địa chỉ"
                                                onChangeText={(text)=>setAddress(text)}
                                        />
                                        <Input  isInvalid isRequired height={35}  value={vat} width={"95%"} variant="underlined" placeholder="Mã VAT"
                                                onChangeText={(text)=>setVat(text)}
                                                keyboardType={'numeric'}
                                        />
                                    </Col>
                                    <Row  width={'100%'}>
                                        <ButtonBase bg={"blue.400"} isDisabled={Object.values(bill).includes("")} onPress={()=>updateBills()}>Chỉnh sửa</ButtonBase>
                                        <ButtonBase bg={"danger.400"}  onPress={()=>turnUpdate()}>Hủy</ButtonBase>
                                    </Row>
                                </Col>
                                :
                            <Col space={10}>
                                <Col space={4} width={'100%'}  alignItems={'center'} >
                                    <Input
                                        isInvalid isRequired height={35} width={"95%"} variant="underlined" placeholder="Địa chỉ email"
                                        value={email}
                                        keyboardType={'email-address'}
                                        onChangeText={(text)=>setEmail(text)}
                                    />
                                    <Input  isInvalid isRequired height={35} value={companyName} width={"95%"} variant="underlined" placeholder="Tên công ty"
                                            onChangeText={(text)=>setCompanyName(text)}
                                    />
                                    <Input  isInvalid isRequired height={35 } value={address} width={"95%"} variant="underlined" placeholder="Địa chỉ"
                                            onChangeText={(text)=>setAddress(text)}
                                    />
                                    <Input  isInvalid isRequired height={35}  value={vat} width={"95%"} variant="underlined" placeholder="Mã VAT"
                                            onChangeText={(text)=>setVat(text)}
                                            keyboardType={'numeric'}
                                    />
                                </Col>
                                <Center  width={'100%'}>
                                    <ButtonBase bg={"blue.400"} isDisabled={Object.values(bill).includes("")} onPress={()=>createBills()}>Tạo hóa đơn</ButtonBase>
                                </Center>
                            </Col>
                        }
                    </>
                    :<WaitingScreen />
            }
        </View>
    );
};

export default CreateBillScreen;
