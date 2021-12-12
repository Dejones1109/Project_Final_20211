import React from 'react';
import {Avatar, Box, Image} from 'native-base';
import { Row } from '../../components/AutoLayout';
import TextBase from '../../components/TextBase';
import CardTypeBase from "../../components/CardTypeBase";


const AddProductScreen = () => {
    return (
        <Box bg={"red.500"}>
            <Box bg={"blue.500"}>
                 <Image
                       size={150}
                       resizeMode={"contain"}
                       source={{
                         uri: "https://wallpaperaccess.com/full/317501.jpg",
                       }}
                       alt="Alternate Text"
                     />
            </Box>
            <TextBase>abc</TextBase>
            <TextBase>abc</TextBase>
            <TextBase>abc</TextBase>

            <CardTypeBase
                default
                viewOptions={{
                    leftElement:<Avatar
                              bg="pink.600"
                              alignSelf="center"
                              size="30"
                              source={{
                                uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                              }}
                            >
                              GG
                        </Avatar>,
                    colElement:"abcd",
                    rightElement:"abce",
                }}
            />
            <CardTypeBase
                default
                viewOptions={{
                    leftElement:"abc",
                    colElement:"abcd",
                    rightElement:"",
                }}
            />
        </Box>
    );
};

export default AddProductScreen;
