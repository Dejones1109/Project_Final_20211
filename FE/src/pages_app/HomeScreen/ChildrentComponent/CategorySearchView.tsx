import React, {useContext} from 'react';
import {FlatList, Heading, Image, ScrollView} from "native-base";
import FrameBase from "../../../components/FrameBase";
import {HomeContext} from "../HomeScreen";
import {typeList} from "../../../constants/Product";
import {useNavigation} from "@react-navigation/native";
import ButtonBase from "../../../components/ButtonBase";
import Layout from "../../../constants/Layout";
import {Col, Row} from "../../../components/AutoLayout";
import TextBase from "../../../components/TextBase";
let icon = 'assets/icon/chaohaisan'
const CardCategory = (props:{category:any,navigation ?:any}) =>{
    const item = props.category;

    return(
        <ButtonBase
            height={50}
            my={2}
            width={[0.4*Layout.window.width,0.45*Layout.window.width]}
            onPress={() => props.navigation.navigate("productTypeScreen",{type: item.type})}
        >
            <Row   >
                <Image
                    roundedLeft={5}
                    resizeMode={"contain"}
                    height={50}
                    width={[50,0.15*Layout.window.width]}
                    source={require('../../../'+ icon +'.png')}
                    alt="category type"
                    bg={'blue.400'}
                />
                <Col
                    height={50}
                    pl={1}
                    bg={"light.200"}
                    roundedRight={5}
                    width={[79,0.25*Layout.window.width]}
                    justifyContent={"space-between"}
                >
                    <Heading fontSize={"xs"} my={1} >{item.type}</Heading>
                    <TextBase my={1} >{item.view}</TextBase>
                </Col>
            </Row>
        </ButtonBase>
    )
}

const CategorySearchView = (props:{navigation:any, data?:any }) => {
    // @ts-ignore
    const navigation = useNavigation();
    // @ts-ignore
    const value = Object.assign([], Object.assign({}, props.data).data);
    const getData = ()=>{
        let data = [];
        let count = 0;
        for (const property in value) {
            data.push(
                {
                    type:`${property}`,
                    img:icon[count],
                    view: value[property]
                }
            );
            count++;
        }

        return data;
    }
    const data = getData();

    return (
        <ScrollView
            horizontal
            _contentContainerStyle={{
                mx: "auto",
                mb: "4",
                minW: "72",
            }}
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                columnWrapperStyle ={{
                    justifyContent:"space-around"
                }}
                numColumns={2}
                data={data.slice(0,4)}
                renderItem={({item})=><CardCategory category={item} navigation={props.navigation}/>}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default CategorySearchView;
