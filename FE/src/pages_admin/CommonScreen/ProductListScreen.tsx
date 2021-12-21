import React from 'react';
import TextBase from '../../components/TextBase';
import FrameBase from "../../components/FrameBase";
import {Avatar, Box, Center, Circle, Fab, FlatList, Icon, Input, Pressable, View} from "native-base";
import {Col} from "../../components/AutoLayout";
import MainIcon from "../../assets/icon/Icon";
import {AntDesign} from "@expo/vector-icons";
import {useGetAllProductsQuery} from "../../app/selectors";
import ButtonBase from "../../components/ButtonBase";
import Layout from '../../constants/Layout';
const CardProductView = (props:{item:any, navigation: any})=>{
    const item = props.item;
    const {data} = use
    return(
        <Pressable onPress={()=>props.navigation.navigate("productDetailInfo",{item:item})}>
            <Center width={"100%"}>
                <FrameBase
                    default
                    styled={{
                        borderWidth:1,
                        borderColor:"light.300",
                        borderRadius:10,
                        my:2,
                        p:3,
                        height:70,
                        shadow:3
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
        </Pressable>

    )
}
const ProductListScreen = (props:{navigation?: any}) => {
    // @ts-ignore
    const {data} = useGetAllProductsQuery();
    const dataCp = Object.assign([], Object.assign({},data).data);
    return (
        <View flex={1} bg={"white"}>
            <Box  w="100%">
                <Circle
                    bg={"blue"}
                    position="fixed"
                    right={3}
                    bottom={60}
                    size="sm"
                >
                    <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
                </Circle>
            </Box>
            <Input
                placeholder="Search People & Places"
                bg="#fff"
                width="100%"
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
            <FlatList
                contentContainerStyle={{
                    width:375
                }}

                renderItem = {({item})=><CardProductView item={item} navigation={props.navigation} />}
                data={dataCp}
                keyExtractor={({index}) => index}
            />
        </View>

    );
};

export default ProductListScreen;
