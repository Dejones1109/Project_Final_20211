import React, {useState} from 'react';
import {Center, Input} from "native-base";
import ButtonBase from "../../components/ButtonBase";
import {useNavigation} from "@react-navigation/native";

const isBillScreen = () => {
    const [vat,setVat]= useState('');
    const [email,setEmail]= useState('');
    const [address,setAddress]= useState('');
    const [companyName,setCompanyName ]= useState('');
    const navigation= useNavigation();
    const bill = {
        vat:vat,
        email:email,
        address:address,
        companyName:companyName
    }
    return (
        <Center>
            <Center width={"95%"}>
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
            </Center>
            <ButtonBase color={"blue.400"} isDisabled={Object.values(bill).includes("")} onPress={()=>navigation.navigate("authOrder",{bill:bill})}>Tạo hóa đơn</ButtonBase>
        </Center>
    );
};

export default isBillScreen;
