import React, {useContext, useState} from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {
    Actionsheet,
    Avatar,
    Box, Button,
    Center,
    Circle,
    FlatList,
    Icon,
    Input,
    Pressable, Row, StatusBar,
    useDisclose,
    View
} from "native-base";
import {Col} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import {AntDesign} from "@expo/vector-icons";
import {useGetAllProductsQuery} from "../../app/selectors";
import ButtonBase from "../../components/ButtonBase";
import Layout from '../../constants/Layout';
import LoadingScreen, {LoadingContext} from "../../helps/LoadingScreen";
import {useDispatch, useSelector} from "react-redux";
import {createProduct} from "../../app/service/product/productSlice";
import {productApi} from "../../app/controller";

const CardProductView = (props:{item:any, navigation: any})=>{
    const item = props.item;

    return(
        <Pressable my={1} onPress={()=>props.navigation.navigate("productDetailInfo",{item:item})}>
            <Center>
                <Center width={"90%"} >
                    <FrameBase
                        default
                        styled={{
                            borderWidth:1,
                            borderColor:"light.300",
                            borderRadius:10,
                            px:2,
                        }}
                        viewOptions={{
                            leftElement:<>
                                <Avatar
                                    bg="pink.600"
                                    alignSelf="center"
                                    size={50}
                                    source={{
                                        uri: `${item.image}`,
                                    }}
                                >
                                </Avatar>
                            </>,
                            colElement:<Col>
                                <TextBase alignItems={"flex-end"}>{item.productName.slice(0,20)}</TextBase>
                                <TextBase>{item.type}</TextBase>
                            </Col>,
                            rightElement:<Col justifyContent={"space-around"} alignItems={"flex-end"}>
                                <TextBase color={"red.500"}>{item.price} đ</TextBase>
                                <TextBase color={"blue.200"}>Xem chi tiết</TextBase>
                            </Col>,
                        }}
                    />
                </Center>
            </Center>
        </Pressable>

    )
}
const  ShowProductListScreen = (props:{navigation?: any})=>{
    const [productName,setProductName] = useState('');
    const [image,setImage] = useState('');
    const [price,setPrice] = useState('');
    const [type,setType] = useState('');
    const [remark,setRemark] = useState('');
    const crePro  = {
        productName:productName,
        image :image,
        price: price,
        type: type,
        remark: remark,
    }
    // @ts-ignore
    const {context} = useContext(LoadingContext);
    const data = context[0].data;
    const { isOpen, onOpen, onClose } = useDisclose();
    const dispatch = useDispatch();
    const notification = (payload:any)=>{
        console.log(payload);
        if(payload.code === "201" ){
            alert("Tạo thành công");
        }
        else if(payload.code === "200"){
            alert("Sản phẩm đã tồn tại");
        }
        else {
            alert("Tạo thất bại");
        };
    }
    const createPro = async()=>{
        // @ts-ignore
        await dispatch(createProduct(crePro)).then(({payload}) => {notification(payload)});
        await dispatch(productApi.util.invalidateTags(['productApi']));
        setProductName('');
        setType('');
        setRemark('');
        setPrice('');
        setImage('');

    }
    return (
        <>
            <View flex={1} bg={"white"}>
                <Button
                    bg={"blue.400"}
                    position="absolute"
                    right={3}
                    bottom={60}
                    size="sm"
                    borderRadius={"full"}
                    zIndex={3}
                    onPress={onOpen}
                >
                    <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
                </Button>
                <Center >
                    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                        <Actionsheet.Content>
                            <Box w="100%"  px={4}  justifyContent="center">
                                <Input
                                    my={2}
                                    value={productName}
                                    InputLeftElement={<MainIcon name={"arrow-right"} />}
                                    placeholder="Tên sản phẩm"
                                    onChangeText={(text)=>setProductName(text)}
                                />
                                <Input
                                    my={2}
                                    value={image}
                                    InputLeftElement={<MainIcon name={"arrow-right"} />}
                                    placeholder="Địa chỉ hình ảnh"
                                    onChangeText={(text)=>setImage(text)}
                                />
                                <Input
                                    my={2}
                                    value={price}
                                    InputLeftElement={<MainIcon name={"arrow-right"} />}
                                    placeholder="Giá sản phẩm "
                                    type ="number"
                                    onChangeText={(text)=>setPrice(text)}
                                />
                                <Input
                                    my={2}
                                    value={type}
                                    InputLeftElement={<MainIcon name={"arrow-right"} />}
                                    placeholder="Loại sản phẩm"
                                    onChangeText={(text)=>setType(text)}
                                />
                                <Input
                                    my={2}
                                    value={remark}
                                    InputLeftElement={<MainIcon name={"arrow-right"} />}
                                    placeholder="Mô tả sản phẩm"
                                    onChangeText={(text)=>setRemark(text)}
                                />
                                <Row justifyContent={"space-around"} my={2}>
                                    <ButtonBase bg={"blue.400"} onPress={onClose}>Cancel</ButtonBase>
                                    <ButtonBase bg={"danger.400"} onPress={()=>createPro()}>Đăng</ButtonBase>
                                </Row>
                            </Box>
                        </Actionsheet.Content>
                    </Actionsheet>
                </Center>
                <>
                    <StatusBar backgroundColor="white" barStyle="light-content"  />
                    <Center>
                        <Input
                            placeholder="Search Product "
                            bg="#fff"
                            width="95%"
                            borderRadius="4"
                            py="3"
                            px="1"
                            fontSize="14"
                            _web={{
                                _focus: { borderColor: 'muted.300',  },
                            }}
                            InputLeftElement={
                                <MainIcon name={"search"} />
                            }
                        />
                    </Center>
                </>

                <FlatList
                    contentContainerStyle={{
                        width:Layout.window.width,
                        justifyContent: 'center'
                    }}
                    numColumns={1}
                    renderItem = {({item})=><CardProductView item={item} navigation={props.navigation} />}
                    data={data.data}
                    keyExtractor={({index}) => index}
                />
            </View>
        </>
    );
}
const ProductListScreen = (props:{navigation?: any}) => {
    // @ts-ignore
    const allProducts = useGetAllProductsQuery();
    return(
        <LoadingScreen data={[allProducts]}>
            <ShowProductListScreen navigation={props.navigation} />
        </LoadingScreen>
    )
};

export default ProductListScreen;
