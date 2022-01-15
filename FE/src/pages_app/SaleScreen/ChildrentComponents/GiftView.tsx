import React from 'react';
import {Col, Row} from '../../../components/AutoLayout';
import ButtonBase from "../../../components/ButtonBase";
import TextBase from '../../../components/TextBase';
import MainIcon from "../../../assets/icon/Icon";
import {Avatar, Box, Pressable, Spacer} from "native-base";

const GiftView = () => {
    return (
        <Box width={"100%"} my={2}>
            {/*<Pressable borderRadius={10}  onPress={() => console.log('You touched me')} bg="white">*/}
            {/*    <Box*/}
            {/*        my={1}*/}
            {/*        pl="4"*/}
            {/*        pr="5"*/}
            {/*        py="2"*/}
            {/*    >*/}
            {/*        <Row alignItems="center" space={3}>*/}
            {/*            <Avatar size="48px" source={{uri:"https://wallpaperaccess.com/full/317501.jpg"}} />*/}
            {/*            <Col>*/}
            {/*                <TextBase>Quà của tôi</TextBase>*/}
            {/*                <TextBase>Bạn đang có 5 phần quà</TextBase>*/}
            {/*            </Col>*/}
            {/*            <Spacer />*/}
            {/*            <TextBase alignSelf="center">N</TextBase>*/}
            {/*        </Row>*/}
            {/*    </Box>*/}
            {/*</Pressable>*/}
        </Box>
    );
};

export default GiftView;
