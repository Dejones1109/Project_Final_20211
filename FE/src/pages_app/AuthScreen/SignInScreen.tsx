import React, {useContext, useEffect, useState} from "react"
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    NativeBaseProvider,
} from "native-base";
import {useDispatch, useSelector} from "react-redux";
import {adminLogin} from "../../app/service/admin/adminSlice";
import {userLogin} from "../../app/service/user/userSlice";
import {getData} from "../../helps/localStorage";
import {NavigationContext} from "../../navigation/RootMobile";
import {store} from "../../app/store";

export const LoginForm = (props:{navigation?:any}) => {
    const [user ,setUser] = useState("");
    const [password ,setPassword] = useState("");
    const [loading,setLoading] = useState(false)
    const payload = {
        username:user,
        password:password,
    }
    // const data = useSelector(state=>state);
    // console.log(data );
    const dispatch = useDispatch();
    // const login = useLoginAdminQuery(payload);
    const {auth}:any  = useContext(NavigationContext);
    useEffect(() =>{

    })
    const login = async ()=>{
        // @ts-ignore
        if(user && password){
            setLoading(true );
            // @ts-ignore
            await dispatch(userLogin(payload));
            // @ts-ignore
            await dispatch(adminLogin(payload));
            console.log("code",store.getState().admin.code )
            if(store.getState().admin.code === 200 ||store.getState().auth.code === 200 ){
                getData("user").then(r =>auth.setUser(r));
                getData("admin").then(r =>auth.setAdmin(r));
            }else{
                alert('Tài khoản hoặc mật khẩu không chính xác');
                setLoading(false );
            }
        }
        else  {
            alert("Vùi lòng nhập đầy đủ thông tin");
            setLoading(true );
        }
    }
    return (
        <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
                size="md"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                    color: "warmGray.50",
                }}
            >
                WELCOME TO PAPA DASHI
            </Heading>
            <Heading
                mt="1"
                _dark={{
                    color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
            >
                Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email ID</FormControl.Label>
                    <Input
                        value={user}
                        onChangeText={(text:string)=>{
                            setUser(text)
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password"
                           value={password}
                           onChangeText={(text:string)=>{
                               setPassword(text)
                           }}
                    />
                    <Link
                        _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500",
                        }}
                        alignSelf="flex-end"
                        mt="1"
                    >
                        Forget Password?
                    </Link>
                </FormControl>
                <Button mt="2" colorScheme="indigo"  isLoading={loading}   isLoadingText = "Submitting" onPress={() =>login()} >
                    Sign in
                </Button>

            </VStack>
        </Box>
    )
}

export default function SignInScreen(props:{navigation:any})  {
    return (
        <Center flex={1} px="3">
            <LoginForm  navigation={props.navigation}/>
        </Center>
    )
}
