import React, {useState} from 'react';
import {Center, Input, View} from "native-base";
import ButtonBase from "../../components/ButtonBase";
import {useNavigation} from "@react-navigation/native";
import {Col} from "../../components/AutoLayout";
import {getIdUser} from "../../helps/authenticate";
import {useGetBillPartnerQuery} from "../../app/selectors";
import {WaitingScreen} from "../../helps/LoadingScreen";
import MainIcon from "../../assets/icon/Icon";
import TextBase from "../../components/TextBase";
import FrameBase from "../../components/FrameBase";

const isBillScreen = (props:{route?:any}) => {
    let partnerId = getIdUser();
    const {data, isSuccess, refetch} = useGetBillPartnerQuery(partnerId);
    let item:any = data?.data ||{};
    const [vat,setVat]= useState('');
    const [email,setEmail]= useState('');
    const [address,setAddress]= useState('');
    const [companyName,setCompanyName ]= useState('');
    const navigation= useNavigation();
    const bill = {
        vat:vat,
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
    return (
        <View flex={1}>
            {isSuccess && item?
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
                        <ButtonBase bg={"blue.400"} onPress={()=>navigation.navigate("authOrder",{bill:bill, item: props.route.params.item})}>Đồng ý</ButtonBase>
                    </Center>
                </Col>:
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
                        <ButtonBase bg={"blue.400"} isDisabled={Object.values(bill).includes("")} onPress={()=>navigation.navigate("authOrder",{bill:bill, item: props.route.params.item})}>Tạo hóa đơn</ButtonBase>
                    </Center>
                </Col>
            }
        </View>
    );
};

export default isBillScreen;
