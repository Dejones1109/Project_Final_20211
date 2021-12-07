import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Container,
    Text,
    Heading,
    Center,
    NativeBaseProvider,
    HStack,
    VStack, Box, Stack, Button
} from "native-base"

function LayoutScreenTable () {
    return (
        <Center mx={2} width={"100%"} >
            <Stack direction={["column","column","row","row"]} w={"100%"} space={3} justifyContent={"center"} >
                <VStack space={4}  w={["100%","100%","30%","40%"]} backgroundColor={"primary.400"} alignItems={"flex-end"}    >
                    <Box  width={["100%","100%","100%","50%"]}  height="50" bg={"danger.500"}>
                        Logo
                    </Box>

                </VStack>
                <VStack space={4}  w={["100%","100%","70%","60%"]} backgroundColor={"primary.400"}    >
                    <Box width={["100%","100%","100%","66.67%"]} height="50" bg={"danger.500"}>
                        Headings
                    </Box>
                </VStack>
            </Stack>

            <Stack my={3} direction={["column","column","row","row"]} w={"100%"} space={3} justifyContent={"center"} >
                <VStack space={4}  w={["100%","100%","30%","40%"]} backgroundColor={"primary.400"} alignItems={"flex-end"}    >
                    <Box  width={["100%","100%","100%","50%"]}  height="50" bg={"danger.500"}>
                        Navigations
                    </Box>

                </VStack>
                <VStack space={4}  w={["100%","100%","70%","60%"]} backgroundColor={"primary.400"}    >
                    <Box width={["100%","100%","100%","66.67%"]} height="50" bg={"danger.500"}>
                        Contents
                    </Box>
                </VStack>
            </Stack>
        </Center>
    );
}

function mapStateToProps() {
    return {};
}

export default connect(
    mapStateToProps,
)(LayoutScreenTable);
