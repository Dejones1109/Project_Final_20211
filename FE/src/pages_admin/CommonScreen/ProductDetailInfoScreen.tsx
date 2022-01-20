import React, {useState} from 'react';
import TextBase from "../../components/TextBase";
import {
    Actionsheet,
    Avatar,
    Box,
    Center,
    CheckIcon,
    FlatList,
    Image,
    Input, Modal,
    ScrollView,
    Select,
    useDisclose
} from "native-base";
import {status} from "../../helps/Status";
import FrameBase from "../../components/FrameBase";
import Layout from "../../constants/Layout";
import {Row} from "../../components/AutoLayout";
import ButtonBase from "../../components/ButtonBase";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {productApi} from "../../app/controller";
import {createProduct, updateByStatusProduct, updateProduct} from "../../app/service/product/productSlice";
import {showMessage} from "react-native-flash-message";
import * as ImagePicker from "expo-image-picker";
import {nonAccentVietnamese} from "../../helps";
import Storage from "../../firebase/storage";
import {WaitingScreen} from "../../helps/LoadingScreen";

const ProductDetailInfoScreen = (props:{route:any}) => {
    const {item} = props.route.params;
    const data = [
        {
            leftElement: <TextBase color={"blue.500"}>Tên sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productName}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Mã sản phẩm :</TextBase>,
            colElement:<TextBase>{item.productCode} </TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Loại sản phẩm :</TextBase>,
            colElement:<TextBase>{item.type}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Giá sản phẩm :</TextBase>,
            colElement:<TextBase>{item.price} đ</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Mô tả :</TextBase>,
            colElement:<TextBase>{item.remark}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Trạng thái :</TextBase>,
            colElement:<TextBase>{status(item.status)}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Được tạo :</TextBase>,
            colElement:<TextBase>{item.createdDate}</TextBase>,
        },
        {
            leftElement: <TextBase color={"blue.500"}>Tạo thành công :</TextBase>,
            colElement:<TextBase>{item.updatedDate}</TextBase>,
        },
    ]
    const [productName,setProductName] = useState('');
    const [price,setPrice] = useState('');
    const [type,setType] = useState('');
    const [remark,setRemark] = useState('');
    const [image, setImage] = useState('');
    const [transferred, setTransferred] = useState(0);
    const [pick, setPick] = useState(null);
    const [modalVisible, setModalVisible] = React.useState(false)
    const dispatch = useDispatch();
    let [statusUser, setStatusUser] = React.useState(`${item.status}`);
    const { isOpen, onOpen, onClose } = useDisclose();

    // @ts-ignore
    const navigation = useNavigation();
    const changeStatus = (st: number)=>{
        if(parseInt(st) !== item.status){
            let payload = {
                id:item.id,
                status:st,
            }
            // @ts-ignore
            dispatch(updateByStatusProduct(payload));
            dispatch(productApi.util.invalidateTags(['productApi']));
            showMessage({
                message: "Thay đổi trạng thái",
                description: `Thành công`,
                type: "success",
            });

            navigation.goBack();
        } else{
            showMessage({
                message: "Vui lòng trạng thái mới",
                description: `Trạng thái ${status(st)} đã tồn tại`,
                type: "info",
            });
        }

    }
    let dataProduct = {
        productName:productName,
        image :image,
        price: price,
        type: type,
        remark: remark,
    }

    const updateProducts = async()=>{
            await setModalVisible(!modalVisible);
            let keyImage = nonAccentVietnamese(productName);
            const url =  await Storage.putFile(image,setTransferred,keyImage);
            let payload = {
                idProduct :item.id,
                data:{
                    productName:productName,
                    image :url,
                    price: price,
                    type: type,
                    remark: remark,
                }

            }

            // @ts-ignore
            await dispatch(updateProduct(payload)).then((res) => {

                if(res && res?.payload?.data ){
                    showMessage({
                        message: "Cập nhật người dùng",
                        description: `Thành công`,
                        type: "success",
                    });
                }
                else {
                    showMessage({
                        message: "Có lỗi xảy ra",
                        description: `Cập nhật thất bại`,
                        type: "danger",
                    });
                };
            });
            await dispatch(productApi.util.invalidateTags(['productApi']));
            setProductName('');
            setType('');
            setRemark('');
            setPrice('');
            setImage('');
            setModalVisible(!modalVisible);
            onClose;
            navigation.goBack()
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setPick(result)
            setImage(result.uri);
        };
    }

    function onOpenSheet() {
        setProductName(item.productName);
        setType(item.type);
        setRemark(item.remark);
        setPrice(item.price);
        setImage(item.image);
        onOpen();
    }

    return (
        <ScrollView
                    minHeight={'100%'}  bg={"white"}
                    showsVerticalScrollIndicator={false}
        >
            <Modal
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                avoidKeyboard
                justifyContent="flex-end"
                bottom="4"
                size="lg"
                closeOnOverlayClick={false}
            >
                <WaitingScreen />
            </Modal>
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
                            <ButtonBase my={2}  bg={"blue.400"} onPress={pickImage}>
                                Pick one image
                            </ButtonBase>
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
                                <ButtonBase bg={"danger.400"} isDisabled={Object.values(dataProduct).includes('')} onPress={()=>updateProducts()}>Đăng</ButtonBase>
                            </Row>
                        </Box>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
            <Center >
                <Center>
                    <Box bg={"white"} mb={3}>
                        <Image
                            height={500}
                            width={Layout.window.width}
                            resizeMode={"cover"}
                            source={{
                                uri: `${item.image}`,
                            }}
                            alt="Image product"
                        />
                    </Box>
                </Center>
                <Center width={"100%"}>
                    <FlatList
                        data={data.slice(1,data.length)}
                        renderItem={({item})=><FrameBase
                            default
                            styled={{
                                height:10,
                            }}
                            viewOptions={{
                                leftElement:item.leftElement,
                                colElement:item.colElement,
                                rightElement:item.rightElement,
                            }}
                        />}
                        keyExtractor={({index})=>index}
                        contentContainerStyle={{
                            width:0.95*Layout.window.width,
                        }}
                    />
                    <TextBase fontSize={'xl'} mt={2} color={  "blue.400"} width={"95%"} >Thay đổi trạng thái người dùng</TextBase>
                    <Row justifyContent={"space-around"} my={3}>
                        <Select
                            selectedValue={statusUser}
                            minWidth="200"
                            accessibilityLabel="Choose Service"
                            placeholder="Choose Service"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => {
                                setStatusUser(itemValue);
                            }}
                        >
                            <Select.Item label={status(401)} value="401" />
                            <Select.Item label={status(402)}  value="402" />
                        </Select>
                        <ButtonBase isDisabled={statusUser === `${item.status}` ? true : false } bg={item.status === 401 ? "red.400" : "blue.400"} onPress={()=>changeStatus(statusUser)}>Update</ButtonBase>
                    </Row>
                    <TextBase fontSize={'xl'} mt={2} color={  "blue.400"} width={"95%"} onPress={()=>onOpenSheet()}>Thay đổi thông tin sản phẩm</TextBase>
                </Center>
            </Center>
        </ScrollView>
    );
};

export default ProductDetailInfoScreen;
