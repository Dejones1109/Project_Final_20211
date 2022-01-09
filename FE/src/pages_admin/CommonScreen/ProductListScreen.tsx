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
    Pressable, Row, ScrollView, Spacer, StatusBar,
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
import {TouchableOpacity} from "react-native";
import {filterSomething} from "../../helps";

const CardProductView = (props:{item:any, navigation: any})=>{
    const item = props.item;
    const styled = {
        borderWidth:1,
        borderColor:"light.300",
        borderRadius:10,
        px:2,
    }
    return(
        <TouchableOpacity  onPress={()=>props.navigation.navigate("productDetailInfo",{item:item})}>
            <Center my={1}>
                <Center width={"95%"}>
                    <Center  width={"100%"}  {...styled} >
                        <Box width={"100%"}  overflow={"hidden"}>
                            <Box>
                                <Box
                                >
                                    <Row  space={2} alignContent ={"space-between"}>
                                        <Col alignContent={"center"}>
                                            <>
                                                <Avatar
                                                    bg="pink.600"
                                                    alignSelf="center"
                                                    size={50}
                                                    source={{
                                                        uri: `${item.image}`,
                                                    }}
                                                >
                                                </Avatar>
                                            </>
                                        </Col>
                                        <Col alignContent={"center"} >
                                            <Col>
                                                <TextBase alignItems={"flex-end"}>{item.productName.slice(0,20)}</TextBase>
                                                <TextBase>{item.type}</TextBase>
                                            </Col>
                                        </Col>
                                        <Spacer />
                                        <Col justifyContent={"space-around"} alignItems={"flex-end"}>
                                            <Col justifyContent={"space-around"} alignItems={"flex-end"}>
                                                <TextBase color={"red.500"}>{item.price} đ</TextBase>
                                                <TextBase color={"blue.200"}>Xem chi tiết</TextBase>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Box>
                            </Box>
                        </Box>
                    </Center>
                </Center>
            </Center>

        </TouchableOpacity>

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
    const [listShow, setListShow] = useState(data.data);
    const createPro = async()=>{
        // @ts-ignore
        await dispatch(createProduct(crePro)).then(({payload}) => {notification(payload)});
        await dispatch(productApi.util.invalidateTags(['productApi']));
        setProductName('');
        setType('');
        setRemark('');
        setPrice('');
        setImage('');
        onClose;
    }
    const [search,setSearch]= useState('');
    const searchSomething = ()=>{
        console.log(data.data );
        let value = filterSomething(data.data,search,'productName');
        console.log(value);
        setListShow(value);
    }
    const recoverData = ()=>{
        setListShow(data.data);
    }

    return (
        <>
            <ScrollView  minHeight={'100%'}  bg={"white"}
                showsVerticalScrollIndicator={false}
            >

                <Center >
                    <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                        <Actionsheet.Content>
                            <Box w="100%"  px={4}  justifyContent="center">
                                <Input
                                    isInvalid
                                    my={2}
                                    value={productName}
                                    placeholder="Tên sản phẩm"
                                    onChangeText={(text)=>setProductName(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={image}
                                    placeholder="Địa chỉ hình ảnh"
                                    onChangeText={(text)=>setImage(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={price}
                                    placeholder="Giá sản phẩm"
                                    keyboardType={'numeric'}
                                    onChangeText={(text)=>setPrice(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={type}
                                    placeholder="Loại sản phẩm"
                                    onChangeText={(text)=>setType(text)}
                                />
                                <Input
                                    isInvalid
                                    my={2}
                                    value={remark}
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
                    {/*<StatusBar backgroundColor="white" barStyle="light-content"  />*/}
                    <Center>
                        <Input
                            placeholder="Search Product "
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
                                if(text === null || text !== ''){
                                    recoverData();
                                }
                            }}
                            onSubmitEditing={()=>{
                                if(search !== '' || search !== null){
                                    searchSomething();
                                }
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
                    data={listShow}
                    keyExtractor={({index}) => index}
                    initialNumToRender={10}
                />
            </ScrollView>
            <View flex={1} zIndex={3}>
                <Button
                    bg={"blue.400"}
                    position="fixed"
                    right={3}
                    bottom={60}
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
